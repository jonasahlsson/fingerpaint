<?php $title='Installation - Fingerpaint'; include(__DIR__ . '/header.php'); ?>

<h1>Installation</h1>

  <p>Fingerpaint kräver en webbläsare med stöd för canvas och att JavaScript är aktiverat för att fungera.</p>    
    
  <h2>Installera och skapa din egen Fingerpaint</h2>
  <p>Skapa din egen applikation baserad på källkoden i fingerpaint. Länka fingerpaint.js, läsa in style.css, göra jQuery tillgängligt och lägg till HTML-element som används av Fingerpaint (rityta och meny).</p>
  
  <h3>Länka fingerpaint.js</h3>
  <p> Länka scriptet med</p>
  
  <blockquote><code>&lt;script src="fingerpaint.js"&gt;&lt;/script&gt;</code></blockquote>    
  
  <h3>Stylesheet - CSS</h3>
  <p> Läs in tillhörande CSS med följande kodrad:</p>
  
  <blockquote><code>&lt;link rel="stylesheet" type="text/css" href="style.css"&gt;&lt;/link&gt;</code></blockquote>
  
  <h3>Tillgång till jQuery</h3>
  <p> jQuery kan göras tillgängligt med följande rad i din HTML ( Placera koden före scriptet fingerpaint.js ):</p>
  
  <blockquote><code>&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"&gt;&lt;/script&gt;</code></blockquote>
    

<?php include(__DIR__ . '/footer.php'); ?>