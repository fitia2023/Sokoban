import { MovePoint } from "./MovePoint.js";
export class Rock extends MovePoint {
    constructor(x, y, color = "red") {
        super(x, y, color);
        this.inHole = false;
    }
    touch_hole(holes) {
        return holes.find(h => h.touch([this]));
    }
}
