import { constructorHelper } from "./helpers"

export default class Post {
    constructor(data){
        const defaultObj = {
            id: null,
            parentPageHandle: null,
            creatorID: null,
            content: [],
            caption: null,
            likes: [],
            comments: [],
            type: 'TEXT',
            text:  null
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