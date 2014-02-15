// http://github.com/csiqueirasilva/dbzccg.js
var DBZCCG = {};

/* Global function to compare callbacks */
DBZCCG.compareCallbacks = function(a, b) {
    if (a.priority > b.priority)
        return -1;
    if (a.priority < b.priority)
        return 1;
    return 0;
};

/* Dialogs */
DBZCCG.searchFormHTML = '<div class="search-box"><input id="search-form" type="text"></input><div id="search-result"></div></div>';

DBZCCG.searchFormContent = function(dialogContentId, matchCallback, sourceElements, searchResult) {
    var buttons = $(dialogContentId)
            .parent()
            .children('.ui-dialog-buttonpane')
            .children()
            .children();

    // Hide top close icon
    $(dialogContentId)
            .parent()
            .children('.ui-dialog-titlebar')
            .children('.ui-dialog-titlebar-close')
            .hide();

    $(dialogContentId).dialog('option', 'closeOnEscape', false);

    buttons.button('disable');

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
                searchResult($(this).val());
            }
            buttons.button('enable');
        }});
};

DBZCCG.createDialog = function(title, content, id) {
    var elem = document.createElement('div');
    elem.id = id || 'mainDialog';
    elem.innerHTML = '';
    elem.appendChild(content);
    elem.style.display = 'none';
    document.getElementById('hud').appendChild(elem);

    // TODO: Add nicescrollbar to the Dialog. It is tricky.
    $(elem).dialog({resizable: false, title: title, autoOpen: false, height: window.innerHeight * 0.5, width: window.innerWidth * 0.333,
        close: function() {
            $(this).remove();
        }});
};

DBZCCG.declareDialog = function() {
    DBZCCG.confirmDialog('Declaring combat', 'Do you wish to declare combat?', null,
            {
                "Declare combat": function() {
                    $('#combat-btn').hide();
                    DBZCCG.combat = true;
                    DBZCCG.performingTurn = false;
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    $(this).dialog('close');
                },
                "Skip combat": function() {
                    $('#combat-btn').hide();
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
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    DBZCCG.performingAction.rejuvenate(true);
                    $(this).dialog('close');
                },
                "Do not rejuvenate": function() {
                    $('#rejuvenate-btn').hide();
                    DBZCCG.waitingMainPlayerMouseCommand = false;
                    DBZCCG.performingTurn = false;
                    $(this).dialog('close');
                }
            });
};

DBZCCG.hideCombatIcons = function() {
    $('#pass-btn').hide();
    $('#final-physical-btn').hide();
    $('#hud').qtip('hide');
};

DBZCCG.finalPhysicalDialog = function() {
    DBZCCG.confirmDialog(
            'Final Physical Attack',
            'Do you wish to perform a final physical attack? After this attack, you will automatic pass any chance to attack or defend.',
            function() {
                window.setTimeout(function() {

                    $('#pass-btn').hide();

                    document.getElementById('final-physical-btn').onclick = function() {

                        DBZCCG.confirmDialog(
                                'Final Physical Attack',
                                'Discard a card from your hand in order to perform the attack.',
                                null,
                                {
                                    "OK": function() {
                                        $(this).dialog('close');
                                        DBZCCG.Combat.effectHappening = true;
                                        var elem = $(DBZCCG.toolTip.content).children('#tooltipDiscard')[0];

                                        for (var i = 0; i < DBZCCG.attackingPlayer.hand.cards.length; i++) {
                                            DBZCCG.attackingPlayer.hand.cards[i].display.addCallback(DBZCCG.Player.discardCallback);
                                        }

                                        var player = DBZCCG.attackingPlayer;
                                        elem.onclick = function() {
                                            $('#hud').qtip('hide');
                                            $('#final-physical-btn').hide();

                                            player.transferCards("hand", [DBZCCG.toolTip.idxHand], "discardPile", player.discardPile.cards.length);

                                            DBZCCG.waitingMainPlayerMouseCommand = false;

                                            elem.onclick = null;

                                            for (var i = 0; i < player.hand.cards.length; i++) {
                                                player.hand.cards[i].display.removeCallback(DBZCCG.Player.discardCallback);
                                            }

                                            DBZCCG.toolTip.parent.removeCallback(DBZCCG.Player.discardCallback);
                                            DBZCCG.toolTip.idxHand = undefined;
                                            DBZCCG.clearMouseOver();

                                            DBZCCG.Combat.effectHappening = false;
                                            document.getElementById('final-physical-btn').onclick = function() {
                                                DBZCCG.finalPhysicalDialog();
                                            };
                                            DBZCCG.Combat.activateEffectAI(DBZCCG.General['Final Physical Attack'].display);
                                        };
                                    }
                                });
                    };

                    document.getElementById('final-physical-btn').onclick();

                }, 100);
            });
};

