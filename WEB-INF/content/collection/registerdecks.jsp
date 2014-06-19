<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<%@include file="../../template/internal-style-fix.jspf" %>

<c:if test="${not publicContent}">
    <ol class="breadcrumb">
        <li>Collection</li>
        <li><a href='<c:url value="collection/decks" />'>Decks</a></li>
        <li class="active">Registering a deck</li>
    </ol>

    <div class="row">
        <div class="col-md-3">
            <button type="button" id="deck-build-remove-deck" class="btn btn-xl btn-default"><span class="glyphicon glyphicon-remove"></span>Remove Deck</button>
        </div>
    </div>

    <script>
        window.InterfaceDBZ.removeDeckFromDatabase = function() {
            $('#dbz-interface-select-modal').children('button').prop('disabled', true);

            $.ajax({
                url: '<c:url value="collection/decks/remove" />',
                type: 'POST',
                dataType: 'json',
                data: {id: '${deck.id}'}
            })

                    .fail(function(error) {
                alert('An error happened. Your deck was not removed.');
                $('#dbz-interface-select-modal').children('button').prop('disabled', false);
            })

                    .done(function(data) {
                console.log(data);
                if (data) {
                    alert('Deck was removed.');
                    window.location.href = "<c:url value="collection/decks"/>";
                } else {
                    alert('Deck was not removed.');
                }
                $('#dbz-interface-select-modal').modal('hide');
            });
        };

        $('#deck-build-remove-deck').click(function() {
            var buttons = '<h4>Are you sure want to delete the deck?</h4>';
            buttons += '<div class="row"><div class="col-md-6"><button onclick="InterfaceDBZ.removeDeckFromDatabase();" class="btn btn-primary">Yes</button>';
            buttons += '</div><div class="col-md-6"><button onclick="$(\'#dbz-interface-select-modal\').modal(\'hide\');" class="btn btn-danger">No</button></div></div>';
            InterfaceDBZ.selectWindow(buttons);
        });
    </script>
</c:if>

