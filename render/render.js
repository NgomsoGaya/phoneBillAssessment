import queryDataBase from "../queries/query.js"
import displayMessages from "../frontEndFunctions/factory.js"
import pgPromise from "pg-promise"
//import displayMessages from "../frontEndFunctions/factory.js";

//create an instance of the express application
//const app = express();

//configure postgreSQL database connection
const pgp = pgPromise();
const DATABASE_URL = process.env.DATABASE_URL ||
  "postgres://bplrfftq:lGzAPM295sQEml0ivHf8V9T211aZFVUf@dumbo.db.elephantsql.com/bplrfftq";
const config = {
  connectionString: DATABASE_URL,
};
const db = pgp(config);
const displayMessage = displayMessages()
const queryData = queryDataBase(db)

export default function renderResults() {
    async function showTotal(req, res, next) {
        try {
            let name = req.body.username
            let usage = req.body.usageString

            const total = queryData.phoneBillQuery(name, usage)

            res.render("index", {
                total
            })
        } catch (error) {
            next(error)
        }
    }
    async function displayAllocationMessages(req, res, next) {
        try {
            let name = req.body.username
            let option = req.body.selectedPlan
             
            const message = displayMessage.allocatePlan(name, option);

            res.render("index", {
                message
            })
        } catch (error) {
            next(error)
        }
    }
    async function phoneBillMessages(req, res, next) {
        try {
            let name = req.body.username
            let usage = req.body.usageString

            let message = displayMessage.phoneBill(name, usage)

            res.render("index", {
                message
            })
            
        } catch (error) {
            next(error)
        }
    }
    async function viewUsers(req, res, next) {
        try {
            
            
        } catch (error) {
            next(error)
        }
    }
    
    return {
      showTotal,
      displayAllocationMessages,
      phoneBillMessages
    };
}