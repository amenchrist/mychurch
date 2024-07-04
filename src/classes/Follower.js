import { SUBSCRIBER, constructorHelper } from "./helpers"

export default class Follower {
    constructor(data){
        const defaultObj= {
            userID: null,
            isMember: false,
            role: SUBSCRIBER,
            pagePosts: []
        }
        constructorHelper.call(this, data, defaultObj)   
    }    
}