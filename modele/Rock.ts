import { Hole } from "./Hole.js";
import { MovePoint } from "./MovePoint.js";

export class Rock extends MovePoint {
    private inHole: boolean = false;

    constructor(x: number, y: number, color: string = "red") {
        super(x, y, color);
    }

    public touch_hole(holes: Hole[]): Hole | undefined {
        return holes.find(h => h.touch([this]))
    }
}

