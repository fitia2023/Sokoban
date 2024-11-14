import { Point } from "./Point.js";
export class Hole extends Point {
    constructor(x, y, color = "black") {
        super(x, y, color);
        this.isFilled = false;
    }
    set_isFilled(isFilled) {
        this.isFilled = isFilled;
    }
    get_isFilled() {
        return this.isFilled;
    }
}
