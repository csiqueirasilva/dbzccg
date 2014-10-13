// http://github.com/csiqueirasilva/dbzccg.js

// workers

DBZCCG.Worker.worker = new Worker('lib/worker/generic.js');
DBZCCG.Worker.worker.onmessage = function(event) {
    if(event.data && DBZCCG.Worker.events[event.data.cmd] instanceof Function) {
        DBZCCG.Worker.events[event.data.cmd](event);
    }
};

DBZCCG.Load.mustHave = function() {
    return DBZCCG.Load.foilFriezaDefault && DBZCCG.Load.foilSaiyanDefault && DBZCCG.Load.particleTexture && DBZCCG.Load.cardBack;
};

DBZCCG.Load.sourceCardFetch = false;
DBZCCG.Load.skipLoad = false;

DBZCCG.loadFunction = function(checkLoad, buildScene, render, controls, finishLoad, afterLoadCallback) {
    window.InterfaceDBZ.toggleModalProgress("Loading...");
                    
    var loadModelInterval = window.setInterval(function() {
        if (!(checkLoad instanceof Function) || checkLoad()) {
            window.clearInterval(loadModelInterval);
            var scr = undefined;
            if(buildScene instanceof Function && render instanceof Function && controls instanceof Function) {
                scr = DBZCCG.Screen.create(buildScene, render, controls);
            }
            
            var interval = window.setInterval(function() {
                var count = DBZCCG.loadIcr + "/" + DBZCCG.loadCounter;
                console.log(count);
                if (DBZCCG.finishedLoading && 
                        ((DBZCCG.loadCounter === DBZCCG.loadIcr && DBZCCG.loadCounter !== 0) ||
                        DBZCCG.Load.skipLoad) ) {
                    window.clearInterval(interval);
                    window.InterfaceDBZ.toggleModalProgress();
                    
                    if(finishLoad instanceof Function) {
                        finishLoad();
                    }

                    if(scr !== undefined) {
                        scr.start();
                    }

                    window.onresize();

                    DBZCCG.waitingMainPlayerMouseCommand = true;
                    console.log('Load is finished');

                    if(afterLoadCallback instanceof Function) {
                        afterLoadCallback();
                    }
                }
            }, 100);
        }
    }, 10);
};

/* Dialogs */
DBZCCG.searchFormHTML = '<div class="search-box"><input id="search-form" type="text"></input><div id="search-result"></div></div>';

DBZCCG.searchFormContent = function(dialogContentId, matchCallback, sourceElements, searchResult) {
    var buttons = DBZCCG.Interface.disableButtons(dialogContentId);

    DBZCCG.Interface.hideDialogClose(dialogContentId);

    $('#search-form').keyup(function() {
        if (matchCallback($(this).val())) {
            $(this).val($(this).val().toUpperCase());
            buttons.button('enable');
        } else {
            buttons.button('disable');
        }
    });

    $('#search-form').blur(function() {
        if (matchCallback($(this).val())) {
            if (searchResult instanceof Function) {
                searchResult($(this).val());
            }
            buttons.button('enable');
        } else {
            $('#search-result').html('');
            buttons.button('disable');
        }
    });

    $('#search-form').autocomplete({source: sourceElements,
        select: function(event, ui) {
            if (searchResult instanceof Function) {
                searchResult(ui.item.value);
            }
            buttons.button('enable');
        }});
};

DBZCCG.createDialog = function(title, content, id) {
    if ($('#' + id).is(':visible') || $('#mainDialog').is(':visible')) {
        return false;
    }

    var elem = document.createElement('div');
    elem.id = id || 'mainDialog';
    elem.innerHTML = '';
    elem.appendChild(content);
    elem.style.display = 'none';
    document.getElementById('hud').appendChild(elem);

    // TODO: Add nicescrollbar to the Dialog. It is tricky.
    $(elem).dialog({resizable: false, 
        title: title, 
        autoOpen: false, 
        height: window.innerHeight * 0.5, 
        width: window.innerWidth * 0.333,
        open: function () {
            $(elem)
                .parent()
                .find('.ui-dialog-buttonpane')
                .find('button')
                .addClass('btn')
                .addClass('btn-default');  
        },
        close: function() {
            $(this).remove();
        }});

    return true;
};

