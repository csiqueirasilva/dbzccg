DBZCCG.Combat = {};

DBZCCG.Combat.effectHappening = false;
DBZCCG.Combat.selectionArrow = null;

// Effect types
DBZCCG.Combat.Attack = {};
DBZCCG.Combat.Attack.Physical = 0;
DBZCCG.Combat.Attack.Energy = 1;

DBZCCG.Combat.Defense = {};
DBZCCG.Combat.Defense.Physical = 2;
DBZCCG.Combat.Defense.Energy = 3;

DBZCCG.Combat.Effect = {};
DBZCCG.Combat.Effect.Floating = 4;
DBZCCG.Combat.Effect.LowerAnger = 5;
DBZCCG.Combat.Effect.RaiseAnger = 6;
DBZCCG.Combat.Effect.StageUp = 7;
DBZCCG.Combat.Effect.StageDown = 8;
DBZCCG.Combat.Effect.DrawCard = 9;
DBZCCG.Combat.Effect.DiscardCard = 10;

DBZCCG.Combat.Target = {};
DBZCCG.Combat.Target.Self = 11;
DBZCCG.Combat.Target.Enemy = 12;

DBZCCG.Combat.Effect.StageSet = 13;

DBZCCG.Combat.Target.Multiple = 14;
DBZCCG.Combat.Target.Single = 15;

// End of effect types

DBZCCG.Combat.inUsePAT = DBZCCG.Card.Saga.Saiyan;

DBZCCG.Combat.flashCard = function(card) {
    if (card.display.children[0].material.materials[5].map && card.display.children[0].material.materials[5].map.sourceFile) {
        var content = '<img src ="' + card.display.children[0].material.materials[5].map.sourceFile + '" />';
        DBZCCG.Combat.flashContent(content, 'flash-card');
    }
};

DBZCCG.Combat.checkCosts = function(card) {
    var ret = true;
    if (card.cost instanceof Function) {
        if (DBZCCG.attackingPlayer.getPersonalityInControl().currentPowerStageAboveZero < card.cost().powerStage) {
            ret = false;
        }
    }
    return ret;
};

DBZCCG.Combat.payCosts = function(card) {
    if (card.cost instanceof Function /* || globalCostModifier */) {
        var cost = card.cost();
        DBZCCG.listActions.splice(0, 0, function() {
            if (cost.powerStage) {
                DBZCCG.attackingPlayer.getPersonalityInControl().raiseZScouter(-cost.powerStage, true, true);
            }
        });
    }
};

DBZCCG.Combat.personalityPowerDefaultAttackCheck = function(player) {
    var turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    var ret = false;
    if (this.turn !== turn) {
        ret = DBZCCG.Combat.defaultAttackerCheck(player, this);
    }
    return ret;
};

DBZCCG.Combat.personalityPowerDefaultDefenseCheck = function(player) {
    var turn = parseInt($('#turnCounterNumber')[0].innerHTML);
    var ret = false;
    if (this.turn !== turn) {
        ret = DBZCCG.Combat.defaultDefenderCheck(player, this);
    }
    return ret;
};

DBZCCG.Combat.defaultDragonballCheck = function(player) {
    var db = this;
    var result = DBZCCG.Combat.defaultNonCombatCheck(player);
    if (result) {
        result = !DBZCCG.Dragonball.checkInPlay(db);
    }
    return result;
};

