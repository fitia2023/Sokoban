import { DIRECTION } from "./DIRECTION.js";
import { Display } from "../View/Display.js";
import { Hole } from "../modele/Hole.js";
import { Player } from "../modele/Player.js";
import { Point } from "../modele/Point.js";
import { Rock } from "../modele/Rock.js";
function random_max(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
export class Game {
    constructor(width, height, scale, speed = 100) {
        this.score = 2;
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.speed = speed;
        this.player = new Player(random_max(0, width), random_max(0, height));
        this.rocks = [];
        this.holes = [];
        this.create_rockhole();
    }
    initialize() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.step(DIRECTION.UP);
                    break;
                case 'ArrowDown':
                    this.step(DIRECTION.DOWN);
                    break;
                case 'ArrowLeft':
                    this.step(DIRECTION.LEFT);
                    break;
                case 'ArrowRight':
                    this.step(DIRECTION.RIGHT);
                    break;
            }
        });
    }
    get_empty_pos(min, max) {
        while (true) {
            let pos = new Point(random_max(min, max), random_max(min, max));
            if (!this.player.touch([pos])) {
                let is_good = true;
                for (let r of this.rocks) {
                    if (r.touch([pos])) {
                        is_good = false;
                        break;
                    }
                }
                for (let h of this.holes) {
                    if (h.touch([pos])) {
                        is_good = false;
                        break;
                    }
                }
                if (is_good)
                    return pos;
            }
        }
    }
    display_object() {
        // Holes
        this.holes.forEach(hole => {
            this.display.get_drawer().drawRectangle(hole.getx(), hole.gety(), hole.getcolor());
        });
        // Rocks
        this.rocks.forEach(rock => {
            this.display.get_drawer().drawRectangle(rock.getx(), rock.gety(), rock.getcolor());
        });
        //Player
        this.display.get_drawer().drawCircle(this.player.getx(), this.player.gety(), this.player.getcolor());
    }
    step(dir) {
        const nextX = this.player.getx() + Number(dir === DIRECTION.RIGHT) - Number(dir === DIRECTION.LEFT);
        const nextY = this.player.gety() + Number(dir === DIRECTION.DOWN) - Number(dir === DIRECTION.UP);
        // Vérifier si la prochaine position est un trou
        const isNextPositionHole = this.holes.find(hole => hole.getx() === nextX && hole.gety() === nextY);
        // Vérifier si la prochaine position est un rocher
        const isNextPositionRock = this.rocks.find(rock => rock.getx() === nextX && rock.gety() === nextY);
        // Déplacer le joueur seulement s'il ne marche pas dans un trou non-bouché
        if (!isNextPositionHole || isNextPositionHole.get_isFilled()) {
            if (isNextPositionRock) {
                // Déplacer le rocher s'il est dans la direction du joueur et que son mouvement est possible
                if (isNextPositionRock.move(dir, this.width, this.height)) {
                    this.player.move(dir, this.width, this.height);
                }
            }
            else {
                this.player.move(dir, this.width, this.height);
            }
        }
        // Collision de rocher et trou
        this.rocks = this.rocks.filter(rock => {
            let hole = rock.touch_hole(this.holes);
            if (hole && !hole.get_isFilled()) {
                // Marquer le trou comme bouché
                hole.set_isFilled(true);
                hole.setcolor('gray');
                // Retirer le rocher en excluant de rocks 
                return false;
            }
            return true;
        });
        // Vérifier si tous les trous sont bouchés
        const allHolesFilled = this.holes.every(hole => hole.get_isFilled());
        if (allHolesFilled) {
            this.score++;
            this.create_rockhole();
        }
    }
    get_score() {
        return this.score;
    }
    partie() {
        this.display.draw(this);
        return false;
    }
    create_rockhole() {
        this.rocks = [];
        this.holes = [];
        for (let i = 0; i < this.score; i++) {
            let pos_rock = this.get_empty_pos((this.height - this.height) + 1, this.width - 1);
            this.rocks.push(new Rock(pos_rock.getx(), pos_rock.gety()));
            let pos_hole = this.get_empty_pos((this.height - this.height), this.width);
            this.holes.push(new Hole(pos_hole.getx(), pos_hole.gety()));
        }
    }
    play() {
        this.display.play(this);
    }
}
