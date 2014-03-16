<!doctype html>
<html lang="en">
    <head>
        <title>Game</title>
        <meta charset="utf-8">

        <style type="text/css">
            <jsp:include page="build/dbzccg.min.css" />
        </style>
        
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

        <div id='hud'>
        </div>

        <div id='communication-box'>
            <button class='chat-button'>Chat</button>
            <button class='log-button'>Log</button>
            <button class='hide-button'>Hide</button>
            <div id='chat-box'>
                <div id='chat-entries'>
                </div>
                <input id='chat-input' type='text' />
                <button id="chat-submit">Send</button>
            </div>
            <div id='logBox'>
            </div>
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
            <div id="effect-btn" class="btn">
            </div>
            <div id="pass-btn" class="btn">
            </div>
            <div id="log-btn" class="btn">
            </div>
            <div id="sound-btn" class="btn sound-off">                
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

        <script>
            <jsp:include page="build/dbzccg.min.js" />
        </script>
        
        <!-- libs that require callbacks -->
        <script src="http://www.youtube.com/iframe_api"></script>

        <script type="text/javascript">
            $(window).load(function() {
                DBZCCG.create();
            });
        </script>

    </body>
</html>