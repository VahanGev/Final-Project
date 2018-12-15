var socket;
socket = io.connect('http://localhost:3000');
var side = 24;
var w = 30;
var h = 30;
Weather = "Garun";
WeatherInt = 1;
function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
}

function drawMatrix(matrix) {
    background("#acacac");
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if(Weather == "Dzmer") {
                   fill("white"); 
                } else {
                    fill("green");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("gray");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

function ChangeWeather() {
    WeatherInt++;
    if(WeatherInt == 5) {  
        WeatherInt = 1;
    }
    if(WeatherInt == 1) {
        Weather = "Garun";
        console.log("Garun");
    }
    if(WeatherInt == 2) {
        Weather = "Amar";
        console.log("Amar");
    }
    if(WeatherInt == 3) {
        Weather = "Ashun";
        console.log("Ashun");
    }
    if(WeatherInt == 4) {
        Weather = "Dzmer";
        console.log("Dzmer");
    }
}

setInterval(ChangeWeather, 5000);



socket.on("matrix", drawMatrix);