DBZCCG.effectDialog = function() {
    DBZCCG.confirmDialog('Opportunity to use an effect', 'Skip opportunity to use an effect?', null,
            {
                "Check field": function() {
                    $(this).dialog('close');
                },
                "Skip opportunity": function() {
                    DBZCCG.Combat.removeSelectionParticles();
                    $('#effect-btn').hide();
                    DBZCCG.Interface.leftSideMenuOnResize();
                    DBZCCG.performingTurn = false;
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    $(this).dialog('close');
                }
            });
};

DBZCCG.declareDialog = function() {
    DBZCCG.confirmDialog('Declaring combat', 'Do you wish to declare combat?', null,
            {
                "Declare combat": function() {
                    $('#combat-btn').hide();
                    DBZCCG.Interface.leftSideMenuOnResize();
                    DBZCCG.combat = true;
                    DBZCCG.performingTurn = false;
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    $(this).dialog('close');
                },
                "Skip combat": function() {
                    $('#combat-btn').hide();
                    DBZCCG.Interface.leftSideMenuOnResize();
                    DBZCCG.combat = false;
                    DBZCCG.performingTurn = false;
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    $(this).dialog('close');
                }
            });
};

DBZCCG.rejuvenateDialog = function() {
    DBZCCG.confirmDialog('Rejuvenation', 'Do you wish to rejuvenate?', null,
            {
                "Rejuvenate": function() {
                    $('#rejuvenate-btn').hide();
                    DBZCCG.Interface.leftSideMenuOnResize();
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    DBZCCG.performingAction.rejuvenate(true);
                    $(this).dialog('close');
                },
                "Do not rejuvenate": function() {
                    $('#rejuvenate-btn').hide();
                    DBZCCG.Interface.leftSideMenuOnResize();
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    DBZCCG.performingTurn = false;
                    $(this).dialog('close');
                }
            });
};

DBZCCG.hideCombatIcons = function() {
    $('#pass-btn').hide();
    $('#final-physical-btn').hide();
    DBZCCG.qtipElement.qtip('hide');
    DBZCCG.Interface.leftSideMenuOnResize();
};

DBZCCG.finalPhysicalDialog = function() {
    DBZCCG.confirmDialog(
            'Final Physical Attack',
            'At the cost of discarding a card from your hand, you can perform a physical attack. After the attack, you will automatically pass any chance to attack or defend. Do you wish to perform a final physical attack?',
            function() {
                window.setTimeout(function() {

                    $('#pass-btn').hide();
                    DBZCCG.Interface.leftSideMenuOnResize();

                    document.getElementById('final-physical-btn').onclick = function() {

                        DBZCCG.confirmDialog(
                                'Final Physical Attack',
                                'Discard a card from your hand in order to perform the attack.',
                                null,
                                {
                                    "OK": function() {
                                        $(this).dialog('close');
                                        DBZCCG.Combat.effectHappening = true;
                                        var player = DBZCCG.attackingPlayer;
                                        var FPACallback = {
                                            priority: Infinity,
                                            life: false,
                                            f: function() {
                                                DBZCCG.toolTip.idxHand = player.hand.getCardIdx(DBZCCG.toolTip.parent);
                                                DBZCCG.qtipElement.qtip('hide');
                                                $('#final-physical-btn').hide();
                                                DBZCCG.Interface.leftSideMenuOnResize();

                                                player.transferCards("hand", [DBZCCG.toolTip.idxHand], "discardPile");

                                                DBZCCG.waitingMainPlayerMouseCommand = false;

                                                for (var i = 0; i < player.hand.cards.length; i++) {
                                                    player.hand.cards[i].display.removeCallback(FPACallback);
                                                }

                                                DBZCCG.toolTip.parent.removeCallback(FPACallback);
                                                DBZCCG.toolTip.idxHand = undefined;
                                                DBZCCG.clearMouseOver();

                                                DBZCCG.Combat.effectHappening = false;
                                                document.getElementById('final-physical-btn').onclick = function() {
                                                    DBZCCG.finalPhysicalDialog();
                                                };
                                                DBZCCG.Combat.activateEffectAI(DBZCCG.General['Final Physical Attack'].display);
                                            }
                                        };

                                        for (var i = 0; i < DBZCCG.attackingPlayer.hand.cards.length; i++) {
                                            DBZCCG.Combat.addSelectionParticle(DBZCCG.attackingPlayer.hand.cards[i].display, 0.3);
                                            DBZCCG.attackingPlayer.hand.cards[i].display.addCallback(FPACallback);
                                        }
                                    }
                                });
                    };

                    document.getElementById('final-physical-btn').onclick();

                }, 100);
            },
            null,
            window.innerWidth * 0.4,
            window.innerHeight * 0.4);
};

