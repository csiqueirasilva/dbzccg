//if (document.getElementById('log-dialog')) {
//    $('#log-dialog').dialog({
//        autoOpen: false,
//        closeOnEscape: true,
//        width: window.innerWidth * 0.5,
//        height: window.innerHeight * 0.6,
//        title: 'Log',
//        open: function() {
//            $('#log-dialog')[0].style.cursor = 'auto';
//            $('#log-dialog').animate({scrollTop: $('#log-dialog')[0].scrollHeight}, 'slow');
//        }
//    });
//}d

if (typeof document !== "undefined" && document !== null) {
    $(document).ready(function() {
        if (document.getElementById('turnCounter')) {
            $('#turnCounter').draggable({
                containment: 'body'
            });
        }

        if (document.getElementById('sound-btn')) {
            $('#sound-btn').click(function() {
//                if (DBZCCG.Sound.toggle instanceof Function) {
//                    DBZCCG.Sound.toggle();
//                }
                $(this).toggleClass('sound-on');
                $(this).toggleClass('sound-off');
            });
        }
    });
}

DBZCCG.Interface.finishLoad = function (forceCounter) {
    DBZCCG.finishedLoading = true;
    if(forceCounter) {
        DBZCCG.Load.skipLoad = true;
    }
};

(function() {

        $('.js-loading-bar').modal({
            backdrop: 'static',
            show: false
        });


        var $modal = $('.js-loading-bar'),
                $bar = $modal.find('.progress-bar');

        DBZCCG.Interface.toggleModalProgress = function(text) {
            var msg = text || "Progressing...";
            if ($('.js-loading-bar').is(':visible')) {
                $bar.removeClass('animate');
                $modal.modal('hide');
            } else {
                $modal.find('.modal-header').html(msg);
                $modal.modal('show');
                $bar.addClass('animate');
            }
        };
})();

DBZCCG.Interface.updateUserPoints = function (points) {
    var qtt = parseInt($('#qtt-user-points').html());
    $('#qtt-user-points').html(qtt+points);
};

DBZCCG.Interface.addMenus = function(page, chatUrl, elem) {
    console.log('Adding All Menus.');

    $(document).ready(function() {
        DBZCCG.Interface.addLeftSideMenu(page, chatUrl, elem);
    });
};

DBZCCG.Interface.addLeftSideMenu = function(page, chatUrl, elem) {
    console.log('Adding Left Side Menu.');

    var appending = elem || 'body';

    var leftMenuContent = '<div id="left-sticky-menu" class="left-sticky-menu-left">\
                        <div class="btn-group-vertical">\
                            <button data-container="body" data-title="Communication Box" type="button" class="btn btn-default btn-sm input-sm" id="btn-show-communication-box">\
                                <span class="glyphicon glyphicon-comment"></span>\
                            </button>\
                            <button data-container="body" data-title="Final Physical Attack" type="button" class="btn btn-default btn-sm input-sm" id="final-physical-btn">\
                                <span class="glyphicon glyphicon-eye-close"></span>\
                            </button>\
                            <button data-container="body" data-title="Rejuvenation Phase" type="button" class="btn btn-default btn-sm input-sm" id="rejuvenate-btn">\
                                <span class="glyphicon glyphicon-leaf"></span>\
                            </button>\
                            <button data-container="body" data-title="Capture Dragonball" type="button" class="btn btn-default btn-sm input-sm" id="capture-btn">\
                                <span class="glyphicon glyphicon-transfer"></span>\
                            </button>\
                            <button data-container="body" data-title="Declare Phase" type="button" class="btn btn-default btn-sm input-sm" id="combat-btn">\
                                <span class="glyphicon glyphicon-fire"></span>\
                            </button>\
                            <button data-container="body" data-title="Card Effect" type="button" class="btn btn-default btn-sm input-sm" id="effect-btn">\
                                <span class="glyphicon glyphicon-star"></span>\
                            </button>\
                            <button data-container="body" data-title="Pass" type="button" class="btn btn-default btn-sm input-sm" id="pass-btn">\
                                <span class="glyphicon glyphicon-hand-left"></span>\
                            </button>\
                        </div>\
                    </div>';

    var topLimit = window.screen.availHeight * 0.25;

    DBZCCG.Interface.leftSideMenuOnResize = function() {
        topLimit = window.screen.availHeight * 0.25;
        var element = $('#left-sticky-menu');
        var axis = element.draggable('option', 'axis');
        var left = element.offset().left;
        var right = $(window).width() - element.offset().left - element.outerWidth(true);

        if (axis === 'y') {
            if (left < right) {
                element.offset({'left': 0});
            } else {
                element.offset({'left': $(window).width() - element.outerWidth(true)});
            }
        } else {
            element.offset({'top': $(window).height() - element.outerHeight(true)});
        }

    };

    $(appending).append(leftMenuContent);

    $(appending).find('#left-sticky-menu').draggable({axis: 'y', containment: 'body',
        drag: function(event, ui) {

            if ($(this).offset().top < topLimit) {
                $(this).offset({top: topLimit + 1});
                return false;
            }

            var bottom = $(window).height() - $(this).offset().top - $(this).outerHeight(true);
            var left = $(this).offset().left;
            var right = $(window).width() - $(this).offset().left - $(this).outerWidth(true);
            var axis = $(this).draggable('option', 'axis');

            $(this).removeClass('left-sticky-menu-right');
            $(this).removeClass('left-sticky-menu-left');
            $(this).removeClass('left-sticky-menu-corner-left');
            $(this).removeClass('left-sticky-menu-corner-right');
            $(this).removeClass('left-sticky-menu-bottom');

            if (bottom === 0 && axis === 'y') {
                if (left === 0) {
                    $(this).addClass('left-sticky-menu-corner-left');
                } else {
                    $(this).addClass('left-sticky-menu-corner-right');
                }

                $(this).draggable('option', 'axis', 'x');
            } else if ((left === 0 || right === 0) && axis === 'x') {
                if (left === 0) {
                    $(this).addClass('left-sticky-menu-left');
                } else {
                    $(this).addClass('left-sticky-menu-right');
                }

                $(this).draggable('option', 'axis', 'y');
            } else if (bottom !== 0) {
                if (left === 0) {
                    $(this).addClass('left-sticky-menu-left');
                } else {
                    $(this).addClass('left-sticky-menu-right');
                }
            } else {

                $(this).addClass('left-sticky-menu-bottom');
            }
        }
    });

    $('#left-sticky-menu').find('.btn').qtip({
        content: {
            text: function(event, api) {
                return $(this).attr('data-title');
            }
        },
        position: {
            my: 'bottom center',
            at: 'center',
            target: 'mouse',
            adjust: {mouse: true},
            viewport: $(window)
        },
        style: {
            classes: "qtip-rounded qtip-bootstrap"
        },
        show: {
            event: 'mouseover'
        },
        hide: {
            event: 'mouseout'
        }
    }).hide();

    $('#btn-show-communication-box').show();

    /* Bind button functions */

    // set onclick callback for pass
    document.getElementById('pass-btn').onclick = function() {
        DBZCCG.passDialog(DBZCCG.passMessage);
    };

    // set onclick callback for pass
    document.getElementById('final-physical-btn').onclick = function() {
        DBZCCG.finalPhysicalDialog();
    };

    // set onclick callback for combat
    document.getElementById('effect-btn').onclick = function() {
        DBZCCG.effectDialog();
    };

    // set onclick callback for combat
    document.getElementById('combat-btn').onclick = function() {
        DBZCCG.declareDialog();
    };

    document.getElementById('rejuvenate-btn').onclick = function() {
        DBZCCG.rejuvenateDialog();
    };

    /* Communication Box */

    $('#btn-show-communication-box').click(function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('#communication-box').show();
        } else {
            $('#communication-box').hide();
        }
    });

    DBZCCG.Interface.addCommunicationBox(elem, chatUrl);

    /* End of communication Box */

};

