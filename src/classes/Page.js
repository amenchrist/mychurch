import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";
import dayjs from "dayjs";
import Event from "./Event";

export default class Page {
  constructor(data){
    const fields = ["type", "avatarURL", "bannerURL", "name", "handle", "bio", "contactInfo", "followers", "events", "posts", "bankDetails", "transactions", "chats"];
    const defaultPage = {
      type: "USER",
      followers: [],
      events: [],
      posts: [],
      bankDetails: [],
      transactions: [],
      chats: [],
      creatorID: null,
      id: null,
      creationTimestamp: new Date().getTime(),
      websiteURL: null,
      liveStreamURL: null,
    }

    //create all object properties
    for (const value of fields){
        this[value] = null
    }

    //Assign object properties to default values
    for (const property in defaultPage) {
        this[property] = defaultPage[property];
    }

    //Assign property values passed through parameters
    for (const property in data) {
        if (fields.includes(property)){
            this[property] = data[property];
        }
    }
  }

  getPosts(){}
  createPost(Post){}
  deletePost(postID){}
  createChat(pageID){}
  createEvent(pageID){}
  addFollower(pageID){}
  makePayment(senderID, recipientID){}
  registerForEvents(eventID){}

  async addEvent(event) {
    try {
        await setDoc(doc(db, `pages/${this.handle}/events`, event.id), {...event});
        return true
    } catch (err) {
      console.log('Error creating event')
      console.log(err);
      return false
    }
  }

  async getEvents() {
    try {
      const querySnapshot = await getDocs(collection(db, `pages/${this.handle}/events`)); 
      const newEvents = []

      querySnapshot.forEach((doc) => {
        newEvents.push(new Event(doc.data()))
      });
      newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date));
      // setEvents([...newEvents])
      // this.events = [...newEvents]
      return [...newEvents]
    }catch (err) {
      console.log("Error getting Events from db")
      console.log(err)
      return false
    } 
  }
  
  async getEventsByDate(d){
    const date = dayjs(d).toDate().toString()
    console.log(date)
    try {
      const q = query(collection(db, `pages/${this.handle}/events`), where("date", "==", date));
      const querySnapshot = await getDocs(q); 
      const newEvents = []
      
      querySnapshot.forEach((doc) => {
        newEvents.push(new Event(doc.data()))
      });
      newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
      console.log(newEvents)
      return newEvents
      // setEventsFound(newEvents.length > 0)
      // setEvents([...newEvents])
    }catch (err) {
      console.log("Error getting Events by date")
      console.log(err)
      return false
    } 
  }

  async deleteEvent(e) {
    try {
      await deleteDoc(doc(db, `pages/${this.handle}/events`, e.id));
      return true
    } catch (err) {
      console.log('Error deleting event')
      console.log(err);
      return false
    }
  }

}