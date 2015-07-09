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

var img = {};
/////////////// json

var jsonArray = new Array();
var textObj = {};
var imgObj = {};

//////////////local storage
var localArray = [{
    "type": "app.img",
    "imgSrc": "data:image/png;base64,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",
    "x": 65,
    "y": 93,
    "canvasWidth": 1000,
    "canvasHeight": 500,
    "originalWidth": 139,
    "originalHeight": 125
}, {
    "type": "app.text",
    "textValue": "x: 250 y: 320",
    "font": "italic 20px sans-serif",
    "color": "#df4b26",
    "x": 250,
    "y": 320,
    "canvasWidth": 1000,
    "canvasHeight": 500,
    "width": 114.521484375,
    "height": 20
}, {
    "type": "app.draw",
    "start": {"x": 72, "y": 56},
    "end": {"x": 71, "y": 56},
    "color": "#000000",
    "size": 2,
    "compositeOperation": "source-over",
    "page": 1,
    "ccwidth": 8159,
    "ccheight": 10559,
    "clientId": "1KD7aQjtSA.7NmJAFLMgu",
    "mouseEvent": "mouseDown"
},
    {
        "type": "app.draw",
        "start": {"x": 71, "y": 56},
        "end": {"x": 72, "y": 57},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    },
    {
        "type": "app.draw",
        "start": {"x": 72, "y": 57},
        "end": {"x": 74, "y": 61},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    },
    {
        "type": "app.draw",
        "start": {"x": 74, "y": 61},
        "end": {"x": 76, "y": 64},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    },
    {
        "type": "app.draw",
        "start": {"x": 76, "y": 64},
        "end": {"x": 77, "y": 66},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    },
    {
        "type": "app.draw",
        "start": {"x": 77, "y": 66},
        "end": {"x": 79, "y": 68},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    },
    {
        "type": "app.draw",
        "start": {"x": 79, "y": 68},
        "end": {"x": 81, "y": 70},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    }, {
        "type": "app.draw",
        "start": {"x": 81, "y": 70},
        "end": {"x": 83, "y": 72},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    }, {
        "type": "app.draw",
        "start": {"x": 83, "y": 72},
        "end": {"x": 84, "y": 74},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu"
    }, {
        "type": "app.draw",
        "start": {"x": 84, "y": 74},
        "end": {"x": 86, "y": 75},
        "color": "#000000",
        "size": 2,
        "compositeOperation": "source-over",
        "page": 1,
        "ccwidth": 8159,
        "ccheight": 10559,
        "clientId": "1KD7aQjtSA.7NmJAFLMgu",
        "mouseEvent": "mouseUp"
    }];

//Editing
var index = 0;
var edit = false;
var tempObj = {};

// For selecting lane
var mouseDownIdx = -1;
var mouseUpIdx = -1;
var lastMouseUpIdx = -1;


/////// For testing
var testInit = true;
var clickTime = 0;

///////


