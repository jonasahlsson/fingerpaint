'use strict';
/*
 * Finger painting
 *
 * inspiration
 * https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
 * http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
 *
 */

var fingerPaint = (function () {

    var canvas, ct, // canvas an context
        paint, mouseX, mouseY, // boolean for painting, mousedown coordinates
        clickX = [], clickY = [], // coordinates for painting
        radius = [], // width for painting
        clickColor = [], // color for painting
        clickDrag = [], // boolean for ongoing mouse drag
        lineWidth = 10, // width of brush
        lineColor = '#000000', // default color of brush
        brushColor = lineColor,
        canvasWidth, canvasHeight, // canvas measurements
        backgroundColor, // background color of canvas
        img, // image object for inserting images
        tool = 'brush', // tool in use, default brush
        dataURL; // for saving image


    var init = function () {
        // get canvas and set context
        canvas = document.getElementById("drawingCanvas");
        ct = canvas.getContext("2d");

        canvasWidth = canvas.offsetWidth;
        canvasHeight = canvas.offsetHeight;


        /*
         * canvas mouse events
         */
        $('#drawingCanvas').mousedown( function (evt) {

            // find coordinates for mousedown
            mouseX = evt.pageX - this.offsetLeft;
            mouseY = evt.pageY - this.offsetTop;
            // console.log('mouseDown @ x:' + mouseX + ' y: ' + mouseY);

            // signal drawing starts
            paint = true;

            // check tool in use
            // if( tool === 'brush' )  {
            if( tool === 'brush' || tool === 'eraser' )  {
                addClick(evt.pageX - this.offsetLeft, evt.pageY - this.offsetTop, false);
            }
            else if( tool === 'addImage') {
                insertImage();
            }

            // else if( tool === 'eraser' )  {
                // ct.clearRect(mouseX, mouseY, 50,50);
            // }

            redraw();

        });

        $('#drawingCanvas').mouseup( function (evt) {
            // signal drawing stops
            paint = false;
            // empty draw arrays
            flush();
        });

        $('#drawingCanvas').mouseleave( function (evt) {
            // signal drawing stops
            paint = false;
            // empty draw arrays
            flush();
        });

        $('#drawingCanvas').mousemove( function (evt) {
            // paint if we are painting
            if(paint){

                // if( tool === 'brush' )  {
                if( tool === 'brush' || tool === 'eraser' )  {
                    addClick(evt.pageX - this.offsetLeft, evt.pageY - this.offsetTop, true);
                }

                // else if( tool === 'eraser' )  {
                    // ct.clearRect(mouseX, mouseY, 50,50);
                // }


                redraw();
                }

        });

        /*
         * menu buttons
        */


        /*
         * brush
        */
        $('#brush').click( function () {
            // set tool
            tool = 'brush';
            // set brush to chosen lineColor
            lineColor = brushColor;
            // open options for brush size.
            $('#brush-size').fadeToggle(100);
            return false;
        });

        $('.brush-small').click( function () {
            // set width of brush
            lineWidth = 6;
            // changed img to filled, indicating beeing chosen and the other sizes to hollow circles
            $('.brush-small').attr('src', 'img/circle-filled.svg');
            $('.brush-medium').attr('src', 'img/circle.svg');
            $('.brush-large').attr('src', 'img/circle.svg');
            // close
            $('#brush-size').fadeToggle(100);
        });

        $('.brush-medium').click( function () {
            lineWidth = 10;
            $('.brush-small').attr('src', 'img/circle.svg');
            $('.brush-medium').attr('src', 'img/circle-filled.svg');
            $('.brush-large').attr('src', 'img/circle.svg');
            $('#brush-size').fadeToggle(100);
        });

        $('.brush-large').click( function () {
            lineWidth = 20;
            $('.brush-small').attr('src', 'img/circle.svg');
            $('.brush-medium').attr('src', 'img/circle.svg');
            $('.brush-large').attr('src', 'img/circle-filled.svg');
            $('#brush-size').fadeToggle(100);
        });



        /*
         * color-picker
        */
        $('#color-picker').click( function () {
            // open color-selection
            $('#color-selection').fadeToggle(100);
            return false;
        });
        $('#black').click( function () {
            brushColor = '#000000';
            lineColor = '#000000';
            //close it
            $('#color-selection').fadeToggle(100);
            // brushColor = 'rgba(0,0,0,0.2)';
            // lineColor = 'rgba(0,0,0,0.2)';
        });

        $('#red').click( function () {
            brushColor = '#ff0000';
            lineColor = '#ff0000';
            //close it
            $('#color-selection').fadeToggle(100);
            // brushColor = 'rgba(255,0,0,0.2)';
            // lineColor = 'rgba(255,0,0,0.2)';

        });

        $('#blue').click( function () {
            brushColor = '#0000ff';
            lineColor = '#0000ff';
            //close it
            $('#color-selection').fadeToggle(100);
            // brushColor = 'rgba(0,0,255,0.2)';
            // lineColor = 'rgba(0,0,255,0.2)';
        });

        $('#green').click( function () {
            brushColor = '#00ff00';
            lineColor = '#00ff00';
            //close it
            $('#color-selection').fadeToggle(100);

        });

        $('#eraser').click( function () {
            // set tool
            tool = 'eraser';

            // find color for erasing (color of the background)
            backgroundColor = $('#drawingCanvas').css('background-color');
             lineColor = backgroundColor;
            // lineColor = "rgba(0,0,255,0.1)";
        });



        /*
         * Clear
        */
        $('#clear').click( function () {
            $('#clear-confirmation').fadeToggle(100);
            return false;
        });

        // clear and close
        $('#clear-delete').click( function () {
            clear();
            $('#clear-confirmation').fadeToggle(100);
            return false;
        });

        // close without clearing
        $('#clear-stay').click( function () {
            $('#clear-confirmation').fadeToggle(100);
            return false;
        });



        /*
         * add/insert image
        */
        // set tool and close
        $('#add-img').click( function () {
            // set tool
            tool = 'addImage';
            // open color-selection
            $('#img-selection').fadeToggle(100);
            return false;
        });

        // load images for gallery of insert function
        getImgSRC();

        // set up new img for insert and close div
        // set event on parent, "delegated event", since content is loaded dynamically and element need to be selectable (loaded) before events are bound
        // http://stackoverflow.com/questions/8752321/jquery-live-vs-on-method-for-adding-a-click-event-after-loading-dynamic-ht
        // $('#parent').on("click", "#child", function() {});
        $('#img-selection').on("click", ".insert-img", function() {
            img = new Image();
            //set path to img
            img.src = $(this).attr('src');
            $('#img-selection').fadeToggle(100);
        });
        
        // call on function that opens a save dialog box
        $('#download-link').click( saveImg );

    };


    // push coordinates and linewidth to arrays, dragging decides if connected to previouspoint
    var addClick = function (x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        radius.push(lineWidth);
        clickDrag.push(dragging);
        clickColor.push(lineColor);
    };


    var redraw = function () {

        ct.lineJoin = "round";

        // draw stored clicks
        for(var i=0; i < clickX.length; i++) {

            ct.beginPath();
            if (clickDrag[i] && i) {
                ct.moveTo(clickX[i-1], clickY[i-1]);
            }
            else {
                //ct.moveTo(clickX[i]-1, clickY[i]);
                ct.moveTo(clickX[i], clickY[i]);
            }
            ct.lineTo(clickX[i], clickY[i]);
            ct.closePath();
            ct.strokeStyle = clickColor[i];
            ct.lineWidth = radius[i];
            ct.stroke();
        }
    };

    /*
     * object for color
     *
    */
    var Color = function (r, g, b, a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
    };

    // add a getColorRGBA method for getting color string to all Color objects. 'rgba(0,0,255,0.2)'
    Color.prototype.getColorRGBA = function () {
        return 'rgba(' +this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    };


    /*
     * Insert a image onto the canvas at clicked coordinates
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Creating_an_image_from_scratch
     * http://stackoverflow.com/questions/13240437/place-image-on-canvas-at-same-x-y-position-as-mouse-onclick
     * http://stackoverflow.com/questions/10841532/canvas-drawimage-scaling
    */
    var insertImage = function () {
        //img.addEventListener("load", function () { can't get load to work...

        // draw image centered on click
        // ct.drawImage(img, Math.round(mouseX - (img.width/2)), Math.round(mouseY - img.height/2));

        // Math.round improves image quality by removing sub pixel
        // draw image centered on click and scaled to 64x64
        ct.drawImage(img, Math.round(mouseX - 64/2), Math.round(mouseY - 64/2), 64, 64 * img.height / img.width);

    //});
    };


    /*
     * Clear canvas
     *
    */

    // empty arrays with draw points
    var flush = function () {
        clickX = [];
        clickY = [];
        radius = [];
        clickColor = [];
        clickDrag = [];
    };
    // clear canvas & empty draw arrays
    var clear = function () {
        // clear canvas
        ct.clearRect(0, 0, canvasWidth, canvasHeight);
        // empty arrays with draw points
        flush();

    };

    // create dataURL of canvas and set it to an 'a' href
    var saveImg = function () {
        dataURL = canvas.toDataURL();
        this.href = dataURL;
        // show image i browserwindow
        // window.location = dataURL;

    };

    // extract a filename from an url
    // http://befused.com/javascript/get-filename-url , in the comments
    var getFileName = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        return url;
    };



    /*
     * Fetch files with a specified extension from a browsable directory and format as img tags.
     *
     * http://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
    */
    var getImgSRC = function () {
        var dir = "img/insert-images/", fileextension = ".svg";

        $.ajax({
            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: dir,
            success: function (data) {
                // List all png file names in the page
                // https://api.jquery.com/find/
                // https://api.jquery.com/contains-selector/
                $(data).find("a:contains(" + fileextension + ")").each(function () {

                    // create img tag with class and append to div
                    // var filename = this.href.replace(window.location, "").replace("http:///", "");
                    // $('#img-selection').append($("<img class='insert-img' src=" + dir + filename + ">"));

                    // // create img tag with class and append to div
                    // var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                    // $('#img-selection').append($("<img class='insert-img' src=" + dir + filename + ">"));

                    // create img tag with class and append to div
                    var filename = this.href.substring(this.href.lastIndexOf("/") + 1, this.href.length);
                    $('#img-selection').append($("<img class='insert-img' src=" + dir + filename + ">"));

                });
            }
        });



    };


    return {
    'init' : init,
    };

})();

$(document).ready(function () {
    'use strict';

    fingerPaint.init();

});