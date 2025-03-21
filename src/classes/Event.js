import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { EVENT, LIVESTREAM, constructorHelper } from "./helpers";
import { db } from "../config/firebase";
import dayjs from "dayjs";
import Post from "./Post";

//PAGE EVENT
export default class Event extends Post{
    constructor(data){
        super(data)
        const defaultObj = {
            id: null,
            type: EVENT,
            name: null,
            description: null,
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
            attendanceRecords: [],
            archiveURL: null
        };
        constructorHelper.call(this, data, defaultObj)
        // this.totalAttendance = this.getTotalAttendance();
    }

    async update(eventUpdate) {
      try {
        await updateDoc(doc(db, `pages/${this.parentPageHandle}/events`, this.id), {...eventUpdate});
        const updatedEvent = new Event({...this, id: this.id, ...eventUpdate })
        return updatedEvent;
      } catch (err) {
        console.log('Error updating event')
        console.log(err);
        return false
      }
    }

    async getTotalAttendance() {
      if(this.hasFinalAttendance){
        return this.totalAttendance
      } else {
        //Calculate total attendance
        let total = 0
        try {
          const attendanceSnapshot = await getDocs(collection(db, `pages/${this.parentPageHandle}/events/${this.id}/attendanceRecords`));
          const attendanceRecords = [];
          attendanceSnapshot.forEach((rec) => {
            attendanceRecords.push(rec.data())
          });
          total = attendanceRecords.reduce((accumulator, curVal) => accumulator + parseInt(curVal.attendance), 0);
          
          if(this.hasStarted){
            //update the event
            try {
                const update = { totalAttendance: total, hasFinalAttendance: this.hasEnded }
                await this.update(update);       
            } catch (err) {
                console.log('Error updating final event attendance');
                console.log(err);
            }
          }
          console.log(total)
          return total
        } catch (err) {
          console.log('Error fetching Event Attendance')
          console.log(err)
          return false
        }

      }

    }

    async end() {
      console.log("Ending Event")
      try {
        console.log('Calculating total attendance')
        const totalAttendance = await this.getTotalAttendance();
        const update = { hasEnded: true, endTimestamp: new Date().getTime(), totalAttendance: totalAttendance};
        try {
          const updatedEvent = await this.update(update)
          if(updatedEvent){
            return updatedEvent;
          }
        } catch (err) {
          console.log('Error updating event')
          console.log(err);
        }
  
      }catch (err){
        console.log('Error calculating total attendance')
        console.log(err);
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

    getTimestamp() {
      const reformattedDate = dayjs(this.date).format('YYYY-MM-DD');
      return dayjs(`${reformattedDate} ${this.time}`).valueOf()
    }

}