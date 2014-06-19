<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

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

<div class='modal-post-game' id='modal-post-game-bg'>
</div>
<h2 class='modal-post-game' id='modal-post-game-title'>GAME OVER</h2>
<c:if test="${playerData != null}">
<h2 class='modal-post-game' id='modal-post-game-msg'>YOU HAVE BEEN GRANTED <img src="images/icons/token-currency-icon.png" /> 3</h2>
</c:if>


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

<div id="turnCounter">
    <div id="turnOrder">
        <ol class="breadcrumb">
            <li><span title="Draw Phase" id="draw-phase">Draw</span></li>
            <li><span title="Non-Combat Phase" id="noncombat-phase">N-CMB</span></li>
            <li><span title="Power-Up Phase" id="pur-phase">PUR</span></li>
            <li><span title="Declare Phase" id="declare-phase">DCLR</span></li>
            <li><span title="Combat Phase" id="combat-phase">CMB</span></li>
            <li><span title="Discard Phase" id="discard-phase">DCRD</span></li>
            <li><span title="Rejuvenation Phase" id="rejuvenation-phase">RJV</span></li>
        </ol>
    </div>
    <div id="turnTitle">TURN</div>
    <div id="turnCounterNumber" class="badge">0</div>
</div>

<script type="text/javascript">
    (function() {
//    <  jsp:include page="../../lib/BufferGeometryUtils.js" />
        $(window).ready(function() {
            /* DEBUG */
            window.DBZCCG = DBZCCG;
            window.THREE = THREE;
            window.MathHelper = MathHelper;
            window.TWEEN = TWEEN;

            window.toHand = function(code, player) {
                var card = DBZCCG.Card.createCard(code);
                DBZCCG.mainScene.add(card.display);
                DBZCCG.table.players[player].hand.addCard([card], true);
            };
            /* END OF DEBUG */

            DBZCCG.Interface.toggleModalProgress("Loading source data...");

            var sourceLoadInterval = window.setInterval(function() {

                if (DBZCCG.Load.sourceCardFetch) {
                    
                    DBZCCG.Load.heartBeatUrl = "<c:url value="game/match/heartbeat" />";
                    DBZCCG.Load.afterMatchUrl = "<c:url value="game/match/end" />";
    <c:choose>
        <c:when test="${playerData != null}">
                        console.log("LOADING USER DATA");
                        $.ajax({
                            url: "<c:url value="game/matchdata" />/${playerData}",
                            dataType: "json"
                        })

                                .done(function(obj) {
                            DBZCCG.Interface.toggleModalProgress();
                            DBZCCG.create(obj);
                        })

                                .fail(function() {
                            alert("Failed to load the player data!");
                        });
        </c:when>
        <c:otherwise>
                            DBZCCG.Interface.toggleModalProgress();
                            DBZCCG.create();
        </c:otherwise>
    </c:choose>
                        window.clearInterval(sourceLoadInterval);
                    }
                }, 1000);
            });
        })();
</script>

<!-- libs that require callbacks -->
<!--<script src="http://www.youtube.com/iframe_api"></script>-->