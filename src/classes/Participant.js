import { ATTENDEE, constructorHelper } from "./helpers";

export default class Participant {
    constructor(data){
        const defaultObj = {
            userID: null,
            isMember: false,
            type: ATTENDEE,
            posts: []            
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}