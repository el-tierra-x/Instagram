import { Photo, User } from "../types/storeTypes";

export function convertDateToString(dateString : string){
     const date = new Date(dateString);
     const [, dayCount, month , year] = date.toDateString().split(' ');
     return `${dayCount} ${month} , ${year}`
}

function userIsInArray(username : string , array : User[]){
     return array.filter(user=>user.username === username).length > 0;
}

export function findNUniquePhotographers(array : Photo[], totalToFind : number){
     const uniqueArray = [] as User[];
     array.every((item)=>{
          if(!userIsInArray(item.user.username , uniqueArray)) {
               uniqueArray.push(item.user);
               if(uniqueArray.length === totalToFind) return false;
          }
          return true;
     });

     return uniqueArray;
}

export function areSameArrays<T extends object>(array1 : T[] , array2 : T[]){
     let foundNonEqualElements = false;
     array1.forEach((element , index)=>{
          for(let entry in element){
               if(element[entry] !== array2[index][entry]) foundNonEqualElements = true;
          }
     })

     return !foundNonEqualElements;
}

export function fitToLength(string : string , limit : number){
     return string.length > limit ? string.slice(0 , limit) + '...' : string;
}