DBZCCG.Interface.addCommunicationBox = function(elem, chatUrl) {

    console.log('Adding communication box.');

    var ChatBoxContent = '<div class="tab-pane active chat-box row" id="%chat-box-id%">\
                        <div class="row">\
                            <div id="chat-entries" class="col-md-12"></div>\
                        </div>\
                        <div class="row">\
                            <div class="chat-input col-md-12 input-group">\
                                <input type="text" class="form-control">\
                                <div class="input-group-btn">\
                                    <button type="button" class="chat-send-button form-control btn btn-default">\
                                        <span>Send</span>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';

    var HTMLContent = '\
            <div id="communication-box">\
                <ul class="nav nav-tabs">\
                    <li class="active"><a href="#%chat-box-id%" data-toggle="tab">Global</a></li>\
                    <li><a href="#log-box" data-toggle="tab">Log</a></li>\
                </ul>\
                <div class="tab-content">\
                  %global-chat%\
                  <div class="tab-pane" id="log-box"></div>\
                </div>\
            </div>';

    var appending = elem || 'body';

    $(appending).append(HTMLContent.replace('%global-chat%',
            ChatBoxContent).replace(/%chat-box-id%/g, 'chat-global-box')
            );

    networkComponent = new DBZCCG.Network.NetworkObject(chatUrl, function(stompClient) {
        stompClient.subscribe('/chat/global', function(output) {
            console.log('global chat');
        });

        stompClient.subscribe('/user/chat/private', function(output) {
            console.log('private chat');
        });
    });

//        $('#communication-box > button').button();
//        $('#communication-box > button.log-button').click(function() {
//            var visibility = $('#logBox').is(':visible');
//
//            $('#communication-box > div').hide();
//            $('#communication-box > button').button('enable');
//
//            if (!visibility) {
//                $(this).button('disable');
//                $('#logBox').show();
//            }
//        });
//
//        $('#communication-box > button.chat-button').click(function() {
//            var visibility = $('#chat-box').is(':visible');
//
//            $('#communication-box > div').hide();
//            $('#communication-box > button').button('enable');
//
//            if (!visibility) {
//                $(this).button('disable');
//                $('#chat-box').show();
//            }
//        });
//
//        $('#communication-box > button.hide-button').click(function() {
//            $('#communication-box').hide();
//        });
//
//        $('#chat-input').keyup(function(e) {
//            // Enter
//            if (e.keyCode === 13) {
//                $('#chat-submit').trigger('click');
//            }
//        });
//
//        $('#chat-submit')
//                .click(function(e) {
//            if ($('#chat-input').val().match(/\w+/g) !== null) {
//                $('#chat-entries')[0].innerHTML += '<div>' + "[" + new Date().toLocaleString() + "] " + (DBZCCG.mainPlayer ? DBZCCG.mainPlayer.displayName() : 'Spectator') + ": " + $('#chat-input').val();
//                +'</div>';
//                $('#chat-entries').animate({scrollTop: $('#chat-entries')[0].scrollHeight}, 'slow');
//                $('#chat-input').val('');
//            }
//        });
//
    $('#communication-box').draggable({containment: "body", scroll: true});
};


DBZCCG.Interface.disableScroll = function() {
    $('body').css('overflow', 'hidden');
    $('html').css('overflow', 'hidden');
    window.onscroll = function() {
        window.scrollTo(0, 0);
    };
};

DBZCCG.Interface.startQtip = function() {
    /* Tooltip for the renderer */
    DBZCCG.qtipElement.qtip({
        content: {
            text: function(event, api) {
                return DBZCCG.toolTip.customContent ? DBZCCG.toolTip.customContent : DBZCCG.toolTip.content;
            }
        },
        position: {
            my: 'bottom center',
            at: 'center',
            target: 'mouse',
            adjust: {mouse: false},
            viewport: $(window)
        },
        style: {
            classes: "qtip-rounded qtip-bootstrap"
        },
        show: false,
        hide: {
            effect: false
        }
    });
};

