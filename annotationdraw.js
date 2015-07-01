/**
 * Created by Yu on 30/06/2015.
 */

var canvas;
var context;
var canvasWidth;
var canvasHeight;

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var penColor = "#df4b26";
var curColor = penColor;
var clickColor = new Array();

var clickSize = new Array();
var curSize = "normal";

var clickTool = new Array();
var curTool = "crayon";
var crayonTextureImage = new Image();

var n = 1;

var drawingAreaX = 0;
var drawingAreaY = 0;
var drawingAreaWidth = 0;
var drawingAreaHeight = 0;

var textarea = null;
var c;


function prepareCanvas() {
    var canvasDiv = document.getElementById('canvasDiv');


    canvas = document.createElement('canvas');

    console.log(document.getElementById('canvasDiv').style.zIndex);
    canvasWidth = $('#canvasDiv').width();
    console.log(canvasWidth);
    canvasHeight = $('#canvasDiv').height();
    console.log(canvasHeight);

    ////////
    //drawingAreaX = canvasDiv.offsetLeft;
    //drawingAreaY = canvasDiv.offsetTop;
    console.log('x: ' + drawingAreaX);
    console.log('y: ' + drawingAreaY);
    drawingAreaWidth = canvasWidth;
    drawingAreaHeight = canvasHeight;
    ////////

    var elem = document.getElementById('canvasDiv');
    var child = elem.childNodes[n];
    var canvaszindex = parseInt(child.style.zIndex) + 1;
    console.log('canvaszindex' + canvaszindex);

    //    ++canvaszindex;
    //console.log(canvaszindex);
    //$(canvas).css('zIndex', 1000);


    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    //canvas.setAttribute('width', window.innerWidth);
    //canvas.setAttribute('height', window.innerHeight);
    console.log(window.innerWidth);

    canvas.setAttribute('style', 'margin: 0; padding: 0; position: absolute;')
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    document.getElementById('canvas').style.zIndex = canvaszindex;
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        if (curTool != "textEditor") {
            paint = true;
            addClick(mouseX, mouseY, false);
            redraw();
        }

    });

    //c = document.getElementById('canvas');
    canvas.addEventListener('click', function (e) {
        if (curTool == 'textEditor') {
            if (!textarea) {
                console.log('closer!!!');
                textarea = document.createElement('textarea');
                textarea.className = 'info';
                textarea.style.zIndex = 100;
                textarea.style.width = "100 px";
                textarea.style.height = "100px";

                canvas.appendChild(textarea);
            }
            var x = e.clientX - canvas.offsetLeft,
                y = e.clientY - canvas.offsetTop;
            textarea.value = "x: " + x + " y: " + y;
            textarea.style.top = e.clientY + 'px';
            textarea.style.left = e.clientX + 'px';
        }
    }, false);


    $('#canvas').mousemove(function (e) {
        if (paint == true) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });


    $('#canvas').mouseup(function (e) {
        paint = false;
        redraw();
    });

    //$('#canvas').mouseleave(function(e){
    //    //paint = false;
    //});


}


function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);

    if (curTool == "eraser") {
        clickColor.push("white");
    }
    if (curTool == 'crayon') {
        clickColor.push(curColor);
    }

    clickSize.push(curSize);
}

// Clear Canvas
$(document).ready(function () {
    $("#clearCanvas").click(function () {
        clear();
    });
});


$(document).ready(function () {
    //Change Pen Color
    $("#bluePen").click(function () {
        curColor = "#0000CC";
        curTool = "crayon";
    });
    $("#purplePen").click(function () {
        curColor = "#cb3594";
        curTool = "crayon";
    });
    $("#redPen").click(function () {
        curColor = "#df4b26";
        curTool = "crayon";
    });

    //Change Size
    $("#chooseSmallSimpleTools").click(function () {
        curSize = "small";
    });
    $("#chooseNormalSimpleSizes").click(function () {
        curSize = "normal";
    });
    $("#chooseLargeSimpleTools").click(function () {
        curSize = "large";
    });
    $("#chooseHugeSimpleTools").click(function () {
        curSize = "huge";
    });

    //Change Tool
    $("#chooseEraser").click(function () {
        curTool = "eraser";
    });
    $("#choosePen").click(function () {
        curTool = "crayon";
    });
    $("#textEditor").click(function () {
        curTool = "textEditor";
        paint = false;
    });


});


function clear() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX.length = 0;
    clickY.length = 0;
    clickDrag.length = 0;
    clickColor.length = 0;
    clickSize.length = 0;
    clickTool.length = 0;

}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    //context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    //context.lineWidth = 5;

    // Keep the drawing in the drawing area
    context.save();
    context.beginPath();
    console.log("hereX: " + drawingAreaX);
    context.rect(drawingAreaX, drawingAreaY, drawingAreaX + drawingAreaWidth, drawingAreaHeight);
    context.clip();

    var radius;
    var i = 0;
    for (; i < clickX.length; i++) {

        if (clickSize[i] == "small") {
            radius = 2;
        } else if (clickSize[i] == "normal") {
            radius = 5;
        } else if (clickSize[i] == "large") {
            radius = 10;
        } else if (clickSize[i] == "huge") {
            radius = 20;
        } else {
            alert("Error: Radius is zero for click " + i);
            radius = 0;
        }


        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = radius;
        context.stroke();
        if (curTool == "crayon") {
            context.globalAlpha = 0.4;
            context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
        }
        context.globalAlpha = 1;
    }
    context.restore();
}

//canvas.addEventListener('click', function (e) {
//    if(curTool == 'textEditor') {
//        if (!textarea) {
//            textarea = document.createElement('textarea');
//            textarea.className = 'info';
//            document.body.appendChild(textarea);
//            var x = e.clientX - canvas.offsetLeft,
//                y = e.clientY - canvas.offsetTop;
//            textarea.value = "x: " + x + " y: " + y;
//            textarea.style.top = e.clientY + 'px';
//            textarea.style.left = e.clientX + 'px';
//        }
//    }
//}, false);
