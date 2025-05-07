import { constructorHelper } from "./helpers";
import Biodata from "./Biodata";
import ContactInfo from "./ContactInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default class User {
    constructor(data){
        const defaultUser = {
            id: null,
            emailVerified: false,
            bioData: new Biodata(),
            contactInfo: new ContactInfo(),
            primaryPage: null,
            pages: [],
            likedPosts: [],
            savedPosts: [],
            events: [],
            notes: [],
            reviews: [],
            church: null,
            allowsMarketing: true,
        }
        constructorHelper.call(this, data, defaultUser) 
    }

    makePost(postID, postContent) {}
    createPage(){}

    async logOut() {
        try {
            await signOut(auth);
            return true
          } catch (err) {
            console.error(err);
            return err
          }
    }
}