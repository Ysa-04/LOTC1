import { ObjectId } from "mongodb";

export interface UserAccount {
    _id?: ObjectId,
    userName:string,
    email: string,
    password:string,
    favourites: Favorites[],
    blacklist: Blacklist[],
    highscore: number
}

export interface Favorites {
    quote: string,
    character: string, 
}

export interface Blacklist {
    quote: string,
    character: string, 
    reason: string
}