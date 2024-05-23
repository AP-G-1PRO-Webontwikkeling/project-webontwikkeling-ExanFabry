import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { User, MagicTheGatheringCards } from "./ConsoleApp/interfaces";
import bcrypt from "bcrypt";
export const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";

export const client = new MongoClient(MONGODB_URI);

export const userCollection = client.db("login-express").collection<User>("users");

const saltRounds : number = 10;

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    await client.connect();
    await createInitialUser();
    console.log("Connected to database");
    process.on("SIGINT", exit);
}

async function createInitialUser() {
    if (await userCollection.countDocuments() > 0) {
        return;
    }
    let email : string | undefined = process.env.ADMIN_EMAIL;
    let password : string | undefined = process.env.ADMIN_PASSWORD;
    if (email === undefined || password === undefined) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment");
    }
    await userCollection.insertOne({
        email: email,
        password: await bcrypt.hash(password, saltRounds),
        role: "ADMIN"
    });
}

export async function login(email: string, password: string) {
    if (email === "" || password === "") {
        console.log("User not found");
        throw new Error("Email and password required");
    }
    let user : User | null = await userCollection.findOne<User>({email: email});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            console.log(user);
            return user;
        } else {
            console.log("Password incorrect");
            throw new Error("Password incorrect");
        }
    } else {
        console.log("User not found");
        throw new Error("User not found");
    }
}

async function magicTheGathering() : Promise<MagicTheGatheringCards[]> {
    const response = await fetch('https://raw.githubusercontent.com/ExanFabry/Projectopdracht/master/JSON/mtg.json');
    const magicTheGatheringCards = await response.json() as MagicTheGatheringCards[];
    return magicTheGatheringCards;
}

export async function main() {
    try {
      // Connect to the MongoDB cluster
      await client.connect();
 
      // Make the appropriate DB calls
      //...let cursor =  client.db("Les").collection("pokemon").find<Pokemon>({});
      let cursor =  client.db("Les").collection("magicTheGatheringCards").find<MagicTheGatheringCards>({});
      let cardsInDatabase = await cursor.toArray();
      if(cardsInDatabase.length === 0){
        let magicTheGatheringCards = await magicTheGathering();
        let result = await client.db("Les").collection("magicTheGatheringCards").insertMany(magicTheGatheringCards);
      }
      for(let i : number = 0; i < cardsInDatabase.length; i++){
        console.log(cardsInDatabase[i]);
      }
      return cardsInDatabase;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
export async function addUser(username: string, password: string) {
    try {
        // Check if the user already exists
        const existingUser = await userCollection.findOne({ username: username });
        if (existingUser) {
            throw new Error(`User "${username}" already exists.`);
        }

        // If the user does not exist, create a new user with an empty deck array
        const newUser: User = {
            email: username,
            password: await bcrypt.hash(password, saltRounds),
            role: "USER"
        };

        // Insert the new user into the collection
        await userCollection.insertOne(newUser);

        console.log(`User "${username}" added.`);
    } catch (e) {
        console.error(e);
    }
}