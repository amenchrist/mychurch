import { constructorHelper } from "./helpers"

export default class Post {
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