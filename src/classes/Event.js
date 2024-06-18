import { doc, setDoc, updateDoc } from "firebase/firestore";
import Page from "./Page";
import { EVENT, LIVESTREAM, constructorHelper } from "./helpers";
import { db } from "../config/firebase";
import dayjs from "dayjs";

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

    // async uploadToDb() {
    //   try {
    //       await setDoc(doc(db, `pages/${this.parentPageHandle}/events`, this.id), {...this});
    //       return true
    //   } catch (err) {
    //     console.log('Error creating event')
    //     console.log(err);
    //     return false
    //   }
    // }

    async update(eventUpdate) {
      try {
        await updateDoc(doc(db, `pages/${this.parentPageHandle}/events`, this.id), eventUpdate);
        const updatedEvent = new Event({...this, id: this.id, ...eventUpdate })
        return updatedEvent;
      } catch (err) {
        console.log('Error updating event')
        console.log(err);
        return false
      }
    }

    addParticipants(){}
    addReviews(){}
    createChat(){}
    generateReport(){}

    formattedDate () {
      const reformattedDate = dayjs(this.date).format('YYYY-MM-DD');
      return dayjs(`${reformattedDate} ${this.time}`).format('dddd, MMMM DD @ hh:mm a')
    }

}