DBZCCG.Combat.defaultNonCombatCheck = function(player) {
    var result = false;

    if (player === DBZCCG.performingAction && !DBZCCG.Combat.effectHappening &&
            $('.selectedTurn')[0].id === 'noncombat-phase' && DBZCCG.Combat.checkCosts(this)
            && player.nonCombats.getCardIdx(this.display) === -1) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.checkInPlay = function(player, card) {
    var ret = true;
    if (card.type === DBZCCG.Card.Type['Non-Combat']) {
        ret = player.nonCombats.getCardIdx(card.display) === -1 ? false : true;
    }
    return ret;
};

DBZCCG.Combat.multipleActivation = function(player, card) {
    var checkCard = card || this;
    var result = false;
    for (var i = 0; i < checkCard.activators.length && !result; i++) {
        result = checkCard.activators[i](player, checkCard);
    }
    return result;
};

DBZCCG.Combat.defaultAttackerCheck = function(player, card) {
    var result = false;
    var checkCard = card || this;
    if (player.checkActivation(checkCard) && DBZCCG.combat && player === DBZCCG.performingAction && player === DBZCCG.attackingPlayer && !DBZCCG.Combat.effectHappening &&
            !DBZCCG.displayingText && DBZCCG.Combat.checkCosts(checkCard) && DBZCCG.Combat.checkInPlay(player, checkCard)) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.defaultDefenderCheck = function(player, card) {
    var result = false;
    var checkCard = card || this;
    if (player.checkActivation(checkCard) && DBZCCG.combat && player === DBZCCG.performingAction && player === DBZCCG.defendingPlayer && !DBZCCG.Combat.effectHappening &&
            !DBZCCG.displayingText && DBZCCG.Combat.checkCosts(checkCard) && DBZCCG.Combat.checkInPlay(player, checkCard)) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.PAT = {};

DBZCCG.Combat.PAT[DBZCCG.Card.Saga.Saiyan] = {
    cardImage: 'images/DBZCCG/saiyan_pat.jpg',
    calcDamage: function(sourcePowerLevel, destinationPowerLevel) {
        function getDamage(power) {
            var ret;

            power = parseInt(power);
            if (power === 0) {
                ret = 1;
            } else if (power > 0 && power <= 500) {
                ret = 2;
            } else if (power > 500 && power <= 900) {
                ret = 3;
            } else if (power > 900 && power <= 2900) {
                ret = 4;
            } else if (power > 2900 && power <= 9900) {
                ret = 5;
            } else if (power > 9900 && power <= 14900) {
                ret = 6;
            } else if (power > 14900 && power <= 24900) {
                ret = 7;
            } else {
                ret = 8;
            }

            return ret;
        }

        var result = getDamage(sourcePowerLevel) - getDamage(destinationPowerLevel) + 1;

        return result < 0 ? 0 : result;
    }
};

DBZCCG.Combat.attack = function(table, tableModifier, sourcePowerLevel, destinationPowerLevel) {
    var totalDamage = {cards: 0, stages: 0};
    if (table) {
        totalDamage.stages = DBZCCG.Combat.PAT[DBZCCG.Combat.inUsePAT].calcDamage(sourcePowerLevel, destinationPowerLevel);
    }

    if (tableModifier instanceof Function) {
        totalDamage = tableModifier(totalDamage);
    }

    return totalDamage;
};

DBZCCG.Combat.targetGroup = function(card) {
    switch (card.type) {
        case DBZCCG.Card.Type['Non-Combat']:
            return 'nonCombats';
        case DBZCCG.Card.Type['Dragonball']:
            return 'dragonballs';
    }
};

DBZCCG.Combat.setCardSource = function(display) {
    // Need to check where the card is
    var idxHand = DBZCCG.performingAction.hand.getCardIdx(display);
    if (idxHand === -1) {
        var idxNonCombat = DBZCCG.performingAction.nonCombats.getCardIdx(display);
        if (idxNonCombat === -1) {
            var idxDrills = DBZCCG.performingAction.drills.getCardIdx(display);
            if (idxDrills === -1) {
                var idxDragonballs = DBZCCG.performingAction.dragonballs.getCardIdx(display);
                if (idxDragonballs === -1) {
                    var idxInPlay = DBZCCG.performingAction.inPlay.getCardIdx(display);
                    if (idxInPlay === -1) {
                        var idxSetAside = DBZCCG.performingAction.setAside.getCardIdx(display);
                        if (idxSetAside === -1) {
                            var idxField = DBZCCG.performingAction.fieldCards.getCardIdx(display);
                            if (idxField !== -1) {
                                DBZCCG.toolTip.idxCard = idxField;
                                DBZCCG.toolTip.cardSource = 'fieldCards';
                            } else {
                                DBZCCG.toolTip.idxCard = undefined;
                                DBZCCG.toolTip.cardSource = undefined;
                            }
                        } else {
                            DBZCCG.toolTip.idxCard = idxSetAside;
                            DBZCCG.toolTip.cardSource = 'setAside';
                        }
                    } else {
                        DBZCCG.toolTip.idxCard = idxInPlay;
                        DBZCCG.toolTip.cardSource = 'inPlay';
                    }
                } else {
                    DBZCCG.toolTip.idxCard = idxDragonballs;
                    DBZCCG.toolTip.cardSource = 'dragonballs';
                }
            } else {
                DBZCCG.toolTip.idxCard = idxDrills;
                DBZCCG.toolTip.cardSource = 'drills';
            }
        } else {
            DBZCCG.toolTip.idxCard = idxNonCombat;
            DBZCCG.toolTip.cardSource = 'nonCombats';
        }
    } else {
        DBZCCG.toolTip.idxCard = idxHand;
        DBZCCG.toolTip.cardSource = 'hand';
    }
};

DBZCCG.Combat.checkDragonballControl = function(player) {
    var players = DBZCCG.table.players;
    var dragonballs = [];

    for (var j = 0; j < players.length; j++) {
        for (var i = 0; i < players[j].dragonballs.cards.length; i++) {
            if (players[j].dragonballs.cards[i].control === player) {
                dragonballs.push(players[j].dragonballs.cards[i]);
            }
        }
    }

    return dragonballs;
};

(function() {

    function createEffectPlayedCard(clicked, AI) {
        clicked.display.removeCallback(DBZCCG.Combat.placeCardInField);

        DBZCCG.performingAction.transferCards(
                DBZCCG.toolTip.cardSource,
                [DBZCCG.toolTip.idxCard],
                DBZCCG.Combat.targetGroup(clicked),
                null,
                null,
                true);


        if (((clicked.type instanceof Array && clicked.type.indexOf(DBZCCG.Card.Type.Dragonball) !== -1) ||
                clicked.type === DBZCCG.Card.Type.Dragonball) && !(clicked.activable instanceof Function)) {
            var performingTurn = DBZCCG.performingTurn;
            DBZCCG.effectHappening = true;

            DBZCCG.listActions.splice(0, 0, function() {
                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.performingTurn = performingTurn;
                    DBZCCG.effectHappening = false;
                });

                clicked.control = DBZCCG.performingAction;
                clicked.effect();
            });

            DBZCCG.performingTurn = false;

        } else {
            clicked.display.addCallback(DBZCCG.Combat.activateEffectCallback);
        }
    }

    DBZCCG.Combat.placeCardInField = {
        f: function() {
            var clicked = DBZCCG.toolTip.parent.parentCard;

            if (clicked.playable(DBZCCG.performingAction)) {
                DBZCCG.currentCard = clicked;

                var elem = $(DBZCCG.toolTip.content).children('#tooltipEffect')[0];

                DBZCCG.Combat.setCardSource(clicked.display);

                elem.onclick = function() {
                    $('#hud').qtip('hide');

                    createEffectPlayedCard(clicked);
                };
            }

        }, priority: 50000
    };

    function executeEffect(clicked) {
        DBZCCG.Combat.effectHappening = true;
        DBZCCG.currentCard = clicked;

        var performerPlayer = DBZCCG.performingAction;

        // Finish the action
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAction = performerPlayer;

            if (clicked.postEffect instanceof Function) {
                clicked.postEffect(clicked);
            }

            DBZCCG.Combat.removeAllSelectionArrows();
            DBZCCG.Combat.removeSelectionParticles();
        });

        // Invoke defender's turn, if possible
        if (DBZCCG.performingAction === DBZCCG.attackingPlayer) {
            DBZCCG.Combat.setDefenderTurn(DBZCCG.defendingPlayer);
        }

        // Card effect
        DBZCCG.listActions.splice(0, 0, function() {
            var effectHappening = clicked.effect() || false;

            if (clicked.targetCard && clicked.targetCard.display === DBZCCG.defendingPlayer.getPersonalityInControl().display) {
                DBZCCG.Combat.selectionArrow(DBZCCG.attackingPlayer.getPersonalityInControl().display, DBZCCG.defendingPlayer.getPersonalityInControl().display);
            }

            DBZCCG.Combat.effectHappening = effectHappening;
        });

        DBZCCG.Combat.payCosts(clicked);

        // Display the card image
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.Combat.flashCard(clicked);
        });

        // Play the card
        DBZCCG.listActions.splice(0, 0, function() {

            if (DBZCCG.toolTip.idxCard !== undefined && DBZCCG.performingAction !== undefined) {
                DBZCCG.Combat.addSelectionParticle(clicked.display.position);

                if (DBZCCG.toolTip.cardSource === 'hand') {
                    DBZCCG.performingAction.transferCards("hand", [DBZCCG.toolTip.idxCard], "inPlay", null, null, true);
                }

                DBZCCG.toolTip.idxCard = undefined;
            }

        });

        DBZCCG.performingTurn = false;
    }

    DBZCCG.Combat.activateEffectAI = function(display) {
        var clicked = display.parentCard;

        if (clicked.playable instanceof Function && clicked.playable(DBZCCG.performingAction)) {
            DBZCCG.currentCard = clicked;

            DBZCCG.Combat.setCardSource(clicked.display);

            createEffectPlayedCard(clicked, true);

        } else if (clicked.activable instanceof Function && clicked.activable(DBZCCG.performingAction)) {
            DBZCCG.Combat.setCardSource(clicked.display);

            executeEffect(clicked);
        }
    };

    DBZCCG.Combat.activateEffectCallback = {f: function() {
            var clicked = DBZCCG.toolTip.parent.parentCard;

            if (clicked.activable instanceof Function && clicked.activable(DBZCCG.performingAction)) {

                var elem = $(DBZCCG.toolTip.content).children('#tooltipEffect')[0];

                DBZCCG.Combat.setCardSource(clicked.display);

                $(DBZCCG.toolTip.content).children('#tooltipEffect').removeClass('tooltipEffectDisabled');

                elem.onclick = function() {
                    if (DBZCCG.combat) {
                        DBZCCG.waitingMainPlayerMouseCommand = false;
                        if (DBZCCG.performingAction === DBZCCG.attackingPlayer) {
                            DBZCCG.performingAction.passed = false;
                        }
                    }

                    this.onclick = null;

                    DBZCCG.hideCombatIcons();
                    DBZCCG.clearMouseOver();

                    executeEffect(clicked);
                };
            }
        }
        ,
        priority: 50000
    };

}());

