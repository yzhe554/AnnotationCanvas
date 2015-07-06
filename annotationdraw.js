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
var textareaArray = new Array();
var textareaXArray = new Array();
var textareaYArray = new Array();
var textareaValue = new Array();
//var textareaSize = new Array();
var textareaFont = new Array();
var textareaColor = new Array();
textSize = "20px"
var textFont;
var textColor;

var imgArray = new Array();
var imgXArray = new Array();
var imgYArray = new Array();


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
    //var child = elem.childNodes[n];
    var canvaszindex = parseInt(elem.style.zIndex) + 1;
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

    // Creating a tmp canvas
    var tmp_canvas = document.createElement('canvas');
    var tmp_ctx = tmp_canvas.getContext('2d');
    tmp_canvas.id = 'tmp_canvas';
    tmp_canvas.width = canvas.width;
    tmp_canvas.height = canvas.height;
    canvasDiv.appendChild(tmp_canvas);



    $('#canvas').mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        if (curTool == "eraser" || curTool == "crayon") {
            paint = true;
            addClick(mouseX, mouseY, false);
            redraw();
            //draw();
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
                textarea.style.position = "absolute";
                textarea.style.backgroundColor = "transparent";
                document.body.appendChild(textarea);
            }
            //var x = e.clientX - canvas.offsetLeft,
            //    y = e.clientY - canvas.offsetTop;
            //textarea.value = "x: " + x + " y: " + y;
            textarea.value = "x: " + e.clientX + " y: " + e.clientY;
            textarea.style.top = e.clientY + 'px';
            textarea.style.left = e.clientX + 'px';
        }

    }, false);

    $('.textSize').click(function () {
        textSize = this.value + "px";
        console.log("textSize Class: " + textSize);
    });

    $('#saveText').click(function () {
        console.log("clicked saveText!")
        if(textarea) {
            textColor = curColor;

            textFont = "italic";
            textareaColor.push(textColor);
            //textareaSize.push(textSize);
            console.log(textFont+textSize);
            textareaFont.push(textFont +" " + textSize + " sans-serif");
            textareaXArray.push(parseInt(textarea.style.left,10) - parseInt($('body').css('margin'),10));
            textareaYArray.push(parseInt(textarea.style.top,10) + parseInt($('body').css('margin'),10));
            textareaValue.push(textarea.value);
            $('.info').remove();

            textarea = null;
            redraw();
        }
    });


    $('#canvas').mousemove(function (e) {
        if (paint == true) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            //draw;
            redraw();
        }
    });


    $('#canvas').mouseup(function (e) {
        //draw();
        paint = false;
        redraw();
    });

    //$('#canvas').mouseleave(function(e){
    //    //paint = false;
    //});

    $('#imgUpload').change(function (e) {
        console.log("Upload Img!!!");
        curTool = "img";
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i];

            var img = document.createElement("img");
            var reader = new FileReader();
            img.setAttribute('class', "resize-image");
            img.setAttribute('alt', "image for resizing");
            img.style.zIndex = 100;
            img.style.top = "10px";
            img.style.left = "10px";
            reader.onloadend = function () {

                img.src = reader.result;
                imgArray.push(img);
            }
            reader.readAsDataURL(file);
            document.body.appendChild(img);
        }
        $(".resize-image").one("load", function () {
            $('#imgUpload').prop('disabled', true);
            $('#saveImg').prop('disabled', false);
            resizeableImage($('.resize-image'));
        })
    });
    $('#saveImg').click(function () {

        var img = document.getElementsByClassName('resize-image');
        var imgX = parseInt($(".resize-container")[0].style.left,10) - parseInt($(".resize-image")[0].style.left,10),
            imgY = parseInt($(".resize-container")[0].style.top,10) - parseInt($(".resize-image")[0].style.top,10);
        context.drawImage(img[0],imgX,imgY);
        removeImgElement();

        imgXArray.push(imgX);
        imgYArray.push(imgY);
        //curTool = "crayon";
        curTool = "mouse";
        $('#imgUpload').prop('disabled', false);
        $('#saveImg').prop('disabled', true);
        var control = $("#imgUpload");
        control.replaceWith( control = control.clone( true ) );

    });

    var removeImgElement = function () {
        console.log("removeImgElement");
        var myNode = document.getElementsByClassName("resize-container")[0];
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        myNode.remove();
    }
    
    var resizeableImage = function (image_target) {
        // Some variable and settings
        var $container,
            orig_src = new Image(),
            image_target = $(image_target).get(0),
            event_state = {},
            constrain = false,
            min_width = 60, // Change as required
            min_height = 60,
            max_width = 800, // Change as required
            max_height = 900,
            resize_canvas = document.createElement('canvas');


        init = function () {

            // When resizing, we will always use this copy of the original as the base
            orig_src.src = image_target.src;

            // Wrap the image with the container and add resize handles
            if ($('.resize-handle').length == 0) {
                $(image_target).wrap('<div class="resize-container" style="z-index: 100;position: absolute; left: 10px; top: 10px;"></div>')
                    .before('<span class="resize-handle resize-handle-nw"></span>')
                    .before('<span class="resize-handle resize-handle-ne"></span>')
                    .after('<span class="resize-handle resize-handle-se"></span>')
                    .after('<span class="resize-handle resize-handle-sw"></span>');
            }
            // Assign the container to a variable
            $container = $(image_target).parent('.resize-container');

            // Add events
            $container.on('mousedown touchstart', '.resize-handle', startResize);
            $container.on('mousedown touchstart', 'img', startMoving);
            $('.js-crop').on('click', crop);
        };

        startResize = function (e) {
            e.preventDefault();
            e.stopPropagation();
            saveEventState(e);
            $(document).on('mousemove touchmove', resizing);
            $(document).on('mouseup touchend', endResize);
        };

        endResize = function (e) {
            e.preventDefault();
            $(document).off('mouseup touchend', endResize);
            $(document).off('mousemove touchmove', resizing);
        };

        saveEventState = function (e) {
            // Save the initial event details and container state
            event_state.container_width = $container.width();
            event_state.container_height = $container.height();
            event_state.container_left = $container.offset().left;
            event_state.container_top = $container.offset().top;
            event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
            event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

            // This is a fix for mobile safari
            // For some reason it does not allow a direct copy of the touches property
            if (typeof e.originalEvent.touches !== 'undefined') {
                event_state.touches = [];
                $.each(e.originalEvent.touches, function (i, ob) {
                    event_state.touches[i] = {};
                    event_state.touches[i].clientX = 0 + ob.clientX;
                    event_state.touches[i].clientY = 0 + ob.clientY;
                });
            }
            event_state.evnt = e;
        };

        resizing = function (e) {
            var mouse = {}, width, height, left, top, offset = $container.offset();
            mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
            mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

            // Position image differently depending on the corner dragged and constraints
            if ($(event_state.evnt.target).hasClass('resize-handle-se')) {
                width = mouse.x - event_state.container_left;
                height = mouse.y - event_state.container_top;
                left = event_state.container_left;
                top = event_state.container_top;
            } else if ($(event_state.evnt.target).hasClass('resize-handle-sw')) {
                width = event_state.container_width - (mouse.x - event_state.container_left);
                height = mouse.y - event_state.container_top;
                left = mouse.x;
                top = event_state.container_top;
            } else if ($(event_state.evnt.target).hasClass('resize-handle-nw')) {
                width = event_state.container_width - (mouse.x - event_state.container_left);
                height = event_state.container_height - (mouse.y - event_state.container_top);
                left = mouse.x;
                top = mouse.y;
                if (constrain || e.shiftKey) {
                    top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
                }
            } else if ($(event_state.evnt.target).hasClass('resize-handle-ne')) {
                width = mouse.x - event_state.container_left;
                height = event_state.container_height - (mouse.y - event_state.container_top);
                left = event_state.container_left;
                top = mouse.y;
                if (constrain || e.shiftKey) {
                    top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
                }
            }

            // Optionally maintain aspect ratio
            if (constrain || e.shiftKey) {
                height = width / orig_src.width * orig_src.height;
            }

            if (width > min_width && height > min_height && width < max_width && height < max_height) {
                // To improve performance you might limit how often resizeImage() is called
                resizeImage(width, height);
                // Without this Firefox will not re-calculate the the image dimensions until drag end
                $container.offset({'left': left, 'top': top});
            }
        }

        resizeImage = function (width, height) {
            resize_canvas.width = width;
            resize_canvas.height = height;
            resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
            $(image_target).attr('src', resize_canvas.toDataURL("image/png"));
        };

        startMoving = function (e) {
            e.preventDefault();
            e.stopPropagation();
            saveEventState(e);
            $(document).on('mousemove touchmove', moving);
            $(document).on('mouseup touchend', endMoving);
        };

        endMoving = function (e) {
            e.preventDefault();
            $(document).off('mouseup touchend', endMoving);
            $(document).off('mousemove touchmove', moving);
        };

        moving = function (e) {
            var mouse = {}, touches;
            e.preventDefault();
            e.stopPropagation();

            touches = e.originalEvent.touches;

            mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
            mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
            $container.offset({
                'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
                'top': mouse.y - ( event_state.mouse_y - event_state.container_top )
            });
            // Watch for pinch zoom gesture while moving
            if (event_state.touches && event_state.touches.length > 1 && touches.length > 1) {
                var width = event_state.container_width, height = event_state.container_height;
                var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
                a = a * a;
                var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
                b = b * b;
                var dist1 = Math.sqrt(a + b);

                a = e.originalEvent.touches[0].clientX - touches[1].clientX;
                a = a * a;
                b = e.originalEvent.touches[0].clientY - touches[1].clientY;
                b = b * b;
                var dist2 = Math.sqrt(a + b);

                var ratio = dist2 / dist1;

                width = width * ratio;
                height = height * ratio;
                // To improve performance you might limit how often resizeImage() is called
                resizeImage(width, height);
            }
        };

        crop = function () {
            //Find the part of the image that is inside the crop box
            var crop_canvas,
                left = $('.overlay').offset().left - $container.offset().left,
                top = $('.overlay').offset().top - $container.offset().top,
                width = $('.overlay').width(),
                height = $('.overlay').height();

            crop_canvas = document.createElement('canvas');
            crop_canvas.width = width;
            crop_canvas.height = height;

            crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);
            window.open(crop_canvas.toDataURL("image/png"));
        }

        init();

    };


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
        if(curTool == "eraser") {
            curTool = "crayon";
        }
    });
    $("#purplePen").click(function () {
        curColor = "#cb3594";
        if(curTool == "eraser") {
            curTool = "crayon";
        }
    });
    $("#redPen").click(function () {
        curColor = "#df4b26";
        if(curTool == "eraser") {
            curTool = "crayon";
        }
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
        if(curTool == "textEditor") {
            $(".info").remove();
            textarea = "";
        }
        curTool = "eraser";

    });
    $("#choosePen").click(function () {
        if(curTool == "textEditor") {
            $(".info").remove();
            textarea = "";
        }
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
    imgArray.length = 0;
    imgXArray.length = 0;
    imgYArray.length = 0;
}

//function draw() {
//    context.lineJoin = "round";
//    // Keep the drawing in the drawing area
//    context.save();
//    context.beginPath();
//    console.log("hereX: " + drawingAreaX);
//    context.rect(drawingAreaX, drawingAreaY, drawingAreaX + drawingAreaWidth, drawingAreaHeight);
//    context.clip();
//
//    var radius;
//    var i = 0;
//    for (; i < clickX.length; i++) {
//
//        if (clickSize[i] == "small") {
//            radius = 2;
//        } else if (clickSize[i] == "normal") {
//            radius = 5;
//        } else if (clickSize[i] == "large") {
//            radius = 10;
//        } else if (clickSize[i] == "huge") {
//            radius = 20;
//        } else {
//            alert("Error: Radius is zero for click " + i);
//            radius = 0;
//        }
//
//
//        context.beginPath();
//        if (clickDrag[i] && i) {
//            context.moveTo(clickX[i - 1], clickY[i - 1]);
//        } else {
//            context.moveTo(clickX[i] - 1, clickY[i]);
//        }
//        context.lineTo(clickX[i], clickY[i]);
//        context.closePath();
//        context.strokeStyle = clickColor[i];
//        context.lineWidth = radius;
//        context.stroke();
//        if (curTool == "crayon") {
//            context.globalAlpha = 0.4;
//            context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
//        }
//        context.globalAlpha = 1;
//    }
//    context.restore();
//   //clear arrays
//    clickX.length = 0;
//    clickY.length = 0;
//    clickDrag.length = 0;
//    clickColor.length = 0;
//    clickSize.length = 0;
//    clickTool.length = 0;
//    imgArray.length = 0;
//    imgXArray.length = 0;
//    imgYArray.length = 0;
//
//}

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

        if(clickTool[i] == "eraser"){
            context.globalCompositeOperation = "destination-out";
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.strokeStyle = 'rgba(0,0,0,1)';

            context.fill();
        }else{
            context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
            context.strokeStyle = clickColor[i];
        }
        //context.strokeStyle = clickColor[i];
        context.lineWidth = radius;
        context.stroke();


    }
    for(i=0;i<imgArray.length;i++) {
        context.drawImage(imgArray[i],imgXArray[i],imgYArray[i]);
    }
    for(i=0; i<textareaXArray.length;i++) {
        //context.fillStyle = '#f00';
        //context.font = 'italic bold 30px sans-serif';
        //context.textBaseline = 'bottom';
        context.fillStyle = textareaColor[i];
        context.font = textareaFont[i];
        console.log("textareafont: " + textareaFont[i]);
        console.log("context.font: " + context.font);
        context.fillText(textareaValue[i], textareaXArray[i], textareaYArray[i]);
    }
    context.globalAlpha = 1;
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
