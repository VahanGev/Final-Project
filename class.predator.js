var Himnakan = require("./himnakan.js");
PredCneliutyun = 0;
PredMahacutyun = 0;
PredEatCount = 0;
PredMoveCount = 0;
module.exports = class Gishatich extends Himnakan{
    constructor(x, y, index) {
        super(x,y,index,)
        this.energy = Math.round(Math.random() * 16);
        this.speed = 24;
        this.multiply = Math.round(Math.random() * 16);

    }
    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        return super.chooseCell(ch);
    }
    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    sharjvel() {
        var arr = this.yntrelVandak(0);
        var ran = arr[Math.floor(Math.random() * arr.length)];
        var vand = ran;
        if (vand && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 3;
        }
        PredMoveCount++;
    }

    utel() {
        this.energy--;
        var arr = this.yntrelVandak(2);
        var ran = arr[Math.floor(Math.random() * arr.length)];
        var vand = ran;
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed/2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 3;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
        else this.sharjvel();
        PredEatCount++;
    }

    bazmanal() {
        var arr = this.yntrelVandak(0);
        var ran = arr[Math.floor(Math.random() * arr.length)];
        var vand = ran;
        if (vand && this.energy >= this.speed) {
            this.energy = 1;
            var newgishatich = new Gishatich(vand[0], vand[1], 3);
            gishatichArr.push(newgishatich);
            PredCneliutyun++;
        }
    }

    mahanal() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    PredMahacutyun++;
                }
            }
        }
    }
}
