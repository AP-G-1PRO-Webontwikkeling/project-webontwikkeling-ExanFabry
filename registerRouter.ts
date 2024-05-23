import express from "express";
import { addUser } from "./database";
import { User } from "./ConsoleApp/interfaces";

const router = express.Router();
const user : User | null = null;

export function registerRouter() {
    router.get("/", async (req, res) => {
        res.render("register", {
            title: "Registreer",
            user: req.session.user
        });
    });
    router.post("/createNewAccount", (req, res) => {
        const email : string = req.body.username;
        const password : string = req.body.password;

        addUser(email, password);
        res.render("login", {
            title: "Login",
            user: user
        });
    });
    return router;
}