function prepareCanvas() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }




    var canvasDiv = document.getElementById('canvasDiv');


    canvas = document.createElement('canvas');

    //console.log(document.getElementById('canvasDiv').style.zIndex);
    canvasWidth = $('#canvasDiv').width();
    //console.log(canvasWidth);
    canvasHeight = $('#canvasDiv').height();
    //console.log(canvasHeight);

    ////////
    //drawingAreaX = canvasDiv.offsetLeft;
    //drawingAreaY = canvasDiv.offsetTop;
    //console.log('x: ' + drawingAreaX);
    //console.log('y: ' + drawingAreaY);
    drawingAreaWidth = canvasWidth;
    drawingAreaHeight = canvasHeight;
    ////////

    var elem = document.getElementById('canvasDiv');
    //var child = elem.childNodes[n];
    var canvaszindex = parseInt(elem.style.zIndex) + 1;
    //console.log('canvaszindex' + canvaszindex);

    //    ++canvaszindex;
    //console.log(canvaszindex);
    //$(canvas).css('zIndex', 1000);


    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    //canvas.setAttribute('width', window.innerWidth);
    //canvas.setAttribute('height', window.innerHeight);
    //console.log(window.innerWidth);

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
            if (testInit == true) {
                initDraw(localArray);
            }
            else {
                redraw();
            }
        }

    });

    //c = document.getElementById('canvas');
    canvas.addEventListener('click', function (e) {
        if (curTool == "noneTool") {
            console.log("noneTool in canvas.addEventListener('click'")
        }
        if (curTool == 'textEditor') {
            if (!textarea) {
                //console.log('closer!!!');
                textarea = document.createElement('textarea');
                textarea.className = 'info';
                textarea.style.zIndex = 100;
                textarea.style.width = "100px";
                textarea.style.height = "100px";
                textarea.style.position = "absolute";
                textarea.style.backgroundColor = "transparent";
                textarea.value = "x: " + e.clientX + " y: " + e.clientY;

                textarea.style.top = e.clientY + 'px';
                textarea.style.left = e.clientX + 'px';
                document.body.appendChild(textarea);
            }
            //var x = e.clientX - canvas.offsetLeft,
            //    y = e.clientY - canvas.offsetTop;
            //textarea.value = "x: " + x + " y: " + y;
            //var mouseX = e.pageX - this.offsetLeft;
            //var mouseY = e.pageY - this.offsetTop;
            else {
                textarea.value = textarea.value;

                textarea.style.top = e.clientY + 'px';
                textarea.style.left = e.clientX + 'px';
            }
        }
        if (curTool == "selectTool") {

            console.log("clickTime: " + clickTime++);
            console.log("x: " + e.clientX + "   y: " + e.clientY);
            console.log("local x: " + localArray[1].x + "    y: " + localArray[1].y);
            console.log("ori x: " + localArray[1].width + "    ori y: " + localArray[1].height);
            console.log("x+x: " + (localArray[1].x + localArray[1].width) + "    y+y: " + (localArray[1].y + localArray[1].height));
            index = findElement(e.clientX, e.clientY);
            console.log(index);
            if (index >= 0) {
                $('#editSelected').prop('disabled', false);
                if (localArray[index].type == "app.draw") {
                    edit = true;
                    tempObj = {};
                    tempObj = localArray[index];
                }
            }
            else {
                index = 0;
                edit = false;
                $('#editSelected').prop('disabled', true);
            }

        }

    }, false);

    $('.textSize').click(function () {
        textSize = this.value + "px";
        console.log("textSize Class: " + textSize);
    });

    $('#saveText').click(function () {
        curTool = "noneTool";
        console.log("clicked saveText!")
        if (textarea) {
            textColor = curColor;

            textFont = "italic";
            textareaColor.push(textColor);
            //textareaSize.push(textSize);
            //console.log(textFont + textSize);
            textareaFont.push(textFont + " " + textSize + " sans-serif");
            textareaXArray.push(parseInt(textarea.style.left, 10));
            textareaYArray.push(parseInt(textarea.style.top, 10));
            //textareaXArray.push(parseInt(textarea.style.left, 10) - parseInt($('body').css('margin'), 10));
            //textareaYArray.push(parseInt(textarea.style.top, 10) + parseInt($('body').css('margin'), 10));
            textareaValue.push(textarea.value);
            $('.info').remove();


            ////fill text
            var text = textarea.value;
            context.fillStyle = textColor;
            context.font = textFont + " " + textSize + " sans-serif";
            //console.log("textareafont: " + textareaFont[i]);
            //console.log("context.font: " + context.font);
            context.textBaseline = "top";
            context.fillText(text, parseInt(textarea.style.left, 10), parseInt(textarea.style.top, 10));
            var metrics = context.measureText(text);
            console.log("text width: " + metrics.width);
            console.log("text height: " + parseInt(textSize, 10));
            ///////

            ////////Json Text
            textObj = {};
            textObj.type = "app.text";
            textObj.textValue = textarea.value;
            textObj.font = textFont + " " + textSize + " sans-serif";
            textObj.color = textColor;
            textObj.x = parseInt(textarea.style.left, 10);
            textObj.y = parseInt(textarea.style.top, 10);
            textObj.canvasWidth = canvasWidth;
            textObj.canvasHeight = canvasHeight;
            textObj.width = metrics.width;
            textObj.height = parseInt(textSize, 10);
            jsonArray.push(textObj);
            localArray.push(textObj);


            //////////////


            textarea = null;
            if (testInit == true) {
                initDraw(localArray);
            }
            else {
                redraw();
            }


        }

    });


    $('#canvas').mousemove(function (e) {
        if (paint == true) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            if (testInit == true) {
                initDraw(localArray);
            }
            else {
                redraw();
            }
        }
    });


    $('#canvas').mouseup(function (e) {
        //draw();
        paint = false;
        if (testInit == true) {
            initDraw(localArray);
        }
        else {
            redraw();
        }
    });

    //$('#canvas').mouseleave(function(e){
    //    //paint = false;
    //});

    $('#imgUpload').change(function (e) {
        console.log("Upload Img!!!");
        curTool = "img";
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i]

            img = {};
            img = document.createElement("img");
            var reader = new FileReader();
            img.setAttribute('class', "resize-image");
            img.setAttribute('alt', "image for resizing");
            img.style.zIndex = 100;
            //img.style.top = "10px";
            //img.style.left = "10px";
            img.style.top = 0;
            img.style.left = 0;
            reader.onloadend = function () {

                img.src = reader.result;

                console.log("json img: " + JSON.stringify(img));
                imgArray.push(img);
                console.log("hahahahaha img: " + img);
                console.log("hahahahaha img.src: " + img.src);
                ///////img json1
                imgObj = {};
                imgObj.type = "app.img";
                imgObj.imgSrc = img.src;
                /////////
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
        ///////// img json1

        var newImg = new Image();
        newImg.src = $(".resize-image").attr('src');
        imgObj.imgSrc = newImg.src;
        var originalWidth = newImg.width;
        var originalHeight = newImg.height;
        imgObj.originalWidth = originalWidth;
        imgObj.originalHeight = originalHeight;
        ////////
        var imgX = parseInt($(".resize-container")[0].style.left, 10) - (parseInt($(".resize-image")[0].style.left, 10) || 0),
            imgY = parseInt($(".resize-container")[0].style.top, 10) - (parseInt($(".resize-image")[0].style.top, 10) || 0);
        context.drawImage(img[0], imgX, imgY);
        removeImgElement();

        imgXArray.push(imgX);
        imgYArray.push(imgY);
        //curTool = "crayon";
        curTool = "mouse";
        $('#imgUpload').prop('disabled', false);
        $('#saveImg').prop('disabled', true);
        var control = $("#imgUpload");
        control.replaceWith(control = control.clone(true));

        //////////// img json2
        imgObj.x = imgX;
        imgObj.y = imgY;
        imgObj.canvasWidth = canvasWidth;
        imgObj.canvasHeight = canvasHeight;
        //imgObj.left = ;
        jsonArray.push(imgObj);
        localArray.push(imgObj);

        ///////////

    });


    if (testInit == true) {
        initDraw(localArray);
    }
    else {
        redraw();
    }
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
        //delete from wrap first div
        // left: 10px; top: 10px;
        if ($('.resize-handle').length == 0) {
            $(image_target).wrap('<div class="resize-container" style="z-index: 100;position: absolute; left: 0; top: 0;"></div>')
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

    var crop = function () {
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
        if (curTool == "eraser") {
            curTool = "crayon";
        }
    });
    $("#purplePen").click(function () {
        curColor = "#cb3594";
        if (curTool == "eraser") {
            curTool = "crayon";
        }
    });
    $("#redPen").click(function () {
        curColor = "#df4b26";
        if (curTool == "eraser") {
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
        if (curTool == "textEditor") {
            $(".info").remove();
            textarea = "";
        }
        curTool = "eraser";

    });
    $("#choosePen").click(function () {
        if (curTool == "textEditor") {
            $(".info").remove();
            textarea = "";
        }
        curTool = "crayon";

    });
    $("#textEditor").click(function () {
        curTool = "textEditor";
        paint = false;
    });

    $("#selectTool").click(function () {
        curTool = "selectTool";

    });
    $("#editSelected").click(function (e) {
        edit = true;
        //if (index >= 0) {
        var findObj = localArray[index];
        if (findObj.type == "app.img") {
            //rebuild img tag
            curTool = "img";

            var imgTag = document.createElement("img");
            imgTag.setAttribute('class', "resize-image");
            imgTag.setAttribute('alt', "image for resizing");
            imgTag.style.zIndex = 100;
            imgTag.src = findObj.imgSrc;


            imgObj = {};
            imgObj.type = "app.img";
            imgObj.imgSrc = img.src;
            /////////
            var x = findObj.x;
            var y = findObj.y;
            document.body.appendChild(imgTag);

            $(".resize-image").one("load", function () {
                $('#imgUpload').prop('disabled', true);
                $('#saveImg').prop('disabled', false);
                resizeableImage($('.resize-image'));
                $(".resize-container").css({left: x + "px", top: y + "px"});
                //console.log("resize-container x: " + select[0].style.left + "   y: " + select[0].style.top);
            })

            ///
        }
        if (findObj.type == "app.text") {
            curTool = "textEditor";
            if (!textarea) {
                //console.log('closer!!!');
                textarea = document.createElement('textarea');
                textarea.className = 'info';
                textarea.style.zIndex = 100;
                textarea.style.width = "100px";
                textarea.style.height = "100px";
                textarea.style.position = "absolute";
                textarea.style.backgroundColor = "transparent";
                textarea.value = findObj.textValue;
                textarea.style.left = findObj.x + 'px';
                textarea.style.top = findObj.y + 'px';

                document.body.appendChild(textarea);
            }
            //var x = e.clientX - canvas.offsetLeft,
            //    y = e.clientY - canvas.offsetTop;
            //textarea.value = "x: " + x + " y: " + y;
            //var mouseX = e.pageX - this.offsetLeft;
            //var mouseY = e.pageY - this.offsetTop;
            else {
                textarea.value = textarea.value;

                textarea.style.top = e.clientY + 'px';
                textarea.style.left = e.clientX + 'px';
            }
        }

        tempObj = {};
        tempObj = localArray[index];
        localArray.splice(index, 1);
        initDraw(localArray);
        //}

    });


});

