export default function displayMessages() {

    function allocatePlan(name, option) {
        const message = ""
        if (name && option) {
            message = "Option has been allocated successfully."
        }
        else if (!name || !option) {
            message = "Option could not be allocated, name or option is required."
        }
        return message;
    }

    function phoneBill(name, usage) {
        const message = ""
        if (name && usage) {
            message = "Your total phone bill was calculated successfully."
        }
        else if (!name || !usage) {
            message = "Your total phone bill could not be calculated, name or option is required."
        }
        return message
    }
    
    return {
        allocatePlan,
        phoneBill
        
    }
}