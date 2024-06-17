import { doc, setDoc } from "firebase/firestore";
import Page from "./Page";
import { EVENT, LIVESTREAM, constructorHelper } from "./helpers";
import { db } from "../config/firebase";

//PAGE EVENT
export default class Event extends Page{
    constructor(data){
        super(data)
        const defaultObj = {
            id: null,
            type: EVENT,
            parentPageHandle: null,
            creatorID: null,
            date: null,
            time: null,
            eventType: LIVESTREAM,
            content: null,
            announcements: [], 
            participants: [],
            chats: [],
            recordedLiveURL: null,
            liveStreamURL: null,
            report: null,
            reviews: [],
            recurring: false,
            hasStarted: false,
            startTimestamp: null,
            hasEnded: false,
            endTimestamp: null,
            hasFinalAttendance: false,
            totalAttendance: null,
            attendanceRecords: []
        };
        constructorHelper.call(this, data, defaultObj)
    }

    async uploadToDb() {
        try {
            await setDoc(doc(db, `pages/${this.parentPageHandle}/events`, this.id), {...this});
            return true
            // navigate(`/${currentPage.handle}/events`);
          } catch (err) {
            console.log('Error creating event')
            console.log(err);
            return false
          }
    }


    addParticipants(){}
    addReviews(){}
    createChat(){}
    generateReport(){}

}