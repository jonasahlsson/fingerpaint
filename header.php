<!doctype html>
<html lang='en' class='no-js'>
<head>
<meta charset='utf-8' />
<title><?=isset($title) ? $title : 'Fingerpaint'?></title>
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

<div id='wrapper'>

<div id='big-logo'>
  <img src='img/fingerpaint-1.png' alt='big logo'>
</div>  

<nav class=navbar>
  <ul>
    <li><a href='../fingerpaint' <?php if (basename($_SERVER['PHP_SELF']) == 'index.php'){ echo "class='selected'";}; ?>>Rita</a></li>
    <li><a href='present.php' <?php if (basename($_SERVER['PHP_SELF']) == 'present.php'){ echo "class='selected'";}; ?>>Presentation</a></li>
    <li><a href='compare.php' <?php if (basename($_SERVER['PHP_SELF']) == 'compare.php'){ echo "class='selected'";}; ?>>Konkurrentanalys</a></li>
    <li><a href='install.php' <?php if (basename($_SERVER['PHP_SELF']) == 'install.php'){ echo "class='selected'";}; ?>>Installation</a></li>
  </ul>
</nav>  
