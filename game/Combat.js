DBZCCG.Combat = {};

DBZCCG.Combat.effectHappening = false;
DBZCCG.Combat.selectionArrow = null;

DBZCCG.Combat.Attack = {};
DBZCCG.Combat.Attack.Physical = 0;
DBZCCG.Combat.Attack.Energy = 1;

DBZCCG.Combat.AttackerEffect = 0;
DBZCCG.Combat.inUsePAT = DBZCCG.Card.Saga.SAIYAN;

DBZCCG.Combat.defaultAttackerCheck = function(player) {
    var result = false;
    if (DBZCCG.combat && player === DBZCCG.attackingPlayer && !DBZCCG.Combat.effectHappening) {
        result = true;
        $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
    }
    return result;
};

DBZCCG.Combat.defaultDefenderCheck = function(player) {
    var result = false;
    if (DBZCCG.combat && player === DBZCCG.defendingPlayer && !DBZCCG.Combat.effectHappening) {
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

DBZCCG.Combat.activateEffectCallback = {f: function() {
        var clicked = DBZCCG.toolTip.parent;

        if (clicked.activable(DBZCCG.attackingPlayer)) {

            var elem = $(DBZCCG.toolTip.content).children('#tooltipEffect')[0];

            var i = 0;
            for (; i < DBZCCG.attackingPlayer.hand.cards.length && clicked !== DBZCCG.attackingPlayer.hand.cards[i].display; i++)
                ;

            if (i !== DBZCCG.attackingPlayer.hand.cards.length) {
                DBZCCG.toolTip.idxHand = i;
            }

            $(DBZCCG.toolTip.content).children('#tooltipEffect').removeClass('tooltipEffectDisabled');

            elem.onclick = function() {
                DBZCCG.Combat.effectHappening = true;
                $('#hud').qtip('hide');

                clicked.removeCallback(DBZCCG.Combat.activateEffectCallback);

                if (DBZCCG.toolTip.idxHand !== undefined && DBZCCG.attackingPlayer !== undefined) {
                    DBZCCG.Combat.addSelectionParticle(DBZCCG.attackingPlayer.hand.cards[DBZCCG.toolTip.idxHand].display.position);
                    DBZCCG.Combat.selectionArrow(DBZCCG.attackingPlayer.mainPersonality.personalities[0].display.position, DBZCCG.defendingPlayer.mainPersonality.personalities[0].display.position);

                    DBZCCG.attackingPlayer.transferCards("hand", [DBZCCG.toolTip.idxHand], "inPlay");
                    DBZCCG.toolTip.idxHand = undefined;
                }

                DBZCCG.clearMouseOver();

                this.onclick = null;

                DBZCCG.listActions.splice(0, 0, function() {
                    DBZCCG.defendingPlayer.defenderDefends(clicked);
                    DBZCCG.listActions.splice(0, 0, function() {

                        if (clicked.success) {
                            clicked.sucessfulEffect(DBZCCG.defendingPlayer);
                        }

                        DBZCCG.listActions.splice(0, 0, function() {
                            if (clicked.postEffect instanceof Function) {
                                clicked.postEffect(clicked);
                            }

                            DBZCCG.Combat.removeAllSelectionArrows();
                            DBZCCG.Combat.removeSelectionParticles();
                            DBZCCG.Combat.effectHappening = false;
                        });
                    });
                });

                clicked.effect();

            };
        }
    }
    ,
    priority: 50000
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