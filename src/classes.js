function constructorHelper(dataObj, defObj){
    for (const property in defObj) {
        this[property] = defObj[property];
    }
    for (const property in dataObj) {
        if (Object.keys(defObj).includes(property)){
            this[property] = dataObj[property];
        }
    }
}

//USER
export class User {
    constructor(data){
        const defaultUser = {
            bioData: null,
            pages: [],
            likedPosts: [],
            savedPosts: [],
            events: [],
            notes: [],
            reviews: []
        }
        constructorHelper.call(this, data, defaultUser) 
    }

    makePost(postID, postContent) {}

    createPage(){}
}

//BIODATA

export class BioData {
    constructor(data){
        const fields = [ "firstName", "middleName", "lastName", "gender", "dateOfBirth", "maritalStatus", "title", "nationality", "contactInfo"]
        for (const value of fields){
            this[value] = null
        }
        for (const property in data) {
            if (fields.includes(property)){
                this[property] = data[property];
            }
        }
    }
}

//ADDRESS
export class Address {
    constructor(data){
        const fields = [ "houseNameOrNumber", "street", "cityOrTown", "state", "county", "country", "postCodeOrZipCode" ]
        for (const value of fields){
            this[value] = null
        }
        for (const property in data) {
            if (fields.includes(property)){
                this[property] = data[property];
            }
        }
    }
}


//CONTACT INFO
export class ContactInfo {
    constructor(data){
        const defaultObj = {
            email: null,
            phoneNumber: null,
            address: null
        };
        constructorHelper.call(this, data, defaultObj)       
    }
}

//USER NOTES
export class Note {
    constructor(data){
        const fields = [ "eventID", "authorID", "title", "content", "timestamp" ]
        for (const value of fields){
            this[value] = null
        }
        for (const property in data) {
            if (fields.includes(property)){
                this[property] = data[property];
            }
        }
    }
}

//PAGE
export const EVENT = "EVENT", CHURCH = "CHURCH", ORGANISATION = "ORGANISATION", GROUP = "GROUP", PERSON = "PERSON";
export class Page {
    constructor(data){
        const fields = ["type", "avatarURL", "bannerURL", "name", "handle", "bio", "contactInfo", "followers", "events", "posts", "bankDetails", "transactions", "chats"];
        const defaultPage = {
            type: PERSON,
            followers: [],
            events: [],
            posts: [],
            bankDetails: [],
            transactions: [],
            chats: []
        }
        for (const value of fields){
            this[value] = null
        }
        for (const property in defaultPage) {
            this[property] = defaultPage[property];
        }
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

}

//CHAT
export class Chat {
    constructor(data){
        const defaultObj = {
            pageID: null,
            chatMessages: [],
            chatParticipants: []
        }
        constructorHelper.call(this, data, defaultObj)   
    }

    chatReplay(){}
    postChatMessage(){}
    addChatParticipant(){}
    deleteChatMessage(){}

}

//CHAT MESSAGE
export class ChatMessage {
    constructor(data){
        const defaultObj = {
            chatID: null,
            timestamp: null,
            content: null,
            reactions: []
        }
        constructorHelper.call(this, data, defaultObj)   
    }

    addReactions(){}
}

//FOLLOWER
export const SUBSCRIBER = "SUBSCRIBER", CONTRIBUTOR = "CONTRIBUTOR", AUTHOR = "AUTHOR", EDITOR = "EDITOR", ADMINISTRATOR = "ADMINISTRATOR";
export class Follower {
    constructor(data){
        const defaultObj= {
            pageID: null,
            isMember: false,
            role: SUBSCRIBER,
            pagePosts: []
        }
        constructorHelper.call(this, data, defaultObj)   
    }    
}

//TRANSACTION

export class Transaction {
    constructor(data){
        const defaultObj = {
            senderID: null,
            recipientID: null,
            reference: null,
            amount: 0,
            currency: null,
            timestamp: null
        };
        constructorHelper.call(this, data, defaultObj)   
    }   
}

//BANK DETAILS
export class BankDetails {
    constructor(data){
        const defaultObj = {
            userID: null,
            accountType: null,
            accountName: null,
            accountNumber: null,
            bankName: null,
            bankCountry: null,
            hasEnabledOpenBanking: false
        };
        constructorHelper.call(this, data, defaultObj)   
    }  
}

//POST
export class Post {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
            content: [],
            caption: null,
            likes: [],
            comments: []
        };
        constructorHelper.call(this, data, defaultObj)   
    }

    addComment(){}
    addTextPosterURL(){}
    addPhoto(){}
    addClip(){}
    addVideo(){}
    addLiveStream(){}
    editCaption(){}
    updateLikes(userPageID){}
}

//POST IMAGE


export class Image {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
            imageURL: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}

//POST CLIP
export class Clip {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
            clipURL: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}

//POST COMMENT
export class Comment {
    constructor(data){
        const defaultObj = {
            authorID: null,
            postID: null,
            pageID: null,
            parentCommentID: null,
            content: null,
            likes: []
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}

//POST LIKE
export class Like {
    constructor(data){
        const defaultObj = {
            userID: null,
            timestamp: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}

//PAGE EVENT
export const LIVESTREAM = "LIVESTREAM", CONFERENCE = "CONFERENCE";
export class Event extends Page{
    constructor(data){
        super(data)
        const defaultObj = {
            parentPageID: null,
            creatorID: null,
            startDateTime: null,
            endDateTime: null,
            eventType: LIVESTREAM,
            content: null,
            announcements: [], 
            participants: [],
            chats: [],
            recordedLiveURL: null,
            report: null,
            reviews: []
        };
        constructorHelper.call(this, data, defaultObj)
    } 


    addParticipants(){}
    addReviews(){}
    createChat(){}
    generateReport(){}

}

//PAGE EVENT REPORT
export class Report {
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

//EVENT PARTICIPANT
export const ORGANISER = "ORGANISER", ATTENDEE = "ATTENDEE", INVITEE = "INVITEE", STAFF = "STAFF"
export class Participant {
    constructor(data){
        const defaultObj = {
            userID: null,
            isMember: false,
            type: ATTENDEE,
            posts: []            
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}

//EVENT REVIEW
export class Review {
    constructor(data){
        const defaultObj = {
            authorID: null,
            eventID: null,
            stars: null,
            text: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}

//EVENT LIVESTREAM
export class Livestream {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
            liveStreamURL: null,
            simulatedLiveVideoURL: null
        };
        constructorHelper.call(this, data, defaultObj)
    }  
}

//EVENT CONFERENCE CALL
export class ConferenceCall {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
        };
        constructorHelper.call(this, data, defaultObj)
    }  
}


