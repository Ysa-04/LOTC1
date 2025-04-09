import { ObjectId } from "mongodb";

export interface UserAccount {
    _id?: ObjectId,
    userName:string,
    email: string,
    password:string,
    favourites: string,
    blacklist: string,
    highscore: number
}