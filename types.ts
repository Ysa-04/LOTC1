import { ObjectId } from "mongodb";

export interface UserAccount {
    _id?: ObjectId,
    userName:string,
    email: string,
    password:string,
    favourites: Favorites[],
    blacklist: string,
    highscore: number
}

export interface Favorites {
    quote: string,
    character: string, 
    movie: string
}