DBZCCG.passDialog = function(msg) {
    DBZCCG.confirmDialog('Passing', msg, function() {
        DBZCCG.hideCombatIcons();

        if (DBZCCG.combat && DBZCCG.mainPlayer === DBZCCG.attackingPlayer) {
            DBZCCG.attackingPlayer.passed = true;
        }

        if (DBZCCG.passLog) {
            DBZCCG.logMessage(DBZCCG.passLog);
        }

        DBZCCG.performingTurn = false;
        DBZCCG.waitingMainPlayerMouseCommand = false;
    });
};

DBZCCG.confirmDialog = function(title, content, ok_cb, buttons, width, height) {

    var wrapperDiv = document.createElement('div');
    wrapperDiv.innerHTML = content;

    DBZCCG.createDialog(title, wrapperDiv, 'confirmDialog');

    $('#confirmDialog').dialog('option', 'height', height || (window.innerHeight * 0.25));
    $('#confirmDialog').dialog('option', 'width', width || (window.innerWidth * 0.25));

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

};

DBZCCG.removeObject = function(obj) {
    var idx = DBZCCG.objects.indexOf(obj);
    if(idx !== -1) {
        DBZCCG.objects.splice(idx, 1);
    }
};

DBZCCG.browseCardList = function(cards, title) {
    var descriptionBoxContent = document.getElementById('descriptionBoxContent');
    var content = document.createElement('div');
    descriptionBoxContent.innerHTML = content.innerHTML = title;

    var selectList = document.createElement('ol');
    selectList.id = 'card-list';

    for (var i = cards.length - 1; i >= 0; i--) {
        var option = document.createElement('li');
        option.innerHTML = (i + 101).toString().substring(1) + ' - ' + cards[i].name;
        option.value = i;
        option.selectCallback = function() {
            var card = cards[this.value];
            descriptionBoxContent.innerHTML = card.display.offDescriptionBox();
            DBZCCG.leftScreen.focusElement(card.display, card.display.offLeftScreenCallback);
        };
        selectList.appendChild(option);
    }

    var wrapperDiv = document.createElement('div');
    wrapperDiv.id = 'dialog-wrapper-div';
    wrapperDiv.appendChild(selectList);
    DBZCCG.createDialog(content.innerHTML, wrapperDiv);

    $(selectList).selectable({selected: function(event, ui) {
            ui.selected.selectCallback();
        }});

    $('#mainDialog').dialog('open');
};
/* End of dialog */

DBZCCG.checkObjectLoad = function() {

    // check if models are loaded
    return (DBZCCG.Combat.selectionArrow && DBZCCG.Combat.selectionParticles ? true : false);
};


/* Enums */
DBZCCG.cancelAction = 0x000001;

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

DBZCCG.updateBillboards = function(camera) {

    var obj;
    while (DBZCCG.billboards.length !== 0) {
        obj = DBZCCG.billboards.pop();
        obj.rotation = camera.rotation;
        // TODO: fix the position coordinates to be added according to the camera
        obj.position.z += 1;
        obj.position.y += 0.5;
    }
}

DBZCCG.resizeToolbar = function(rendererWidth, left, right) {
    var elem = document.getElementById('toolbar');
    elem.style.left = Math.ceil(rendererWidth * 0.62) + parseInt(left) + 'px';
    elem.style.right = right + 'px';
    elem.style.width = rendererWidth * 0.2 + 'px';
};

