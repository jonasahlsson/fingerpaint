<!doctype html>
<html lang='en' class='no-js'>

<head>
<meta charset='utf-8' />
<title>Måla med fingerfärg</title>
<link rel='icon' href='../img/favicon.ico'>
<link rel="stylesheet/less" type="text/css" href="style.less">
<script type="text/javascript">                                   
console.log("Setting development mode for less compiler.");       
less = {                                                           
  env: 'development',                                             
  dumpLineNumbers: "all"                                           
};                                                                 
</script>
<script src="../js/less.min.js"></script>
<script src="../js/modernizr.js"></script>
</head>

<body>
 
<div id='flash'>
<p>Måla med fingerfärg</p>

<canvas id="drawingCanvas" width="900" height="600" >
  Din browser saknar stöd för canvas.
</canvas>
<div id='controls'>
  <ul>
    <li>
      <div>
        <img id='brush' src='img/Brush-64.png'> 
        <div id='brush-size'>
          <img class='brush-small' src='img/small-dot.png'> <img class='brush-medium' src='img/medium-dot.png'> <img class='brush-large' src='img/large-dot.png'>
        </div>  
      </div>    
    </li>
    <li><img id='color-picker' src='img/Paint-Palette-Filled-64.png'></li>
    <li><img id='eraser' src='img/Erase-64.png'></li>
    <li><img id='add-img' src='img/Add-Image-64.png'></li>
    <li><img id='clear' src='img/Delete-File-64.png'></li>
  </ul>  


<div id='controls2'>  



  <div style='position:relative;'>
    <img id='brush2' src='img/Brush-64.png'>
    <div  id='brush-size2'>
      <img class='brush-small' src='img/small-dot.png'> <img class='brush-medium' src='img/medium-dot.png'> <img class='brush-large' src='img/large-dot.png'>
    </div>    
  </div>
  <img id='color-picker' src='img/Paint-Palette-Filled-64.png'>
  <img id='eraser' src='img/Erase-64.png'>
  <img id='add-img' src='img/Add-Image-64.png'>
  <img id='clear' src='img/Delete-File-64.png'>

</div>
  
  
  
  
  
  <ul>
    <li><img id='red' src='img/splash-red-b-64.png'></li>
    <li><img id='blue' src='img/splash-blue-64.png'></li>
    <li><img id='black' src='img/splash-black-64.png'></li>
   
    
  </ul>
  
  <!--<button id='black'>Svart</button><button id='red'>Röd</button><button id='blue'>Blå</button>-->
</div>

 
<footer id='footer'>
 
<nav>Validatorer: 
  <a href='http://validator.w3.org/check/referer'>HTML5</a>
  <a href='http://jigsaw.w3.org/css-validator/check/referer?profile=css3'>CSS3</a>
  <a href='http://validator.w3.org/unicorn/check?ucn_uri=referer&amp;ucn_task=conformance'>Unicorn</a>
  <a href='http://csslint.net/'>CSS-lint</a>
  <a href='http://jslint.com/'>JS-lint</a>
</nav>
 
</footer>

<script src="../js/jquery.js"></script>
<script src="../incl/joah.js"></script>
<script src="../js/jquery.animate-colors.js"></script>
<script src="main.js"></script>
<script src="../js/jquery.mylightbox.js"></script>
<script src="../js/navbar_wobble.js"></script>
<script src="../js/box9.js"></script>

</body>
</html>