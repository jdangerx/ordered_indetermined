function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.toString() {
    return "(" + this.x + ", " + this.y + ")";
}

Vector.prototype.add(v) {
    if (typeof v != "Vector") {
        return this.tostring() + ".add: expected vector";
    } else {
        return new Vector(this.x+v.x, this.y+v.y);
    }
}

Vector.prototype.negative() {
    
