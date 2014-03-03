<!doctype html>
<html lang="en">
    <head>
        <title>Game</title>
        <meta charset="utf-8">

        <link rel="stylesheet" href="css/dbzccg.css" />
        <link rel="stylesheet" href="css/jquery.qtip.min.css" />
        <link rel="stylesheet" href="css/jqueryui/jquery-ui-1.9.2.custom.min.css" />

        <script id="skybox_vertex_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxvertexshader.glsl"%>
        </script>
        <script id="skybox_fragment_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxfragmentshader.glsl"%>
        </script>

    </head>

    <body id='body' style="margin: 0; overflow: hidden;" oncontextmenu="return false;">

        <div id="renderer-wrapper">
        </div>

        <div id="object-info">
            <div id='display-object-screen' style='width: 35%; height: 100%; float: left;'>
            </div>

            <div style='text-align: justify; width: 65%; float: left;'>
                <div id='descriptionBox'>
                </div>

                <div id='descriptionBoxContent'>
                </div>
            </div>

            <div style='clear: both;'></div>
        </div>

        <h1 id="loadingText">Loading!!!!</h1>

        <!-- libs -->
        <script src="lib/jquery.min.js"></script>
        <script src="lib/jquery-ui-1.9.2.custom.min.js"></script>
        <script src="lib/annyang.min.js"></script>
        <script src="lib/mousetrap.min.js"></script>
        <script src="lib/ClassHelper.js"></script>
        <script src="lib/imagesloaded.pkg.min.js"></script>
        <script src="lib/jquery.nicescroll.min.js"></script>
        <script src="lib/jquery.qtip.min.js"></script>
        <script src="lib/three.min.js"></script>
        <script src="lib/stats.min.js"></script>
        <script src="lib/MTLLoader.js"></script>
        <script src="lib/OBJLoader.js"></script>
        <script src="lib/OBJMTLLoader.js"></script>
        <script src="lib/JSONLoader.js"></script>
        <script src="lib/OrbitControls.js"></script>
        <script src="lib/tween.min.js"></script>
        <script src="lib/MathHelper.js"></script>
        <script src="lib/ThreeHelper.js"></script>
        <script src="lib/numeral.min.js"></script>
        <script src="lib/buzz.min.js"></script>
        <script src="lib/lowlag.js"></script>
        <script src="lib/sm2/js/soundmanager2-jsmin.js"></script>

        <!-- game -->
        <script src="game/DBZCCG.js"></script>
        <script src="game/Dragonball.js"></script>
        <script src="game/Callbacks.js"></script>
        <script src="game/Card.js"></script>
        <script src="game/Personality.js"></script>
        <script src="game/Screen.js"></script>
        <script src="game/Combat.js"></script>
        <script src="game/SaiyanSaga.js"></script>
        <script src="game/FriezaSaga.js"></script>
        <script src="game/Album.js"></script>
        <script src="game/Interface.js"></script>

        <!-- libs that require callbacks -->
        <script src="http://www.youtube.com/iframe_api"></script>

        <script type="text/javascript">
            $(document).ready(function() {
            DBZCCG.album('saiyan', 'foil');
            });
        </script>

    </body>
</html>