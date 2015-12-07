var num = 10;
var matrix = [];
var matrixNew = [];

var width = 0; 
var height = 0;

function init() {
    var canvas = document.getElementById("life");
    canvas.width = canvas.height = 500; 
	var context = canvas.getContext("2d");
    
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        newRect(canvas, mousePos);
      }, false);
    
    width = canvas.width / num; 
    height = canvas.height / num;
    
    fieldDrawing(canvas);
    matrixInit();
}

function fieldDrawing(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#000";
    for (var i = 0; i <= num; i++)
    {
        context.moveTo(i * width, 0);
        context.lineTo(i * width, canvas.height);
        
        context.moveTo(0, i * height);
        context.lineTo(canvas.width,i * height);
    }
    context.stroke();
}

function matrixInit() {
    for (var i = 0; i < num; i++)
    {
        matrix[i] = [];
        matrixNew[i] = [];
        for (var j = 0; j < num; j++)
        {
            matrix[i][j] = false;
            matrixNew[i][j] = false;
        }
    }
}

function next_step() {
    var canvas = document.getElementById("life");
    var context = canvas.getContext("2d");
    mainMech();
    draw(canvas);
}

function cleaning() {
    var canvas = document.getElementById("life");
    var context = canvas.getContext("2d");
    fieldDrawing(canvas);
    matrixInit();
}

function draw(canvas) {
    var context = canvas.getContext("2d");
    for (var i = 0; i < num; i++)
        for (var j = 0; j < num; j++)
        {
            if (matrix[i][j])
                context.fillRect(x*50+1,y*50+1,48,48);
        }
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function newRect(canvas,mousePos) {
    var context = canvas.getContext("2d");
    var x = Math.floor(mousePos.x/50);
    var y = Math.floor(mousePos.y/50);
    matrix[x][y] = !matrix[x][y];
    if (matrix[x][y])
        context.fillRect(x*50+1,y*50+1,48,48);
    else
        context.clearRect(x*50+1,y*50+1,48,48);
}

function mainMech() {
    
    for (var i =  0; i < num; i++)
        for (var j = 0; j < num; j++)
        {
            var localX = i - 1;
            var localY = j - 1;
            matrixNew[i][j] = lifeOrDie(localX, localY);
        }
    console.log("firstly");
    for (var i = 0; i < num; i++)
        console.log(matrix[i].join(" "));
    for (var i = 0; i < num; i++)
        console.log(matrixNew[i].join(" "));
    
    for (var i = 0; i < num; i++)
        for (var j = 0; j < num; j++)
            matrix[i][j] = matrixNew[i][j];
    
    console.log("secondly");
    for (var i = 0; i < num; i++)
        console.log(matrix[i].toString());
    for (var i = 0; i < num; i++)
        console.log(matrixNew[i].toString());
        
}
    
function lifeOrDie(x,y) {
    var counter = 0;
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (matrix[realValue(x+i)][realValue(y+j)]) counter++;
    if (matrix[x+1][y+1]) counter--;
    
    return (counter == 3 || 
            (matrix[x+1][y+1] && counter == 2))
}

function realValue(value) {
    if (value = -1)
        return num - 1;
    if (value == num)
        return 0; 
    return value
}