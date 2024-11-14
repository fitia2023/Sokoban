import { MovePoint } from "./MovePoint.js"; 

export class Player extends MovePoint {

    constructor(x: number, y: number, color: string = "green") {
        super(x, y, color);
    } 

}
