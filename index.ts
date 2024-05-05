import express from "express";
import ejs from "ejs";
import { MagicTheGatheringCards, Set } from './ConsoleApp/interfaces';
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Exan:DatabaseLaboOefeningen@cluster0.dxopdrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("public"));

let counterSortName : number = 0;
let counterSortPrice : number = 0;
let counterSortLegal : number = 0;
let counterSortColor : number = 0;
let counterSortSet : number = 0;

app.get("/", async (req,res)=> {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    console.log("Hello world");
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    });
  }
});

app.get("/sortName", async (req,res)=> {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortName : boolean;
  if(counterSortName === 0 || counterSortName % 2 === 0){
    sortName = true;
  }
  else{
    sortName = false;
  }
  if(sortName){
    magicTheGatheringCards?.sort((a, b) => a.name.localeCompare(b.name));
    sortName = false;
    counterSortName++;
  }
  else if(!sortName){
    magicTheGatheringCards?.sort((a, b) => b.name.localeCompare(a.name));
    sortName = true;
    counterSortName++;
  }
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    console.log("Hello world");
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    });
  }
});

app.get("/sortPrice", async (req,res)=> {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortPrice : boolean;
  if(counterSortPrice === 0 || counterSortPrice % 2 === 0){
    sortPrice = true;
  }
  else{
    sortPrice = false;
  }
  if(sortPrice){
    magicTheGatheringCards?.sort((a, b) => a.price - b.price);
    sortPrice = false;
    counterSortPrice++;
  }
  else if(!sortPrice){
    magicTheGatheringCards?.sort((a, b) => b.price - a.price);
    sortPrice = true;
    counterSortPrice++;
  }
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    console.log("Hello world");
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    });
  }
});

app.get("/sortLegal", async (req,res)=> {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortLegal : boolean;
  if(counterSortLegal === 0 || counterSortLegal % 2 === 0){
    sortLegal = true;
  }
  else{
    sortLegal = false;
  }
  if(sortLegal){
    magicTheGatheringCards?.sort((a, b) => +(a.legalInCommander) - +(b.legalInCommander));
    sortLegal = false;
    counterSortLegal++;
  }
  else if(!sortLegal){
    magicTheGatheringCards?.sort((a, b) => +(b.legalInCommander) - +(a.legalInCommander));
    sortLegal = true;
    counterSortLegal++;
  }
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    console.log("Hello world");
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    });
  }
});

app.get("/sortColor", async (req,res)=> {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortColor : boolean;
  if(counterSortColor === 0 || counterSortColor % 2 === 0){
    sortColor = true;
  }
  else{
    sortColor = false;
  }
  if(sortColor){
    magicTheGatheringCards?.sort((a, b) => a.color.localeCompare(b.color));
    sortColor = false;
    counterSortColor++;
  }
  else if(!sortColor){
    magicTheGatheringCards?.sort((a, b) => b.color.localeCompare(a.color));
    sortColor = true;
    counterSortColor++;
  }
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    console.log("Hello world");
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    });
  }
});

app.get("/sortSet", async (req,res)=> {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortSet : boolean;
  if(counterSortSet === 0 || counterSortSet % 2 === 0){
    sortSet = true;
  }
  else{
    sortSet = false;
  }
  if(sortSet){
    magicTheGatheringCards?.sort((a, b) => a.set.name.localeCompare(b.set.name));
    sortSet = false;
    counterSortSet++;
  }
  else if(!sortSet){
    magicTheGatheringCards?.sort((a, b) => b.set.name.localeCompare(a.set.name));
    sortSet = true;
    counterSortSet++;
  }
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    console.log("Hello world");
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard
    });
  }
});

app.get("/sortSetSetPage", async (req,res)=> {
  let searchSet : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortSet : boolean;
  if(counterSortSet === 0 || counterSortSet % 2 === 0){
    sortSet = true;
  }
  else{
    sortSet = false;
  }
  if(sortSet){
    magicTheGatheringCards?.sort((a, b) => a.set.name.localeCompare(b.set.name));
    sortSet = false;
    counterSortSet++;
  }
  else if(!sortSet){
    magicTheGatheringCards?.sort((a, b) => b.set.name.localeCompare(a.set.name));
    sortSet = true;
    counterSortSet++;
  }
  if (!searchSet || searchSet.trim() === "" || searchSet == null) {
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.set.name.toLowerCase().includes(searchSet.toLowerCase()));
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet
    });
  }
});

app.get("/sortDateSetPage", async (req,res)=> {
  let searchSet : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  let sortSet : boolean;
  if(counterSortSet === 0 || counterSortSet % 2 === 0){
    sortSet = true;
  }
  else{
    sortSet = false;
  }
  if(sortSet){
    magicTheGatheringCards?.sort((a, b) => new Date(a.set.release).getTime() - new Date(b.set.release).getTime());
    sortSet = false;
    counterSortSet++;
  }
  else if(!sortSet){
    //magicTheGatheringCards.sort((a, b) => b.set.release - a.set.release);
    magicTheGatheringCards?.sort((a, b) => new Date(b.set.release).getTime() - new Date(a.set.release).getTime());
    sortSet = true;
    counterSortSet++;
  }
  if (!searchSet || searchSet.trim() === "" || searchSet == null) {
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.set.name.toLowerCase().includes(searchSet.toLowerCase()));
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet
    });
  }
});

app.get("/sets", async (req,res)=> {
  let searchSet : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  if (!searchSet || searchSet.trim() === "" || searchSet == null) {
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.set.name.toLowerCase().includes(searchSet.toLowerCase()));
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet
    });
  }
});

async function magicTheGathering() : Promise<MagicTheGatheringCards[]> {
  const response = await fetch('https://raw.githubusercontent.com/ExanFabry/Projectopdracht/master/JSON/mtg.json');
  const magicTheGatheringCards = await response.json() as MagicTheGatheringCards[];
  return magicTheGatheringCards;
}

async function main() {
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
main();

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);