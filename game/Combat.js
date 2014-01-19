DBZCCG.Combat = {};

DBZCCG.Combat.effectHappening = false;
DBZCCG.Combat.selectionArrow = null;

DBZCCG.Combat.Attack = {};
DBZCCG.Combat.Attack.Physical = 0;
DBZCCG.Combat.Attack.Energy = 1;

DBZCCG.Combat.AttackerEffect = 0;
DBZCCG.Combat.inUsePAT = DBZCCG.Card.Saga.SAIYAN;

DBZCCG.Combat.defaultNonCombatCheck = function(player) {
    var result = false;

    if (player === DBZCCG.performingAction && !DBZCCG.Combat.effectHappening &&
            $('.selectedTurn')[0].id === 'noncombat-phase') {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.defaultAttackerCheck = function(player) {
    var result = false;
    if (DBZCCG.combat && player === DBZCCG.performingAction && player === DBZCCG.attackingPlayer && !DBZCCG.Combat.effectHappening &&
            $(".alertify-log:visible").length === 0) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.defaultDefenderCheck = function(player) {
    var result = false;
    if (DBZCCG.combat && player === DBZCCG.performingAction && player === DBZCCG.defendingPlayer && !DBZCCG.Combat.effectHappening &&
            $(".alertify-log:visible").length === 0) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.PAT = {};

DBZCCG.Combat.PAT[DBZCCG.Card.Saga.SAIYAN] = {
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
}

DBZCCG.Combat.targetGroup = function(card) {
    switch (card.type) {
        case DBZCCG.Card.Type.NonCombat:
            return 'nonCombats';
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

                clicked.display.removeCallback(DBZCCG.Combat.placeCardInField);
                clicked.display.addCallback(DBZCCG.Combat.activateEffectCallback);

                DBZCCG.performingAction.transferCards(DBZCCG.toolTip.cardSource, [DBZCCG.toolTip.idxCard], DBZCCG.Combat.targetGroup(clicked));
            };
        }

    }, priority: 50000
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

DBZCCG.Combat.activateEffectCallback = {f: function() {
        var clicked = DBZCCG.toolTip.parent.parentCard;

        if (clicked.activable(DBZCCG.performingAction)) {
            DBZCCG.currentCard = clicked;

            var elem = $(DBZCCG.toolTip.content).children('#tooltipEffect')[0];

            DBZCCG.Combat.setCardSource(clicked.display);

            $(DBZCCG.toolTip.content).children('#tooltipEffect').removeClass('tooltipEffectDisabled');

            elem.onclick = function() {
                DBZCCG.Combat.effectHappening = true;
                $('#pass-btn').hide();
                $('#hud').qtip('hide');

                clicked.display.removeCallback(DBZCCG.Combat.activateEffectCallback);

                if (DBZCCG.toolTip.idxCard !== undefined && DBZCCG.performingAction !== undefined) {
                    DBZCCG.Combat.addSelectionParticle(clicked.display.position);

                    if (DBZCCG.toolTip.cardSource === 'hand') {
                        DBZCCG.performingAction.transferCards("hand", [DBZCCG.toolTip.idxCard], "inPlay");
                    }

                    DBZCCG.toolTip.idxCard = undefined;
                }

                DBZCCG.clearMouseOver();

                this.onclick = null;

                // Finish the action
                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.performingAction = DBZCCG.attackingPlayer;

                    if (clicked.postEffect instanceof Function) {
                        clicked.postEffect(clicked);
                    }

                    DBZCCG.Combat.removeAllSelectionArrows();
                    DBZCCG.Combat.removeSelectionParticles();
                    DBZCCG.Combat.effectHappening = false;
                });

                // Invoke defender's turn
                DBZCCG.Combat.setDefenderTurn(DBZCCG.defendingPlayer);

                DBZCCG.listActions.splice(0, 0, function() {
                    clicked.effect();

                    if (clicked.targetCard && clicked.targetCard.display === DBZCCG.defendingPlayer.getPersonalityInControl().display) {
                        DBZCCG.Combat.selectionArrow(DBZCCG.attackingPlayer.getPersonalityInControl().display.position, DBZCCG.defendingPlayer.getPersonalityInControl().display.position);
                    }
                });

                DBZCCG.performingTurn = false;
            };
        }
    }
    ,
    priority: 50000
};

DBZCCG.Combat.setDefenderTurn = function(player) {
    DBZCCG.listActions.splice(0, 0, function() {

        DBZCCG.performingTurn = true;

        DBZCCG.listActions.splice(0, 0, function() {

            console.log('check success effect');
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


    DBZCCG.Combat.selectionArrow = function(source, target) {
        var geo = new THREE.Geometry();
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
            size: 14,
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

DBZCCG.Combat.speechBubble = function(text, display) {
    DBZCCG.performingAnimation = true;
    var p = document.createElement('p');
    document.body.appendChild(p);
    p.id = 'card-speech';
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
                        DBZCCG.performingAnimation = false;
                    });
                }, 2500);
            } else {
                p.innerHTML += text.charAt(i);
                i++;
            }

        }, 66);
    });

};

DBZCCG.Combat.hoverText = function(text, display, color) {
    if (text) {
        DBZCCG.listActions.splice(0, 0, function() {
            DBZCCG.performingAnimation = true;

            var vector = DBZCCG.Screen.getWindowCoords(display);

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
            span.style.position = 'absolute';
            span.style['z-index'] = 900;
            span.style.color = color;
            span.style['font-size'] = '2em';
            span.style['font-weight'] = 'bold';
            span.style['text-shadow'] = '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black';
            span.innerHTML = text;
            document.body.appendChild(span);
            span.style.left = (((vector.x - span.offsetWidth / 2) / window.innerWidth) * 100) + '%';
            span.style.top = (((vector.y - span.offsetHeight / 2) / window.innerHeight) * 100) + '%';

            var i = 0;
            var top = parseInt((span.style.top.replace('%', '')));
            var dcr = top * 0.01;
            var intervalRise = window.setInterval(function() {
                span.style.top = (top - dcr * i) + '%';
                i++;
            }, 33);

            $(span).fadeIn(500, function() {
                window.setTimeout(function() {
                    $(span).fadeOut(500, function() {
                        window.clearInterval(intervalRise);
                        $(span).remove();
                        DBZCCG.performingAnimation = false;
                    });
                }, 1000);
            });
        });
    }
}