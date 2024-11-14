export class Point {

    protected x: number

    protected y: number

    protected color: string

    constructor(x: number, y: number, color: string = "red") {

        this.x = x

        this.y = y

        this.color = color

    }

    public getx(): number {
        return this.x
    }

    public gety(): number {
        return this.y
    }
    public setcolor(color: string) {
        this.color = color
    }

    public getcolor(): string {
        return this.color
    }

    public touch(otherPoints: Point[]): boolean {
        for (let p of otherPoints) {
            if (this.x === p.getx() && this.y === p.gety()) return true;
        }
        return false;
    }


}