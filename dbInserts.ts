import {
  boolean,
  decimal,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { db } from "./src/db";
import { petsTable } from "./src/db/schema";
import { petnames } from "./src/bot/textBank/petNames";

const species = ["Cat", "Dog", "Bird", "Rabbit", "Hamster"];
const moods = ["Happy", "Sad", "Excited", "Calm", "Anxious"];

function getRandomElement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDecimal(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

const petData = Array.from({ length: 200 }, (_, id) => ({
  id: id + 1,
  ownerId: `owner${id + 1}`,
  petName: getRandomElement(petnames),
  species: getRandomElement(species),
  age: getRandomDecimal(0.1, 15),
  price: getRandomDecimal(50, 500),
  isSold: Math.random() < 0.5,
  mood: getRandomElement(moods),
  hungry: getRandomDecimal(0, 100),
  lastFed: getRandomDecimal(0, 100),
  lastPlayed: getRandomDecimal(0, 100),
  lastPet: getRandomDecimal(0, 100),
}));

export async function seedPets() {
  await db.insert(petsTable).values(petData).execute();
}
seedPets().then(() => console.info("Seeded pets table"));
