import { constructorHelper } from "./helpers";
import Biodata from "./Biodata";
import ContactInfo from "./ContactInfo";

export default class User {
    constructor(data){
        const defaultUser = {
            id: null,
            emailVerified: false,
            biodata: new Biodata(),
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
}