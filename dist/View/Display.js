import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10) {
        this.drawer = new Drawer(width, height, scale);
    }
    refreshLevel(_level) {
        let level = document.getElementById("level");
        if (level != null)
            level.innerHTML = _level.toString();
    }
    refreshScore(_score) {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = _score.toString();
    }
    draw(game) {
        // effacer ancien affichage
        this.drawer.clear();
        // Affichage trou(s)
        game['holes'].forEach(hole => {
            this.drawer.drawRectangle(hole.getx(), hole.gety(), hole.getcolor());
        });
        // Affichage roche(s)
        game['rocks'].forEach(rock => {
            this.drawer.drawRectangle(rock.getx(), rock.gety(), rock.getcolor());
        });
        // Affichage du joueur
        const player = game['player'];
        this.drawer.drawCircle(player.getx(), player.gety(), player.getcolor());
    }
}
