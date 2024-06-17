export default class Note {
    constructor(data){
        const fields = [ "id", "eventID", "authorID", "title", "content", "timestamp" ]
        for (const value of fields){
            this[value] = null
        }
        for (const property in data) {
            if (fields.includes(property)){
                this[property] = data[property];
            }
        }
    }
}