import { MovePoint } from "./MovePoint.js";
export class Player extends MovePoint {
    constructor(x, y, color = "green") {
        super(x, y, color);
    }
}
