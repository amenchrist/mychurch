import { constructorHelper } from "./helpers"

export default class Clip {
    constructor(data){
        const defaultObj = {
            authorID: null,
            pageID: null,
            clipURL: null
        };
        constructorHelper.call(this, data, defaultObj)
    } 
}