import express from "express";
import ejs from "ejs";

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);

app.get("/",(req,res)=>{
    res.render("index")
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);