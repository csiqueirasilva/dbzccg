DBZCCG.checkObjectLoad = function() {
    // check if models are loaded
    return (DBZCCG.Load.mustHave() &&
            DBZCCG.Pile.cardBase &&
            DBZCCG.MainPersonality.zScabbardModel &&
            DBZCCG.MainPersonality.zSwordModel &&
            DBZCCG.Personality.zScouterModel &&
            DBZCCG.Combat.selectionArrow &&
            DBZCCG.Combat.selectionParticles ? true : false);
};

DBZCCG.create = function(playerData) {

    /* Three related */
    var mouse = new THREE.Vector2();
    var projector;
    var intersected;

    /* Game related */
    var table = null;
    var listActions = [];
    var scr = null;

    /* Interface related */
    $('#hud').show();

    /* Heartbeat for user session */
    
    window.setInterval(function () {
        $.ajax({
            url: DBZCCG.Load.heartBeatUrl
        });
    }, 120000);

    function loadDefaultBackground() {
        var particleImage = DBZCCG.Combat.particleTexture;

        function createElement() {
            var mat = new THREE.SpriteMaterial({opacity: 0, map: particleImage, color: 0xFFFFFF, transparent: true});
            var mesh = new THREE.Sprite(mat);

            mesh.rotation.x = Math.PI / 2;
            mesh.position.set(Math.pow(-1, parseInt(Math.random() * 10) % 2) * Math.random() * 40, Math.pow(-1, parseInt(Math.random() * 10) % 2) * Math.random() * 40, 100 - Math.pow(-1, parseInt(Math.random() * 10) % 2) * (Math.random() * 100 % 25));
            mesh.scale.multiplyScalar(0.5);
            return mesh;
        }

        var mesh = [];
        for (var i = 0; i < 400; i++) {
            mesh[i] = createElement();
            DBZCCG.background.scene.add(mesh[i]);
        }

        DBZCCG.background.camera.position.z = -40;
        DBZCCG.background.camera.far = 200;
        DBZCCG.background.camera.lookAt(new THREE.Vector3(0, 0, 1000));
        DBZCCG.background.camera.fov = 90;
        DBZCCG.background.camera.updateProjectionMatrix();

        var light = new THREE.PointLight(0xFFF0F0, 1.5, 1000);
        DBZCCG.background.scene.add(light);

        DBZCCG.background.velocity = 1;
        DBZCCG.background.update = function() {
            var camera = DBZCCG.background.camera;

            if (DBZCCG.playerLowLife) {
                if (DBZCCG.background.velocity < 20) {
                    DBZCCG.background.velocity += 0.2;
                }
            } else {
                if (DBZCCG.background.velocity > 1) {
                    DBZCCG.background.velocity -= 0.2;
                }
            }
            camera.rotation.z += 0.0009 * DBZCCG.background.velocity;
            for (var i = 0; i < mesh.length; i++) {
                if (DBZCCG.playerLowLife) {
                    mesh[i].position.z -= 0.05 * DBZCCG.background.velocity;
                    mesh[i].material.color.r = (204 - Math.sin(Math.random()) * 20) / 255;
                    mesh[i].material.color.g = Math.abs(Math.sin(DBZCCG.clock.elapsedTime)) * 0.2;
                    mesh[i].material.color.b = Math.abs(Math.cos(DBZCCG.clock.elapsedTime)) * 0.1;
                } else {
                    mesh[i].position.z -= 0.5;
                    mesh[i].material.color.b = (204 - Math.sin(Math.random()) * 20) / 255;
                    mesh[i].material.color.g = Math.abs(Math.sin(DBZCCG.clock.elapsedTime)) * 0.8;
                    mesh[i].material.color.r = Math.abs(Math.cos(DBZCCG.clock.elapsedTime)) * 0.8;
                }

                if (mesh[i].position.z < -30) {
                    DBZCCG.background.scene.remove(mesh[i]);
                    mesh[i] = createElement();
                    DBZCCG.background.scene.add(mesh[i]);
                } else if (mesh[i].position.z < 0) {
                    if (mesh[i].position.z > -1 && mesh.length < 400) {
                        mesh.push(createElement());
                    }
                    mesh[i].material.opacity -= 0.02;
                } else if (mesh[i].position.z > 25 && mesh[i].material.opacity < 1) {
                    mesh[i].material.opacity += 0.02;
                }
            }
        };
    }

    function loadGradientBG(sizeX, sizeY) {
        this.loadImage('images/bg/bg5.jpg', sizeX, sizeY);
    }

    function loadKamiPalace(sizeX, sizeY) {
        this.loadImage('images/bg/bg1.jpg', sizeX, sizeY);
    }

    function loadSupremeKaiPlanet(sizeX, sizeY) {
        this.loadImage('images/bg/bg4.jpg', sizeX, sizeY);
    }

    function loadKameHouse(sizeX, sizeY) {
        this.loadImage('images/bg/bg3.jpg', sizeX, sizeY);
    }

    function loadBarrenTerrains(sizeX, sizeY) {
        this.loadImage('images/bg/bg2.jpg', sizeX, sizeY);
    }

    function loadTimeChamber() {
        var loader = new THREE.OBJMTLLoader();

        loader.load('model/stages/TimeChamber/TimeChamber.obj', 'model/stages/TimeChamber/TimeChamber.mtl', function(object) {

            var light = new THREE.PointLight(0xF0F0F0, 1, 100000);
            DBZCCG.background.scene.add(light);
            DBZCCG.background.camera.position.y = 20;
            DBZCCG.background.camera.position.z = 300;
            DBZCCG.background.camera.rotation.y = Math.PI;

            // floor
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 1000), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: 0xFFFFFF}));
            plane.rotation.x = 90 * Math.PI / 180;
            DBZCCG.background.scene.add(plane);

            var bgCentralPoint = new THREE.Vector3(40, 20, 650);
            plane.position.copy(bgCentralPoint);
            plane.position.y = 0.001;

            DBZCCG.background.camera.lookAt(bgCentralPoint);

            // set double side
            var children = object.children[0].children;
            for (var i = 0; i < children.length; i++) {
                children[i].material.side = THREE.DoubleSide;
            }
            ;

            DBZCCG.background.scene.add(object);
            DBZCCG.background.update = function() {
                var camera = DBZCCG.background.camera;
                var icr = DBZCCG.clock.elapsedTime;

//                camera.position.z = 650 + Math.cos(icr / 2) * 200;
//                camera.position.x = Math.sin(icr / 2) * 300;

                camera.lookAt(bgCentralPoint);
                light.position.copy(camera.position);
            };

        });
    }

    function buildScene(scene, camera) {
        /* Load variables */
        DBZCCG.loadCounter = 0;
        DBZCCG.loadIcr = 0;

        DBZCCG.background = ThreeHelper.createBackground(scene, camera, loadGradientBG);

        var light = new THREE.PointLight(0xF0F0F0); // soft white light
        light.position.set(0, 100, 0);
        scene.add(light);

        DBZCCG.table = table = DBZCCG.Table.create([
            /*P1*/
            playerData || {name: 'Human', mainPersonality: {alignment: DBZCCG.Personality.alignment.Hero, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                    angerLevelNeededToLevel: 5, personalities: [{"id":3698,"texturePath":"images/cardimages/CCG/saiyan/158.jpg","sourceCard":144,"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"owner":1,"tradeable":false},{"id":3697,"texturePath":"images/cardimages/CCG/saiyan/159.jpg","sourceCard":145,"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"owner":1,"tradeable":false},{"id":3696,"texturePath":"images/cardimages/CCG/saiyan/160.jpg","sourceCard":146,"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"owner":1,"tradeable":false}]}},
            /*P2*/
            {name: 'CPU', mainPersonality: {alignment: DBZCCG.Personality.alignment.Villain, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                    angerLevelNeededToLevel: 5, personalities: [{"id":3698,"texturePath":"images/cardimages/CCG/saiyan/158.jpg","sourceCard":144,"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"owner":1,"tradeable":false},{"id":3697,"texturePath":"images/cardimages/CCG/saiyan/159.jpg","sourceCard":145,"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"owner":1,"tradeable":false},{"id":3696,"texturePath":"images/cardimages/CCG/saiyan/160.jpg","sourceCard":146,"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"owner":1,"tradeable":false}]}}
        ], camera, scene);

        DBZCCG.resizeLabels = table.updateLabelPlayers;
        DBZCCG.mainScene = scene;

        for (var i = 0; i < table.players.length; i++) {
            table.players[i].newLifeCardDamage = 0;
            var dragonballRegenerate = {life: true, f: function(cardIdx, increaseIndex, cards, card, owner) {

                    // Place at the bottom of the lifeDeck
                    if (DBZCCG.Card.Type.Dragonball === card.type || (card.type instanceof Array && card.type.indexOf(DBZCCG.Card.Type.Dragonball) !== -1)) {
                        if (owner.dragonballCardDamage === 8) {
                            DBZCCG.gameOver = true;
                            DBZCCG.listActions = [];
                        } else {
                            owner.lastDragonballIndex = cardIdx;

                            if (owner.lastDragonballIndex === cardIdx) {
                                owner.dragonballCardDamage++;
                            } else {
                                owner.dragonballCardDamage = 0;
                            }

                            var performingTurn;
                            var inPlay = DBZCCG.DragonBall.checkInPlay(card);

                            var pile = this.pile;

                            DBZCCG.listActions.splice(0, 0, function() {
                                DBZCCG.Log.logEntry(card.logName() + ' was discarted and ' +
                                        (inPlay ? 'removed from the game (Already in play)' :
                                                'placed at the bottom of the life deck'));

                                pile.addCard(cardIdx, cards);

                                DBZCCG.performingTurn = performingTurn;
                            });

                            if (owner === DBZCCG.defendingPlayer && owner.sufferedAttack &&
                                    ClassHelper.checkValue(card.type, DBZCCG.Card.Type.Dragonball)) {
                                DBZCCG.listActions.splice(0, 0, function() {
                                    for (var k = owner.lifeDeck.cards.length - 1; k >= 0; k--) {
                                        if (!owner.lifeDeck.cards[k].beginRemoveCallback) {
                                            cards.push(owner.lifeDeck.removeCardByIdx(k));
                                            break;
                                        }
                                    }
                                });
                            }

                            // added card was a dragonball. adding it to the bottom of the lifedeck.
                            DBZCCG.listActions.splice(0, 0, function() {
                                owner.transferCards('discardPile',
                                        [owner.discardPile.cards.indexOf(card)],
                                        inPlay ? 'removedFromTheGame' : 'lifeDeck',
                                        inPlay ? owner.removedFromTheGame.cards.length : 0);
                            });

                            performingTurn = DBZCCG.performingTurn;
                            DBZCCG.performingTurn = false;
                        }

                        return {cards: []};
                    }

                }, priority: 50};

            table.players[i].discardPile.addAddCallback(dragonballRegenerate);

            table.players[i].addTransferCallback({f: function(src, elems, destiny) {
                    if (src === "lifeDeck") {

                        if (destiny === "discardPile") {
                            this.player.dragonballCardDamage = 0;
                        }

                        if (!this.player.gameOverCb) {
                            this.player.gameOverCb = {};
                        }

                        if (!this.player.gameOverCb[destiny]) {
                            var deckTotal;
                            var deckCards = this.player.lifeDeck.cards;

                            var checkGameOver = {life: true, f: function() {
                                    if (deckCards.length === 0 && this.player.canLose) { // TODO: check for infinite dragonball loop as well
                                        DBZCCG.gameOver = true;
                                        DBZCCG.listActions = [];
                                    }
                                }, player: this.player, priority: 1};

                            var checkLowLife = {life: true,
                                f: function() {
                                    var currentCards;
                                    for (var i = 0; i < table.players.length; i++) {
                                        deckTotal = table.players[i].lifeDeck.number;
                                        currentCards = table.players[i].lifeDeck.cards.length;

                                        if (!DBZCCG.playerLowLife && Math.floor(deckTotal * 0.4) > currentCards) {
                                            DBZCCG.playerLowLife = true;
                                            return;
                                        } else if (Math.floor(deckTotal * 0.4) <= currentCards) {
                                            DBZCCG.playerLowLife = false;
                                        }
                                    }
                                }, priority: 2
                            };

                            this.player[destiny].addAddCallback(checkGameOver);
                            this.player[destiny].addAddCallback(checkLowLife);
                            this.player.gameOverCb[destiny] = true;
                        }
                    }
                }, priority: 1});
        }

        function displayPhaseMessage(id, callback, noPhaseWarn) {
            DBZCCG.performingAnimation = true;

            $('#turnOrder').find('.selectedTurn').removeClass('selectedTurn');
            $('#turnOrder').find(id.replace('-warn', '')).addClass('selectedTurn');

            if (!noPhaseWarn) {

                $(id).fadeIn(250, function() {
                    //DBZCCG.Sound.turn();
                });

                window.setTimeout(function() {
                    $(id).fadeOut(500, function() {
                        DBZCCG.performingAnimation = false;
                        callback();
                    });
                }, 1000);
            } else {
                DBZCCG.performingAnimation = false;
                callback();
            }
        }

        function invokeTurn() {

            $('.selectedTurn').removeClass('selectedTurn');

            document.getElementById('turnCounterNumber').innerHTML =
                    parseInt(document.getElementById('turnCounterNumber').innerHTML) + 1;

            DBZCCG.combat = false;

            var hadCombat = false;

            if (!DBZCCG.performingAction) {
                DBZCCG.performingAction = table.players[0];
            } else {
                // next player
                DBZCCG.performingAction = table.players[(table.players.indexOf(DBZCCG.performingAction) + 1) % table.players.length];
            }

            if (DBZCCG.performingAction.solveTurnCallback(function(callback) {
                return callback.f();
            }, function(ret) {

            }) !== DBZCCG.cancelAction) {

                var player = DBZCCG.performingAction;
                DBZCCG.turnOwner = player;

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Draw Phase']);
                });

                listActions.push(function() {
                    if (player.drawPhaseEnabled) {
                        displayPhaseMessage('#draw-phase-warn',
                                function() {
                                    player.drawPhase();
                                });
                    }
                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Non-Combat Phase']);
                });

                listActions.push(function() {
                    if (player.nonCombatPhaseEnabled) {
                        displayPhaseMessage('#noncombat-phase-warn',
                                function() {
                                    player.nonCombatPhase();
                                });

                    }

                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Pur Phase']);
                });

                listActions.push(function() {
                    if (player.purPhaseEnabled) {
                        displayPhaseMessage('#pur-phase-warn',
                                function() {
                                    player.purPhase();
                                });
                    }

                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Declare Phase']);
                });

                listActions.push(function() {
                    if (player.declarePhaseEnabled) {
                        displayPhaseMessage('#declare-phase-warn',
                                function() {
                                    player.declarePhase(table.players);
                                });
                    }

                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Combat Phase']);
                });

                listActions.push(function() {
                    if (DBZCCG.combat && player.combatPhaseEnabled) {
                        hadCombat = true;
                        displayPhaseMessage('#combat-phase-warn',
                                function() {
                                    DBZCCG.attackingPlayer = player;

                                    // code for 2v2
                                    if (DBZCCG.attackingPlayer === table.players[0]) {
                                        DBZCCG.defendingPlayer = table.players[1];
                                    } else {
                                        DBZCCG.defendingPlayer = table.players[0];
                                    }

                                    DBZCCG.attackingPlayer.onlyPass = DBZCCG.defendingPlayer.onlyPass = DBZCCG.attackingPlayer.onlyDefend = DBZCCG.defendingPlayer.onlyDefend =
                                            DBZCCG.defendingPlayer.passed = DBZCCG.attackingPlayer.passed = false;
                                    player.combatPhase(listActions);
                                });
                    }

                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Discard Phase']);
                });

                listActions.push(function() {
                    displayPhaseMessage('#discard-phase-warn', function() {
                        if (player.discardPhaseEnabled) {
                            DBZCCG.performingAction = player;
                            player.discardPhase();
                            DBZCCG.Log.logEntry(player.displayName() + " discard phase.");
                        }

                        for (var i = 0; i < table.players.length; i++) {
                            if (table.players[i].discardPhaseEnabled && table.players[i] !== player && table.players[i].hand.cards.length > table.players[i].cardDiscardPhaseLimit) {
                                var discardPlayer = table.players[i];
                                listActions.splice(0, 0, function() {
                                    DBZCCG.performingAction = discardPlayer;
                                    discardPlayer.discardPhase();
                                    DBZCCG.Log.logEntry(discardPlayer.displayName() + " discard phase.");
                                });
                            }
                        }
                    });
                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    if (!hadCombat && player.rejuvenationPhaseEnabled) {
                        DBZCCG.Combat.checkUseWhenNeeded(DBZCCG.Combat.Events['Entering Rejuvenation Phase']);
                    }
                });

                listActions.push(function() {
                    DBZCCG.performingAction = player;
                    if (!hadCombat && player.rejuvenationPhaseEnabled) {
                        displayPhaseMessage('#rejuvenation-phase-warn',
                                function() {
                                    player.rejuvenationPhase();
                                });
                    }
                });
            }

            listActions.push(function() {
                invokeTurn();
            });
        }

        DBZCCG.listActions = listActions;

        function checkLoad() {
            if (table.players[0].mainPersonality.personalities[0].zScouter === undefined) {
                window.setTimeout(checkLoad, 500);
            } else /*Begin code after everything was loaded */ {
                DBZCCG.finishedLoading = true;

                var players = [];
                for (var i = 0; i < table.players.length; i++) {
                    players.push(table.players[i]);
                    listActions.push(function() {
                        players.shift().lifeDeck.shuffle();
                    });
                }

                window.setTimeout(function() {
                    // SetUpdaters
                    TWEEN.runChecks();
                }, 500);

                listActions.push(function() {
                    invokeTurn();
                });
            }
        }

        window.setTimeout(checkLoad, 500);

        function checkAction() {

            if (DBZCCG.running &&
                    !DBZCCG.performingTurn &&
                    !DBZCCG.removingCard &&
                    !DBZCCG.performingAnimation &&
                    listActions.length > 0 &&
                    !$('.phase-warn').is(':visible') &&
                    !DBZCCG.displayingText &&
                    !DBZCCG.gameOver) {
                $('#hover-tooltip').remove();
                DBZCCG.clearMouseOver();
                listActions.shift()();
            } else if (DBZCCG.gameOver) {
                DBZCCG.clearMouseOver();
                $('#turnCounter').css('z-index', 8999);
                window.clearInterval(mainLoopInterval);
                
                $.ajax({
                    url: DBZCCG.Load.afterMatchUrl
                })
                
                .done(function () {
                    DBZCCG.Interface.updateUserPoints(3);
                    $('.modal-post-game').show();
                })
                
                .fail(function () {
                    alert('Failed to compute match data.');
                });
            }
        }

        var mainLoopInterval = window.setInterval(checkAction, 150);

        // debug
        // scene.add(MathHelper.buildAxes(1000));
    }

    function render(cameraControl, renderer, scene, camera, stats) {
        DBZCCG.clock.getDelta();
    
        renderer.clear();

        // Update selection arrows
        DBZCCG.Combat.updateSelectionArrows();

        // Update models
        DBZCCG.Combat.selectionParticles.update();

        // update floating effect particles
        DBZCCG.Card.FloatingEffect.update();

        // Update Billboards
        DBZCCG.updateBillboards(camera);

        // Update background (If it requires update)
        if (DBZCCG.background.update instanceof Function) {
            DBZCCG.background.update();
        }

        // Render background screen
        renderer.render(DBZCCG.background.scene, DBZCCG.background.camera);

        renderer.render(scene, camera);

        stats.update();
    }

    function controls(camera, renderer, scene, stats) {
        DBZCCG.playerCamera = camera;

        renderer.sortObjects = false;
        renderer.autoClear = false;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        DBZCCG.qtipElement = $('#hud');
        DBZCCG.Interface.startQtip();
        
        // DEBUG
        document.body.appendChild(stats.domElement);
        stats.domElement.id = 'stats';

        var element = $('#renderer-wrapper')[0];

        var display = document.getElementById('hud');
        projector = new THREE.Projector();

        /*
         * Callbacks for the main screen
         */

        // KEYBOARD                

        Mousetrap.bind('m', function() {
            if ($('#music-box').length === 1) {
                $('#music-box').stop();
                document.getElementById('music-box').toggled = true;
                if (!$('#music-box').is(':visible')) {
                    $('#music-box').show();
                } else {
                    $('#music-box').hide();
                }
            }
        });

        Mousetrap.bind('z', function() {
            //DBZCCG.Sound.Background.nextTrack();
        });

//        Mousetrap.bind('c', function() {
//            if (DBZCCG.waitingMainPlayerMouseCommand) {
//
//                if (DBZCCG.cameraStyle === DBZCCG.Table.Camera.Side) {
//                    table.setCameraTopView();
//                } else {
//                    table.setCameraSideView();
//                }
//
//                window.setTimeout(function() {
//                    window.onresize();
//                }, 50);
//            }
//        });

        Mousetrap.bind('x', function() {
            if ($('#pass-btn').is(':visible')) {
                $('#pass-btn').click();
            } else if ($('#combat-btn').is(':visible')) {
                $('#combat-btn').click();
            } else if ($('#rejuvenate-btn').is(':visible')) {
                $('#rejuvenate-btn').click();
            }
        });

        Mousetrap.bind('esc', function() {
        });

        Mousetrap.bind('l', function() {
            // log shortcut
        });

        // MOUSE
        function onDocumentMouseMove(event) {

            if (DBZCCG.waitingMainPlayerMouseCommand) {
                mouse.x = ((event.clientX - element.offsetLeft) / element.offsetWidth) * 2 - 1;
                mouse.y = -((event.clientY - element.offsetTop) / element.offsetHeight) * 2 + 1;

                var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                projector.unprojectVector(vector, camera);
                var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                var intersections = raycaster.intersectObjects(DBZCCG.objects, true);

                var intersectionIndex = DBZCCG.Screen.invalidIntersection(intersections);

                if (intersections.length > 0 && intersectionIndex !== -1) {
                    if (intersected !== intersections[ intersectionIndex ].object) {
                        if (intersected) {
                            var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");
                            if (parent.mouseOut instanceof Function) {
                                parent.mouseOut(event);
                            }
                            document.getElementById('body').style.cursor = 'auto';
                        }
                        if ($('.ui-dialog:visible').length === 0) {
                            intersected = intersections[ intersectionIndex ].object;
                        }
                    }

                    if ($('.ui-dialog:visible').length === 0) {
                        var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOver");
                        document.getElementById('body').style.cursor = parent.cursor || 'pointer';

                        if (parent.mouseOver instanceof Function) {
                            parent.mouseOver(event);
                        }
                    }
                }
                else if (intersected) {
                    // check if it is in the scene
                    if (intersected.parent.parent) {
                        var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");
                        if (parent.mouseOut instanceof Function) {
                            parent.mouseOut(event);
                        }
                        document.getElementById('body').style.cursor = 'auto';
                    }
                    intersected = null;
                }
            } else if (intersected) {
                // check if it is in the scene
                if (intersected.parent.parent) {
                    var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");
                    if (parent.mouseOut instanceof Function) {
                        parent.mouseOut(event);
                    }
                    document.getElementById('body').style.cursor = 'auto';
                }
                intersected = null;
            }
        }

        display.addEventListener('mousemove', onDocumentMouseMove, false);

        DBZCCG.clearMouseOver = function() {
            DBZCCG.qtipElement.qtip('hide');
            intersected = null;
            document.getElementById('body').style.cursor = 'auto';
        };

        function documentOnMouseDown(event) {
            if (intersected) {
                var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseDown");
                if (parent.mouseDown instanceof Function) {
                    parent.mouseDown();
                }
            }
        }

        display.addEventListener('mousedown', documentOnMouseDown);

        function documentOnClick(event) {
            DBZCCG.qtipElement.qtip('hide');

            if (!DBZCCG.typingSpeech && DBZCCG.displayingText) {
                $('#card-speech').remove();
                DBZCCG.displayingText = false;
            }

            if (DBZCCG.flash) {
                $(DBZCCG.flash).remove();
                DBZCCG.displayingText = false;
                DBZCCG.flash = null;
            }

            $(DBZCCG.toolTip.content).children('#tooltipDiscard').hide();
            $(DBZCCG.toolTip.content).children('#tooltipEffect').hide();
            $(DBZCCG.toolTip.content).children('#tooltipEffect').addClass('tooltipEffectDisabled');

            if (intersected) {
                var parent = DBZCCG.Screen.findCallbackObject(intersected, "descriptionBox");

                DBZCCG.toolTip.parent = parent;

                if ((parent.parentCard && parent.parentCard.canActivate) || !parent.parentCard) {

                    var ret = true;
                    if (parent.click instanceof Function) {
                        ret = parent.click();
                    }

                    if (ret) {
                        var tooltip = false;
                        if (parent.solveCallback instanceof Function) {
                            parent.solveCallback(function(cb) {
                                return cb.f();
                            }, function(ret) {
                                tooltip = ret.tooltip;
                            });
                        }

                        if (tooltip) {
                            DBZCCG.qtipElement.qtip('show');
                        }
                    }
                }
            }
        }

        display.addEventListener('click', documentOnClick);

        function documentOnMouseUp(event) {
            if (intersected) {
                var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseUp");
                if (parent.mouseUp instanceof Function) {
                    parent.mouseUp();
                }
            }
        }

        display.addEventListener('mouseup', documentOnMouseUp);

        DBZCCG.Interface.disableScroll();

        /*
         * End of callbacks for the main screen
         */

        DBZCCG.Interface.startQtip();

        DBZCCG.toolTip.content = document.createElement('div');
        DBZCCG.toolTip.content.id = 'cardContextTooltip';
        DBZCCG.toolTip.content.innerHTML = '<div id="tooltipEffect" title="Effect" class="tooltip tooltipEffectDisabled"></div><div id="tooltipDiscard" title="Discard" class="tooltip"></div><div title="Description" onclick="DBZCCG.toolTip.showDescription();" id="tooltipDescription" class="tooltip"></div>';

        /*
         * Toolbar
         */

        InterfaceDBZ.onGameResize = function() {
            // resize static dialogs
            DBZCCG.Interface.leftSideMenuOnResize();

            // RESIZE Main Screen
            var WIDTH = window.innerWidth,
                    HEIGHT = window.innerHeight;
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();

            renderer.setSize(WIDTH, HEIGHT);
            document.getElementById('renderer-wrapper').style.width = WIDTH + 'px';
            document.getElementById('renderer-wrapper').style.height = HEIGHT + 'px';

            var right = document.getElementById('renderer-wrapper').style.right.replace(/px/g, '');
            var left = document.getElementById('renderer-wrapper').style.left.replace(/px/g, '');

            // Resize labels
            DBZCCG.resizeLabels();

            if (DBZCCG.background.resize instanceof Function) {
                DBZCCG.background.resize();
            }
        };

        $('#turnCounter').show();
        return null;
    }

    DBZCCG.loadFunction(DBZCCG.checkObjectLoad, buildScene, render, controls, null,
            function() {
                DBZCCG.running = true;
            });
};