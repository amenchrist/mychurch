import { constructorHelper } from "./helpers";

export default class Transaction {
    constructor(data){
        const defaultObj = {
            senderID: null,
            recipientID: null,
            reference: null,
            amount: 0,
            currency: null,
            timestamp: null
        };
        constructorHelper.call(this, data, defaultObj)   
    }   
}