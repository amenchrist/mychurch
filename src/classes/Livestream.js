import { constructorHelper } from "./helpers";

//EVENT LIVESTREAM
export default class Livestream {
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