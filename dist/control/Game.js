import { DIRECTION } from "./DIRECTION.js";
import { Display } from "../View/Display.js";
import { Hole } from "../modele/Hole.js";
import { Player } from "../modele/Player.js";
import { Point } from "../modele/Point.js";
import { Rock } from "../modele/Rock.js";
import { Input_user } from "./Input.js";
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
    movePlayer(dir) {
        var _a;
        // Prochain position du player
        let newX = this.player.getx() + Number(dir == DIRECTION.RIGHT) - Number(dir == DIRECTION.LEFT);
        let newY = this.player.gety() + Number(dir == DIRECTION.DOWN) - Number(dir == DIRECTION.UP);
        // Si le player touche rocher
        let touch_rock = this.rocks.find(rock => rock.touch([new Point(newX, newY)]));
        // Si le player touche trou
        let touch_hole = this.holes.find(hole => hole.touch([new Point(newX, newY)]));
        // Deplacer le player
        if (touch_rock || touch_hole) {
            if (touch_hole === null || touch_hole === void 0 ? void 0 : touch_hole.get_isFilled()) {
                this.player.move(dir, this.width, this.height);
            }
            else if (touch_rock && touch_rock.move(dir, this.width, this.height)) {
                this.player.move(dir, this.width, this.height);
                // Si roche trouche trou
                if (touch_rock.touch_hole(this.holes)) {
                    (_a = touch_rock.touch_hole(this.holes)) === null || _a === void 0 ? void 0 : _a.set_isFilled(true);
                    touch_rock.setcolor("gray");
                    this.score++;
                    //   Verifie si tous les trous sont bouche
                    if (this.all_filled()) {
                        console.log("tous les trous sont bouche");
                    }
                }
            }
        }
        else {
            this.player.move(dir, this.width, this.height);
        }
        this.refrechDisplay();
    }
    all_filled() {
        return this.holes.some(hole => hole.get_isFilled() == true);
    }
    refrechDisplay() {
        this.display.refrechLevel(this.level);
        this.display.refreshScore(this.score);
        this.display.draw(this);
    }
    play() {
        this.refrechDisplay();
        Input_user(this.movePlayer.bind(this));
    }
}
