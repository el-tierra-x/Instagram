import { CACHE_TYPES } from "../constants/cacheConstants";
import { Photo, UserExpanded } from "./storeTypes";

export interface PhotosResponse {
     id:                       string;
     created_at:               string;
     width:                    number;
     height:                   number;
     color:                    string;
     blur_hash:                string;
     downloads?:                number;
     likes:                    number;
     description?:              string;
     location?:                 Location;
     urls:                     Urls;
     user:                     UserLessResponse;
}



export interface Location {
     name:     string;
     city:     string;
     country:  string;
}


export interface Urls {
     raw:     string;
     full:    string;
     regular: string;
     small:   string;
     thumb:   string;
}

export interface UserLessResponse {
     id:                 string;
     updated_at:         string;
     username:           string;
     name:               string;
     portfolio_url:      string;
     bio:                string;
     location:           string;
     total_likes:        number;
     total_photos:       number;
     total_collections:  number;
     instagram_username: string;
     twitter_username:   string;
     links:              UserLinks;
     profile_image:      ProfileImage;
}

export interface UserLinks {
     self:      string;
     html:      string;
     photos:    string;
     likes:     string;
     portfolio: string;
}

export interface UserResponse {
     id:                 string;
     updated_at:         string;
     username:           string;
     name:               string;
     first_name:         string;
     last_name?:          string;
     instagram_username?: string;
     twitter_username?:   string;
     portfolio_url?:      null;
     bio?:                string;
     location?:           string;
     total_likes:        number;
     total_photos:       number;
     total_collections:  number;
     followed_by_user:   boolean;
     followers_count:    number;
     following_count:    number;
     downloads:          number;
     social?:             Social;
     profile_image:      ProfileImage;
     badge:              Badge;
     links:              Links;
}

export interface Badge {
     title:   string;
     primary: boolean;
     slug:    string;
     link:    string;
     }

export interface Links {
     self:      string;
     html:      string;
     photos:    string;
     likes:     string;
     portfolio: string;
}

export interface ProfileImage {
     small:  string;
     medium: string;
     large:  string;
}

export interface Social {
     instagram_username: string;
     portfolio_url:      string;
     twitter_username:   string;
}

export type ErrorResponse = {
     errors : string[]
}

export type PhotoResponseResultType = {
     data : Photo[],
     error : null
} | {
     data : null,
     error : ErrorResponse
}

export type UserResponseResultType = {
     data : UserExpanded,
     error : null
} | {
     data : null,
     error : ErrorResponse
}
