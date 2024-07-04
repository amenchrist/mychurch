export function constructorHelper(dataObj, defObj){
    for (const property in defObj) {
        this[property] = defObj[property];
    }
    for (const property in dataObj) {
        if (Object.keys(defObj).includes(property)){
            this[property] = dataObj[property];
        }
    }
}

export const SUBSCRIBER = "SUBSCRIBER", CONTRIBUTOR = "CONTRIBUTOR", AUTHOR = "AUTHOR", EDITOR = "EDITOR", ADMINISTRATOR = "ADMINISTRATOR";
export const EVENT = "EVENT", CHURCH = "CHURCH", ORGANISATION = "ORGANISATION", GROUP = "GROUP", PERSON = "PERSON";
export const LIVESTREAM = "LIVESTREAM", CONFERENCE = "CONFERENCE";
export const ORGANISER = "ORGANISER", ATTENDEE = "ATTENDEE", INVITEE = "INVITEE", STAFF = "STAFF"
