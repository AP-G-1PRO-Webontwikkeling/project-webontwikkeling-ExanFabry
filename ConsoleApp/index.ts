import readline from 'readline-sync';
import { MagicTheGatheringCards } from './interfaces';
import { Set } from './interfaces';

async function Main() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ExanFabry/Projectopdracht/master/JSON/mtg.json');
        const magicTheGatheringCards: MagicTheGatheringCards[] = await response.json();
        let exitLoop = false;

        do {
            console.log("1: View all data")
            console.log("2: Filter by data")
            console.log("3: Exit")
            let input: string = readline.question("What option do you pick: ");
            if (input == "1") {
                for (let i = 0; i < magicTheGatheringCards.length; i++) {
                    console.log(`Name: ${magicTheGatheringCards[i].name} Id: ${magicTheGatheringCards[i].id}`);
                }
            }
            else if (input == "2") {
                let inputId: number = +(readline.question("What id do you pick: "));


                let card: MagicTheGatheringCards | undefined = magicTheGatheringCards.find(mtg => mtg.id == inputId);
                if (card !== undefined) {
                    console.log(`Id: ${card.id}`);
                    console.log(`Name: ${card.name}`);
                    console.log(`Description: ${card.description}`);
                    console.log(`Price: ${card.price}`);
                    if (card.legalInCommander === true) {
                        console.log("Legal in commander");
                    }
                    else if (card.legalInCommander === false) {
                        console.log("Not legal in commander");
                    }
                    console.log(`Releasedate: ${card.date}`);
                    console.log(`Color: ${card.color}`);
                    for (let i = 0; i < card.types.length; i++) {

                        console.log(`Type: ${card.types[i]}`);
                    }
                    console.log(`Set: ${card.set.name}`);
                    console.log(`Setcode: ${card.set.code}`);
                    console.log(`Releasedate set: ${card.set.release}`);
                }
                else{
                    console.log("Card not found")
                }
            }
            else if (input == "3") {
                exitLoop = true;
            }
            else {
                console.log("Foute invoer!")
            }
        } while (exitLoop === false)
    } catch (error: any) {
        console.log(error);
    }
};

Main();

export { }