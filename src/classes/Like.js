import { constructorHelper } from "./helpers"

//POST LIKE
export default class Like {
    constructor(data){
        const defaultObj = {
            userID: null,
            timestamp: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}