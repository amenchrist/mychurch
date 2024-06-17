import { constructorHelper } from "./helpers";
import Biodata from "./Biodata";
import ContactInfo from "./ContactInfo";

export default class User {
    constructor(data){
        const defaultUser = {
            id: null,
            biodata: new Biodata(),
            contactInfo: new ContactInfo(),
            pages: [],
            likedPosts: [],
            savedPosts: [],
            events: [],
            notes: [],
            reviews: [],
            church: null,
            allowsMarketing: true,
            type: 'USER'
        }
        constructorHelper.call(this, data, defaultUser) 
    }

    makePost(postID, postContent) {}
    createPage(){}
}