DBZCCG.passDialog = function(msg) {
    DBZCCG.confirmDialog('Passing', msg, DBZCCG.Player.pass);
};

DBZCCG.confirmDialog = function(title, content, ok_cb, buttons, width, height) {

    var wrapperDiv;

    if (content instanceof Object) {
        wrapperDiv = content;
    } else {
        wrapperDiv = document.createElement('div');
        wrapperDiv.innerHTML = content;
    }

    var ret = DBZCCG.createDialog(title, wrapperDiv, 'confirmDialog');

    if (ret) {

        $('#confirmDialog').dialog('option', 'height', height || (window.innerHeight * 0.35));
        $('#confirmDialog').dialog('option', 'width', width || (window.innerWidth * 0.35));

        if (!buttons) {
            $('#confirmDialog').dialog('option', 'buttons', {
                "OK": function() {
                    ok_cb();
                    $(this).dialog('close');
                },
                "Cancel": function() {
                    $(this).dialog('close');
                }
            });
        } else {
            $('#confirmDialog').dialog('option', 'buttons', buttons);
        }

        $('#confirmDialog').dialog('open');
    }
};

DBZCCG.removeObject = function(obj) {
    var idx = DBZCCG.objects.indexOf(obj);
    if (idx !== -1) {
        DBZCCG.objects.splice(idx, 1);
    }
};
/* End of dialog */

/* Enums */
DBZCCG.cancelAction = 0xF00001;

/* Game variables */
DBZCCG.performingTurn = false;
DBZCCG.performingAnimation = false;
DBZCCG.combat = false;
DBZCCG.gameOver = false;
DBZCCG.performingAction = null;
DBZCCG.mainPlayer = null;
DBZCCG.finishedLoading = false;
DBZCCG.currentTip = null;
DBZCCG.objects = [];
DBZCCG.billboards = [];
DBZCCG.selectionColor = 0xDD4444;
DBZCCG.clearSelectionColor = 0x000000;
DBZCCG.selectionParticles = null;
DBZCCG.clock = new THREE.Clock();

DBZCCG.incrementLoad = function() {
    DBZCCG.loadIcr++;
};

/* Interface variables */
DBZCCG.toolTip = {};

DBZCCG.toolTip.showDescription = function() {
    var parent = DBZCCG.toolTip.parent;

    if (parent.descriptionBox instanceof Function) {
        var display = parent;
        if (parent.displayObject instanceof Function) {
            display = parent.displayObject();
        }

        if (DBZCCG.leftScreen && DBZCCG.leftScreen.focusElement instanceof Function) {
            DBZCCG.leftScreen.focusElement(display, display.leftScreenCallback);
        }

        var textReturn = parent.descriptionBox();
        if (typeof textReturn === "string") {
            DBZCCG.descriptionBox(textReturn);
        }
    }

    if (!parent.doNotFocus) {
        $('#object-info').modal('show');
    }
};

DBZCCG.updateBillboards = function(camera) {

    var obj;
    while (DBZCCG.billboards.length !== 0) {
        obj = DBZCCG.billboards.pop();
        obj.rotation = camera.rotation;
        // TODO: fix the position coordinates to be added according to the camera
        obj.position.z += 1;
        obj.position.y += 0.5;
    }
};

DBZCCG.descriptionBox = function(content) {
    document.getElementById('descriptionBoxContent').innerHTML = content;
};

DBZCCG.clearDescriptionBox = function() {
    document.getElementById('descriptionBoxContent').innerHTML = '';
};

DBZCCG.selectionEffect = function(color, objects) {
    if (objects instanceof Array) {
        for (var key in objects) {
            // For face material
            if (objects[key].material.materials instanceof Array) {
                DBZCCG.selectionEffect(color, objects[key]);
            } else {
                objects[key].material.emissive.setHex(color);
            }
        }
    }
};