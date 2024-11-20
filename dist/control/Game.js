import { Display } from "../View/Display.js";
import { Hole } from "../modele/Hole.js";
import { Player } from "../modele/Player.js";
import { Rock } from "../modele/Rock.js";
function random_max(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
export class Game {
    constructor(width, height, scale) {
        this.score = 0;
        this.level = 1;
        this.display = new Display(width, height, scale);
        this.width = width;
        this.height = height;
        this.player = new Player(1, 1);
        this.rocks = [new Rock(2, 1)];
        this.holes = [new Hole(3, 1)];
    }
    get_score() {
        return this.score;
    }
    play() {
        this.display.refrechLevel(this.level);
        this.display.refreshScore(this.score);
        this.display.draw(this);
    }
}
