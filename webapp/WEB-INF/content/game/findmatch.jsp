<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="ju" uri="/WEB-INF/tld/Json.tld"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="central-main-content">

    <h2>Find match</h2>

    <c:choose>
        <c:when test="${fn:length(decks) > 0}">
            <div class='row'>
                <div class='col-md-12'>
                    <h3>My Deck</h3>
                    <h3 class="form-error" id="match-find-eligible-result"></h3>
                    <select name="selected-deck" id="select-deck-match" class="form-control">
                        <c:forEach var="ref" items="${decks}">
                            <option data-eligible='${ju:toJson(ref.eligible)}' value='${ref.deck.id}'>${ref.deck.displayName}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>

            <div class='row'>
                <div class='col-md-12'>
                    <h3>Physical Attack Table</h3>
                    <select name="selected-pat" id="select-pat-match" class="capitalize form-control">
                        <c:forEach var="ref" items="${pats}">
                            <option value='${ref}'>${fn:toLowerCase(fn:replace(ref, "_", " "))}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>

            <div class='row'>
                <div id="game-mode-box" class='col-md-12'>
                    <h3>Game Modes</h3>

                    <c:forEach items="${collectionTypes}" var="type">
                        <label class="checkbox-inline">
                            <input value='${type.value}' type="checkbox"> ${type.key}
                        </label>
                    </c:forEach>

                </div>
            </div>

            <div class='row'>
                <div id="opponents-mode-box" class='col-md-12'>
                    <h3>Opponents (${usersOnline} players online)</h3>

                    <c:forEach items="${matchTypes}" var="type">
                        <label class="checkbox-inline">
                            <input value="${type.value}" type="checkbox"> ${type.key}
                        </label>
                    </c:forEach>

                </div>
            </div>

            <div class='row margin-top-1'>
                <div class='col-md-12'>
                    <button id='find-match-btn' class='btn btn-default'>Find Match</button>
                </div>
            </div>

            <script>
                
                function checkEligibility(eligible) {
                    $('#match-find-eligible-result').text('');
                    var ret = true;
                    var checks = $('#game-mode-box').find('input:checked');
                    var notEligible = [];
                    for(var i = 0; i < checks.length && ret; i++) {
                        if(eligible[$(checks[i]).val()] !== true) {
                            notEligible.push($(checks[i]).parent().text());
                            ret = false;
                        }
                    }
                    
                    if(notEligible.length > 0) {
                        $('#match-find-eligible-result').text('Deck ' + $("#select-deck-match").find(":selected").text() + ' is not eligible to play these types: ' + notEligible.toString().replace(",", ", "));
                    }
                    
                    return ret;
                }
                
                function updateFindButton() {
                    var eligible = JSON.parse($("#select-deck-match").find(":selected").attr("data-eligible"));
                    if (!checkEligibility(eligible) ||
                            $('#game-mode-box').find('input:checked').length === 0 ||
                            $('#opponents-mode-box').find('input:checked').length === 0) {
                        $('#find-match-btn').prop('disabled', true);
                    } else {
                        $('#find-match-btn').prop('disabled', false);
                    }
                }

                $('#select-deck-match').change(updateFindButton);
                $('#game-mode-box').find('input[type="checkbox"]').change(updateFindButton);
                $('#opponents-mode-box').find('input[type="checkbox"]').change(updateFindButton);

                $('#select-deck-match').trigger('change');

                $('#find-match-btn').click(function() {
                    var o = {
                        types: $('#opponents-mode-box').find('input[type="checkbox"]:checked').map(function() {
                            return $(this).val();
                        }).get(),
                        validCollections: $('#game-mode-box').find('input[type="checkbox"]:checked').map(function() {
                            return $(this).val();
                        }).get(),
                        pat: $('#select-pat-match').val()
                    };

                    DBZCCG.Network.wrapper.receive('/user${matchAlertQueueReady}', function(r) {
                        var answerChannel = '${matchAlertAnswer}';
                        var feedbackChannel = '/user${matchAlertFeedback}';

                        var htmlSelectWindow = '<h4 class="match-ready-title">Your game is ready</h4>\
                        <div class="match-ready-expire-timer">Expire timer: <span class="match-ready-expire-timer-number">${queueAlertTimeLimit/1000}</span></div>\
                        <div class="row match-ready-button-row"><div class="col-md-6"><button onclick="DBZCCG.Match.answerQueue(this);" class="btn btn-primary" data-val="true">ACCEPT</button>\
                        </div><div class="col-md-6"><button onclick="DBZCCG.Match.answerQueue(this);" class="btn btn-danger" data-val="false">DECLINE</button></div></div>';

                        DBZCCG.Interface.toggleModalProgress();

                        var titles = [document.title, 'Your Match is ready'];

                        setTimeout(function() {
                            var currTitle = 1;

                            var timestamp = new Date().getTime();
                            var endingTimestamp = timestamp + ${queueAlertTimeLimit};

                            DBZCCG.Match.answerQueue = function(elem) {
                                var op = $(elem).attr('data-val');
                                DBZCCG.Match.endQueue(op);
                                DBZCCG.Network.wrapper.send(answerChannel, {}, op);
                                DBZCCG.Match.answerQueue = null;
                            };

                            DBZCCG.Match.endQueue = function(op) {
                                document.title = titles[0];
                                $('#dbz-interface-select-modal').modal('hide');
                                if (op !== "false") {
                                    DBZCCG.Interface.toggleModalProgress("Preparing match...");
                                } else {
                                    feedbackSub.unsubscribe();
                                }
                                clearInterval(updateAlertStats);
                                DBZCCG.Match.endQueue = null;
                            };

                            var feedbackSub = DBZCCG.Network.wrapper.receive(feedbackChannel, function(r) {
                                var ret = JSON.parse(r.body);
                                DBZCCG.Interface.toggleModalProgress();
                                if (ret) {
                                    alert('starting match');
                                } else {
                                    $('#find-match-btn').trigger('click');
                                }
                            });

                            DBZCCG.Interface.selectWindow(htmlSelectWindow);

                            var updateAlertStats = setInterval(function() {
                                document.title = titles[++currTitle % titles.length];

                                var stat = ((endingTimestamp - new Date().getTime()) / 1000).toFixed(1);
                                if (stat <= 0) {
                                    DBZCCG.Match.endQueue("false");
                                    alert('You did not answered the alert and have been removed from the queue.');
                                } else {
                                    $('.match-ready-expire-timer-number').html(stat);
                                }
                            }, 100);
                        }, 30);
                    });

                    DBZCCG.Interface.toggleModalProgress("Finding match...");

                    DBZCCG.Network.wrapper.send("${matchJoinQueue}",
                            {
                                deckId: $('#select-deck-match').val()
                            },
                    o);
                });
            </script>

        </c:when>
        <c:otherwise>
            No decks yet!
        </c:otherwise>
    </c:choose>
</div>