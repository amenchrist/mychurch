import { constructorHelper } from "./helpers";

export default class BankDetails {
    constructor(data){
        const defaultObj = {
            userID: null,
            accountType: null,
            accountName: null,
            accountNumber: null,
            bankName: null,
            bankCountry: null,
            hasEnabledOpenBanking: false
        };
        constructorHelper.call(this, data, defaultObj)   
    }  
}