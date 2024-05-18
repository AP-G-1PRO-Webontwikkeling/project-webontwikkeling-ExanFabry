import express from "express";
import ejs from "ejs";
import { MagicTheGatheringCards, Set } from './ConsoleApp/interfaces';
import { MongoClient } from "mongodb";
import { connect, login, MONGODB_URI, main } from "./database";
import session from "./session";
import { User } from "./ConsoleApp/interfaces";
import { secureMiddleware } from "./secureMiddleware";
import { loginRouter } from "./loginRouter";
import { homeRouter } from "./homeRouter";
import { flashMiddleware } from "./flashMiddleware";
import bodyParser from 'body-parser';

const client = new MongoClient(MONGODB_URI);

const app = express();
app.use(session);
app.use(flashMiddleware);
app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let counterSortName : number = 0;
let counterSortPrice : number = 0;
let counterSortLegal : number = 0;
let counterSortColor : number = 0;
let counterSortSet : number = 0;

app.get("/", secureMiddleware, async (req,res)=> {
  console.log("Hello world!");
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  console.log(searchCard);
  if (!searchCard || searchCard.trim() === "" || searchCard == null) {
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: "",
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard,
      user: req.session.user
    });
  }
});

/*app.get("/", secureMiddleware, async(req, res) => {
  let searchCard : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  console.log(searchCard);
  res.render("index", {
    magicTheGathering: magicTheGatheringCards,
    searchCard: ""
  });
});*/

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async(req, res) => {
  console.log("1");
  const email : string = req.body.email;
  const password : string = req.body.password;
  try {
    console.log("2")
    let user : User = await login(email, password);
    console.log("3")
    delete user.password; 
    console.log("4")
    req.session.user = user;
    console.log("5")
    res.redirect("/");
  } catch (e : any) {
      res.redirect("/login");
  }
});

app.get("/logout", async(req, res) => {
  req.session.destroy(() => {
      res.redirect("/login");
  });
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
      searchCard: searchCard,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard,
      user: req.session.user
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
      searchCard: searchCard,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard,
      user: req.session.user
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
      searchCard: searchCard,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard,
      user: req.session.user
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
      searchCard: searchCard,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard,
      user: req.session.user
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
      searchCard: searchCard,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.name.toLowerCase().includes(searchCard.toLowerCase()));
    res.render("index",{
      magicTheGathering: magicTheGatheringCards,
      searchCard: searchCard,
      user: req.session.user
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
      searchSet: searchSet,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.set.name.toLowerCase().includes(searchSet.toLowerCase()));
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet,
      user: req.session.user
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
      searchSet: searchSet,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.set.name.toLowerCase().includes(searchSet.toLowerCase()));
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet,
      user: req.session.user
    });
  }
});

app.get("/sets", async (req,res)=> {
  let searchSet : string = String(req.query.q || "");
  let magicTheGatheringCards = await main();
  if (!searchSet || searchSet.trim() === "" || searchSet == null) {
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet,
      user: req.session.user
    })
  } 
  else {
    magicTheGatheringCards = magicTheGatheringCards?.filter(magicTheGatheringCards => magicTheGatheringCards.set.name.toLowerCase().includes(searchSet.toLowerCase()));
    res.render("sets",{
      magicTheGathering: magicTheGatheringCards,
      searchSet: searchSet,
      user: req.session.user
    });
  }
});

app.listen(app.get("port"), async() => {
  try {
      await connect();
      console.log("Server started on http://localhost:" + app.get('port'));
  } catch (e) {
      console.log(e);
      process.exit(1); 
  }
});