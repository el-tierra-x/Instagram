import { API_BASE_URL, PER_PAGE_LIMIT } from "../constants/apiConstants";
import { ErrorResponse, PhotosResponse, PhotoResponseResultType, UserResponseResultType , UserResponse } from "../types/apiTypes";
import { Photo, UserExpanded } from "../types/storeTypes";

import {v4 as uuidv4} from 'uuid';

function getFeedPageURL(){
    return API_BASE_URL + `/photos/random?count=${PER_PAGE_LIMIT}`;
}
function getUserPhotosPageURL(username : string , pageNumber : number){
     return API_BASE_URL + `/users/${username}/photos?page=${pageNumber}&per_page=${PER_PAGE_LIMIT}`;
}
function getUserInfoURL(username : string){
     return API_BASE_URL + `/users/${username}`
}


function mapResponseToPhoto(photoResponseObject : PhotosResponse) : Photo{
     const mappedPhoto : Photo = {
          id : photoResponseObject.id.concat('-',uuidv4()),
          counts : {
               downloads : photoResponseObject.downloads,
               likes : photoResponseObject.likes
          },
          createdAt : photoResponseObject.created_at,
          url : {
               thumb : photoResponseObject.urls.thumb,
               small : photoResponseObject.urls.small,
               large : photoResponseObject.urls.regular
          },
          user : {
               fullName : photoResponseObject.user.name,
               id : photoResponseObject.user.id,
               username : photoResponseObject.user.username,
               avatar : {
                    small : photoResponseObject.user.profile_image.medium,
                    large : photoResponseObject.user.profile_image.large,
                    thumb : photoResponseObject.user.profile_image.small
               }
          },
          comments : [{
               commentText : photoResponseObject.description ?? 'Added A Photo',
               commenterUser : {
                    username : photoResponseObject.user.username
               }
          }],
          description : photoResponseObject.description,
          likedByUser : false,
     };

     if(photoResponseObject.location){
          return {...mappedPhoto , location : photoResponseObject.location.name}
     }
     return mappedPhoto;

}

function mapResponseToUser(userResponseObject : UserResponse) : UserExpanded{
     return {
          id : userResponseObject.id,
          username : userResponseObject.username,
          avatar : {
               large : userResponseObject.profile_image.large,
               small : userResponseObject.profile_image.medium,
               thumb : userResponseObject.profile_image.small
          },
          collections : userResponseObject.total_collections,
          followers : userResponseObject.followers_count,
          likes : userResponseObject.total_likes,
          name : userResponseObject.name,
          fullName : userResponseObject.name,
          totalPhotos : userResponseObject.total_photos,
          bio : userResponseObject.bio,
          likedByUser : false,
          followedByUser : false
     };
}



function GETFetchWithDefaultValues(urlString : string){
     return fetch(urlString , {
          method : 'GET',
          headers : {
               Authorization : `Client-ID ${process.env.REACT_APP_API_KEY}`
          }
     });
}

async function wrapFetchInTryCatch<T>(fetchPromise : Promise<T>){
     try{
          const finalFetchResponse = await fetchPromise;
          return finalFetchResponse;
     }
     catch(e : any){
          return {
               data : null,  
               error : {
                    errors : [e.message]
               }
          }
     }
}

async function fetchFeedPageFromServer(){
     const urlString = getFeedPageURL();
     const fetchResponse = await GETFetchWithDefaultValues(urlString);
     if(fetchResponse.ok){
          const responseData = await fetchResponse.json() as PhotosResponse[];
          return {
               data : responseData.map(photoResponse=>mapResponseToPhoto(photoResponse)),
               error : null
          } as PhotoResponseResultType;
     }
     else{
          const errorResponseData = await fetchResponse.json() as ErrorResponse;
          return {
               data : null,
               error : errorResponseData
          } as PhotoResponseResultType;
     }
}

async function fetchUserPageFromServer(username : string, pageNumber : number){
     const urlString = getUserPhotosPageURL(username , pageNumber);
     const fetchResponse = await GETFetchWithDefaultValues(urlString);

     if(fetchResponse.ok){
          const responseData = await fetchResponse.json() as PhotosResponse[];
          return {
               data : responseData.map(userPhotosResponse=>mapResponseToPhoto(userPhotosResponse)),
               error : null
          } as PhotoResponseResultType;
     }
     else{
          const responseData = await fetchResponse.json() as ErrorResponse;
          return {
               data : null,
               error : responseData
          } as PhotoResponseResultType;
     }

}

async function fetchUserInfoFromServer(username : string){
     const urlString = getUserInfoURL(username);
     const fetchResponse = await GETFetchWithDefaultValues(urlString);

     if(fetchResponse.ok){
          const responseData = await fetchResponse.json() as UserResponse;
          return {
               data : mapResponseToUser(responseData),
               error : null
          } as UserResponseResultType;
     }
     else{
          const responseData = await fetchResponse.json() as ErrorResponse;
          return {
               data : null,
               error : responseData
          } as UserResponseResultType;
     }
}

export const APIfetchFeedPage = () => wrapFetchInTryCatch<PhotoResponseResultType>(fetchFeedPageFromServer());
export const APIfetchUserPhotosPage = (username : string , pageNumber : number) => wrapFetchInTryCatch<PhotoResponseResultType>(fetchUserPageFromServer(username , pageNumber));
export const APIfetchSingleUser = (username : string) => wrapFetchInTryCatch<UserResponseResultType>(fetchUserInfoFromServer(username));