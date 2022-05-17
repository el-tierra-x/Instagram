import { USER_TIMESTAMP_DATA_IDENTIFIER } from "../constants/cacheConstants";
import { UserTimeStampDataType } from "../types/cacheTypes";

function currentUserTimeStampData(){
     const userTimeStampDataString = localStorage.getItem(USER_TIMESTAMP_DATA_IDENTIFIER);
     if(userTimeStampDataString) return JSON.parse(userTimeStampDataString) as UserTimeStampDataType;
     else return null;
}

export function getLeastRecentUser(){
     const userTimeStampData = currentUserTimeStampData();

     if(userTimeStampData){

          let leastRecentUser : string = '';
          let leastRecentValue : Date = new Date();

          for(let user in userTimeStampData){

               const lastTimeUserAccessedOn = new Date(+userTimeStampData[user]);

               if(lastTimeUserAccessedOn < leastRecentValue){
                    leastRecentValue = lastTimeUserAccessedOn;
                    leastRecentUser = user;
               }

          }

          if(leastRecentValue && leastRecentValue) return leastRecentUser;
     }
}

function setUserTimeStampData(userTimeStampData : UserTimeStampDataType){
     const userTimeStampDataString = JSON.stringify(userTimeStampData);
     localStorage.setItem(USER_TIMESTAMP_DATA_IDENTIFIER , userTimeStampDataString);
}

export function updateUserTimeStampData(username : string){
     const pastUserTimeStampData = currentUserTimeStampData();
     const timestamp = Date.now().toString();

     setUserTimeStampData({...pastUserTimeStampData , [username] : timestamp});
}

export function deleteUserTimeStampData(username : string){
     const pastTimeStampData = currentUserTimeStampData();
     if(pastTimeStampData){
          const timeStampDataWithUserDeleted = Object.keys(pastTimeStampData).filter(key=>key!==username).reduce((finalObject , key)=>{
               finalObject[key] = pastTimeStampData[key];
               return finalObject;
          },{} as UserTimeStampDataType);

          setUserTimeStampData(timeStampDataWithUserDeleted);
     }
}