(function() {

    DBZCCG.Interface.mainToolTip = DBZCCG.toolTip;

    function openFocus(id, index) {
        return "InterfaceDBZ.mainToolTip.parent = InterfaceDBZ.cachedCards[" + id + "][" + index + "].display; InterfaceDBZ.mainToolTip.showDescription();";
    }

    function runFunc(id, index, func) {
        return "InterfaceDBZ.cachedCards[" + id + "][" + index + "].display." + func + "();";
    }

    function matchCachedCards(cached, matches) {
        var ret = -1;

        for (var i = 0; i < cached.length && ret < 0; i++) {
            if (matches[4] && matches[5] &&
                    cached[i].foil === DBZCCG[matches[1]][matches[3]].Foil[matches[4]]) {
                ret = i;
            } else if (!matches[4] && !matches[5] &&
                    cached[i]) {
                ret = i;
            }
        }

        return ret;
    }

    function parseLinkClass(cached, proxy) {
        var classes = "card-info-link ";

        if (cached.foil) {
            classes += "card-info-link-foil ";
        }

        switch (cached.rarity) {
            case DBZCCG.Card.Rarity.Common:
                classes += "card-info-link-common ";
                break;
            case DBZCCG.Card.Rarity.Promo:
                classes += "card-info-link-promo ";
                break;
            case DBZCCG.Card.Rarity.Uncommon:
                classes += "card-info-link-uncommon ";
                break;
            case DBZCCG.Card.Rarity.Fixed:
                classes += "card-info-link-fixed ";
                break;
            case DBZCCG.Card.Rarity.Rare:
                classes += "card-info-link-rare ";
                break;
            case DBZCCG.Card.Rarity['Ultra Rare']:
                classes += "card-info-link-ultrarare ";
                break;
            case DBZCCG.Card.Rarity['Ubber Rare']:
                classes += "card-info-link-ubberrare ";
        }

        if(proxy) {
            classes += "card-info-link-proxy ";
        }

        return classes;
    }

    function replaceLink(element, match, index, replaced, proxy) {
        var cached = DBZCCG.Interface.cachedCards[match][index];

        var collection = ClassHelper.getKeyByValue(DBZCCG.Card.Collection, cached.collectionType);
        var stringSaga = ClassHelper.getKeyByValue(DBZCCG.Card.Saga[collection], cached.saga);

        element.innerHTML = element.innerHTML.replace(replaced, '<a cached-id="'+ match +'" cached-collection="' + cached.collectionType + '" cached-saga="' + stringSaga + '" cached-number="' + cached.number + '" class="jlink ' + parseLinkClass(cached, proxy) + '" cached-index="' + index + '" onmouseover="' + runFunc(match, index, 'mouseOver') + '" onmouseout="' + runFunc(match, index, 'mouseOut') + '" onclick="' + openFocus(match, index) + '" class="card-info-link">' +
                '[' + cached.collectionType + ' ' + stringSaga + ' Saga #' + cached.number + '] ' + (cached.level ? ("Level " + cached.level + " ") : "") + cached.name
                + '</a>');
    }

    DBZCCG.Interface.createCachedCardObject = function(id) {
        if (!DBZCCG.Interface.cachedCards[id]) {
            DBZCCG.Interface.cachedCards[id] = [];
        }
    };

    DBZCCG.Interface.LinkTypes = {
        card: "C",
        foil: "F",
        altArt: "A",
        proxy: "P"
    };

    DBZCCG.Interface.createLinks = function(element) {
        var matches = element.innerHTML.match(/{\w{1,3}#\d+(\[.+])?}/g);

        if (matches) {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i].match(/(\w{1,3})#(\d+)(?:\[.+\])?/);

                if ((match[1] === DBZCCG.Interface.LinkTypes.card || match[1] === DBZCCG.Interface.LinkTypes.proxy) && DBZCCG.Card.sourceCardsReference[match[2]]) {
                    DBZCCG.Interface.createCachedCardObject(match[2]);

                    var index = matchCachedCards(DBZCCG.Interface.cachedCards[match[2]], match);
                    if (index === -1) {
                        (function() {
                            var localMatch = matches[i];
                            var proxyIdentifier = match[1];
                            var id = match[2];
                            var sourceMatch = match[0];
                            
                            // check match for foil, set the foil
                            // check match for alt art, set the altart
                            // todo: send the foil and altart to the server
                            $.ajax({
                                url: sourceDefaultUrl + "collection/card/proxies/" + id,
                                type: 'POST',
                                dataType: 'json'
                            })

                                    .fail(function() {
                                console.log("Failed to load proxy card link: " + sourceMatch);
                            })

                                    .done(function(data) {
                                DBZCCG.Interface.cachedCards[id].push(
                                        DBZCCG.Card.createCard(data)
                                        );
                                index = DBZCCG.Interface.cachedCards[id].length - 1;
                                replaceLink(element, id, index, localMatch, proxyIdentifier === DBZCCG.Interface.LinkTypes.proxy);
                            });
                        })();
                    } else {
                        replaceLink(element, match[2], index, matches[i], match[1] === DBZCCG.Interface.LinkTypes.proxy);
                    }
                }
            }
        }

    };

//    window.setInterval(function() {
//        if (document.getElementById('logBox')) {
//            DBZCCG.Interface.createLinks(document.getElementById('logBox'));
//            DBZCCG.Interface.createLinks(document.getElementById('chat-entries'));
//        }
//
//        DBZCCG.Interface.createLinks(document.getElementById('descriptionBoxContent'));
//    }, 1000);

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

        option.saga = ClassHelper.getNestedKeyByValue(DBZCCG.Card.Saga, cards[i].saga);
        option.collection = cards[i].collection;
        option.number = cards[i].number;
        option.card = cards[i];
        option.foil = cards[i].foil;
        option.cardid = cards[i].cardid;

        DBZCCG.Interface.createCachedCardObject(option.cardid);

        var idx = DBZCCG.Interface.cachedCards[option.cardid].length;
        var cached = DBZCCG.Interface.cachedCards[option.cardid];

        for (var i = 0; i < cached.length; i++) {
            if (cached[i]) {
                idx = i;
                break;
            }
        }

        if (idx === DBZCCG.Interface.cachedCards[option.cardid].length) {
            DBZCCG.Interface.cachedCards[option.cardid][idx] = DBZCCG.Card.createCard(cards[i]);
        }

        option.onmousemove = function() {
            DBZCCG.Interface.cachedCards[this.cardid][idx].display.mouseOver();
        };

        option.onmouseout = function() {
            DBZCCG.Interface.cachedCards[this.cardid][idx].display.mouseOut();
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
                        clone.collection = this.collection;
                        clone.saga = this.saga;
                        clone.number = this.number;
                        clone.cardid = this.cardid;
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

/*
 * Adding left screen (info screen)
 */

DBZCCG.Interface.createLeftScreen = function() {
    if (!DBZCCG.leftScreen) {

        DBZCCG.leftScreen = {};
        InterfaceDBZ.leftScreen = DBZCCG.leftScreen;

        DBZCCG.leftScreen.render = function() {
            if ($('#object-info').is(':visible')) {
                var delta = DBZCCG.clock.getDelta();
                this.control.update(delta);
                this.light.position.copy(this.camera.position);
                this.renderer.render(this.scene, this.camera);
            }
        };

        DBZCCG.leftScreen.width = document.getElementById('display-object-screen').offsetWidth * 0.9;
        DBZCCG.leftScreen.height = document.getElementById('display-object-screen').offsetHeight * 0.9;

        DBZCCG.leftScreen.scene = new THREE.Scene();
        DBZCCG.leftScreen.renderer = new THREE.WebGLRenderer({antialias: true});
        DBZCCG.leftScreen.renderer.setClearColor(0xFFFFFF, 1);
        DBZCCG.leftScreen.light = new THREE.PointLight(0xF0F0F0, 1, 1000);
        DBZCCG.leftScreen.scene.add(DBZCCG.leftScreen.light);
        DBZCCG.leftScreen.renderer.setSize(DBZCCG.leftScreen.width, DBZCCG.leftScreen.height);
        DBZCCG.leftScreen.camera = new THREE.PerspectiveCamera(45, DBZCCG.leftScreen.width / DBZCCG.leftScreen.height, 0.001, 1000);
        DBZCCG.leftScreen.control = new THREE.OrbitControls(DBZCCG.leftScreen.camera);
        DBZCCG.leftScreen.control.minDistance = DBZCCG.Card.cardHeight;
        DBZCCG.leftScreen.control.maxDistance = DBZCCG.Card.cardHeight * 3;
        DBZCCG.leftScreen.control.noPan = true;
        DBZCCG.leftScreen.control.noZoom = true;
        DBZCCG.leftScreen.control.enabled = false;

        DBZCCG.leftScreen.resize = function() {
            DBZCCG.leftScreen.width = document.getElementById('display-object-screen').offsetWidth * 0.9;
            DBZCCG.leftScreen.height = document.getElementById('display-object-screen').offsetHeight * 0.9;
            DBZCCG.leftScreen.renderer.setSize(DBZCCG.leftScreen.width, DBZCCG.leftScreen.height);
            DBZCCG.leftScreen.camera.aspect = DBZCCG.leftScreen.width / DBZCCG.leftScreen.height;
            DBZCCG.leftScreen.camera.updateProjectionMatrix();
        };

        function animate() {
            window.setTimeout(function() {
                requestAnimationFrame(animate);
            }, 1);
            DBZCCG.leftScreen.render();
        }

        DBZCCG.leftScreen.renderer.domElement.onmouseover = function() {
            DBZCCG.leftScreen.control.enabled = true;
        };

        DBZCCG.leftScreen.renderer.domElement.onmouseout = function() {
            DBZCCG.leftScreen.control.enabled = false;
        };

        DBZCCG.leftScreen.focusElement = function(target, positionElement) {
            if (this.targetElement !== target) {
                /* Cloning */
                var obj = new THREE.Object3D();

                function cloneMaterial(mat) {
                    if (mat.envMap) {
                        var envMap = [];
                        for (var k = 0; k < mat.envMap.image.length; k++) {
                            envMap.push(mat.envMap.image[k].src);
                        }
                        envMap = THREE.ImageUtils.loadTextureCube(envMap,
                                undefined, function(map) {
                            console.log('Loaded envMap:');
                            console.log(map);
                        }, function(map) {
                            DBZCCG.Load.error = true;
                            console.log('Error while loading envMap:');
                            console.log(map);
                        });
                    } else {
                        envMap = null;
                    }

                    var m = new THREE.MeshPhongMaterial({
                        map: (mat.map ?
                                THREE.ImageUtils.loadTexture(mat.map.sourceFile,
                                undefined, function(tex) {
                            console.log('Loaded texture: ');
                            console.log(tex);
                        }, function(tex) {
                            DBZCCG.Load.error = true;
                            console.log('Error while loading texture: ');
                            console.log(tex);
                        }) : null),
                        color: mat.color,
                        blending: mat.blending,
                        vertexColors: mat.vertexColors,
                        envMap: envMap,
                        specularMap: (mat.specularMap ?
                                THREE.ImageUtils.loadTexture(mat.specularMap.sourceFile, undefined,
                                function(tex) {
                                    console.log('Loaded specular map: ');
                                    console.log(tex);
                                }, function(tex) {
                            DBZCCG.Load.error = true;
                            console.log('Error while specular map: ');
                            console.log(tex);
                        }) : null),
                        reflectivity: mat.reflectivity
                    });

                    m.needsUpdate = true;
                    return m;
                }

                function traverseChild(elem, father) {
                    if (elem.children instanceof Array && elem.children.length > 0) {
                        for (var k in elem.children) {
                            traverseChild(elem.children[k], elem);
                        }
                    } else if (elem instanceof THREE.Mesh) {
                        var material;

                        if (elem.material instanceof THREE.MeshFaceMaterial) {
                            materials = [];
                            for (var i = 0; i < elem.material.materials.length; i++) {
                                materials.push(cloneMaterial(elem.material.materials[i]));
                            }
                            material = new THREE.MeshFaceMaterial(materials);
                        } else if (elem.material && !elem.material.map) {
                            material = elem.material.clone();
                            material.needsUpdate = true;
                        } else {
                            material = cloneMaterial(elem.material);
                        }

                        var geometry = elem.geometry.clone();
                        var mesh = new THREE.Mesh(geometry, material);

                        geometry.buffersNeedUpdate = true;
                        geometry.uvsNeedUpdate = true;

                        console.log('Clonning Geometry.');
                        mesh.scale.copy(elem.scale);
                        mesh.rotation.copy(elem.rotation);
                        mesh.position.copy(elem.position);
                        if (father) {
                            mesh.scale.multiply(father.scale);
                        }
                        obj.add(mesh);
                    }
                }

                if (target instanceof THREE.Mesh || target instanceof THREE.Object3D) {
                    traverseChild(target);
                    /* End of Cloning */

                    obj.scale.copy(target.scale);
                    obj.rotation.copy(target.rotation);
                    obj.position.copy(target.position);
                }

                if (this.focusedElement) {
                    this.scene.remove(this.focusedElement);
                    ThreeHelper.dispose(this.focusedElement, true);
                }

                this.camera.position.set(0, 0, 0);
                this.camera.rotation.set(0, 0, 0);
                this.camera.position.y += 10;

                if (positionElement instanceof Function) {
                    var ret = positionElement(target, obj);
                    if (ret) {
                        obj = ret;
                    }
                }

                this.focusedElement = obj;
                this.targetElement = target;

                this.scene.add(obj);
                this.camera.lookAt(obj.position);
                this.control.center.copy(obj.position);
            }
        }

// debug
//DBZCCG.leftScreen.focusElement(new THREE.Mesh(new THREE.SphereGeometry(1, 64,32), new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, side: THREE.DoubleSide, color: 0xFFFFFF})));

        document.getElementById('display-object-screen').appendChild(DBZCCG.leftScreen.renderer.domElement);

        animate();
    }
};

/*
 * End of Adding left screen          
 */

$(document).ready(function() {
    $('#object-info').on('shown.bs.modal', function() {
        window.onresize();
    });
});

window.onresize = function() {
    // Hide tooltips
    $('.qtip').qtip('hide');

    if (InterfaceDBZ.onGameResize instanceof Function) {
        InterfaceDBZ.onGameResize();
    }

    if (DBZCCG.leftScreen) {
        DBZCCG.leftScreen.resize();
    }
};

DBZCCG.Interface.fromLinkToCard = function(link) {
    return DBZCCG.Interface.cachedCards[$(link).attr('cached-id')]
            [$(link).attr('cached-index')];
};

DBZCCG.Interface.deckBuildSearch = function(wrapper, collection, callback, buttons, customButton, customButtonMatch, customButtonInit) {
    var HTMLContent = '<div class="row" id="deck-build-advanced-search-box">\
            <div class="col-md-offset-7 col-md-5">\
                <div class="row">\
                    <div class="col-md-12 btn-group" data-toggle="buttons">\
                        <label class="btn btn-default" id="deck-build-show-advanced-search">\
                            <input type="checkbox" /><i class="glyphicon glyphicon-list-alt"></i><span class="button-text">Advanced</span>\
                        </label>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div class="row" id="deck-build-advanced-options">\
            <div class="col-md-12">\
                <div class="row deck-build-advanced-row">\
                    <div class="col-md-12" id="deck-build-advanced-entries">\
                    </div>\
                </div>\
                <div class="row deck-build-advanced-row">\
                    <div class="col-md-4">\
                        <div class="row">\
                            <div class="col-md-12 dropdown">\
                                <button class="btn btn-default game-generic-button" data-toggle="dropdown"><i class="glyphicon glyphicon-chevron-down"></i><span class="button-text">Rarity</span></button>\
                                <ul id="deck-build-advanced-search-rarity" class="game-generic-dropdown dropdown-menu" role="menu" aria-labelledby="dLabel">\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <div class="row">\
                            <div class="col-md-12 dropdown">\
                                <button class="btn btn-default game-generic-button" data-toggle="dropdown"><i class="glyphicon glyphicon-chevron-down"></i><span class="button-text">Style</span></button>\
                                <ul id="deck-build-advanced-search-style" class="game-generic-dropdown dropdown-menu" role="menu" aria-labelledby="dLabel">\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <div class="row">\
                            <div class="col-md-12 dropdown">\
                                <button class="btn btn-default game-generic-button" data-toggle="dropdown"><i class="glyphicon glyphicon-chevron-down"></i><span class="button-text">Saga</span></button>\
                                <ul id="deck-build-advanced-search-saga" class="game-generic-dropdown dropdown-menu" role="menu" aria-labelledby="dLabel">\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row deck-build-advanced-row">\
                    <div class="col-md-4">\
                        <div class="row">\
                            <div class="col-md-12 dropdown">\
                                <button class="btn btn-default game-generic-button" data-toggle="dropdown"><i class="glyphicon glyphicon-chevron-down"></i><span class="button-text">Type</span></button>\
                                <ul id="deck-build-advanced-search-type" class="game-generic-dropdown dropdown-menu" role="menu" aria-labelledby="dLabel">\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <div class="row">\
                            <div class="col-md-12 dropdown">\
                                <button class="btn btn-default game-generic-button" data-toggle="dropdown"><i class="glyphicon glyphicon-chevron-down"></i><span class="button-text">Combat</span></button>\
                                <ul id="deck-build-advanced-search-combat" class="game-generic-dropdown dropdown-menu" role="menu" aria-labelledby="dLabel">\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <div class="row">\
                            <div class="col-md-12">\
                                <div class="right-inner-addon">\
                                    <i class="glyphicon glyphicon-search generic-overlay-icon"></i>\
                                    <input placeholder="Headshot" id="deck-build-headshot-search" type="text" class="form-control">\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row deck-build-advanced-row">\
                    <div class="col-md-6">\
                        <div class="right-inner-addon">\
                            <i class="glyphicon glyphicon-search generic-overlay-icon"></i>\
                            <input placeholder="Effects" id="deck-build-effect-search" type="text" class="form-control">\
                        </div>\
                    </div>\
                    <div class="col-md-6">\
                        <div class="right-inner-addon">\
                            <i class="glyphicon glyphicon-search generic-overlay-icon"></i>\
                            <input placeholder="Personality" id="deck-build-personality-search" type="text" class="form-control">\
                        </div>\
                    </div>\
                </div>\
                <div class="row deck-build-advanced-row">\
                    <div class="col-md-6">\
                        %customButton%\
                    </div>\
                    <div class="col-md-6 btn-group">\
                        <button type="button" class="btn btn-default generic-width-50 active" id="deck-build-advanced-search-name">\
                            <i class="glyphicon glyphicon-list-alt"></i><span class="button-text">Name</span>\
                        </button>\
                        <button type="button" class="btn btn-default generic-width-50" id="deck-build-advanced-search-description">\
                            <i class="glyphicon glyphicon-list-alt"></i><span class="button-text">Text</span>\
                        </button>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div class="row">\
            <form class="form-search">\
                <div class="col-md-12">\
                    <div class="right-inner-addon">\
                        <i class="glyphicon glyphicon-search"></i>\
                        <input autocomplete="off" placeholder="Search" id="deck-build-search" type="text" class="form-control">\
                    </div>\
                </div>\
            </form>\
        </div>\
        <div class="row">\
            <div class="col-md-12" id="deck-build-result-qtd">\
                <h5></h5>\
            </div>\
        </div>\
        <div class="row">\
            <div class="col-md-12" id="sourceTable">\
            </div>\
        </div>\
        <div class="row">\
            <div class="col-md-12" id="deck-build-no-result">\
                <h2>Your search had no results</h2>\
            </div>\
        </div>';

    HTMLContent = HTMLContent.replace('%customButton%', customButton || '');

    $(wrapper).hide();
    $(wrapper).html(HTMLContent);

    window.InterfaceDBZ.advancedFilterToggleBoolean = function(ele) {
        $(ele).toggleClass('deck-build-advanced-filter-false');
        $(ele).toggleClass('deck-build-advanced-filter-true');
        if ($(ele).hasClass('deck-build-advanced-filter-true')) {
            $(ele).html('Has ');
        } else {
            $(ele).html('Does not have ');
        }

        doneTyping();
    };

    window.InterfaceDBZ.removeButtonFilterEntry = function(button) {
        $(button).attr("disabled", true);
        var ele = $(button).parents('.deck-build-advanced-filter-entry').find('.deck-build-advanced-filter-content');
        $(button).fadeOut(250, function() {
            $('li[data-group="' + ele.attr('data-group') + '"][data-id="' + ele.attr('data-id') + '"]').removeClass('disabled');
            $(button).parents(".deck-build-advanced-filter-entry").remove();
            doneTyping();
        });
    };

    var advancedFilterEntry = '<span data-id="%id%" data-group="%group%" class="deck-build-advanced-filter-content"><span class="deck-build-advanced-filter-true jlink" onclick="InterfaceDBZ.advancedFilterToggleBoolean(this);">Has</span> %content%</span>';
    var advancedFilterRowEntry = '<div class="row deck-build-advanced-filter-entry"><div class="col-md-9"><span class="advanced-filter-entry">%entry%</span></div><div class="col-md-3"><button onclick="InterfaceDBZ.removeButtonFilterEntry(this);" class="btn btn-xs btn-default game-generic-button deck-build-remove-advanced-filter"><span class="glyphicon glyphicon-remove"></span><span class="button-text">Remove</span></button></div>';
    var toolbar = '<div class="btn-toolbar"><div class="btn-group">%buttons%</div></div>';
    var sourceTable = $('#sourceTable')[0];

    function sourceEntry(value, available) {
//        if (available === Infinity) {
//            value = "[PROXY]" + value;
//        }

        var tr = document.createElement('div');
        var td = document.createElement('div');
        tr.className = 'row deck-build-result-row';

        if (buttons) {
            td.className = "col-md-10 table-card-name";
            td.innerHTML = value;
            if (available !== undefined) {
                td.innerHTML += " (" + available + " available)";
            }
            tr.appendChild(td);
            td = document.createElement('div');
            td.className = "col-md-2";
            td.innerHTML = toolbar.replace('%buttons%', buttons);
            tr.appendChild(td);
        } else {
            td.className = "col-md-12 table-card-name";
            td.innerHTML = value;
            if (available !== undefined) {
                td.innerHTML += " (" + available + " available)";
            }
            tr.appendChild(td);
        }

        sourceTable.appendChild(tr);
    }

    window.InterfaceDBZ.searchEntry = sourceEntry;

    for (var i in collection) {
        sourceEntry(
                "{" + (collection[i].id ? "C" : "P" ) + "#" + collection[i].sourceCard + (collection[i].foil ? ("[" + collection[i].foil + "]") : "") + "}",
                collection[i].id ? 9 : Infinity);
    }

    /* SRC: http://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up */
    var typingTimer;                //timer identifier
    var doneTypingInterval = 800;  //time in ms, 5 second for example
    var displayTimer = 250;
    var typingInputId = '#deck-build-search';

    $(typingInputId).keyup(function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    $(typingInputId).keydown(function() {
        clearTimeout(typingTimer);
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });

    function doneTyping() {
        var searchString = $(typingInputId).val().toLowerCase();

        $('#deck-build-result-qtd').hide();
        $('#deck-build-no-result').hide();
        $('.deck-build-result-row').hide();

        var results;

        if (!$('#deck-build-advanced-options').is(':visible')) {
            results = $('.table-card-name:Contains(' + searchString + ')');
        } else {
            results = $('.table-card-name').children('a');

            if ($('#deck-build-advanced-search-name').hasClass('active')) {
                results = results.filter(':Contains(' + searchString + ')');
            }

            if ($('#deck-build-advanced-search-description').hasClass('active')) {
                results = $.grep(results, function(elem, key) {
                    var card = window.InterfaceDBZ
                            .cachedCards[$(elem).attr('cached-saga')]
                            [$(elem).attr('cached-number')]
                            [$(elem).attr('cached-index')];

                    if (card.description.toLowerCase().match(searchString) !== null) {
                        return true;
                    } else {
                        return false;
                    }
                });

            }

            function compareFilter(checkTrue, source, target) {
                if (checkTrue) {
                    return ClassHelper.checkValue(source, target);
                } else {
                    return !ClassHelper.checkValue(source, target);
                }
            }

            // filters
            $.each($('.deck-build-advanced-filter-content'), function(key, value) {
                results = $.grep(results, function(elem, key) {
                    var card = window.InterfaceDBZ
                            .cachedCards[$(elem).attr('cached-saga')]
                            [$(elem).attr('cached-number')]
                            [$(elem).attr('cached-index')];

                    var dataId = parseInt($(value).attr('data-id'));
                    var dataGroup = $(value).attr('data-group');

                    var checkTrue = $(value).children('span').hasClass('deck-build-advanced-filter-true');

                    var ret;
                    var checkedValue;

                    if (dataGroup === 'Type') {
                        checkedValue = card.type;
                    } else if (dataGroup === 'Attack' ||
                            dataGroup === 'Defense' ||
                            dataGroup === 'Effect') {
                        checkedValue = card.effectType;
                    } else if (dataGroup === 'Rarity') {
                        checkedValue = card.rarity;
                    } else if (dataGroup === 'Personality') {
                        checkedValue = card.personalities;
                    } else if (dataGroup === 'Style') {
                        checkedValue = card.style;
                    } else if (dataGroup === 'Saga') {
                        checkedValue = card.saga;
                    } else if (dataGroup === 'Headshot') {
                        checkedValue = card.headshot;
                    }

                    ret = compareFilter(checkTrue, checkedValue, dataId);

                    return ret;
                });
            });

            if (customButtonMatch instanceof Function) {
                results = customButtonMatch(results);
            }
        }

        if (results.length > 0) {
            var capped = false;
            var maxResults = 50;
            var cappedNumber = undefined;

            if (results.length > maxResults) {
                cappedNumber = results.length;
                results = results.slice(0, maxResults);
                capped = true;
            }

            $('#deck-build-result-qtd > h5').html('Result count: ' +
                    results.length +
                    (capped ? (' (' + cappedNumber + ' results, capped at ' + maxResults + ')') : ''));

            $.each(results, function(key, elem) {
                $('#deck-build-result-qtd').fadeIn(displayTimer);
                $(elem).parents('.deck-build-result-row').fadeIn(displayTimer);
            });
        } else {
            $('#deck-build-no-result').fadeIn(displayTimer);
        }

    }

    function resetSourceSearch() {
        $(this).val('');
        $('#deck-build-result-qtd').fadeOut(displayTimer);
        $('#deck-build-no-result').fadeOut(displayTimer);
        $('.deck-build-result-row').fadeOut(displayTimer);
    }

    $(typingInputId).focus(resetSourceSearch);
    $(typingInputId).click(resetSourceSearch);

    InterfaceDBZ.createLinks(sourceTable);

    $(document).ready(function() {
        $('#deck-build-show-advanced-search').click(function() {
            var box = $('#deck-build-advanced-options');
            var button = this;
            if (box.is(':visible')) {
                $(this).attr('disabled', true);
                box.fadeOut(250, function() {
                    $(button).attr('disabled', false);
                });
            } else {
                $(this).attr('disabled', true);
                box.fadeIn(250, function() {
                    $(button).attr('disabled', false);
                });
            }
        });

        window.InterfaceDBZ.advancedFilterEntryFromDropDown = function(entry) {
            if (!$(entry).hasClass('disabled')) {
                $(entry).addClass('disabled');

                var label = advancedFilterEntry.replace('%group%', $(entry).attr('data-group')).replace('%content%',
                        $(entry).attr('data-group') + ": " + $(entry).children('a').html()).replace('%id%', $(entry).attr('data-id'));
                $('#deck-build-advanced-entries').append(advancedFilterRowEntry.replace('%entry%', label));
                doneTyping();
            }
        };

        var listElement = '<li data-group="%group%" data-id="%id%" onclick="InterfaceDBZ.advancedFilterEntryFromDropDown(this);" role="presentation"><a role="menuitem" tabindex="-1">%element%</a></li>';
        var listHeader = '<li role="presentation" class="dropdown-header">%element%</li>';
        var listDivider = '<li role="presentation" class="divider"></li>';

        $('#deck-build-advanced-search-combat').append(listHeader.replace('%element%', 'Attack'));

        for (var key in CardInformation.Attack) {
            $('#deck-build-advanced-search-combat').append(listElement.replace('%element%',
                    ClassHelper.getKeyByValue(CardInformation.Attack, CardInformation.Attack[key])
                    ).replace('%id%', CardInformation.Attack[key]).replace('%group%', 'Attack'));
        }

        $('#deck-build-advanced-search-combat').append(listDivider);

        $('#deck-build-advanced-search-combat').append(listHeader.replace('%element%', 'Defense'));

        for (var key in CardInformation.Defense) {
            $('#deck-build-advanced-search-combat').append(listElement.replace('%element%',
                    ClassHelper.getKeyByValue(CardInformation.Defense, CardInformation.Defense[key]))
                    .replace('%id%', CardInformation.Defense[key]).replace('%group%', 'Defense'));
        }

        $('#deck-build-advanced-search-type').append(listHeader.replace('%element%', 'Type'));

        for (var key in CardInformation.Type) {
            $('#deck-build-advanced-search-type').append(listElement.replace('%element%',
                    ClassHelper.getKeyByValue(CardInformation.Type, CardInformation.Type[key]))
                    .replace('%id%', CardInformation.Type[key]).replace('%group%', 'Type'));
        }

        for (var key in CardInformation.Saga) {
            $('#deck-build-advanced-search-saga').append(listHeader.replace('%element%',
                    key
                    ));

            for (var innerKey in CardInformation.Saga[key]) {
                $('#deck-build-advanced-search-saga').append(listElement.replace('%element%',
                        ClassHelper.getKeyByValue(CardInformation.Saga[key], CardInformation.Saga[key][innerKey]) + ' Saga'
                        ).replace('%id%', CardInformation.Saga[key][innerKey]).replace('%group%', 'Saga'));
            }
        }

        for (var key in CardInformation.Rarity) {
            $('#deck-build-advanced-search-rarity').append(listElement.replace('%element%', key)
                    .replace('%id%', CardInformation.Rarity[key]).replace('%group%', 'Rarity'));
        }

        for (var key in CardInformation.Style) {
            $('#deck-build-advanced-search-style').append(listElement.replace('%element%', key)
                    .replace('%id%', CardInformation.Style[key]).replace('%group%', 'Style'));
        }

        var effectDataSources = {};

        var dataSets = "";
        var evalString = "";

        for (var key in CardInformation.Effects) {
            effectDataSources[key] = [];
            for (var innerKey in CardInformation.Effects[key]) {
                effectDataSources[key].push({value: innerKey,
                    id: CardInformation.Effects[key][innerKey],
                    group: key
                });
            }

            var keyVarName = key.replace(/[ -]+/g, "");

            evalString += "var " + keyVarName + " = new Bloodhound({\
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),\
                    queryTokenizer: Bloodhound.tokenizers.whitespace,\
                    local: $.map(" + JSON.stringify(effectDataSources[key]) + ", function(elem) {\
                        return elem;\
                    })\
                });" + keyVarName + ".initialize();";

            dataSets += ",\
                {\
                    name: '" + keyVarName + "',\
                    displayKey: 'value',\
                    source: " + keyVarName + ".ttAdapter(),\
                    templates: {\
                    header: '<span class=\"dropdown-header\">" + key + "</span>'}\
                }";
        }

        evalString +=
                "$('#deck-build-effect-search').typeahead({\
                hint: true,\
                highlight: true,\
                minLength: 1\
            }" + dataSets + ");";

        var autocompleteEffects = eval(evalString);

        function autocompleted(e, datum) {
            var dataGroup = $(this).attr('data-group');
            if ($(".deck-build-advanced-filter-content[data-group='" + dataGroup + "'][data-id='" + datum['id'] + "']").length === 0) {
                var label = advancedFilterEntry.replace('%group%', dataGroup).replace('%content%',
                        dataGroup + ": " + datum['value']).replace('%id%', datum['id']);
                $('#deck-build-advanced-entries').append(advancedFilterRowEntry.replace('%entry%', label));
                doneTyping();
            }
        }

        autocompleteEffects.attr("data-group", "Effect");
        autocompleteEffects.on('typeahead:selected', autocompleted);
        autocompleteEffects.on('typeahead:autocompleted', autocompleted);

        var personalityDataSources = [];

        for (var key in CardInformation.Personality) {
            personalityDataSources.push(
                    {
                        value: key,
                        id: CardInformation.Personality[key]
                    });
        }

        var personalityAutoCompleteEngine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: personalityDataSources
        });

        personalityAutoCompleteEngine.initialize();

        var autocompletePersonality = $('#deck-build-personality-search').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'personalities',
            displayKey: 'value',
            source: personalityAutoCompleteEngine.ttAdapter()
        });

        autocompletePersonality.attr("data-group", "Personality");
        autocompletePersonality.on('typeahead:selected', autocompleted);
        autocompletePersonality.on('typeahead:autocompleted', autocompleted);

        var autocompleteHeadshot = $('#deck-build-headshot-search').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'headshots',
            displayKey: 'value',
            source: personalityAutoCompleteEngine.ttAdapter()
        });

        autocompleteHeadshot.attr("data-group", "Headshot");
        autocompleteHeadshot.on('typeahead:selected', autocompleted);
        autocompleteHeadshot.on('typeahead:autocompleted', autocompleted);

        $('#deck-build-advanced-search-description').click(function() {
            $(this).button('toggle');
            doneTyping();
        });

        $('#deck-build-advanced-search-name').click(function() {
            $(this).button('toggle');
            doneTyping();
        });

        if (customButtonInit instanceof Function) {
            customButtonInit(doneTyping);
        }
        
        if (callback instanceof Function) {
            callback(sourceTable);
        }
    });

    $(wrapper).show();
};

$(document).ready(function() {
    $('body').append('\
<div class="modal in" id="dbz-interface-select-modal" role="dialog" aria-labelledby="Select" aria-hidden="true">\
  <div class="modal-dialog modal-sm">\
    <div class="modal-content">\
      <div class="modal-body">\
      \
      </div>\
    </div>\
  </div>\
</div>');
});

DBZCCG.Interface.selectWindow = function(html) {
    $('#dbz-interface-select-modal').find('.modal-body').html(html);
    $('#dbz-interface-select-modal').modal('show');
};