var removeImgElement = function () {
    console.log("removeImgElement");
    var myNode = document.getElementsByClassName("resize-container")[0];
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    myNode.remove();
}


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

function initDraw(jsonA) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    //context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    //context.lineWidth = 5;

    // Keep the drawing in the drawing area
    context.save();
    context.beginPath();
    //console.log("hereX: " + drawingAreaX);
    context.rect(drawingAreaX, drawingAreaY, drawingAreaX + drawingAreaWidth, drawingAreaHeight);
    context.clip();

    //////// begin to draw in initdraw
    var i = 0;

    for (; i < jsonA.length; i++) {
        if (jsonA[i].type == "app.text") {
            var textInJson = jsonA[i];
            context.fillStyle = textInJson.color;
            context.font = textInJson.font;
            //console.log("textareafont: " + textareaFont[i]);
            //console.log("context.font: " + context.font);
            context.textBaseline = "top";
            context.fillText(textInJson.textValue, textInJson.x, textInJson.y);

        }
        if (jsonA[i].type == "app.img") {
            var imgInJson = jsonA[i];
            //var imgString = buildImgTag(imgInJson.imgSrc);
            //imgString = imgString.replaceAll("^\"|\"$", "");
            context.drawImage(buildImgTag(imgInJson.imgSrc), imgInJson.x, imgInJson.y);
        }
        if (jsonA[i].type == "app.draw") {
            if (jsonA[i].mouseEvent == "mouseDown") {
                var initI = i;
                for (i; i < jsonA.length; i++) {
                    context.save();
                    context.lineJoin = 'round';
                    context.lineCap = 'round';
                    context.strokeStyle = jsonA[i].color;
                    // ctx.globalCompositeOperation = 'source-over';//compositeOperation;
                    context.globalCompositeOperation = jsonA[i].compositeOperation;
                    context.lineWidth = jsonA[i].size;
                    context.beginPath();

                    //ctx.moveTo(start.x, start.y);
                    context.moveTo(jsonA[i].start.x, jsonA[i].start.y);
                    // ctx.lineTo(end.x, end.y);
                    context.lineTo(jsonA[i].end.x, jsonA[i].end.y);

                    //ctx.moveTo(0, 0);
                    //ctx.lineTo(500, 500);

                    context.closePath();
                    context.stroke();
                    context.restore();
                    if (jsonA[i].mouseEvent == "mouseUp") {
                        break;
                    }
                }
            }
            else {
                console.log("line segements are not sequential");
            }
        }
    }
    context.restore();


    /////////
}


