import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { PERSON } from "./helpers";
import dayjs from "dayjs";

export default class Page {
  constructor(data){
    const fields = ["type", "avatarURL", "bannerURL", "name", "handle", "bio", "contactInfo", "followers", "events", "posts", "bankDetails", "transactions", "chats"];
    const defaultPage = {
        type: PERSON,
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

  async getEvents() {
    try {
      const querySnapshot = await getDocs(collection(db, `pages/${this.handle}/events`)); 
      const newEvents = []

      querySnapshot.forEach((doc) => {
        newEvents.push(doc.data())
      });
      newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date));
      // setEvents([...newEvents])
      // this.events = [...newEvents]
      return [...newEvents]
    }catch (err) {
      console.log("Error getting Events")
      return false
    } 
  }

  async deleteEvent(e) {
    try {
      await deleteDoc(doc(db, `pages/${this.handle}/events`, e.id));
      
      // setEvent(null);
      // navigate(`/${currentPage.handle}/events`);
      return true
    } catch (err) {
      console.log('Error deleting event')
      console.log(err);
      return false
    }
  }

}