import { constructorHelper } from "./helpers"

export default class Image {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
            imageURL: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}