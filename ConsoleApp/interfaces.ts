import mtgCards from "../JSON/mtg.json";
import { ObjectId } from "mongodb";

export interface MagicTheGatheringCards {
    id:               number;
    name:             string;
    description:      string;
    price:            number;
    legalInCommander: boolean;
    date:             Date;
    image:            string;
    color:            string;
    types:            string[];
    set:              Set;
}

export interface Set {
    id:      number;
    name:    string;
    code:    string;
    release: Date;
    image:   string;
}

export interface User {
    _id?: ObjectId;
    email: string;
    password?: string;
    role: "ADMIN" | "USER";
}

export interface FlashMessage {
    type: "error" | "success"
    message: string;
}

export interface SessionData {
    user?: User;
    message?: FlashMessage;
}