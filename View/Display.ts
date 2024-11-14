import Drawer from "./Drawer.js";
import { Game } from "../control/Game.js";  


export class Display {
    private score: number = 0
    private drawer: Drawer;
    private speed: number;


    constructor(width: number, height: number, scale: number = 10, speed: number = 100) {
        this.drawer = new Drawer(width, height, scale)
        this.speed = speed
    }

    public refreshScore() {
        let score: HTMLElement | null = document.getElementById("score");
        if (score != null) score.innerHTML = this.score.toString();
    }

    public get_drawer(): Drawer {
        return this.drawer
    }

    public draw(game: Game): void {
        this.drawer.clear();
        game.display_object();
    }
        

    public play(game: Game): void {
        let lastchrono: any;
        let done: boolean = false
        let loop = (chrono: number) => {
            if (!lastchrono) lastchrono = chrono;

            const delta = chrono - lastchrono;
            if (delta >= this.speed) {
                done = game.partie()
                this.score = game.get_score()
                this.refreshScore()
                lastchrono = chrono;
            }

            if (!done) requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }
}