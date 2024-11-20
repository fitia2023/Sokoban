import { DIRECTION } from "./DIRECTION.js";
import { Display } from "../View/Display.js";
import { Hole } from "../modele/Hole.js";
import { Player } from "../modele/Player.js";
import { Point } from "../modele/Point.js";
import { Rock } from "../modele/Rock.js";
import { Input_user } from "./Input.js";

function random_max(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export class Game {
    private width: number;
    private height: number;
    private score: number = 0;
    private level: number = 1;
    private display: Display; 
    private player: Player;
    private rocks: Rock[];
    private holes:Hole[];

    constructor(width: number, height: number, scale: number) {
        this.display = new Display(width, height, scale);
        this.width = width;
        this.height = height;
        this.player = new Player(1,1)
        this.rocks = [new Rock(2,1)]
        this.holes = [new Hole(3,1)]
    }

    public get_score(): number {
        return this.score;
    }

    public play(): void {
        this.display.refrechLevel(this.level)
        this.display.refreshScore(this.score) 
        this.display.draw(this) 
    }
}
