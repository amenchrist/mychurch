import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";
import dayjs from "dayjs";
import Event from "./Event";
import { constructorHelper } from "./helpers";
import ContactInfo from "./ContactInfo";
import Post from "./Post";

export default class Page {
  constructor(data){
    const defaultPage = {
      type: "USER",
      name: null,
      handle: null,
      bio: null,
      avatarURL: null,
      bannerURL: null,
      contactInfo: {...new ContactInfo()},
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

    constructorHelper.call(this, data, defaultPage)

  }

  createPost(Post){}
  deletePost(postID){}
  createChat(pageID){}
  createEvent(pageID){}
  makePayment(senderID, recipientID){}
  registerForEvents(eventID){}

  async update(pageUpdate) {
    try {
      await updateDoc(doc(db, `pages`, this.handle), pageUpdate);
      const updatedPage = new Page({...this, ...pageUpdate })
      return updatedPage;
    } catch (err) {
      console.log('Error updating event')
      console.log(err);
      return false
    }
  }

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
    try {
      const q = query(collection(db, `pages/${this.handle}/events`), where("date", "==", date));
      const querySnapshot = await getDocs(q); 
      const newEvents = []
      
      querySnapshot.forEach((doc) => {
        newEvents.push(new Event(doc.data()))
      });
      newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
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

  /// FOLLOWER METHODS //

  async addFollower(follower) {
    try {
      await setDoc(doc(db, `pages/${this.handle}/followers`, follower.userID), {...follower});
      return true
    } catch (err) {
      console.log('Error adding follower')
      console.log(err);
      return false
    }
  }

  async userFollows(user) {
    try {
      const docRef = doc(db, `pages/${this.handle}/followers`, user.id)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        return docSnap.data()
      } else {
        return false
      }
    } catch (err) {
      console.log("Error validating follower");
      console.log(err)
    }
    
  }

  /// POST METHODS ///

  async addPost(post) {
    try {
      await setDoc(doc(db, `pages/${this.handle}/posts`, post.id), {...post});
      return true
    } catch (err) {
      console.log('Error creating post')
      console.log(err);
      return false
    }
  }

  async getPosts() {
    try {
      const querySnapshot = await getDocs(collection(db, `pages/${this.handle}/posts`)); 
      const newPosts = []

      querySnapshot.forEach((doc) => {
        newPosts.push(new Post(doc.data()))
      });
      // newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date));
      // setEvents([...newEvents])
      // this.events = [...newEvents]
      return [...newPosts]
    }catch (err) {
      console.log("Error getting Posts from db")
      console.log(err)
      return false
    } 
  }

}