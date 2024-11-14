import { Point } from "./Point.js";

export class Hole extends Point {

    private isFilled: boolean;

    constructor(x: number, y: number, color: string = "black") {
        super(x, y, color)
        this.isFilled = false;
    }
    public set_isFilled(isFilled: boolean) {
        this.isFilled = isFilled
    }
    public get_isFilled(): boolean {
        return this.isFilled;
    }

}