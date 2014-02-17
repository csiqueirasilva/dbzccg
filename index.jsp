<!doctype html>
<html lang="en">
    <head>
        <title>Game</title>
        <meta charset="utf-8">

        <link rel="stylesheet" href="css/alertify.css" />
        <link rel="stylesheet" href="css/alertify.dbzccg.css" />
        <link rel="stylesheet" href="css/dbzccg.css" />
        <link rel="stylesheet" href="css/jquery.qtip.min.css" />
        <link rel="stylesheet" href="css/jqueryui/theme-1.10.3.css" />

        <script type="x-shader/x-fragment" id="skybox-shader-vs" src="util/fs">
            <%@include file="game/skyboxvertexshader.glsl"%>
        </script>

        <script type="x-shader/x-fragment" id="skybox-shader-fs" src="util/fs">
            <%@include file="game/skyboxfragmentshader.glsl"%>
        </script>

    </head>

    <body id='body' style="margin: 0; overflow: hidden;" oncontextmenu="return false;">

        <div id="renderer-wrapper">
            <div class="phase-warn" id="draw-phase-warn"></div>
            <div class="phase-warn" id="discard-phase-warn"></div>
            <div class="phase-warn" id="declare-phase-warn"></div>
            <div class="phase-warn" id="combat-phase-warn"></div>
            <div class="phase-warn" id="rejuvenation-phase-warn"></div>
            <div class="phase-warn" id="noncombat-phase-warn"></div>
            <div class="phase-warn" id="pur-phase-warn"></div>
        </div>

        <h1 id="loadingText">Loading!!!!</h1>
        <div id='hud'>
        </div>

        <div id='modal-post-game'>
            <h2>GAME OVER</h2>
        </div>

        <div id="toolbar">
            <div id="final-physical-btn" class="btn">
            </div>
            <div id="rejuvenate-btn" class="btn">
            </div>
            <div id="capture-btn" class="btn">
            </div>
            <div id="combat-btn" class="btn">
            </div>
            <div id="pass-btn" class="btn">
            </div>
            <div id="log-btn" class="btn">
            </div>
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

        <div id="log-dialog">
            <div id="logBox">
            </div>
        </div>

        <div id="turnCounter">
            <div id="turnOrder">
                <span title="Draw Phase" id="draw-phase">Draw</span> > 
                <span title="Non-Combat Phase" id="noncombat-phase">N-CMB</span> > 
                <span title="Power-Up Phase" id="pur-phase">PUR</span> >
                <span title="Declare Phase" id="declare-phase">DCLR</span> > 
                <span title="Combat Phase" id="combat-phase">CMB</span> >
                <span title="Discard Phase" id="discard-phase">DCRD</span> >
                <span title="Rejuvenation Phase" id="rejuvenation-phase">RJV</span> </div>
            <div id="turnTitle">TURN</div>
            <div id="turnCounterNumber">0</div>
        </div>

        <script id="skybox_vertex_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxvertexshader.glsl"%>
        </script>
        <script id="skybox_fragment_shader" type="x-shader/x-fragment">
            <%@include file="game/skyboxfragmentshader.glsl"%>
        </script>
        <!-- libs -->
        <script type="text/javascript" src="lib/annyang.min.js"></script>
        <script type="text/javascript" src="lib/jquery.min.js"></script>
        <script type="text/javascript" src="lib/jquery-ui-1.10.3.custom.min.js"></script>
        <script type="text/javascript" src="lib/mousetrap.min.js"></script>
        <script type="text/javascript" src="lib/ClassHelper.js"></script>
        <script type="text/javascript" src="lib/imagesloaded.pkg.min.js"></script>
        <script type="text/javascript" src="lib/jquery.nicescroll.min.js"></script>
        <script type="text/javascript" src="lib/jquery.qtip.min.js"></script>
        <script type="text/javascript" src="lib/alertify.min.js"></script>
        <script type="text/javascript" src="lib/three.min.js"></script>
        <script type="text/javascript" src="lib/stats.min.js"></script>
        <script type="text/javascript" src="lib/MTLLoader.js"></script>
        <script type="text/javascript" src="lib/OBJMTLLoader.js"></script>
        <script type="text/javascript" src="lib/JSONLoader.js"></script>
        <script type="text/javascript" src="lib/OrbitControls.js"></script>
        <script type="text/javascript" src="lib/tween.min.js"></script>
        <script type="text/javascript" src="lib/MathHelper.js"></script>
        <script type="text/javascript" src="lib/numeral.min.js"></script>
        <!-- game -->
        <script type="text/javascript" src="game/DBZCCG.js"></script>
        <script type="text/javascript" src="game/Log.js"></script>
        <script type="text/javascript" src="game/Callbacks.js"></script>
        <script type="text/javascript" src="game/Dragonball.js"></script>
        <script type="text/javascript" src="game/Card.js"></script>
        <script type="text/javascript" src="game/Combat.js"></script>
        <script type="text/javascript" src="game/Personality.js"></script>
        <script type="text/javascript" src="game/MainPersonality.js"></script>
        <script type="text/javascript" src="game/Pile.js"></script>
        <script type="text/javascript" src="game/DiscardPile.js"></script>
        <script type="text/javascript" src="game/RemovedPile.js"></script>
        <script type="text/javascript" src="game/CardGroup.js"></script>
        <script type="text/javascript" src="game/LifeDeck.js"></script>
        <script type="text/javascript" src="game/Player.js"></script>
        <script type="text/javascript" src="game/Table.js"></script>
        <script type="text/javascript" src="game/Screen.js"></script>
        <script type="text/javascript" src="game/SaiyanSaga.js"></script>
        <script type="text/javascript" src="game/General.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
            $('.niceScrollBar').niceScroll({autohidemode: false});

            $('#log-dialog').dialog({
            autoOpen: false,
            closeOnEscape: true,
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.6,
            title: 'Log',
            open: function () {
            $('#log-dialog')[0].style.cursor = 'auto';
            }
            });

            $('#object-info').dialog({
            autoOpen: false,
            closeOnEscape: true,
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.6,
            title: 'Information',
            open: function () {
            $('#object-info')[0].style.cursor = 'auto';
            }
            });

            DBZCCG.create();
            });
        </script>

    </body>
</html>