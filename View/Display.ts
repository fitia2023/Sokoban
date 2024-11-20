import Drawer from "./Drawer.js";
import { Game } from "../control/Game.js";


export class Display {
    private drawer: Drawer;

    constructor(width: number, height: number, scale: number = 10) {
        this.drawer = new Drawer(width, height, scale)
    }

    public refreshLevel(_level: number): void {
        let level: HTMLElement | null = document.getElementById("level");
        if (level != null) level.innerHTML = _level.toString();
    }

    public refreshScore(_score: number): void {
        let score: HTMLElement | null = document.getElementById("score");
        if (score != null) score.innerHTML = _score.toString();
    }

    public draw(game: Game): void {

        // effacer ancien affichage
        this.drawer.clear()

        // Affichage trou(s)
        game['holes'].forEach(hole => {
            this.drawer.drawRectangle(hole.getx(), hole.gety(), hole.getcolor())
        }) 

        // Affichage roche(s)
        game['rocks'].forEach(rock => {
            this.drawer.drawRectangle(rock.getx(), rock.gety(), rock.getcolor())
        })

        // Affichage du joueur
        const player = game['player']
        this.drawer.drawCircle(player.getx(), player.gety(), player.getcolor())

    }

}