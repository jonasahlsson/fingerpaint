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
        lineWidth = 2, // width of brush
        lineColor = '#000000', // default color of brush
        brushColor = lineColor,
        canvasWidth, canvasHeight, // canvas measurements
        backgroundColor;
        
        
    var init = function () {
        // get canvas and set context
        canvas = document.getElementById("drawingCanvas");
        ct = canvas.getContext("2d");
        
        canvasWidth = canvas.offsetWidth;
        canvasHeight = canvas.offsetHeight;
        // console.log(canvasWidth + ',' + canvasHeight);
        
        // // test if I can draw
        // ct.beginPath();
        // ct.moveTo(0,0);
        // ct.lineTo(200,200);
        // ct.stroke();
    
        /*
         * set up mouse events
         */
        $('#drawingCanvas').mousedown( function (evt) {
            
            // find coordinates for mousedown
            mouseX = evt.pageX - this.offsetLeft;
            mouseY = evt.pageY - this.offsetTop;
            // console.log('mouseDown @ x:' + mouseX + ' y: ' + mouseY);
            
            // signal drawing starts
            paint = true;
            
            addClick(evt.pageX - this.offsetLeft, evt.pageY - this.offsetTop, false);
        
            redraw();

        });

        $('#drawingCanvas').mouseup( function (evt) {
            // signal drawing stops
            paint = false;
        });
        
        $('#drawingCanvas').mouseleave( function (evt) {
            // signal drawing stops
            paint = false;
        });
        
        $('#drawingCanvas').mousemove( function (evt) {
            // paint if we are painting
            if(paint){
                addClick(evt.pageX - this.offsetLeft, evt.pageY - this.offsetTop, true);
                
                redraw();
            }
            
        });
  
        /*
         * menu buttons
         */  
        $('.brush-small').click( function () {
            setLineWidth(2);
        });
            
        $('.brush-medium').click( function () {
            setLineWidth(10);
        });
            
        $('.brush-large').click( function () {
            setLineWidth(20);
        });
        
        $('#eraser').click( function () {
            // find color for erasing (color of the background)
            backgroundColor = $('#drawingCanvas').css('background-color');
            lineColor = backgroundColor;
        });
        
        $('#clear').click( function () {
            clear();
        });
        
        $('#black').click( function () {
            brushColor = '#000000';
            lineColor = '#000000';
            // brushColor = 'rgba(0,0,0,0.2)';
            // lineColor = 'rgba(0,0,0,0.2)';
        });
        
        $('#red').click( function () {
            brushColor = '#ff0000';
            lineColor = '#ff0000';
            // brushColor = 'rgba(255,0,0,0.2)';
            // lineColor = 'rgba(255,0,0,0.2)';
            
        });
        
        $('#blue').click( function () {
        
            brushColor = '#0000ff';
            lineColor = '#0000ff';
            // brushColor = 'rgba(0,0,255,0.2)';
            // lineColor = 'rgba(0,0,255,0.2)';
        });    
            
        $('#brush').click( function () {
            // set brush to chosen lineColor
            lineColor = brushColor;
            console.log(' (in brush) setting color to ' + brushColor);
            // open options for brush size.
            $('#brush-size').slideToggle(500);
            return false;
        });
        
        $('#brush2').click( function () {
            // set brush to chosen lineColor
            lineColor = brushColor;
            console.log(' (in brush) setting color to ' + brushColor);
            // open options for brush size.
            $('#brush-size2').slideToggle(500);
            return false;
        });
        
        
    }

    // push coordinates and linewidth to arrays, dragging decides if connected to previouspoint
    var addClick = function (x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        radius.push(lineWidth);
        clickDrag.push(dragging);
        clickColor.push(lineColor);
        
    }
    
    // 
    var redraw = function () { 
        
        ct.lineJoin = "round";

        // draw stored clicks
        for(var i=0; i < clickX.length; i++) {		
            
            ct.beginPath();
            if (clickDrag[i] && i) {
                ct.moveTo(clickX[i-1], clickY[i-1]);
            }
            else {
                ct.moveTo(clickX[i]-1, clickY[i]);
            }
            ct.lineTo(clickX[i], clickY[i]);
            ct.closePath();
            ct.strokeStyle = clickColor[i];
            ct.lineWidth = radius[i];
            ct.stroke();
            // log('Drawing. clickX:' + clickX[i] + 'clickY:' + clickY[i]);
        }
        
        // alternative drawing tool
        // if(curTool == "crayon") {
        // ct.globalAlpha = 0.4;
        // ct.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
        // }
        // ct.globalAlpha = 1;
    }
    
    
    var log = function (msg) {
        var p = document.getElementById('log');
        p.innerHTML = msg + "\n" + p.innerHTML;
    }
    
    var setLineWidth = function (lw) {
        lineWidth = lw;
    }
    
    var clear = function () {
        ct.clearRect(0, 0, canvasWidth, canvasHeight);
        clickX = [];
        clickY = [];
        radius = [];
        clickColor = [];
        clickDrag = [];
    }
    
    
    return {
    'init' : init,
    }

})();

$(document).ready(function () {
    'use strict';

    fingerPaint.init();
    

    
    
});