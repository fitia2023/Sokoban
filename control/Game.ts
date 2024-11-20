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
    private holes: Hole[];

    constructor(width: number, height: number, scale: number) {
        this.display = new Display(width, height, scale);
        this.width = width;
        this.height = height;
        this.player = new Player(1, 1)
        this.rocks = [new Rock(2, 1)]
        this.holes = [new Hole(3, 1)]
    }

    public get_score(): number {
        return this.score;
    }

    public movePlayer(dir: DIRECTION): void {
        // Prochain position du player
        let newX = this.player.getx() + Number(dir == DIRECTION.RIGHT) - Number(dir == DIRECTION.LEFT)
        let newY = this.player.gety() + Number(dir == DIRECTION.DOWN) - Number(dir == DIRECTION.UP)

        // Si le player touche rocher
        let touch_rock = this.rocks.find(rock => rock.touch([new Point(newX, newY)]))

        // Si le player touche trou
        let touch_hole = this.holes.find(hole => hole.touch([new Point(newX, newY)]))

        // Deplacer le player
        if (touch_rock || touch_hole) {
            if (touch_hole?.get_isFilled()) {

                this.player.move(dir, this.width, this.height)

            } else if (touch_rock && touch_rock.move(dir, this.width, this.height)) {
                this.player.move(dir, this.width, this.height)

                // Si roche trouche trou
                if (touch_rock.touch_hole(this.holes)) {
                    touch_rock.touch_hole(this.holes)?.set_isFilled(true);
                    touch_rock.setcolor("gray");
                    this.score++
                    //   Verifie si tous les trous sont bouche
                    if (this.all_filled()) {
                        console.log("tous les trous sont bouche")
                    }
                }
            }
        } else {
            this.player.move(dir, this.width, this.height)
        }


        this.refrechDisplay()

    }

    public all_filled(): boolean {
        return this.holes.some(hole => hole.get_isFilled() == true)
    }

    public refrechDisplay() {
        this.display.refrechLevel(this.level)
        this.display.refreshScore(this.score)
        this.display.draw(this)
    }

    public play(): void {
        this.refrechDisplay()
        Input_user(this.movePlayer.bind(this))
    }
}
