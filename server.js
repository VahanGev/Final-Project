var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require("socket.io")
var io = socket(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});



server.listen(3000);

matrix = [];
Weather = "Garun";
WeatherInt = 1;
Blood_Moon = "Finish";
Blood_Int = 1;

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
EatgrassING = [];
PredING = [];
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
        if (Weather != "Dzmer") {
            grassArr[i].mul();
        }
    }

    for (var i in xotakerArr) {
        xotakerArr[i].bazmanal();
        xotakerArr[i].utel();
        if (Weather == "Dzmer") {
            xotakerArr[i].mahanal();
        }
    }

    for (var i in gishatichArr) {
        if (Weather != "Dzmer") {
            gishatichArr[i].utel();
        }
        gishatichArr[i].bazmanal();
        gishatichArr[i].mahanal();
    }
    io.sockets.emit("matrix", matrix);

}

function ChangeWeather() {
    WeatherInt++;
    if (WeatherInt == 5) {
        WeatherInt = 1;
    }
    if (WeatherInt == 1) {
        Weather = "Garun";
    }
    if (WeatherInt == 2) {
        Weather = "Amar";
    }
    if (WeatherInt == 3) {
        Weather = "Ashun";
    }
    if (WeatherInt == 4) {
        Weather = "Dzmer";
    }
    console.log("[Broadcasting] - Weather now is: " + Weather);
    io.sockets.emit("exanak", Weather);

}

function Blood_moon() {
    Blood_Int++;
    if (Blood_Int == 1) {
        Blood_Moon = "Finish";
        console.log("[Warning] - Blood moon has finished");
    }
    if (Blood_Int == 2) {
        Blood_Moon = "Start";
        console.log("[Warning] - Blood moon is coming");

        for (var i in xotakerArr) {
            matrix[xotakerArr[i].y][xotakerArr[i].x] = 0;
        }
        EatgrassING = xotakerArr;
        xotakerArr = [];
        for (var i in gishatichArr) {
            matrix[gishatichArr[i].y][gishatichArr[i].x] = 0;
        }
        PredING = gishatichArr;
        gishatichArr = [];

    }
    if (Blood_Int == 3) {
        Blood_Int = 1;
        Blood_Moon = "Finish";
        console.log("[Warning] - Blood moon has finished");
        gishatichArr = PredING;
        xotakerArr = EatgrassING;
    }
    io.sockets.emit("event", Blood_Moon);
}

setInterval(drawUrish, 200);
setInterval(function(){
    ChangeWeather();
    Blood_moon();
}, 5000);

io.sockets.on('connection', function (socket) {
    console.log("New connection: " + socket.id);
});

setTimeout(function () {
    var file1 = "predator.json";
    fs.appendFileSync(file1, 'var predator = \n{\n"Spawns": ' + PredCneliutyun + ',\n "Deaths": ' + PredMahacutyun + ',\n "Ate": ' + PredEatCount + ',\n"Move counter": ' + PredMoveCount + '\n}');
    var file3 = "grasseater.json";
    fs.appendFileSync(file3, 'var grassEater = \n{\n"Spawns": ' + GrassEatCneliutyun + ',\n "Deaths": ' + GrassEatMahacutyun + ',\n "Ate": ' + GrassEaterEatCount + ',\n"Move counter": ' + GrassEatMoveCount + '\n}');
}, 5000);

setTimeout(function () {
    var file2 = "grass.json";
    fs.appendFileSync(file2, 'var grass = \n{\n"Spawns": ' + GrassCneliutyun + '\n}');
}, 10000);