import { ObjectId } from "mongodb";

export interface UserAccount {
    _id?: ObjectId,       
    userId?: string,        
    userName: string,
    email: string,
    password: string,
    favorites: Favorite,
    blacklist: Blacklist,
    highscore: number
}

export interface Favorite {
    quote: string,
    character: string
}

export interface Blacklist {
    quote: string,
    character: string,
    reason: string
}

export interface Character {
    name: string,
    wikiUrl: string,
    _id?: ObjectId
}

export interface Movie {
    name: string,
    _id?: ObjectId
}

export interface Quote {
    dialog: string,
    movie: Movie,
    character: Character,
    _id?: ObjectId
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}