function redraw() {
    //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    //
    ////context.strokeStyle = "#df4b26";
    //context.lineJoin = "round";
    ////context.lineWidth = 5;
    //
    //// Keep the drawing in the drawing area
    //context.save();
    //context.beginPath();
    //console.log("hereX: " + drawingAreaX);
    //context.rect(drawingAreaX, drawingAreaY, drawingAreaX + drawingAreaWidth, drawingAreaHeight);
    //context.clip();
    //
    //var radius;
    //var i = 0;
    //for (; i < clickX.length; i++) {
    //
    //    if (clickSize[i] == "small") {
    //        radius = 2;
    //    } else if (clickSize[i] == "normal") {
    //        radius = 5;
    //    } else if (clickSize[i] == "large") {
    //        radius = 10;
    //    } else if (clickSize[i] == "huge") {
    //        radius = 20;
    //    } else {
    //        alert("Error: Radius is zero for click " + i);
    //        radius = 0;
    //    }
    //
    //
    //    context.beginPath();
    //    if (clickDrag[i] && i) {
    //        context.moveTo(clickX[i - 1], clickY[i - 1]);
    //    } else {
    //        context.moveTo(clickX[i] - 1, clickY[i]);
    //    }
    //    context.lineTo(clickX[i], clickY[i]);
    //    context.closePath();
    //
    //    if (clickTool[i] == "eraser") {
    //        context.globalCompositeOperation = "destination-out";
    //        ctx.fillStyle = 'rgba(0,0,0,1)';
    //        ctx.strokeStyle = 'rgba(0,0,0,1)';
    //
    //        context.fill();
    //    } else {
    //        context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
    //        context.strokeStyle = clickColor[i];
    //    }
    //    //context.strokeStyle = clickColor[i];
    //    context.lineWidth = radius;
    //    context.stroke();
    //
    //
    //}
    //for (i = 0; i < imgArray.length; i++) {
    //    context.drawImage(imgArray[i], imgXArray[i], imgYArray[i]);
    //}
    //for (i = 0; i < textareaXArray.length; i++) {
    //    //context.fillStyle = '#f00';
    //    //context.font = 'italic bold 30px sans-serif';
    //    //context.textBaseline = 'bottom';
    //    context.fillStyle = textareaColor[i];
    //    context.font = textareaFont[i];
    //    console.log("textareafont: " + textareaFont[i]);
    //    console.log("context.font: " + context.font);
    //    context.textBaseline = "top";
    //    context.fillText(textareaValue[i], textareaXArray[i], textareaYArray[i]);
    //}
    //context.globalAlpha = 1;
    //context.restore();
    //console.log("Json Array: " + jsonArray);
    //console.log("Json Array to string: " + JSON.stringify(jsonArray));
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

function buildImgTag(imgTagSrc) {
    //return "<img class=\"resize-img\" alt=\"image for resizing\" src=\"" + img + "\" style=\"z-index: 100; top: 10px; left: 10px\">";
    var imgTag = document.createElement("img");
    imgTag.setAttribute('class', "resize-image");
    imgTag.setAttribute('alt', "image for resizing");
    imgTag.style.zIndex = 100;
    //imgTag.style.top = "10px";
    //imgTag.style.left = "10px";
    imgTag.src = imgTagSrc;
    return imgTag;
}

function findElement(x, y) {
    var i = 0;
    for (i = 0; i < localArray.length; i++) {
        var jObject = localArray[i];
        //var needToFix = 0;
        //if (testInit == true) {
        //    needToFix = 0; // This should be the initial position of img
        //}

        if (jObject.type == "app.img") {
            //x -= needToFix;
            //y -= needToFix;
            if (x >= jObject.x && x <= jObject.x + jObject.originalWidth && y >= jObject.y && y <= jObject.y + jObject.originalHeight) {
                return i;
            }
        }
        if (jObject.type == "app.text") {
            console.log("in if app.text")
            if (x >= jObject.x && x <= jObject.x + jObject.width && y >= jObject.y && y <= jObject.y + jObject.height) {
                console.log("find text element!!")
                return i;
            }

        }
        if (jObject.type == "app.draw") {
            if (jObject.mouseEvent == "mouseDown") {
                context.lineWidth = jObject.size;
                var initI = i;
                for (i; i < localArray.length; i++) {
                    context.beginPath();            // new segment
                    context.moveTo(localArray[i].start.x, localArray[i].start.y);     // start is current point
                    context.lineTo(localArray[i].end.x, localArray[i].end.y); // end point is next
                    if (context.isPointInStroke(x, y)) {
                        return initI;
                    }
                    if (localArray[i].mouseEvent == "mouseUp") {
                        break;
                    }
                }
            }

        }


    }
    return -1;

}


$('html').keyup(function (e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        if (edit) {
            if (tempObj.type == "app.img") {
                removeImgElement();
            }
            if (localArray[index].type == "app.draw") {
                localArray.splice(index, 1);
                initDraw(localArray);
            }
        }
    }
})
