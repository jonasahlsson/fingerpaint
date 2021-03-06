<?php $title='Måla, lek var kreativ - Fingerpaint'; include(__DIR__ . '/header.php'); ?>
 

<h1>Fingerpaint - Måla, lek var kreativ med färg och bild</h1>

<canvas id="drawingCanvas" width="918" height="400" >
  Din browser saknar stöd för canvas.
</canvas>
<div id='controls'>
  <ul>
    <li>
      <div id='brush-container'>
        <img id='brush' src='img/Brush-64.png'> 
        <div id='brush-size'>
          <img class='brush-small' src='img/circle.svg'> <img class='brush-medium' src='img/circle-filled.svg'> <img class='brush-large' src='img/circle.svg'>
        </div>  
      </div>    
    </li>
    <li>      
      <div id='color-picker-container'>
        <img id='color-picker' src='img/Paint-Palette-Filled-64.png'>
        <div id='color-selection'>
          <img id='black' class='color-splash' src='img/black-splash.svg'>
          <img id='red' class='color-splash' src='img/red-splash.svg'>
          <img id='blue' class='color-splash' src='img/blue-splash.svg'>
          <img id='green'  class='color-splash' src='img/green-splash.svg'>  
        </div>
      </div> 
    </li>  
    <li><img id='eraser' src='img/Erase-64.png'></li>
    <li>
      <div id='add-img-container'>  
        <img id='add-img' src='img/Add-Image-64.png'>
        <div id='img-selection'>
          
        </div>
      </div>
    </li>  
    <li><a href="#"  id="download-link" download="my-drawing.png" ><img src='img/Download-64.png'></a></li>
    <li>
      <div id='clear-container'>
        <img id='clear' src='img/Delete-File-64.png'>
        <div id='clear-confirmation'>
          <img id='clear-delete' src='img/Checked-Checkbox-64.png'>
          <img id='clear-stay' src='img/Close-Window-64.png'>
        </div>
      </div>
    </li>
  </ul>
  <span id='link-icon8'>Icons from <a href='https://icons8.com/'>Icons8</a> och clipart från <a href='http://www.clker.com/'>Clker</a>.</span>
</div>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="fingerpaint.js"></script>

<?php include(__DIR__ . '/footer.php'); ?>