DBZCCG.resizeTurnCounter = function(rendererWidth, left, right) {
    var elem = document.getElementById('turnCounter');
    elem.style.left = Math.ceil(rendererWidth * 0.394) + parseInt(left) + 'px';
    elem.style.right = right + 'px';
    elem.style.width = rendererWidth * 0.214 + 'px';
    elem.style['font-size'] = rendererWidth / window.innerWidth + 'em';
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

DBZCCG.logMessage = function(msg) {
    var log = document.createElement('div');
    log.innerHTML = '';
    if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
        log.innerHTML += '>> ';
    } else {
        log.innerHTML += '<< ';
    }

    log.innerHTML += DBZCCG.performingAction.displayName() + '@' + "[" + new Date().toLocaleString() + "]" + '<br />';
    log.innerHTML += msg;

    document.getElementById("logBox").appendChild(log);
    $('#logBox').animate({scrollTop: $('#logBox')[0].scrollHeight}, 'slow');
};

DBZCCG.create = function() {

    /* Three related */
    var mouse = new THREE.Vector2();
    var projector;
    var intersected;

    /* Game related */
    var table = null;
    var listActions = [];
    var scr = null;

    function createSkybox(scene, skybox, ext) {

        ext = ext || "jpg";

        var urlPrefix = "images/bg/" + skybox + "/";
        var urls = [urlPrefix + "posx." + ext, urlPrefix + "negx." + ext,
            urlPrefix + "posy." + ext, urlPrefix + "negy." + ext,
            urlPrefix + "posz." + ext, urlPrefix + "negz." + ext];
        var textureCube = THREE.ImageUtils.loadTextureCube(urls);

        var shader = THREE.ShaderLib.cube;
        var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms['tCube'].value = textureCube;

        var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader, //document.getElementById('skybox_fragment_shader').textContent,
            vertexShader: document.getElementById('skybox-shader-vs').textContent,
            uniforms: uniforms,
            side: THREE.BackSide
        });

        var skybox = new THREE.Mesh(
                new THREE.CubeGeometry(4000, 4000, 4000),
                material);

        scene.add(skybox);
    }

    function loadDefaultBackground() {
        var geometry = new THREE.SphereGeometry(0.15, 8, 8);

        function createElement() {
            var mat = new THREE.MeshLambertMaterial({transparent: true, opacity: 0, color: 0x0000CC, shading: THREE.SmoothShading});
            var mesh = new THREE.Mesh(geometry, mat);
            mesh.rotation.x = Math.PI / 2;
            mesh.position.set(Math.pow(-1, parseInt(Math.random() * 10) % 2) * Math.random() * 40, Math.pow(-1, parseInt(Math.random() * 10) % 2) * Math.random() * 40, 100 - Math.pow(-1, parseInt(Math.random() * 10) % 2) * (Math.random() * 100 % 25));
            return mesh;
        }

        var mesh = [];
        for (var i = 0; i < 400; i++) {
            mesh[i] = createElement();
            DBZCCG.background.scene.add(mesh[i]);
        }

        DBZCCG.background.camera.position.z = -40;
        DBZCCG.background.camera.far = 100;
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

    function loadKamiPalace(sizeX, sizeY) {
        loadImageBackground('images/bg/bg1.jpg', sizeX, sizeY);
    }

    function loadImageBackground(image, sizeX, sizeY) {
        var plane = new THREE.PlaneGeometry();
        plane.vertices[0].set(-sizeX / 20, sizeY / 20, 0);
        plane.vertices[1].set(sizeX / 20, sizeY / 20, 0);
        plane.vertices[2].set(-sizeX / 20, -sizeY / 20, 0);
        plane.vertices[3].set(sizeX / 20, -sizeY / 20, 0);

        var planeMesh = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({side: THREE.FrontSide, map: THREE.ImageUtils.loadTexture(image)}));
        DBZCCG.background.scene.add(planeMesh);
        DBZCCG.background.camera.lookAt(planeMesh.position);
        DBZCCG.background.camera.position.z = 100;
    }

    function loadSupremeKaiPlanet(sizeX, sizeY) {
        loadImageBackground('images/bg/bg4.jpg', sizeX, sizeY);
    }

    function loadKameHouse(sizeX, sizeY) {
        loadImageBackground('images/bg/bg3.jpg', sizeX, sizeY);
    }

    function loadBarrenTerrains(sizeX, sizeY) {
        loadImageBackground('images/bg/bg2.jpg', sizeX, sizeY);
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

    function createBackground(scene, camera) {
        DBZCCG.background = {};
        var sizeX = window.screen.width;
        var sizeY = window.screen.height;

        DBZCCG.background.scene = new THREE.Scene();

        DBZCCG.background.texture = new THREE.WebGLRenderTarget(sizeX, sizeY, {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat});
        DBZCCG.background.camera = new THREE.PerspectiveCamera(45, sizeX / sizeY, 0.01, 10000);

        var plane = new THREE.PlaneGeometry();
        plane.vertices[0].set(-sizeX / 2, sizeY / 2, 0);
        plane.vertices[1].set(sizeX / 2, sizeY / 2, 0);
        plane.vertices[2].set(-sizeX / 2, -sizeY / 2, 0);
        plane.vertices[3].set(sizeX / 2, -sizeY / 2, 0);

        var planeMaterial = new THREE.MeshBasicMaterial({side: THREE.FrontSide, map: DBZCCG.background.texture, depthTest: true, depthWrite: false});

        loadDefaultBackground();
        //loadTimeChamber();
        //loadBarrenTerrains(sizeX, sizeY);
        //loadKameHouse(sizeX, sizeY);
        //loadSupremeKaiPlanet(sizeX, sizeY);
        //loadKamiPalace(sizeX, sizeY);

        DBZCCG.background.resize = function() {
            var WIDTH = window.screen.width;
            var HEIGHT = window.screen.height;

            DBZCCG.background.camera.aspect = WIDTH / HEIGHT;
            DBZCCG.background.camera.updateProjectionMatrix();

            var sizeX = WIDTH;
            var sizeY = HEIGHT;
            plane.vertices[0].set(-sizeX / 2, sizeY / 2, 0);
            plane.vertices[1].set(sizeX / 2, sizeY / 2, 0);
            plane.vertices[2].set(-sizeX / 2, -sizeY / 2, 0);
            plane.vertices[3].set(sizeX / 2, -sizeY / 2, 0);
            plane.verticesNeedUpdate = true;

            if (DBZCCG.background.contentResize instanceof Function) {
                DBZCCG.background.contentResize(sizeX, sizeY);
            }

            DBZCCG.background.plane.position.set(0, -10, 0);
            DBZCCG.billboards.push(DBZCCG.background.plane);

            scaleY = (window.screen.availHeight / window.screen.height) * 0.1;
            scaleX = (window.screen.availWidth / window.screen.width) * 0.1;

            if (scaleX !== 0.1) {
                scaleX = 0.1 + (0.1 - scaleX);
            }

            if (scaleY !== 0.1) {
                scaleY = 0.1 + (0.1 - scaleY);
            }

            DBZCCG.background.plane.scale.y = scaleY;
            DBZCCG.background.plane.scale.x = scaleX;
        };

        DBZCCG.background.plane = new THREE.Mesh(plane, planeMaterial);
        DBZCCG.background.plane.position.y = -10;

        var scaleY = (window.screen.availHeight / window.screen.height) * 0.1;
        var scaleX = (window.screen.availWidth / window.screen.width) * 0.1;

        if (scaleX !== 0.1) {
            scaleX = 0.1 + (0.1 - scaleX);
        }

        if (scaleY !== 0.1) {
            scaleY = 0.1 + (0.1 - scaleY);
        }

        DBZCCG.background.plane.scale.y = scaleY;
        DBZCCG.background.plane.scale.x = scaleX;

        DBZCCG.billboards.push(DBZCCG.background.plane);

        scene.add(DBZCCG.background.plane);
    }

    function buildScene(scene, camera) {
        var light = new THREE.PointLight(0xF0F0F0); // soft white light
        light.position.set(0, 100, 0);
        scene.add(light);
        createBackground(scene, camera);
        //createSkybox(scene);
        DBZCCG.table = table = DBZCCG.Table.create([
            /*P1*/
            {name: 'Human', mainPersonality: {alignment: DBZCCG.Personality.alignment.Hero, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                    angerLevelNeededToLevel: 5, personalities: [DBZCCG.Saiyan['158'], DBZCCG.Saiyan['159'], DBZCCG.Saiyan['160']]}},
            /*P2*/
            {name: 'CPU', mainPersonality: {alignment: DBZCCG.Personality.alignment.Villain, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                    angerLevelNeededToLevel: 5, personalities: [DBZCCG.Saiyan['173'], DBZCCG.Saiyan['174'], DBZCCG.Saiyan['175']]}}
        ], camera, scene);

        DBZCCG.resizeLabels = table.updateLabelPlayers;
        DBZCCG.mainScene = scene;

        // set onclick callback for pass
        document.getElementById('pass-btn').onclick = function() {
            DBZCCG.passDialog(DBZCCG.passMessage);
        };

        // set onclick callback for pass
        document.getElementById('final-physical-btn').onclick = function() {
            DBZCCG.finalPhysicalDialog();
        };

        // set onclick callback for combat
        document.getElementById('combat-btn').onclick = function() {
            DBZCCG.declareDialog();
        };

        document.getElementById('rejuvenate-btn').onclick = function() {
            DBZCCG.rejuvenateDialog();
        };

        for (var i = 0; i < table.players.length; i++) {
            table.players[i].newLifeCardDamage = 0;
            var dragonballRegenerate = {f: function(cardIdx, increaseIndex, cards, card, owner) {

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
                            var inPlay = DBZCCG.Dragonball.checkInPlay(card);

                            var pile = this.pile;

                            DBZCCG.listActions.splice(0, 0, function() {
                                DBZCCG.logMessage(card.name + ' was discarted and ' +
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

            table.players[i].discardPile.addCallback(dragonballRegenerate);

            table.players[i].addTransferCallback({f: function(src, elems, destiny) {
                    if (src === "lifeDeck") {

                        if (destiny === "discardPile") {
                            this.player.dragonballCardDamage = 0;
                        }

                        var deckTotal;
                        var deckCards = this.player.lifeDeck.cards;

                        var checkGameOver = {f: function() {
                                if (deckCards.length === 0) { // TODO: check for infinite dragonball loop as well
                                    DBZCCG.gameOver = true;
                                    DBZCCG.listActions = [];
                                }
                            }, priority: 1};

                        var checkLowLife = {
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

                        this.player[destiny].addCallback(checkGameOver);
                        this.player[destiny].addCallback(checkLowLife);
                    }
                }, priority: 1});
        }

        function displayPhaseMessage(id, callback) {
            DBZCCG.performingAnimation = true;

            $('#turnOrder').children().removeClass('selectedTurn');
            $('#turnOrder').children(id.replace('-warn', '')).addClass('selectedTurn');

            $(id).fadeIn(500);

            window.setTimeout(function() {
                $(id).fadeOut(500, function() {
                    DBZCCG.performingAnimation = false;
                    callback();
                });
            }, 1000);
        }

        function invokeTurn() {

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

            for (var j = 0; j < table.players.length; j++) {
                var player = table.players[j];
                for (var i = 0; i < player.turnCallback.length; i++) {
                    if (player.turnCallback[i].f instanceof Function) {
                        player.turnCallback[i].f(DBZCCG.performingAction, table.players);
                    }
                }
            }

            var player = DBZCCG.performingAction;

            listActions.push(function() {
                if (player.drawPhaseEnabled) {
                    displayPhaseMessage('#draw-phase-warn',
                            function() {
                                player.drawPhase();
                            });
                }
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
                if (player.purPhaseEnabled) {
                    displayPhaseMessage('#pur-phase-warn',
                            function() {
                                player.purPhase();
                            });
                }

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
                if (player.discardPhaseEnabled) {
                    displayPhaseMessage('#discard-phase-warn',
                            function() {
                                player.discardPhase();
                                DBZCCG.logMessage(player.displayName() + " discard phase.");
                            });
                }

                for (var i = 0; i < table.players.length; i++) {
                    if (table.players[i] !== player && table.players[i].hand.cards.length > table.players[i].cardDiscardPhaseLimit) {
                        var discardPlayer = table.players[i];
                        listActions.push(function() {
                            DBZCCG.performingAction = discardPlayer;
                            discardPlayer.discardPhase();
                            DBZCCG.logMessage(discardPlayer.displayName() + " discard phase.");
                        });
                    }
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

                listActions.push(function() {
                    invokeTurn();
                });
            }
        }

        window.setTimeout(checkLoad, 500);

        function checkAction() {

            if (!DBZCCG.performingTurn &&
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
                $('#modal-post-game').show();
                window.clearInterval(mainLoopInterval);
            }
        }

        var mainLoopInterval = window.setInterval(checkAction, 500);

        // debug
        // scene.add(MathHelper.buildAxes(1000));
    }

    function render(cameraControl, renderer, scene, camera, stats) {
        TWEEN.update();

        // Update selection arrows
        DBZCCG.Combat.updateSelectionArrows();

        // Update models
        DBZCCG.Combat.selectionParticles.update();

        // Update Billboards
        DBZCCG.updateBillboards(camera);

        // Update background (If it requires update)
        if (DBZCCG.background.update instanceof Function) {
            DBZCCG.background.update();
        }

        // Render background screen
        renderer.render(DBZCCG.background.scene, DBZCCG.background.camera, DBZCCG.background.texture, true);

        renderer.render(scene, camera);

        DBZCCG.leftScreen.render();
        stats.update();
    }

    function controls(camera, renderer, scene, stats) {
        DBZCCG.playerCamera = camera;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

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
            $('#rightBar').hide();
            $('#leftBar').hide();
            window.onresize();
        });

        Mousetrap.bind('l', function() {
            if (!$('#rightBar').is(':visible')) {
                document.getElementById('log-btn').onclick({button: 0});
            } else {
                document.getElementById('closeRightBar').onclick({button: 0});
            }
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
            $('#hud').qtip('hide');
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
        DBZCCG.toolTip = {};

        function documentOnClick(event) {
            $('#hud').qtip('hide');

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
                DBZCCG.toolTip.title = parent.displayName instanceof Function ? parent.displayName() : "OBJECT";

                var ret = true;
                if (parent.click instanceof Function) {
                    ret = parent.click();
                }

                if (ret) {
                    if (parent.callbacks instanceof Array) {
                        for (var i = 0; i < parent.callbacks.length; i++) {
                            if (parent.callbacks[i].f instanceof Function) {
                                parent.callbacks[i].f();
                            }
                        }
                    }

                    $('#hud').qtip('show');
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

        window.onscroll = function() {
            window.scrollTo(0, 0);
        };

        /*
         * End of callbacks for the main screen
         */

        /* Tooltip for the renderer */
        $('#hud').qtip({
            content: {
                title: function(event, api) {
                    return DBZCCG.toolTip.title;
                },
                text: function(event, api) {
                    return DBZCCG.toolTip.content;
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
                classes: "qtip-rounded qtip-tipsy"
            },
            show: false,
            hide: {
                effect: false
            }
        });

        DBZCCG.toolTip.showDescription = function() {
            var parent = DBZCCG.toolTip.parent;

            if (parent.descriptionBox instanceof Function) {
                var display = parent;
                if (parent.displayObject instanceof Function) {
                    display = parent.displayObject();
                }

                DBZCCG.leftScreen.focusElement(display, display.leftScreenCallback);

                var textReturn = parent.descriptionBox();
                if (typeof textReturn === "string") {
                    DBZCCG.descriptionBox(textReturn);
                }
            }

            $('#leftBar').show();
            window.onresize();
        };

        DBZCCG.toolTip.content = document.createElement('div');
        DBZCCG.toolTip.content.id = 'cardContextTooltip';
        DBZCCG.toolTip.content.innerHTML = '<div id="tooltipEffect" title="Effect" class="tooltip tooltipEffectDisabled"></div><div id="tooltipDiscard" title="Discard" class="tooltip"></div><div title="Description" onclick="DBZCCG.toolTip.showDescription();" id="tooltipDescription" class="tooltip"></div>';

        /*
         * Toolbar
         */

        document.getElementById('log-btn').onclick = function(event) {
            if (event.button === 0) {
                $('#hud').qtip('hide');
                $('#rightBar').show();
                window.onresize();
            }
        };


        /*
         * Adding right screen
         */

        document.getElementById('closeRightBar').onclick = function(event) {
            if (event.button === 0) {
                $('#rightBar').hide();
                window.onresize();
            }
        };

        DBZCCG.rightScreen = {};
        DBZCCG.rightScreen.hideScreen = function() {
            $('#rightBarWindow').hide();
        }
        DBZCCG.rightScreen.showScreen = function() {
            $('#logBox').scrollTop($('#logBox')[0].scrollHeight);
            $('#rightBarWindow').show();
        }

        $('#rightBarWindow').hide();
        document.getElementById('rightBarWindow').style.position = 'absolute';
        document.getElementById('rightBarWindow').style.top = '6%';
        document.getElementById('rightBarWindow').style.right = '0%';
        document.getElementById('rightBarWindow').style.width = '20%';
        document.getElementById('rightBarWindow').style['z-index'] = '1300';
        document.getElementById('rightBarWindow').style.height = '51%';

        document.getElementById('closeLeftBar').onclick = function(event) {
            if (event.button === 0) {
                $('#leftBar').hide();
                window.onresize();
            }
        };

        /*
         * Adding left screen          
         */

        DBZCCG.leftScreen = {};

        DBZCCG.leftScreen.render = function() {
            var delta = DBZCCG.clock.getDelta();

            if ($('#leftBar').is(':visible')) {
                this.control.update(delta);
                this.light.position.copy(this.camera.position);
                this.renderer.render(this.scene, this.camera);
            }
        };
        DBZCCG.leftScreen.scene = new THREE.Scene();
        DBZCCG.leftScreen.renderer = new THREE.WebGLRenderer({antialias: true});
        DBZCCG.leftScreen.renderer.setClearColor(0x000000, 1);
        DBZCCG.leftScreen.light = new THREE.PointLight(0xF0F0F0, 1, 1000);
        DBZCCG.leftScreen.scene.add(DBZCCG.leftScreen.light);
        DBZCCG.leftScreen.renderer.setSize(window.innerWidth * 0.25, window.innerHeight * 0.5);
        DBZCCG.leftScreen.camera = new THREE.PerspectiveCamera(45, (window.innerWidth * 0.25) / (window.innerHeight * 0.5), 0.001, 1000);
        DBZCCG.leftScreen.control = new THREE.OrbitControls(DBZCCG.leftScreen.camera);
        DBZCCG.leftScreen.control.minDistance = DBZCCG.Card.cardHeight;
        DBZCCG.leftScreen.control.maxDistance = DBZCCG.Card.cardHeight * 3;
        DBZCCG.leftScreen.control.noPan = true;
        DBZCCG.leftScreen.control.enabled = false;

        $('#leftBarWindow').hide();
        document.getElementById('leftBarWindow').style.position = 'absolute';
        document.getElementById('leftBarWindow').style.top = '6%';
        document.getElementById('leftBarWindow').style.left = '2.5%';
        document.getElementById('leftBarWindow').style.width = '20%';
        document.getElementById('leftBarWindow').style['z-index'] = '1300';
        document.getElementById('leftBarWindow').style.height = '51%';


        document.getElementById('closeLeftBar').onclick = function(event) {
            if (event.button === 0) {
                $('#leftBar').hide();
                window.onresize();
            }
        };

        document.getElementById('leftBarWindow').onmouseover = function() {
            DBZCCG.leftScreen.control.enabled = true;
        };

        document.getElementById('leftBarWindow').onmouseout = function() {
            DBZCCG.leftScreen.control.enabled = false;
        };

        DBZCCG.leftScreen.focusElement = function(target, positionElement) {
            if (this.targetElement !== target) {
                /* Cloning */
                var obj = new THREE.Object3D();
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
                                materials.push(new THREE.MeshBasicMaterial({
                                    map: (elem.material.materials[i].map ?
                                            THREE.ImageUtils.loadTexture(elem.material.materials[i].map.sourceFile) : null),
                                    vertexColors: elem.material.materials[i].vertexColors
                                }));
                            }
                            material = new THREE.MeshFaceMaterial(materials);
                        } else if (!elem.material.map) {
                            material = elem.material.clone();
                        } else {
                            material = new THREE.MeshLambertMaterial();
                            if (elem.material.color) {
                                material.color = elem.material.color;
                            }

                            material.blending = elem.material.blending;

                            if (elem.material.map) {
                                material.map = THREE.ImageUtils.loadTexture(elem.material.map.sourceFile);
                            }
                        }

                        var geometry = elem.geometry.clone();
                        var mesh = new THREE.Mesh(geometry, material);
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
        };

        DBZCCG.leftScreen.showScreen = function() {
            $(this.renderer.domElement).show();
            $('#leftBarWindow').show();
        };

        DBZCCG.leftScreen.hideScreen = function() {
            $('#leftBarWindow').hide();
            $(this.renderer.domElement).hide();
        };

        // debug
        //DBZCCG.leftScreen.focusElement(new THREE.Mesh(new THREE.SphereGeometry(1, 64,32), new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, side: THREE.DoubleSide, color: 0xFFFFFF})));

        DBZCCG.leftScreen.renderer.domElement.style['z-index'] = 900;
        $(DBZCCG.leftScreen.renderer.domElement).hide();
        document.body.appendChild(DBZCCG.leftScreen.renderer.domElement);

        /*
         * End of Adding left screen          
         */

        // resize
        window.onresize = function() {
            // Hide tooltips
            $('#hud').qtip('hide');

            // RESIZE Main Screen
            var WIDTH = ($('#leftBar').is(':visible') ? window.innerWidth * 0.75 : window.innerWidth),
                    HEIGHT = window.innerHeight;
            WIDTH -= $('#rightBar').is(':visible') ? window.innerWidth * 0.25 : 0;
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();

            if ($('#leftBar').is(':visible')) {
                document.getElementById('renderer-wrapper').style.left = window.innerWidth * 0.25 + 'px';
                DBZCCG.leftScreen.showScreen();
            } else {
                document.getElementById('renderer-wrapper').style.left = '0px';
                DBZCCG.leftScreen.hideScreen();
            }

            if ($('#rightBar').is(':visible')) {
                document.getElementById('renderer-wrapper').style.right = window.innerWidth * 0.25 + 'px';
                DBZCCG.rightScreen.showScreen();
            } else {
                document.getElementById('renderer-wrapper').style.right = '0px';
                DBZCCG.rightScreen.hideScreen();
            }

            if (DBZCCG.background.resize instanceof Function) {
                DBZCCG.background.resize();
            }

            DBZCCG.leftScreen.renderer.setSize(window.innerWidth * 0.25, window.innerHeight * 0.6);
            renderer.setSize(WIDTH, HEIGHT);
            document.getElementById('renderer-wrapper').style.width = WIDTH + 'px';
            document.getElementById('renderer-wrapper').style.height = HEIGHT + 'px';

            DBZCCG.leftScreen.camera.aspect = (window.innerWidth * 0.25) / (HEIGHT * 0.6);
            DBZCCG.leftScreen.camera.updateProjectionMatrix();

            var right = document.getElementById('renderer-wrapper').style.right.replace(/px/g, '');
            var left = document.getElementById('renderer-wrapper').style.left.replace(/px/g, '');

            DBZCCG.resizeToolbar(WIDTH, left, right);
            DBZCCG.resizeTurnCounter(WIDTH, left, right);

            // Resize labels
            DBZCCG.resizeLabels();

            // Resize Scrollbars
            $('.niceScrollBar').getNiceScroll().resize();
        };

        return null;
    }

    var loadModelInterval = window.setInterval(function() {
        if (DBZCCG.checkObjectLoad()) {
            window.clearInterval(loadModelInterval);
            scr = DBZCCG.Screen.create(buildScene, render, controls);
            var interval = window.setInterval(function() {
                if (DBZCCG.finishedLoading) {
                    window.clearInterval(interval);
                    // Remove loading screen
                    $("#loadingText").remove();
                    //show HUD
                    DBZCCG.clearDescriptionBox();
                    document.getElementById("hud").style.display = "block";
                    document.getElementById("descriptionBox").style.display = "block";
                    $('#turnCounter').show();
                    $('#toolbar').show();
                    scr.start();
                    window.onresize();
                }
            }, 1000);
        }
    }, 1000);
};