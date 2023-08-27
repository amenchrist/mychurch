import { Page, User } from "./classes";

function objStripper(obj){
    let strippedObj = {}
    for (const property in obj) {
      if (typeof obj[property] !== 'function'){
        strippedObj[property] = obj[property];
      }
    }

    return strippedObj

}

// Firestore data converter
export const userConverter = {
    toFirestore: (obj) => {
        // let strippedObj = {}
        // for (const property in obj) {
        //     if (typeof obj[property] !== 'function'){
        //         strippedObj[property] = obj[property];
        //     }
        // }

        // console.log(strippedObj)

        // return strippedObj
        return {
            firstName: obj.firstName,
            lastName: obj.lastName
        }

    },    
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data);
    }
};

export const pageConverter = {
    toFirestore: (obj) => objStripper(obj),    
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Page(data);
    }
};