$('.niceScrollBar').niceScroll({autohidemode: false});

$('#log-dialog').dialog({
    autoOpen: false,
    closeOnEscape: true,
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.6,
    title: 'Log',
    open: function() {
        $('#log-dialog')[0].style.cursor = 'auto';
        $('#log-dialog').animate({scrollTop: $('#log-dialog')[0].scrollHeight}, 'slow');
    }
});

$('#sound-btn').click(function() {
    DBZCCG.Sound.toggle();
    $(this).toggleClass('sound-on');
    $(this).toggleClass('sound-off');
});

$('#object-info').dialog({
    autoOpen: false,
    closeOnEscape: true,
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.6,
    title: 'Information',
    open: function() {
        $('#object-info')[0].style.cursor = 'auto';
    }
});

$('#communication-box > button').button();
$('#communication-box > button.log-button').click(function() {
    var visibility = $('#logBox').is(':visible');

    $('#communication-box > div').hide();
    $('#communication-box > button').button('enable');

    if (!visibility) {
        $(this).button('disable');
        $('#logBox').show();
    }
});

$('#communication-box > button.chat-button').click(function() {
    var visibility = $('#chat-box').is(':visible');

    $('#communication-box > div').hide();
    $('#communication-box > button').button('enable');

    if (!visibility) {
        $(this).button('disable');
        $('#chat-box').show();
    }
});

$('#communication-box > button.chat-button').button('disable');

$('#communication-box > button.hide-button').click(function() {
    $('#communication-box').hide();
});

$('#chat-input').keyup(function(e) {
    // Enter
    if (e.keyCode === 13) {
        $('#chat-submit').trigger('click');
    }
});

$('#chat-submit')
        .button()
        .click(function(e) {
    if ($('#chat-input').val().match(/\w+/g) !== null) {
        $('#chat-entries')[0].innerHTML += '<div>' + "[" + new Date().toLocaleString() + "] " + (DBZCCG.mainPlayer ? DBZCCG.mainPlayer.displayName() : 'Spectator') + ": " + $('#chat-input').val();
        +'</div>';
        $('#chat-entries').animate({scrollTop: $('#chat-entries')[0].scrollHeight}, 'slow');
        $('#chat-input').val('');
    }
});

$('#communication-box').draggable({containment: "body"});

DBZCCG.Interface = {};

DBZCCG.Interface.cachedCards = {};

DBZCCG.Interface.cachedCards.Saiyan = {};

(function() {

    function openFocus(saga, number) {
        return "DBZCCG.toolTip.parent = DBZCCG.Interface.cachedCards['" + saga + "']['" + number + "'].display;DBZCCG.toolTip.showDescription();";
    }

    function runFunc(saga, number, func) {
        return "DBZCCG.Interface.cachedCards['" + saga + "']['" + number + "'].display." + func + "();";
    }

    DBZCCG.Interface.createLinks = function(element) {
        var matches = element.innerHTML.match(/{\w+ \w+}/g);

        var sagas = [];

        for (var k in DBZCCG.Card.Saga) {
            sagas.push(k);
        }

        if (matches) {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i].match(/(\w+) (\w+)/);
                if (DBZCCG[match[1]][match[2]] && ClassHelper.checkValue(sagas, match[1])) {
                    if (!DBZCCG.Interface.cachedCards[match[1]][match[2]]) {
                        DBZCCG.Interface.cachedCards[match[1]][match[2]] = DBZCCG.Card.createCard(DBZCCG[match[1]][match[2]]);
                    }

                    element.innerHTML = element.innerHTML.replace(matches[i], '<a onmouseover="' + runFunc(match[1], match[2], 'mouseOver') + '" onmouseout="' + runFunc(match[1], match[2], 'mouseOut') + '" onclick="' + openFocus(match[1], match[2]) + '" class="card-info-link">' +
                            '[' + match[1] + ' Saga #' + match[2] + '] ' + DBZCCG.Interface.cachedCards[match[1]][match[2]].name
                            + '</a>');
                }
            }
        }

    };

    window.setInterval(function() {
        DBZCCG.Interface.createLinks(document.getElementById('logBox'));
        DBZCCG.Interface.createLinks(document.getElementById('chat-entries'));
        DBZCCG.Interface.createLinks(document.getElementById('descriptionBoxContent'));
    }, 1000);

})();

DBZCCG.Interface.browseCardList = function(cards, title) {
    var descriptionBoxContent = document.getElementById('descriptionBoxContent');
    var content = document.createElement('div');
    descriptionBoxContent.innerHTML = content.innerHTML = title;

    var selectList = document.createElement('ol');
    selectList.id = 'card-list';

    for (var i = cards.length - 1; i >= 0; i--) {
        var option = document.createElement('li');
        option.innerHTML = (i + 101).toString().substring(1) + ' - ' + cards[i].name;

        option.saga = ClassHelper.getKeyByValue(DBZCCG.Card.Saga, cards[i].saga);
        option.number = cards[i].number;

        if (!DBZCCG.Interface.cachedCards[option.saga][option.number]) {
            DBZCCG.Interface.cachedCards[option.saga][option.number] = DBZCCG.Card.createCard(DBZCCG[option.saga][option.number]);
        }

        option.onmouseover = function() {
            DBZCCG.Interface.cachedCards[this.saga][this.number].display.mouseOver();
        };

        option.onmouseout = function() {
            DBZCCG.Interface.cachedCards[this.saga][this.number].display.mouseOut();
        };

        option.onclick = function() {
            DBZCCG.toolTip.parent = DBZCCG.Interface.cachedCards[this.saga][this.number].display;
            DBZCCG.toolTip.showDescription();
        };

        selectList.appendChild(option);
    }

    var wrapperDiv = document.createElement('div');
    wrapperDiv.id = 'dialog-wrapper-div';
    wrapperDiv.appendChild(selectList);
    DBZCCG.createDialog(content.innerHTML, wrapperDiv);
    $(selectList).selectable();

    $('#mainDialog').dialog('open');
};

DBZCCG.Interface.fixWebkitGfx = function() {

// FIX of some GFX bugs

// SRC: http://www.eccesignum.org/blog/solving-display-refreshredrawrepaint-issues-in-webkit-browsers

    /*	Silently append and remove a text node	
     This is the fix that worked for me in the Phonegap/Android application
     the setTimeout allows a 'tick' to happen in the browser refresh,
     giving the UI time to update
     */
    var fixElement = document.createElement('div');
    fixElement.id = 'fixElement';
    document.body.appendChild(fixElement);
    var n = document.createTextNode(' ');
    $('#fixElement').append(n);
    setTimeout(function() {
        n.parentNode.removeChild(n)
    }, 0);


    /*	Hide and reshow the element	*/
    document.getElementById('fixElement').style.display = 'none';
    document.getElementById('fixElement').offsetHeight; // no need to store this anywhere, the reference is enough
    document.getElementById('fixElement').style.display = 'block';

    /*	Set the scale of the element to 1. 
     This doesn't actually change anything visually, 
     because by default everything in the browser 
     is set to scale 1	*/

    document.getElementById('fixElement').style.webkitTransform = 'scale(1)';
    $('#fixElement').remove();
}