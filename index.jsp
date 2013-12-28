<!doctype html>
<html lang="en">
    <head>
        <title>Game</title>
        <meta charset="utf-8">

        <link rel="stylesheet" href="css/alertify.css" />
        <link rel="stylesheet" href="css/alertify.dbzccg.css" />
        <link rel="stylesheet" href="css/dbzccg.css" />
        <link rel="stylesheet" href="css/jquery.qtip.min.css" />

        <script id="skybox_vertex_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxvertexshader.glsl"%>
        </script>
        <script id="skybox_fragment_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxfragmentshader.glsl"%>
        </script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="lib/imagesloaded.pkg.min.js"></script>
        <script type="text/javascript" src="lib/jquery.nicescroll.min.js"></script>
        <script type="text/javascript" src="lib/jquery.qtip.min.js"></script>
        <script type="text/javascript" src="lib/alertify.min.js"></script>
        <script type="text/javascript" src="lib/three.min.js"></script>
        <script type="text/javascript" src="lib/MTLLoader.js"></script>
        <script type="text/javascript" src="lib/OBJMTLLoader.js"></script>
        <script type="text/javascript" src="lib/JSONLoader.js"></script>
        <script type="text/javascript" src="lib/OrbitControls.js"></script>
        <script type="text/javascript" src="lib/tween.min.js"></script>
        <script type="text/javascript" src="lib/MathHelper.js"></script>
        <script type="text/javascript" src="game/Card.js"></script>
        <script type="text/javascript" src="game/Personality.js"></script>
        <script type="text/javascript" src="game/MainPersonality.js"></script>
        <script type="text/javascript" src="game/Deck.js"></script>
        <script type="text/javascript" src="game/LifeDeck.js"></script>
        <script type="text/javascript" src="game/Player.js"></script>
        <script type="text/javascript" src="game/Table.js"></script>
        <script type="text/javascript" src="game/Screen.js"></script>
        <script type="text/javascript" src="game/DBZCCG.js"></script>
        <script type="text/javascript">
            function getKeyByValue(object, value) {
            for (var prop in object) {
            if (object[ prop ] === value)
            return prop;
            }
            }

            $(document).ready(function() {
                $('.niceScrollBar').niceScroll({autohidemode: false});
                DBZCCG.create();
            });
        </script>

    </head>
    <body id='body' style="margin: 0; overflow: hidden;" oncontextmenu="return false;">
        <h1 id="loadingText">Loading!!!!</h1>
        <div id='hud'>
        </div>

        <div id="toolbar">
            <div id="log-btn" class="btn">
            </div>
        </div>
        
        <div id="rightBar">
            <div class='btn close-btn' title='Close' id='closeRightBar'>
            </div>
            
            <div id="logBox" class="niceScrollBar">
            </div>
            
        </div>

        <div id="turnCounter">
            <div id="turnOrder">
                <span title="Draw Phase" id="drawPhase">Draw</span> > 
                <span title="Non-Combat Phase" id="nonCombatPhase">N-CMB</span> > 
                <span title="Power-Up Phase" id="PURPhase">PUR</span> >
                <span title="Declare Phase" id="declarePhase">DCLR</span> > 
                <span title="Combat Phase" id="combatPhase">CMB</span> >
                <span title="Discard Phase" id="discardPhase">DCRD</span> >
                <span title="Rejuvenation Phase" id="rejuvenationPhase">RJV</span> </div>
            <div id="turnTitle">TURN</div>
            <div id="turnCounterNumber">0</div>
        </div>

        <div id="leftBar">
            <div class='btn close-btn' title='Close' id='closeLeftBar'>
            </div>

            <div id='descriptionBox'>
            </div>

            <div id='descriptionBoxContent' class="niceScrollBar">
            </div>
        </div>

        <div id="leftBarWindow">
        </div>

        <div id="rightBarWindow">
        </div>

    </body>
</html>