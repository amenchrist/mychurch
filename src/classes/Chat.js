import { constructorHelper } from "./helpers"

export default class Chat {
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