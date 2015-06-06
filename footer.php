<footer id='footer'>
    
<?php
  $path=__DIR__;  
  //$d = explode("/", trim($path, "/"));
  $d = explode(DIRECTORY_SEPARATOR, trim($path, DIRECTORY_SEPARATOR));
  $srcUrl = '../source.php?dir=' . end($d) . '&amp;file=' . basename($_SERVER["PHP_SELF"]) . '#file';
?>
<p>Här är <a href='<?=$srcUrl?>'>källkoden</a></p>

<p>&copy; Jonas Ahlsson 2015</p>


<nav>Validatorer: 
  <a href='http://validator.w3.org/check/referer'>HTML5</a>
  <a href='http://jigsaw.w3.org/css-validator/check/referer?profile=css3'>CSS3</a>
  <a href='http://validator.w3.org/unicorn/check?ucn_uri=referer&amp;ucn_task=conformance'>Unicorn</a>
  <a href='http://csslint.net/'>CSS-lint</a>
  <a href='http://jshint.com/'>JS-hint</a>
</nav>
 
</footer>

</div>

</body>
</html>