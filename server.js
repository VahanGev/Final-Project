var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io")
var io = socket(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});



server.listen(3000);

matrix = [];



function genMatrix(w, h) {
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.round(Math.random() * 115);
            if (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            else if (r < 115) r = 4;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

var Grass = require("./class.grass.js");
var Rock = require("./class.rock.js");
var Gishatich = require("./class.predator.js");
var Xotaker = require("./class.eatgrass.js");
var Himnakan = require("./himnakan.js");
var w = 30;
var h = 30;
grassArr = [], xotakerArr = [], gishatichArr = [], rockArr = [];

matrix = genMatrix(w, h);
for (var y in matrix) {
    for (var x in matrix[y]) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x * 1, y * 1, 1));
        }
        else if (matrix[y][x] == 2) {
            xotakerArr.push(new Xotaker(x * 1, y * 1, 2));
        }
        else if (matrix[y][x] == 3) {
            gishatichArr.push(new Gishatich(x * 1, y * 1, 3))
        }
        else if (matrix[y][x] == 4) {
            rockArr.push(new Rock(x * 1, y * 1, 4))
        }
    }
}


function drawUrish() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in xotakerArr) {
        xotakerArr[i].bazmanal();
        xotakerArr[i].utel();
        xotakerArr[i].mahanal();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].bazmanal();
        gishatichArr[i].utel();
        gishatichArr[i].mahanal();
    }
    io.sockets.emit("matrix", matrix);

}



setInterval(drawUrish, 200);

io.sockets.on('connection', function (socket) {
});