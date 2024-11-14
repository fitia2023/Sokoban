import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10, speed = 100) {
        this.score = 0;
        this.drawer = new Drawer(width, height, scale);
        this.speed = speed;
    }
    refreshScore() {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = this.score.toString();
    }
    get_drawer() {
        return this.drawer;
    }
    draw(game) {
        this.drawer.clear();
        game.display_object();
    }
    play(game) {
        let lastchrono;
        let done = false;
        let loop = (chrono) => {
            if (!lastchrono)
                lastchrono = chrono;
            const delta = chrono - lastchrono;
            if (delta >= this.speed) {
                done = game.partie();
                this.score = game.get_score();
                this.refreshScore();
                lastchrono = chrono;
            }
            if (!done)
                requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
