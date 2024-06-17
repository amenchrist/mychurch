import { constructorHelper } from "./helpers";

//EVENT CONFERENCE CALL
export default class ConferenceCall {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
        };
        constructorHelper.call(this, data, defaultObj)
    }  
}