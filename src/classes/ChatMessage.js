import { constructorHelper } from "./helpers"

export default class ChatMessage {
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