<!doctype html>
<html lang="en">
    <head>
        <title>Game</title>
        <meta charset="utf-8">

        <script id="skybox_vertex_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxvertexshader.glsl"%>
        </script>
        <script id="skybox_fragment_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxfragmentshader.glsl"%>
        </script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="lib/three.min.js"></script>
        <script type="text/javascript" src="lib/JSONLoader.js"></script>
        <script type="text/javascript" src="lib/OrbitControls.js"></script>
        <script type="text/javascript" src="lib/tween.min.js"></script>
        <script type="text/javascript" src="lib/MathHelper.js"></script>
        <script type="text/javascript" src="game/Card.js"></script>
        <script type="text/javascript" src="game/Personality.js"></script>
        <script type="text/javascript" src="game/MainPersonality.js"></script>
        <script type="text/javascript" src="game/LifeDeck.js"></script>
        <script type="text/javascript" src="game/Player.js"></script>
        <script type="text/javascript" src="game/Table.js"></script>
        <script type="text/javascript" src="game/Screen.js"></script>
        <script type="text/javascript" src="game/DBZCCG.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                new DBZCCG();
            });
        </script>
        
    </head>
    <body id='body' style="margin: 0; overflow: hidden;">
    </body>
</html>