<div class="row deck-build-search-results">
    <div class="deck-build-table col-md-6" id="complete-search-form">
    </div>

    <div class="deck-build-table col-md-6">
        <div class="row">
            <div class="col-md-12">
                <h2 id="deck-build-deck-name"><span id="deck-build-deck-name-pure">${deck.displayName}</span> (<span id="deck-build-main-counter" class="deck-build-counter">0</span>)</h2>
                <input value="${deck.displayName}" type="text" style='display:none;' id='deck-build-deck-name-input' class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" id="deck-build-sheet">
                <hr />

                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-mainpersonality-box">
                                <h5>Main Personality <span id='deck-build-alignment-box'></span> (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-mastery-box">
                                <h5>Mastery (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-sensei-box">
                                <h5>Sensei (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-sensei-deck-box">
                                <h5>Sensei Deck (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-dragonball-box">
                                <h5>Dragonballs (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-ally-box">
                                <h5>Allies (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-drill-box">
                                <h5>Drills (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                    </div>

                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-noncombat-box">
                                <h5>Non-Combats (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-combat-box">
                                <h5>Combats (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-energy-box">
                                <h5>Energy Combats (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-physical-box">
                                <h5>Physical Combats (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-location-box">
                                <h5>Locations (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 deck-build-box" id="deck-build-battleground-box">
                                <h5>Battlegrounds (<span class="deck-build-counter">0</span>)</h5>
                                <hr />
                            </div>
                        </div>

                    </div>
                </div>

                <hr />
            </div>
        </div>

        <div class="row">
            <div class="col-md-12" id="deck-build-card-list">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Card</th>
                            <th class="deck-build-table-header-medium">Quantity</th>
                            <th class="deck-build-table-header-small">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="deck-build-table-no-cards" colspan="3">
                                <span>No cards yet</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
    (function() {

        var deckId = parseInt('${deck.id}');
        deckId = isNaN(deckId) ? null : deckId;
        var readyToSave = false;

        function updateUrlData() {
            o = {};

            if (deckId) {
                o.id = deckId;
            } 
            
            o.cards = [];
            o.mainPersonality = [];
            o.alignment = $('#deck-build-mainpersonality-box').attr('data-alignment');
            o.name = $('#deck-build-deck-name-pure').html();
            var allCards = $('.deck-build-card-entry-row');
            for (var i = 0; i < allCards.length; i++) {
                var qtt = $(allCards[i]).find('.deck-build-card-counter');
                var card = $(allCards[i]).find('.card-info-link');

                var cardRef = {
                        qtt: qtt.html(),
                        id: card.attr('cached-id'),
                        foil: /* card.hasClass('card-info-link-foil') - It has to fetch the exact foil type */ null,
                        proxy: card.hasClass('card-info-link-proxy')
                    };

                if($(allCards[i]).parents("#deck-build-mainpersonality-box").length === 0) {
                    o.cards.push(cardRef);
                } else {
                    o.mainPersonality.push(cardRef);
                }
            }

            var stringfied = btoa(JSON.stringify(o));

            window.history.pushState(null, null, '<c:url value="collection/decks/register"/>' + '?d=' + stringfied);
            console.log(o);

            <c:if test="${not publicContent}">
            if(readyToSave) {
                    $.ajax({
                        url: "<c:url value="collection/decks/save"/>",
                        data: {d: stringfied},
                        dataType: "json",
                        method: "POST"
                    })

                    .fail(function() {
                        alert("Failed to update the deck");
                    })

                    .done(function(r) {
                        console.log(r);
                    });
            }
            </c:if>

            return o;
        }

        $(document).ready(function() {
            $.ajax({
                url: '<c:url value="collection/card/proxies" />',
                dataType: 'json',
                type: 'GET'
            })

                    .fail(function() {
                alert('Failed to load proxy list. Redirecting to the index page.');
                window.location.href = '<c:url value="/" />';
            })

                    .done(function(data) {
                window.UserCollection = window.UserCollection.concat(data);

                var deckId = parseInt("${deck.id}");

                $('#deck-build-deck-name').click(function(ev) {
                    $(this).hide();
                    var length = $('#deck-build-deck-name-input').val().length;
                    $('#deck-build-deck-name-input').show().focus()[0].setSelectionRange(length, length);
                });

                $('#deck-build-deck-name-input').blur(function() {
                    if ($(this).val() === '') {
                        $(this).val('Unnamed Deck');
                    }

                    $(this).hide();
                    $('#deck-build-deck-name-pure').html($(this).val());
                    $('#deck-build-deck-name').show();

                    updateUrlData();
                });

                $('#deck-build-deck-name-input').keyup(function(ev) {
                    if (ev.keyCode === 13) {
                        $(this).blur();
                    }
                });


                var linkAdd = '<button type="button" class="btn btn-xs btn-default deck-build-add"><span class="glyphicon glyphicon-plus"></span>Add</button>';
                var eligibleButton = '<button type="button" style="margin-bottom: 1vmin;" class="btn btn-default game-generic-button" id="deck-build-advanced-eligible-only">\
            <i class="glyphicon glyphicon-star"></i><span class="button-text">Eligible</span>\
        </button>\
        <button type="button" style="margin-top: 1vmin; margin-bottom: 1vmin;" class="btn btn-default game-generic-button" id="deck-build-advanced-foil-only">\
            <i class="glyphicon glyphicon-star"></i><span class="button-text">Foil</span>\
        </button>\
        <button type="button" style="margin-top: 1vmin; margin-bottom: 1vmin;" class="btn btn-default game-generic-button" id="deck-build-advanced-altart-only">\
            <i class="glyphicon glyphicon-star"></i><span class="button-text">Alt. Art</span>\
        </button>';

                var customButtonInit = function(doneTyping) {
                    $('#deck-build-advanced-eligible-only').click(function() {
                        $(this).button('toggle');
                        doneTyping();
                    });
                    $('#deck-build-advanced-foil-only').click(function() {
                        $(this).button('toggle');
                        doneTyping();
                    });
                    $('#deck-build-advanced-altart-only').click(function() {
                        $(this).button('toggle');
                        doneTyping();
                    });
                };

                var customButtonMatch = function(results) {

                    if ($('#deck-build-advanced-eligible-only').hasClass('active')) {
                        results = $.grep(results, function(value, key) {
                            var card = window.InterfaceDBZ.fromLinkToCard($(value));
                            var limit;

                            if (card.limit !== undefined && card.limit !== null) {
                                limit = card.limit;
                            } else if (checkPersonality(card) && $('#deck-build-mainpersonality-box').find('.card-info-link').length > 0) {
                                limit = 4;
                            } else {
                                limit = 3;
                            }

                            return checkEligibility({card: card, cardLink: $(value), maxNumber: {html: function() {
                                        return limit;
                                    }}});
                        });
                    }

                    if ($('#deck-build-advanced-foil-only').hasClass('active')) {
                        results = $.grep(results, function(value, key) {
                            return $(value).hasClass('card-info-link-foil');
                        });
                    }

                    if ($('#deck-build-advanced-altart-only').hasClass('active')) {
                        results = $.grep(results, function(value, key) {
                            return $(value).hasClass('card-info-link-altart');
                        });
                    }

                    return results;
                };

                function toDeckObject(button) {
                    var cardLink = $(button).parents('tr').find('.card-info-link');
                    var card = window.InterfaceDBZ.cachedCards[$(cardLink).attr('cached-id')]
                            [$(cardLink).attr('cached-index')];
                    var currentNumber = $(button).siblings('.deck-build-current-number');
                    var maxNumber = $(button).siblings('.deck-build-max-number');

                    return {
                        button: button,
                        card: card,
                        cardLink: cardLink,
                        currentNumber: currentNumber,
                        maxNumber: maxNumber
                    };
                }

                // returns if the card personality
                // matches the main personality
                function checkPersonality(card) {
                    var mainPersonality = [];

                    var ret = false;
                    var endLoop = false;

                    if ($('#deck-build-mainpersonality-box').find('.card-info-link').length === 0) {
                        ret = true;
                    }

                    $('#deck-build-mainpersonality-box').find('.card-info-link').each(function(key, value) {
                        mainPersonality.push(window.InterfaceDBZ.fromLinkToCard(this));
                    });

                    for (var i = 0; i < mainPersonality.length && !endLoop; i++) {
                        for (var j = 0; j < mainPersonality[i].personalities.length && !endLoop; j++) {
                            for (var k = 0; k < card.personalities.length && !endLoop; k++) {
                                if (mainPersonality[i].personalities[j] === card.personalities[k]) {
                                    ret = true;
                                    endLoop = true;
                                }
                            }
                        }
                    }

                    return ret;
                }

                function checkMaxSizeCard(card, button) {
                    var limit;
                    if (card.limit !== undefined && card.limit !== null) {
                        limit = card.limit;
                    } else if (checkPersonality(card) && $('#deck-build-mainpersonality-box').find('.card-info-link').length > 0) {
                        limit = 4;
                    } else {
                        limit = 3;
                    }

                    $(button).html(limit);
                }

                var deckAddedCard = '<div class="row deck-build-card-entry-row"><div class="col-md-12"><span class="deck-build-card-counter">%d%</span>\
                %cardlink%</div></div>';

                function checkEligibility(o) {
                    var ret = true;

                    var currentNumber = 0;

                    $('#deck-build-card-list > table > tbody').find('.card-info-link[cached-number="' + $(o.cardLink).attr('cached-number') + '"][cached-saga="' + $(o.cardLink).attr('cached-saga') + '"]')
                            .parents('tr')
                            .find('.deck-build-current-number').each(function(key, value) {
                        currentNumber += parseInt($(value).html());
                    });

                    if (parseInt(o.maxNumber.html()) <= currentNumber) {
                        ret = false;
                    } else if (ClassHelper.checkValue(o.card.type, window.CardInformation.Type.Personality) && $('#deck-build-mainpersonality-box:Contains(Level)').find('.card-info-link').length > 0) {
                        if (!checkPersonality(o.card)) {

                            var cardLinks = $('#deck-build-mainpersonality-box:Contains(Level)').find('.card-info-link');
                            var maxLevelInDeck = window.InterfaceDBZ.fromLinkToCard($(cardLinks[0]));

                            for (var i = 1; i < cardLinks.length; i++) {
                                var cmpCard = window.InterfaceDBZ.fromLinkToCard($(cardLinks[i]));
                                if (parseInt(maxLevelInDeck.level) < parseInt(cmpCard.level)) {
                                    maxLevelInDeck = cmpCard;
                                }
                            }

                            if (parseInt(o.card.level) > (parseInt(maxLevelInDeck.level) - 2) ||
                                    ($('#deck-build-mainpersonality-box').attr('data-alignment') !== undefined &&
                                            o.card.alignment !== parseInt($('#deck-build-mainpersonality-box').attr('data-alignment')) &&
                                            o.card.alignment !== window.CardInformation.Alignment.Rogue)) {
                                ret = false;
                            }

                        } else if ($('#deck-build-mainpersonality-box:Contains(Level ' + o.card.level + ')').length !== 0) {
                            ret = false;
                        }
                    }
                    return ret;
                }

                function setCounters(o, inc) {
                    var obj = $('#deck-build-sheet').find('.card-info-link[cached-number="' + $(o.cardLink).attr('cached-number') + '"][cached-saga="' + $(o.cardLink).attr('cached-saga') + '"]');
                    var currentNumber = 1;
                    var oldCounter = parseInt(o.currentNumber.html());

                    var elementId;

                    if (ClassHelper.checkValue(window.CardInformation.Type.Dragonball, o.card.getPrimaryType())) {
                        elementId = '#deck-build-dragonball-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type['Physical Combat'], o.card.getPrimaryType())) {
                        elementId = '#deck-build-physical-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type['Non-Combat'], o.card.getPrimaryType())) {
                        elementId = '#deck-build-noncombat-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type['Energy Combat'], o.card.getPrimaryType())) {
                        elementId = '#deck-build-energy-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type.Combat, o.card.getPrimaryType())) {
                        elementId = '#deck-build-combat-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type.Sensei, o.card.getPrimaryType())) {
                        elementId = '#deck-build-sensei-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type.Mastery, o.card.getPrimaryType())) {
                        elementId = '#deck-build-mastery-box';
                    } else if (ClassHelper.checkValue(window.CardInformation.Type.Personality, o.card.getPrimaryType())) {
                        if (($('#deck-build-ally-box').find('.card-info-link').length > 0 &&
                                $('#deck-build-mainpersonality-box').find('.card-info-link').length === 0 && inc < 0) ||
                                ($('#deck-build-mainpersonality-box:Contains(Level ' + o.card.level + ')').length !== 0 && inc > 0) ||
                                !checkPersonality(o.card)) {
                            elementId = '#deck-build-ally-box';
                        } else {
                            elementId = '#deck-build-mainpersonality-box';
                            if (o.card.alignment !== window.CardInformation.Alignment.Rogue && inc > 0) {
                                window.InterfaceDBZ.selectDeckAlignment(o.card.alignment);
                            }

                        }
                    } else if (ClassHelper.checkValue(window.CardInformation.Type.Fusion, o.card.getPrimaryType())) {
                        elementId = '#deck-build-sensei-deck-box';
                    }

                    o.currentNumber.html(parseInt(o.currentNumber.html()) + inc);

                    if (obj.length === 0) {
                        $(elementId).append(deckAddedCard.replace('%d%', inc).replace('%cardlink%', o.cardLink[0].outerHTML));
                        $(elementId).find('a:last').removeClass('card-info-link-foil');
                        $(elementId).find('a:last').removeClass('card-info-link-altart');
                    } else {
                        currentNumber = 0;

                        $('#deck-build-card-list > table > tbody').find('.card-info-link[cached-number="' + $(o.cardLink).attr('cached-number') + '"][cached-saga="' + $(o.cardLink).attr('cached-saga') + '"]')
                                .parents('tr')
                                .find('.deck-build-current-number').each(function(key, value) {
                            currentNumber += parseInt($(value).html());
                        });

                        obj.siblings('.deck-build-card-counter').html(currentNumber);
                    }

                    $(elementId).find('.deck-build-counter').html(parseInt($(elementId).find('.deck-build-counter').html()) + inc);
                    $('#deck-build-main-counter').html(parseInt($('#deck-build-main-counter').html()) + (parseInt(o.currentNumber.html()) - oldCounter));

                    return currentNumber;
                }

                window.InterfaceDBZ.selectDeckAlignment = function(alignmentId) {
                    $('#deck-build-mainpersonality-box').attr('data-alignment', alignmentId);
                    $('#deck-build-alignment-box').html("(" + ClassHelper.getKeyByValue(window.CardInformation.Alignment, parseInt(alignmentId)) + ")");
                    $('#dbz-interface-select-modal').modal('hide');
                };

                function checkAddEligibility() {
                    $('#deck-build-card-list > table > tbody').find('.card-info-link')
                            .parents('tr')
                            .find('.deck-build-add-to-deck').each(function(key, value) {
                        if (checkEligibility(toDeckObject($(this)))) {
                            $(value).attr('disabled', false);
                        } else {
                            $(value).attr('disabled', true);
                        }
                    });
                }

                function checkRemoveEligibility() {
                    $('#deck-build-card-list > table > tbody').find('.card-info-link')
                            .parents('tr')
                            .find('.deck-build-remove-from-deck').each(function(key, value) {
                        window.mainPersonalityLink = $('#deck-build-mainpersonality-box').find('.card-info-link');
                        window.localLink = $(value).parents('tr').find('.card-info-link');
                        if (parseInt($(value).siblings('.deck-build-current-number').html()) === 0) {
                            $(value).attr('disabled', true);
                            $(value).parents('tr').find('.deck-build-remove')
                                    .attr('disabled', false);
                        } else if (// Matched personality name
                                mainPersonalityLink.length === 1) {

                            var listedCards = $('#deck-build-card-list > table > tbody').find('.card-info-link');

                            var isOnLimit = false;

                            for (var i = 0; i < listedCards.length && !isOnLimit; i++) {
                                var number = 0;
                                $('#deck-build-card-list')
                                        .find('.card-info-link[cached-saga=' + $(listedCards[i]).attr('cached-saga')
                                        + '][cached-number=' + $(listedCards[i]).attr('cached-number') + ']')
                                        .parents('tr')
                                        .find('.deck-build-current-number').each(function(key, value) {
                                    number += parseInt($(this).html());
                                });

                                if (number === window.CardInformation.Limit['Deck Copy Same Personality']) {
                                    var c = window.InterfaceDBZ.fromLinkToCard(listedCards[i]);
                                    isOnLimit = checkPersonality(c);
                                }
                            }

                            if (isOnLimit && localLink.attr('cached-index') === mainPersonalityLink.attr('cached-index') &&
                                    localLink.attr('cached-saga') === mainPersonalityLink.attr('cached-saga') &&
                                    localLink.attr('cached-number') === mainPersonalityLink.attr('cached-number')) {
                                $(value).attr('disabled', true);
                                $(value).parents('tr').find('.deck-build-remove')
                                        .attr('disabled', true);
                            } else {
                                $(value).attr('disabled', false);
                                $(value).parents('tr').find('.deck-build-remove')
                                        .attr('disabled', false);
                            }
                        } else {
                            $(value).attr('disabled', false);
                            $(value).parents('tr').find('.deck-build-remove')
                                    .attr('disabled', false);
                        }
                    });
                }

                function checkAllMaxSize() {
                    $('#deck-build-card-list > table > tbody').find('.card-info-link')
                            .parents('tr')
                            .find('.deck-build-add-to-deck').each(function(key, value) {
                        var o = toDeckObject($(value));
                        checkMaxSizeCard(o.card, o.maxNumber);
                    });
                }

                window.InterfaceDBZ.addCardToDeck = function(button) {
                    var o = toDeckObject(button);

                    setCounters(o, +1);

                    checkAllMaxSize();

                    // check Rogue Main Personality
                    if (ClassHelper.checkValue(o.card.type, window.CardInformation.Type.Personality)
                            && !$('#deck-build-mainpersonality-box').attr('data-alignment')) {
                        var buttons = '<h4>The selected character is a Rogue. Select the deck alignment:</h4>';
                        buttons += '<div class="row"><div class="col-md-6"><button onclick="InterfaceDBZ.selectDeckAlignment($(this).attr(\'data-id\'));" class="btn btn-primary" data-id="' + window.CardInformation.Alignment.Hero + '">Hero</button>';
                        buttons += '</div><div class="col-md-6"><button onclick="InterfaceDBZ.selectDeckAlignment($(this).attr(\'data-id\'));" class="btn btn-danger" data-id="' + window.CardInformation.Alignment.Villain + '">Villain</button></div></div>';
                        InterfaceDBZ.selectWindow(buttons);
                        $('#dbz-interface-select-modal').on('hidden.bs.modal', function(ev) {
                            $(this).unbind();
                            checkAddEligibility();
                            checkRemoveEligibility();
                        });
                    } else {
                        checkAddEligibility();
                        checkRemoveEligibility();
                    }

                    $(button).siblings('.deck-build-remove-from-deck')
                            .attr('disabled', false);
                    $(button).parents('tr').find('.deck-build-remove')
                            .attr('disabled', false);


                    updateUrlData();
                };

                window.InterfaceDBZ.removeCardFromDeck = function(button) {
                    var o = toDeckObject(button);

                    var currentTotal = setCounters(o, -1);

                    if (currentTotal === 0) {
                        $('#deck-build-sheet')
                                .find('.card-info-link[cached-number="' + $(o.cardLink).attr('cached-number') + '"][cached-saga="' + $(o.cardLink).attr('cached-saga') + '"]')
                                .parents('.deck-build-card-entry-row')
                                .remove();
                    }

                    if ($('#deck-build-mainpersonality-box:Contains(Level)').length === 0 &&
                            $('#deck-build-ally-box:Contains(Level)').length === 0) {
                        $('#deck-build-mainpersonality-box').removeAttr('data-alignment');
                        $('#deck-build-alignment-box').html("");
                    }

                    checkAllMaxSize();
                    checkAddEligibility();
                    checkRemoveEligibility();

                    updateUrlData();
                };

                window.InterfaceDBZ.removeDeckBuildTableEntry = function(button) {
                    var minusButton = $(button).parents('tr').find('.deck-build-remove-from-deck');

                    while (minusButton.attr('disabled') === undefined) {
                        minusButton.trigger('click');
                    }

                    if (parseInt($(minusButton).parents('tr').find('.deck-build-current-number').html()) === 0) {
                        $(minusButton).parents('tr').fadeOut(250, function() {
                            var cardLink = $(this).find('.card-info-link');
                            window.InterfaceDBZ.searchEntry(cardLink[0].outerHTML, 9);
                            var rows = $(this).siblings().length;
                            $(this).remove();

                            window.InterfaceDBZ.addToDeckListInit('.deck-build-add:last');

                            if (rows === 1) {
                                $('#deck-build-table-no-cards').show();
                            }
                        });
                    }
                };

                window.InterfaceDBZ.deckBuildSearch('#complete-search-form', UserCollection, function(sourceTable) {
                    var linkRemove = '<button disabled="true" onclick="window.InterfaceDBZ.removeDeckBuildTableEntry(this)" class="btn btn-xs btn-default game-generic-button deck-build-remove"><span class="glyphicon glyphicon-remove"></span><span class="button-text">Remove</span></button>';
                    var tableEntry = '<tr><td>%card%</td><td><button type="button" disabled="true" onclick="InterfaceDBZ.removeCardFromDeck(this);" class="btn btn-xs btn-default deck-build-remove-from-deck"><span class="glyphicon glyphicon-minus"></span></button><span class="deck-build-current-number">0</span>/<span class="deck-build-max-number">3</span><button onclick="InterfaceDBZ.addCardToDeck(this);" type="button" class="btn btn-xs btn-default deck-build-add-to-deck"><span class="glyphicon glyphicon-plus"></span></button></td><td>' + linkRemove + '</td></tr>';

                    window.InterfaceDBZ.addToDeckListInit = function(selector) {
                        $(sourceTable).find(selector || '.deck-build-add').click(function() {
                            var newCount = $('.deck-build-result-row:visible').length - 1;
                            newCount = newCount < 0 ? 0 : newCount;
                            $('#deck-build-result-qtd > h5').html($('#deck-build-result-qtd > h5').html().replace(/[0-9]+/, newCount).replace(/\(.*\)/, ''));

                            $(this).prop('disabled', true);
                            $('#deck-build-table-no-cards').hide();
                            var tr = $(this).parents('.deck-build-result-row');
                            var link = tr.find('.card-info-link');

                            $('#deck-build-card-list > table > tbody').append(tableEntry.replace('%card%', $(link)[0].outerHTML));

                            var newEntry = $('#deck-build-card-list > table > tbody > tr:last').find('.deck-build-max-number');

                            checkMaxSizeCard(window.InterfaceDBZ.fromLinkToCard($(link)), newEntry);

                            checkAddEligibility();

                            $(tr).fadeOut(250, function() {
                                $(this).remove();
                                $('#deck-build-card-list > table > tbody > tr:last').find('.deck-build-remove').prop('disabled', false);
                            });
                        });
                    };

                    function addCardGroupToDeck(cards) {
                        if (cards.length > 0) {
                            $('#deck-build-table-no-cards').hide();
                        }

                        for (var i = 0; i < cards.length; i++) {
                            var link = $('.deck-build-result-row').find('a[cached-id=' + cards[i].id + ']');

                            if (cards[i].foil) {
                                link.filter('.card-info-link-foil');
                            }

                            var qtt = parseInt(cards[i].qtt);

                            if (!isNaN(qtt)) {
                                $('#deck-build-card-list > table > tbody').append(tableEntry.replace('%card%', $(link)[0].outerHTML));

                                var newEntry = $('#deck-build-card-list > table > tbody > tr:last');

                                var o = toDeckObject(newEntry.find('.deck-build-add-to-deck'));
                                setCounters(o, qtt);

                                $(link).parents('.deck-build-result-row').remove();
                            }
                        }

                        checkAllMaxSize();
                        checkAddEligibility();
                        checkRemoveEligibility();
                    }

                    var loadDeckListInterval = setInterval(function() {
                        console.log("Link list status: " + $('#sourceTable').find('a').length + "/" + UserCollection.length);
                        if ($('#sourceTable').find('a').length === UserCollection.length) {
                            clearInterval(loadDeckListInterval);
                            window.InterfaceDBZ.addToDeckListInit();

                            //check for data
                            var extData = "${jsonDeck}";
                            
                            if (extData !== '') {
                                DBZCCG.Interface.toggleModalProgress('Loading data into page...');
                                var deckData = JSON.parse(atob(extData));

                                console.log(deckData);

                                if (deckData.id) {
                                    deckId = deckData.id;
                                }

                                if (deckData.name) {
                                    $('#deck-build-deck-name-pure').html(deckData.name);
                                    $('#deck-build-deck-name-input').val(deckData.name);
                                }

                                if (!isNaN(parseInt(deckData.alignment))) {
                                    window.InterfaceDBZ.selectDeckAlignment(deckData.alignment);
                                }

                                if (deckData.mainPersonality instanceof Array && deckData.mainPersonality.length > 0) {
                                    addCardGroupToDeck(deckData.mainPersonality);
                                }

                                if (deckData.cards instanceof Array && deckData.cards.length > 0) {
                                    addCardGroupToDeck(deckData.cards);
                                }

                                window.setTimeout(function() {
                                    DBZCCG.Interface.toggleModalProgress();
                                    updateUrlData();
                                },500);

                                <c:if test="${not publicContent}">
                                    readyToSave = true;
                                </c:if>
                            }
                        }
                    }, 1000);

                }, linkAdd, eligibleButton, customButtonMatch, customButtonInit);

                window.InterfaceDBZ.finishLoad();
                
                });
            });
        })();

</script>

<div class="row">
    <div class="col-md-12">
        <div class="fb-share-button" data-type="button_count"></div>
    </div>
</div>