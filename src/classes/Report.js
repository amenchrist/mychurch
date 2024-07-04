import { constructorHelper } from "./helpers"

//PAGE EVENT REPORT
export default class Report {
    constructor(data){
        const defaultObj = {
            eventID: null,
            eventDuration: null,
            eventDateTime: null,
            attendance: null,
            registrations: null,
            guests: null,
            newFollowers: null,
            newMembers: null,
            avgWatchTime: null,
            attendees: []
        };
        constructorHelper.call(this, data, defaultObj)
    }  
}