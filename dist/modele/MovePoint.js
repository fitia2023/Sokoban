import { DIRECTION } from "../control/DIRECTION.js";
import { Point } from "./Point.js";
export class MovePoint extends Point {
    constructor(x, y, color = "blue") {
        super(x, y, color);
    }
    move(dir, boardWidth, boardHeight) {
        // Calcul de la prochaine position
        const newX = this.x + Number(dir === DIRECTION.RIGHT) - Number(dir === DIRECTION.LEFT);
        const newY = this.y + Number(dir === DIRECTION.DOWN) - Number(dir === DIRECTION.UP);
        // Vérifier les limites du bord
        if (newX >= 0 && newX < boardWidth && newY >= 0 && newY < boardHeight) {
            this.x = newX;
            this.y = newY;
            return true;
        }
        return false;
    }
    nextPosition(dir) {
        return new Point(this.x + Number(dir === DIRECTION.RIGHT) - Number(dir === DIRECTION.LEFT), this.y + Number(dir === DIRECTION.DOWN) - Number(dir === DIRECTION.UP));
    }
}
