//API
const API_BASE = "https://the-one-api.dev/v2";
const API_TOKEN = "BKTeUwx4IMAM8KVDo7b0";

interface Quote {
  _id: string; //mongo;
  diaglog: string;
  charcter: string;
  movie: string;
}

interface Character {
  _id: string; //mongo;
  name: string;
}
interface Movie {
  _id: string; //mongo;
  name: string;
}

let quotes: Quote[] = [];
let characters: Character[] = [];
let movies: Movie[] = [];
let currentRound = 0;
let score = 0;
let currentQuote: Quote | null = null;

function getCharacterName(id: string): string {
  const character = characters.find((c) => c._id === id);
  return character ? character.name : "Onbekend";
}

function getMovieName(id: string): string {
  const movie = movies.find((m) => m._id === id);
  return movie ? movie.name : "Onbekend";
}

async function fetchQuotes(): Promise<Quote[]> {
  try {
    const res = await fetch(`${API_BASE}/quote`, {
      headers: { Authorization: API_TOKEN },
    });
    const data = await res.json();
    return data.docs;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchCharacters(): Promise<Character[]> {
  try {
    const res = await fetch(`${API_BASE}/character`, {
      headers: { Authorization: API_TOKEN },
    });
    const data = await res.json();
    return data.docs;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`${API_BASE}/movie`, {
      headers: { Authorization: API_TOKEN },
    });
    const data = await res.json();
    return data.docs;
  } catch (e) {
    console.error(e);
    return [];
  }
}
