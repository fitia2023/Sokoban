import { DIRECTION } from "./DIRECTION.js";
import { Display } from "../View/Display.js";
import { Hole } from "../modele/Hole.js";
import { Player } from "../modele/Player.js";
import { Point } from "../modele/Point.js";
import { Rock } from "../modele/Rock.js";
import { Input_user } from "./Input.js";

export class Game {
    private width: number;
    private height: number;
    private score: number = 0;
    private level: number = 1;
    private display: Display;

    private player: Player;
    private rocks: Rock[] = [];
    private holes: Hole[] = [];

    constructor(width: number, height: number, scale: number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.player = new Player(0, 0);
    }

    // Retourne le score actuel
    public getScore(): number {
        return this.score;
    }

    // Déplace le joueur dans une direction donnée
    private movePlayer(dir: DIRECTION): void {
        const target = this.calculateTarget(this.player, dir);
        const rock = this.getRockAt(target);
        const hole = this.getHoleAt(target);

        if (rock && this.moveRock(dir, rock)) {
            this.player.move(dir, this.width, this.height); // Déplacement après avoir poussé
        } else if (hole?.get_isFilled() || (!rock && !hole)) {
            this.player.move(dir, this.width, this.height); // Mouvement libre ou sur un trou bouché
        }

        if (this.allHolesFilled()) this.advanceLevel();
        this.refreshDisplay();
    }

    // Déplace une roche dans une direction donnée
    private moveRock(dir: DIRECTION, rock: Rock): boolean {
        const target = this.calculateTarget(rock, dir);
        const nextRock = this.getRockAt(target);
        const hole = this.getHoleAt(target);

        if (hole?.get_isFilled() || (!hole && !nextRock)) {
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
    private fillHole(hole: Hole, rock: Rock): void {
        hole.set_isFilled(true);
        hole.setcolor("gray");
        this.rocks = this.rocks.filter(r => r !== rock); // Supprimer la roche
        this.score++;
    }

    // Vérifie si tous les trous sont remplis
    private allHolesFilled(): boolean {
        return this.holes.every(hole => hole.get_isFilled());
    }

    // Passe au niveau suivant
    private advanceLevel(): void {
        this.level++;
        this.score = 0;
        this.setupLevel();
    }

    // Rafraîchit l'affichage
    private refreshDisplay(): void {
        this.display.refreshLevel(this.level);
        this.display.refreshScore(this.score);
        this.display.draw(this);
    }

    // Génère une position vide aléatoire
    private getEmptyPosition(): Point {
        let point: Point;
        do {
            point = new Point(this.randomBetween(0, this.width), this.randomBetween(0, this.height));
        } while (this.isOccupied(point));
        return point;
    }

    // Vérifie si une position est occupée
    private isOccupied(point: Point): boolean {
        return (
            this.player.touch([point]) ||
            this.rocks.some(rock => rock.touch([point])) ||
            this.holes.some(hole => hole.touch([point]))
        );
    }

    // Retourne une roche à une position donnée
    private getRockAt(point: Point): Rock | undefined {
        return this.rocks.find(rock => rock.touch([point]));
    }

    // Retourne un trou à une position donnée
    private getHoleAt(point: Point): Hole | undefined {
        return this.holes.find(hole => hole.touch([point]));
    }

    // Configure un nouveau niveau
    private setupLevel(): void {
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
    private calculateTarget(entity: { getx: () => number; gety: () => number }, dir: DIRECTION): Point {
        const x = entity.getx() + Number(dir === DIRECTION.RIGHT) - Number(dir === DIRECTION.LEFT);
        const y = entity.gety() + Number(dir === DIRECTION.DOWN) - Number(dir === DIRECTION.UP);
        return new Point(x, y);
    }

    // Retourne un nombre aléatoire entre min et max (exclu)
    private randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Démarre le jeu
    public play(): void {
        this.setupLevel();
        Input_user(this.movePlayer.bind(this));
    }
}
