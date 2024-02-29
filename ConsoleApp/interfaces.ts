import mtgCards from "../JSON/mtg.json";

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