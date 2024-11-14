export class Point {
    constructor(x, y, color = "red") {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    getx() {
        return this.x;
    }
    gety() {
        return this.y;
    }
    setcolor(color) {
        this.color = color;
    }
    getcolor() {
        return this.color;
    }
    touch(otherPoints) {
        for (let p of otherPoints) {
            if (this.x === p.getx() && this.y === p.gety())
                return true;
        }
        return false;
    }
}
