import { DIRECTION } from "./DIRECTION.js";
import { Display } from "../View/Display.js";
import { Hole } from "../modele/Hole.js";
import { Player } from "../modele/Player.js";
import { Point } from "../modele/Point.js";
import { Rock } from "../modele/Rock.js";
import { Input_user } from "./Input.js";
export class Game {
    constructor(width, height, scale) {
        this.score = 0;
        this.level = 1;
        this.rocks = [];
        this.holes = [];
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.player = new Player(0, 0);
    }
    // Retourne le score actuel
    getScore() {
        return this.score;
    }
    // Déplace le joueur dans une direction donnée
    movePlayer(dir) {
        const target = this.calculateTarget(this.player, dir);
        const rock = this.getRockAt(target);
        const hole = this.getHoleAt(target);
        if (rock && this.moveRock(dir, rock)) {
            this.player.move(dir, this.width, this.height); // Déplacement après avoir poussé
        }
        else if ((hole === null || hole === void 0 ? void 0 : hole.get_isFilled()) || (!rock && !hole)) {
            this.player.move(dir, this.width, this.height); // Mouvement libre ou sur un trou bouché
        }
        if (this.allHolesFilled())
            this.advanceLevel();
        this.refreshDisplay();
    }
    // Déplace une roche dans une direction donnée
    moveRock(dir, rock) {
        const target = this.calculateTarget(rock, dir);
        const nextRock = this.getRockAt(target);
        const hole = this.getHoleAt(target);
        if ((hole === null || hole === void 0 ? void 0 : hole.get_isFilled()) || (!hole && !nextRock)) {
            rock.move(dir, this.width, this.height); // Mouvement simple
            return true;
        }
        if (hole && !hole.get_isFilled()) {
            rock.move(dir, this.width, this.height);
            this.fillHole(hole, rock); // Gérer trou rempli
            return true;
        }
        if (nextRock && this.moveRock(dir, nextRock)) {
            rock.move(dir, this.width, this.height); // Pousse la roche suivante
            return true;
        }
        return false; // Aucun mouvement possible
    }
    // Gère la logique d'un trou rempli par une roche
    fillHole(hole, rock) {
        hole.set_isFilled(true);
        hole.setcolor("gray");
        this.rocks = this.rocks.filter(r => r !== rock); // Supprimer la roche
        this.score++;
    }
    // Vérifie si tous les trous sont remplis
    allHolesFilled() {
        return this.holes.every(hole => hole.get_isFilled());
    }
    // Passe au niveau suivant
    advanceLevel() {
        this.level++;
        this.score = 0;
        this.setupLevel();
    }
    // Rafraîchit l'affichage
    refreshDisplay() {
        this.display.refreshLevel(this.level);
        this.display.refreshScore(this.score);
        this.display.draw(this);
    }
    // Génère une position vide aléatoire
    getEmptyPosition() {
        let point;
        do {
            point = new Point(this.randomBetween(0, this.width), this.randomBetween(0, this.height));
        } while (this.isOccupied(point));
        return point;
    }
    // Vérifie si une position est occupée
    isOccupied(point) {
        return (this.player.touch([point]) ||
            this.rocks.some(rock => rock.touch([point])) ||
            this.holes.some(hole => hole.touch([point])));
    }
    // Retourne une roche à une position donnée
    getRockAt(point) {
        return this.rocks.find(rock => rock.touch([point]));
    }
    // Retourne un trou à une position donnée
    getHoleAt(point) {
        return this.holes.find(hole => hole.touch([point]));
    }
    // Configure un nouveau niveau
    setupLevel() {
        this.player = new Player(this.getEmptyPosition().getx(), this.getEmptyPosition().gety());
        this.rocks = [];
        this.holes = [];
        for (let i = 0; i < this.level; i++) {
            this.holes.push(new Hole(this.getEmptyPosition().getx(), this.getEmptyPosition().gety()));
            this.rocks.push(new Rock(this.getEmptyPosition().getx(), this.getEmptyPosition().gety()));
        }
        this.refreshDisplay();
    }
    // Calcule la position cible en fonction d'une direction
    calculateTarget(entity, dir) {
        const x = entity.getx() + Number(dir === DIRECTION.RIGHT) - Number(dir === DIRECTION.LEFT);
        const y = entity.gety() + Number(dir === DIRECTION.DOWN) - Number(dir === DIRECTION.UP);
        return new Point(x, y);
    }
    // Retourne un nombre aléatoire entre min et max (exclu)
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    // Démarre le jeu
    play() {
        this.setupLevel();
        Input_user(this.movePlayer.bind(this));
    }
}
