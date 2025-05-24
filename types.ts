import { ObjectId } from "mongodb";

export interface UserAccount {
    _id?: ObjectId,
    userName:string,
    email: string,
    password:string,
    favorites: Favorites,
    blacklist: Blacklist,
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

export interface Characters {
    name: string,
    wikiUrl: string,
    _id?: ObjectId
} 

export interface Movies {
    name: string,
    _id?: ObjectId
}

export interface Quotes {
    dialog: string,
    movie: Movies,
    character: Characters,
    _id?: ObjectId
}