DBZCCG.Combat.setDefenderTurn = function(player) {
    DBZCCG.listActions.splice(0, 0, function() {

        DBZCCG.performingTurn = true;

        DBZCCG.listActions.splice(0, 0, function() {

            if (DBZCCG.currentCard.success && DBZCCG.currentCard.sucessfulEffect instanceof Function) {
                DBZCCG.currentCard.sucessfulEffect(player);
            }

        });

        player.defenderDefends(DBZCCG.currentCard);

        DBZCCG.performingTurn = false;
    });
};

(function selectionParticles() {
    var geo = new THREE.Geometry();
    for (var z = -DBZCCG.Card.cardWidth / 2; z < DBZCCG.Card.cardWidth / 2; z = z + 0.01) {
        var x = Math.pow(Math.pow(DBZCCG.Card.cardWidth / 2, 2) - Math.pow(z, 2), 0.5);
        var particle = new THREE.Vector3(x, 0.6, z);
        particle.basePos = particle.clone();
        geo.vertices.push(particle);
        particle = new THREE.Vector3(-x, 0.6, z);
        particle.basePos = particle.clone();
        geo.vertices.push(particle);
    }

    var colors = [];
    var particleCount = geo.vertices.length;
    for (var i = 0; i < particleCount; i++) {
        colors[i] = new THREE.Color();
        colors[i].setHSL(i / 4000, 1.0, 0.5);
    }

    geo.colors = colors;

    // Later: Add custom shaders
    var selectionParticles = {element: new THREE.ParticleSystem(geo, new THREE.ParticleSystemMaterial({
            size: 0.2,
            vertexColors: true,
            map: THREE.ImageUtils.loadTexture("images/gfx/particles/particle.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        }))};

    selectionParticles.element.sortParticles = true;

    selectionParticles.update = function() {
        var pCount = geo.vertices.length;

        while (pCount--) {

            // get the particle
            var particle = geo.vertices[pCount];

            var icrVector = new THREE.Vector3(Math.cos(pCount) * 0.2, 0.6 + Math.sin(DBZCCG.clock.elapsedTime) * 0.15, Math.cos(pCount) * 0.2);
            particle.copy(particle.basePos.clone().multiplyScalar(Math.abs(Math.cos(DBZCCG.clock.elapsedTime)) * 1.5 + 0.5).add(icrVector));
        }

        geo.__dirtyVertices = true;
    };

    DBZCCG.Combat.selectionParticles = selectionParticles;

    var selections = [];

    DBZCCG.Combat.addSelectionParticle = function(position) {
        var selection = DBZCCG.Combat.selectionParticles.element.clone();
        selection.position = position;
        selections.push(selection);
        DBZCCG.mainScene.add(selection);
    };

    DBZCCG.Combat.removeSelectionParticles = function() {
        for (var i = 0; i < selections.length; i++) {
            DBZCCG.mainScene.remove(selections[i]);
            delete selections[i];
        }
        delete selections;
        selections = [];
    };

})();

(function loadArrow() {

    var selectionArrows = [];

    DBZCCG.Combat.updateSelectionArrows = function() {
        for (var i = 0; i < selectionArrows.length; i++) {
            selectionArrows[i].update();
        }
    };

    DBZCCG.Combat.removeAllSelectionArrows = function() {
        for (var i = 0; i < selectionArrows.length; i++) {
            DBZCCG.mainScene.remove(selectionArrows[i]);
            delete selectionArrows[i];
        }
        delete selectionArrows;
        selectionArrows = [];
    };


    DBZCCG.Combat.selectionArrow = function(sourceObj, targetObj) {
        var geo = new THREE.Geometry();
        var source, target;

        if (sourceObj.parent instanceof THREE.Object3D) {
            source = sourceObj.parent.localToWorld(sourceObj.position.clone());
        } else {
            source = sourceObj.position;
        }

        if (targetObj.parent instanceof THREE.Object3D) {
            target = targetObj.parent.localToWorld(targetObj.position.clone());
        } else {
            target = targetObj.position;
        }


        var diffVector = new THREE.Vector3().addVectors(target.clone(), source.clone().multiplyScalar(-1));

        var totalVertices = Math.floor(Math.abs(diffVector.z) + Math.abs(diffVector.x));

        var height = 30;
        var itZ = diffVector.z / totalVertices;
        var itX = diffVector.x / totalVertices;
        var itY = height / totalVertices;

        for (var i = 0; i <= totalVertices; i++) {
            var z = source.z + itZ * i;
            var x = source.x + itX * i;

            var y = i < totalVertices / 2 ? Math.pow(itY * i * 2, 0.5) : Math.pow((height - itY * i) * 2, 0.5);


            var particle = new THREE.Vector3(x, 2 + y, z);
            geo.vertices.push(particle);
        }

        var colors = [];
        var particleCount = geo.vertices.length;
        for (var i = 0; i < particleCount; i++) {
            colors[i] = new THREE.Color();
            colors[i].setHSL((i + 200) / 1000, 1.0, 0.5);
        }

        geo.colors = colors;

        // Later: Add custom shaders
        var selectionArrow = new THREE.ParticleSystem(geo, new THREE.ParticleSystemMaterial({
            size: 10,
            vertexColors: true,
            map: THREE.ImageUtils.loadTexture("images/gfx/particles/particle.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        }));

        selectionArrow.sortParticles = true;

        var idxArrow = 0;
        selectionArrow.update = function() {
            var icr = Math.abs(Math.sin(DBZCCG.clock.elapsedTime)) * 0.4;
            var hue = (100 / 1000) * icr;
            for (var j = 0; j < geo.colors.length; j++) {
                if (idxArrow !== j) {
                    geo.colors[j].setHSL(hue, 1.0, 0.5);
                } else {
                    geo.colors[j].setHSL(1.0, 1.0, 1.0);
                }
            }

            geo.colorsNeedUpdate = true;
            idxArrow = (idxArrow + 1) % geo.colors.length;
        };

        selectionArrows.push(selectionArrow);

        DBZCCG.mainScene.add(selectionArrow);
    };
})();

DBZCCG.Combat.flashContent = function(content, type) {
    DBZCCG.displayingText = true;

    var id = document.createElement('div');
    document.getElementById('renderer-wrapper').appendChild(id);
    id.id = type || 'flash-content';
    id.innerHTML = content;

    DBZCCG.flash = id;

    $(id).fadeIn(500);

    window.setTimeout(function() {
        $(id).fadeOut(500, function() {
            $(id).remove();
            DBZCCG.displayingText = false;
            DBZCCG.flash = null;
        });
    }, 1000);
};

DBZCCG.Combat.speechBubble = function(text, display) {
    DBZCCG.listActions.splice(0, 0, function() {
        DBZCCG.displayingText = true;
        DBZCCG.typingSpeech = true;
        var p = document.createElement('p');
        document.getElementById('renderer-wrapper').appendChild(p);
        p.id = 'card-speech';
        if (!display) {
            alert('JESUS O QUE HOUVE');
        }
        var vector = DBZCCG.Screen.getWindowCoords(display);
        p.style.left = (((vector.x - p.offsetWidth * 0.2) / window.innerWidth) * 100) + '%';
        p.style.top = (((vector.y - p.offsetHeight * 1.5) / window.innerHeight) * 100) + '%';

        var i = 0;
        $(p).fadeIn(500, function() {

            var intervalText = window.setInterval(function() {
                if (i === text.length) {
                    window.clearInterval(intervalText);
                    window.setTimeout(function() {
                        $(p).fadeOut(500, function() {
                            $(p).remove();
                            DBZCCG.displayingText = false;
                        });
                    }, 1500);
                    DBZCCG.typingSpeech = false;
                } else {
                    p.innerHTML += text.charAt(i);
                    i++;
                }

            }, 15);
        });
    });
};

DBZCCG.Combat.setMouseOverCallback = function(display, mouseMove) {
    display.mouseOver = function(event) {
        if (!$('.qtip').is(':visible')) {
            if (!this.localTooltip) {
                if (display.parentCard) {
                    if (DBZCCG.performingAction.checkOwnership(display) && display.parentCard.activable instanceof Function && display.parentCard.activable(DBZCCG.performingAction) && display.parentCard.effectType instanceof Array &&
                            (display.parentCard.effectType.indexOf(DBZCCG.Combat.Attack.Physical) !== -1 ||
                                    display.parentCard.effectType.indexOf(DBZCCG.Combat.Attack.Energy) !== -1) && this.displayHoverText()) {
                        this.localTooltip = DBZCCG.Combat.mouseHoverTooltip(event);
                        var coords = DBZCCG.Screen.getWindowCoords(display);

                        this.localTooltip.style.top = parseInt(coords.y) * 0.75 + 'px';
                        this.localTooltip.style.left = (coords.x - this.localTooltip.offsetWidth * 1.25) + 'px';
                    }
                } else {
                    this.localTooltip = DBZCCG.Combat.mouseHoverTooltip(event);

                    var top = event.clientY - this.localTooltip.offsetHeight * 2.25;
                    var left = event.clientX - this.localTooltip.offsetWidth * 4;
                    this.localTooltip.style.top = top + 'px';
                    this.localTooltip.style.left = left + 'px';
                }
            } else if (mouseMove) {
                var top = event.clientY - this.localTooltip.offsetHeight - 25;
                var left = event.clientX - this.localTooltip.offsetWidth / 2;
                this.localTooltip.style.top = top + 'px';
                this.localTooltip.style.left = left + 'px';
            }

            if (this.localTooltip) {
                this.localTooltip.innerHTML = this.displayHoverText();
            }
        }
    };

    display.click = display.mouseOut = function(event) {
        if (this.localTooltip) {
            var elem = this;
            $(elem.localTooltip).fadeOut(250, function() {
                $(elem.localTooltip).remove();
                elem.localTooltip = undefined;
            });
        }
        return true;
    };
};

DBZCCG.Combat.mouseHoverTooltip = function(event) {
    var element = document.createElement('div');
    element.id = 'hover-tooltip';
    element.style.display = 'none';
    document.body.appendChild(element);
    element.style['z-index'] = 850;
    element.style.position = 'absolute';
    element.style["-moz-border-radius"] = '10px';
    element.style["-webkit-border-radius"] = '10px';
    element.style["border-radius"] = '10px';
    element.style["border"] = '8px solid #666';
    element.style["padding"] = '10px';
    element.style["background-color"] = '#FFF';
    element.style["color"] = '#000';
    var top = event.clientY - element.offsetHeight - 25;
    var left = event.clientX - element.offsetWidth / 2;
    element.style.top = top + 'px';
    element.style.left = left + 'px';
    $(element).fadeIn(250);
    return element;
}

DBZCCG.Combat.labelText = function(text, position, color, zindex, size) {

    if (color !== undefined) {
        color = color.toString(16);
        for (var i = color.length; i < 6; i++) {
            color = '0' + color;
        }
        color = '#' + color;
    } else {
        color = '#FFFFFF';
    }

    var span = document.createElement('span');
    span.id = 'hover-text';
    span.style.position = 'absolute';
    span.style['z-index'] = zindex || 900;
    span.style.color = color;
    span.style['font-size'] = (size || 2) + 'em';
    span.style['font-weight'] = 'bold';
    span.style['text-shadow'] = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
    span.innerHTML = text;
    span.className = 'hover-label-text';
    document.getElementById('renderer-wrapper').appendChild(span);
    span.style.left = (((position.x - span.offsetWidth / 2) / window.innerWidth) * 100) + '%';
    span.style.top = (((position.y - span.offsetHeight / 2) / window.innerHeight) * 100) + '%';
    return span;
}

DBZCCG.Combat.hoverText = function(text, display, color) {
    if (text) {
        DBZCCG.displayingText = true;

        var vector = DBZCCG.Screen.getWindowCoords(display);

        var span = DBZCCG.Combat.labelText(text, vector, color);

        var i = 0;
        var top = parseInt((span.style.top.replace('%', '')));
        var dcr = top * 0.0009;
        var intervalRise = window.setInterval(function() {
            span.style.top = (top - dcr * i) + '%';
            i++;
        }, 1);

        $(span).fadeIn(500, function() {
            window.setTimeout(function() {
                $(span).fadeOut(500, function() {
                    window.clearInterval(intervalRise);
                    $(span).remove();
                    DBZCCG.displayingText = false;
                });
            }, 1000);
        });
    }
}