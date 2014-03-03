$('.niceScrollBar').niceScroll({autohidemode: false});

if (document.getElementById('log-dialog')) {
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
}

if (document.getElementById('sound-btn')) {
    $('#sound-btn').click(function() {
        if (DBZCCG.Sound.toggle instanceof Function) {
            DBZCCG.Sound.toggle();
        }
        $(this).toggleClass('sound-on');
        $(this).toggleClass('sound-off');
    });
}

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

if (document.getElementById('communication-box')) {
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
}

DBZCCG.Interface = {};

DBZCCG.Interface.cachedCards = {};

DBZCCG.Interface.cachedCards.Saiyan = {};

DBZCCG.Interface.lastSelectedCards = [];

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
        if(document.getElementById('logBox')) {
            DBZCCG.Interface.createLinks(document.getElementById('logBox'));
            DBZCCG.Interface.createLinks(document.getElementById('chat-entries'));
        }
        
        DBZCCG.Interface.createLinks(document.getElementById('descriptionBoxContent'));
    }, 1000);

})();

DBZCCG.Interface.browseCardList = function(cards, title, numberToSelect, selectCallback) {
    var descriptionBoxContent = document.getElementById('descriptionBoxContent');
    var content = document.createElement('div');
    descriptionBoxContent.innerHTML = content.innerHTML = title;

    var buttons;

    var scrollQtt = 10;
    var scrollSpeed = 10;

    var wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    var selectList = document.createElement('div');
    selectList.id = 'card-list';

    var arrowLeft = document.createElement('div');

    arrowLeft.innerHTML = "<";

    arrowLeft.className = 'arrow-scroll';

    arrowLeft.onclick = function() {
        if (this.hold) {
            selectList.addScroll(-scrollQtt);
        }
    };

    arrowLeft.onmousedown = function() {
        arrowLeft.hold = true;
        arrowLeft.lastInterval = window.setTimeout(function() {
            if (arrowLeft.hold) {
                arrowLeft.onmousedown();
                arrowLeft.onclick();
            }
        }, scrollSpeed);
    };

    arrowLeft.onmouseout = arrowLeft.onmouseup = function() {
        arrowLeft.hold = false;
        window.clearInterval(arrowLeft.lastInterval);
    };

    wrapper.appendChild(arrowLeft);

    var begin = document.createElement('h2');
    begin.innerHTML = 'TOP';

    var midWrapper = document.createElement('div');
    midWrapper.id = 'mid-wrapper-card-list';

    wrapper.appendChild(midWrapper);
    midWrapper.appendChild(selectList);

    selectList.appendChild(begin);

    // src: http://www.javascriptkit.com/javatutors/onmousewheel.shtml
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x

    wrapper.addEventListener(mousewheelevt, function(evt) {
        var direction = (evt.detail < 0 || evt.wheelDelta > 0) ? -1 : 1;
        selectList.addScroll(scrollQtt * 40 * direction);
    });

    for (var i = cards.length - 1; i >= 0; i--) {
        var option = document.createElement('div');

        option.className = 'image-card-list';
        option.innerHTML = "<img src='" + cards[i].getTextureImg() + "' />";

        option.saga = ClassHelper.getKeyByValue(DBZCCG.Card.Saga, cards[i].saga);
        option.number = cards[i].number;
        option.card = cards[i];

        if (!DBZCCG.Interface.cachedCards[option.saga][option.number]) {
            DBZCCG.Interface.cachedCards[option.saga][option.number] = DBZCCG.Card.createCard(DBZCCG[option.saga][option.number]);
        }

        option.onmousemove = function() {
            DBZCCG.Interface.cachedCards[this.saga][this.number].display.mouseOver();
        };

        option.onmouseout = function() {
            DBZCCG.Interface.cachedCards[this.saga][this.number].display.mouseOut();
        };

        if (numberToSelect > 0) {
            option.onclick = function() {
                if ($('#selection-box-card-list').children('div').length <= numberToSelect &&
                        $(this).children().hasClass('card-list-selected') || !$(this).children().hasClass('card-list-selected')
                        && $('#selection-box-card-list').children('div').length < numberToSelect) {
                    $(this).children().toggleClass('card-list-selected');

                    // add
                    if ($(this).children().hasClass('card-list-selected')) {
                        var clone = $(this).clone()[0];
                        this.clone = clone;
                        $(clone).children()[0].style.border = 'none';
                        clone.style.border = 'none';
                        clone.onmousemove = this.onmousemove;
                        clone.onmouseout = this.onmouseout;
                        clone.saga = this.saga;
                        clone.number = this.number;
                        clone.original = this;
                        clone.card = this.card;
                        clone.ondblclick = function(ev) {
                            buttons.button('disable');
                            $(this.original).children().removeClass('card-list-selected');
                            this.original.clone = null;
                            $(this).remove();
                            document.getElementById('qtt-selected').innerHTML = $('#selection-box-card-list').children('div').length;
                        };
                        document.getElementById('selection-box-card-list').appendChild(clone);
                    } else /* remove */ {
                        $(this.clone).remove();
                        this.clone = null;
                    }

                    var count = $('#selection-box-card-list').children('div').length;
                    document.getElementById('qtt-selected').innerHTML = count;

                    if (count === numberToSelect) {
                        buttons.button('enable');
                    } else {
                        buttons.button('disable');
                    }
                }
            };
        }

        selectList.appendChild(option);
    }

    var end = document.createElement('h2');
    end.innerHTML = 'BOTTOM';

    selectList.appendChild(end);

    selectList.style.width = 16 + 28.8 * cards.length + 'vmax';

    var buttons = {};

    selectList.addScroll = function(scroll) {
        document.getElementById('mid-wrapper-card-list').scrollLeft += scroll;
    };

    var arrowRight = document.createElement('div');

    arrowRight.innerHTML = ">";

    arrowRight.className = 'arrow-scroll';

    arrowRight.onclick = function() {
        if (this.hold) {
            selectList.addScroll(scrollQtt);
        }
    };

    arrowRight.onmousedown = function() {
        arrowRight.hold = true;
        arrowRight.lastInterval = window.setTimeout(function() {
            if (arrowRight.hold) {
                arrowRight.onmousedown();
                arrowRight.onclick();
            }
        }, scrollSpeed);
    };

    arrowRight.onmouseout = arrowRight.onmouseup = function() {
        arrowRight.hold = false;
        window.clearInterval(arrowRight.lastInterval);
    };

    wrapper.appendChild(arrowRight);

    if (numberToSelect > 0) {
        var clearDiv = document.createElement('div');
        clearDiv.style.clear = 'both';
        wrapper.appendChild(clearDiv);
        var label = document.createElement('h3');
        label.innerHTML = 'Cards selected <span id="qtt-selected">0</span>/' + numberToSelect + ':';
        label.id = 'card-select-list-label';
        wrapper.appendChild(label);
        var selectionBox = document.createElement('div');
        selectionBox.id = 'selection-box-card-list';
        wrapper.appendChild(selectionBox);

        buttons['OK'] = function() {
            var arr = [];
            var elems = $('#selection-box-card-list').children('div');
            for (var i = 0; i < elems.length; i++) {
                arr.push(elems[i].card);
            }
            DBZCCG.Interface.lastSelectedCards = arr;
            $(this).dialog('close');
            DBZCCG.Combat.effectHappening = DBZCCG.waitingMainPlayerMouseCommand = DBZCCG.performingTurn = false;
        };

    } else {
        midWrapper.style.height = '96%';
    }

    DBZCCG.confirmDialog(content.innerHTML, wrapper, null, buttons, window.innerWidth * 0.6, window.innerHeight * 0.6);

    if (numberToSelect > 0) {
        buttons = DBZCCG.Interface.disableButtons('#confirmDialog');
        DBZCCG.Interface.hideDialogClose('#confirmDialog');
    }

    window.setTimeout(function() {
        var elems = $(selectList).children();
        var totalWidth = 0;
        for (var i = 0; i < elems.length; i++) {
            totalWidth += elems[i].offsetWidth;
        }
        selectList.style.width = (totalWidth + 40) + 'px';
        $('#selection-box-card-list').sortable();
        $('#selection-box-card-list').disableSelection();
    }, 500);

}
;

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
};

DBZCCG.Interface.hideDialogClose = function(dialogContentId) {
    // Hide top close icon
    $(dialogContentId)
            .parent()
            .children('.ui-dialog-titlebar')
            .children('.ui-dialog-titlebar-close')
            .hide();

    $(dialogContentId).dialog('option', 'closeOnEscape', false);
};

DBZCCG.Interface.disableButtons = function(dialogContentId) {
    var buttons = $(dialogContentId)
            .parent()
            .children('.ui-dialog-buttonpane')
            .children()
            .children();

    buttons.button('disable');

    return buttons;
};