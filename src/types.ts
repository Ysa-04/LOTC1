import { ObjectId } from "mongodb";

// Gebruiker-account type
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

// Favoriete quote
export interface Favorite {
    quote: string,
    character: string
}

// Geblackliste quote
export interface Blacklist {
    quote: string,
    character: string,
    reason: string
}

// Karakter info
export interface Character {
    name: string,
    wikiUrl: string,
    _id?: ObjectId
}

// Film info
export interface Movie {
    name: string,
    _id?: ObjectId
}

// Quote info
export interface Quote {
    dialog: string,
    movie: Movie,
    character: Character,
    _id?: ObjectId
}

// TypeScript uitbreiding zodat we req.userId mogen gebruiken in Express
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}