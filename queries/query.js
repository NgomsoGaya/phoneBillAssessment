export default function queryDataBase(db) {

    async function allocatePlanQuery(name, option) {
        let pricePlanKey = await db.any(
          "SELECT id FROM plans WHERE planName = $1",
          [option]
        );
        if (name && option) {
            await db.none(
              "INSERT INTO usersWithPlan (username, pricePlanKey) VALUES ($1, $2)",
              [name, pricePlanKey]
            );
        }
    }
    async function phoneBillQuery(name, usage) {
        const phoneBill = 0;

        let pricePlanKey = await db.any(
          "SELECT pricePlanKey FROM usersWithPlan WHERE username = $1",
          [name]
        );
        
        if (name && usage) {
            let selectQueryC = await db.any(
                  "SELECT callPrice FROM plans WHERE id = $1",
                  [pricePlanKey]
            );
            let selectQueryS = await db.any(
                  "SELECT smsPrice FROM plans WHERE id = $1",
                  [pricePlanKey]
                );
            usage.forEach(element => {
               if (element == "call") {
                    phoneBill += selectQueryC;
            } else if (element == "sms") {
                    phoneBill += selectQueryS;
            } 
            });
            
            return phoneBill;
            
        }
    }

    async function viewUsersInPlan(plan) {
        let planID = await db.one("SELECT id FROM plans WHERE planName = $1", [plan]);
        let users = await db.any(
          "SELECT username FROM usersWithPlan WHERE pricePlanKey = $1",
          [planID]
        );
        
        return users
    }
    
    return {
        allocatePlanQuery,
        phoneBillQuery,
        viewUsersInPlan
    }
}