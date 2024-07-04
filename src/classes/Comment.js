import { constructorHelper } from "./helperFunctions";

//POST COMMENT
export default class Comment {
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