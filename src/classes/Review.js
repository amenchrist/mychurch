import { constructorHelper } from "./helpers";

//EVENT REVIEW
export default class Review {
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