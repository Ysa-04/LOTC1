import { ObjectId } from "mongodb";

export interface Quote {
    _id?: ObjectId;
    quote: string;
    character: string;
    movie: string;
}

export interface Character {
    _id?: ObjectId;
    name: string;
}

export interface Movie {
    _id?: ObjectId;
    name: string;
}

const Api_Link = 'https://the-one-api.dev/v2';
const Api_Token = 'BKTeUwx4IMAM8KVDo7b0';

let quotes: Quote[] = [];
let characters: Character[] = [];
let movies: Movie[] = [];
let currentQuote: Quote | null = null;
let score = 0;
let highscore = 0;
let currentRound = 0;

function getCharacterName(id: ObjectId): string {
    const character = characters.find(c => c._id?.toString() === id.toString());
    return character ? character.name : "Onbekend"; 
}

function getMovieName(id: ObjectId): string {
    const movie = movies.find(m => m._id?.toString() === id.toString());
    return movie ? movie.name : "Onbekend";
}

async function fetchCharacters(): Promise<Character[]> {
    try {
        const res = await fetch(`${Api_Link}/character`, { 
            headers: { Authorization: Api_Token }
        });
        const data = await res.json();

        return data.docs.map((c: any) => ({
            _id: new ObjectId(c._id),
            name: c.name
        }));
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function fetchMovies(): Promise<Movie[]> {
    try {
        const res = await fetch(`${Api_Link}/movie`, { // Fixed here
            headers: { Authorization: Api_Token }
        });
        const data = await res.json();

        return data.docs.map((m: any) => ({
            _id: new ObjectId(m._id),
            name: m.name
        }));
    } catch (e) {
        console.error(e);
        return [];
    }
}
