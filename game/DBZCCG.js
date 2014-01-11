// http://github.com/csiqueirasilva/dbzccg.js
var DBZCCG = {};

/* Dialogs */
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
            $(this).dialog('close');
        },
        "Skip combat": function() {
            $('#combat-btn').hide();
            DBZCCG.combat = false;
            DBZCCG.performingTurn = false;
            $(this).dialog('close');
        }
    });
};

DBZCCG.passDialog = function(msg) {
    DBZCCG.confirmDialog('Passing', msg, function() {
        $('#pass-btn').hide();
        DBZCCG.performingTurn = false;
    });
};

DBZCCG.confirmDialog = function(title, content, ok_cb, buttons) {

    var wrapperDiv = document.createElement('div');
    wrapperDiv.innerHTML = content;

    DBZCCG.createDialog(title, wrapperDiv, 'confirmDialog');

    $('#confirmDialog').dialog('option', 'height', window.innerHeight * 0.25);
    $('#confirmDialog').dialog('option', 'width', window.innerWidth * 0.25);

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
    for (var i = 0; i < DBZCCG.objects.length; i++) {
        if (DBZCCG.objects[i] === obj) {
            DBZCCG.objects.splice(i, 1);
            break;
        }
    }
}

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

DBZCCG.performingTurn = false;
DBZCCG.performingAnimation = false;
DBZCCG.combat = false;
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

DBZCCG.startSelectionParticles = function() {
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
    DBZCCG.selectionParticles = new THREE.ParticleSystem(geo, new THREE.ParticleSystemMaterial({
        size: 0.2,
        vertexColors: true,
        map: THREE.ImageUtils.loadTexture("images/gfx/particles/particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
    }));

    DBZCCG.selectionParticles.sortParticles = true;
    DBZCCG.selectionParticles.visible = false;

    DBZCCG.updateParticles = function() {
        if (DBZCCG.selectionParticles.visible) {

            DBZCCG.selectionParticles.rotation.y += 10 * Math.PI / 180;

            var pCount = particleCount;
            while (pCount--) {

                // get the particle
                var particle = geo.vertices[pCount];

                var icrVector = new THREE.Vector3(Math.cos(pCount) * 0.1, 0.6 + Math.sin(DBZCCG.clock.elapsedTime) * 0.15, Math.cos(pCount) * 0.1);
                particle.copy(particle.basePos.clone().multiplyScalar(Math.abs(Math.cos(DBZCCG.clock.elapsedTime)) * 0.5 + 0.5).add(icrVector));
            }

            DBZCCG.selectionParticles.
                    geometry.
                    __dirtyVertices = true;
        }
    }
}

DBZCCG.quickMessage = function(msg) {
    if (DBZCCG.finishedLoading) {
        if (DBZCCG.performingAction !== null) {
            if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
                alertify.custom = alertify.extend("player");
            } else {
                alertify.custom = alertify.extend("enemy");
            }
            alertify.custom(msg);
        } else {
            alertify.log(msg);
        }
        var log = document.createElement('div');
        log.innerHTML = "[" + new Date().toLocaleString() + "] <br />" + msg;
        document.getElementById("logBox").appendChild(log);
        $('#logBox').animate({scrollTop: $('#logBox').height()}, 50);
    }
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

    function createSkybox(scene) {
        var urlPrefix = "images/bg/skybox_carro/";
        var urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"];
        var textureCube = THREE.ImageUtils.loadTextureCube(urls);

        urlPrefix = "images/bg/skybox_carro/";
        urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"];
        var textureCube2 = THREE.ImageUtils.loadTextureCube(urls);

        var shader = THREE.ShaderLib.cube;
        var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms['tCube'].value = textureCube;
        //uniforms['tCube2'] = {type: 't', value: textureCube2};

        var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader, //document.getElementById('skybox_fragment_shader').textContent,
            vertexShader: document.getElementById('skybox_vertex_shader').textContent,
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

        window.setTimeout(function() {
            DBZCCG.playerLowLife = true;
        }, 30000);

        window.setTimeout(function() {
            DBZCCG.playerLowLife = false;
        }, 45000);

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

    function loadTimeChamber() {
        var loader = new THREE.OBJMTLLoader();

        loader.load('model/stages/TimeChamber/TimeChamber.obj', 'model/stages/TimeChamber/TimeChamber.mtl', function(object) {

            var light = new THREE.PointLight(0xF0F0F0, 1, 100000);
            DBZCCG.background.scene.add(light);
            DBZCCG.background.camera.position.y = 20;
            DBZCCG.background.camera.position.z = 300;
            DBZCCG.background.camera.rotation.y = Math.PI;

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

                camera.position.z = 650 + Math.cos(icr / 2) * 200;
                camera.position.x = Math.sin(icr / 2) * 300;

                camera.lookAt(bgCentralPoint);
                light.position.copy(camera.position);
            };

        });
    }

    function createBackground(scene, camera) {
        DBZCCG.background = {};
        var sizeX = window.innerWidth;
        var sizeY = window.innerHeight;

        DBZCCG.background.scene = new THREE.Scene();

        DBZCCG.background.texture = new THREE.WebGLRenderTarget(sizeX, sizeY, {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat});
        DBZCCG.background.camera = new THREE.PerspectiveCamera(45, sizeX / sizeY, 0.01, 10000);

        var plane = new THREE.PlaneGeometry(sizeX * 1.4, sizeY * 1.4);
        var planeMaterial = new THREE.MeshBasicMaterial({map: DBZCCG.background.texture});

        loadDefaultBackground();
        //loadTimeChamber();

        DBZCCG.background.resize = function() {
            var WIDTH = ($('#leftBar').is(':visible') ? window.innerWidth * 0.75 : window.innerWidth);
            var HEIGHT = window.innerHeight;

            DBZCCG.background.camera.aspect = WIDTH / HEIGHT;
            DBZCCG.background.camera.updateProjectionMatrix();
        }

        DBZCCG.background.plane = new THREE.Mesh(plane, planeMaterial);
        DBZCCG.background.plane.rotation.x = -45 * Math.PI / 180;
        DBZCCG.background.plane.position.z = -Math.cos(-45) * 1000 - sizeY / 2;
        DBZCCG.background.plane.position.y = Math.sin(-45) * 1000 - sizeX / 16;

        scene.add(DBZCCG.background.plane);
    }

    function buildScene(scene, camera) {
        var light = new THREE.PointLight(0xF0F0F0); // soft white light
        light.position.set(0, 100, 0);
        scene.add(light);
        createBackground(scene, camera);
        //createSkybox(scene);
        table = DBZCCG.Table.create([
            /*P1*/
            {mainPersonality: {alignment: DBZCCG.Personality.alignment.Hero, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                    angerLevelNeededToLevel: 5, personalities: [{style: DBZCCG.Card.Style.Freestyle, PUR: 1, alignment: DBZCCG.Personality.alignment.Hero, description: "Power: Energy attack doing 3 life cards of damage. Costs 1 power stage.", level: 1, name: "GOKU", highTech: false, number: 158, texturePath: "images/DBZCCG/saiyan/158.jpg",
                            personality: DBZCCG.Personality.GOKU, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]},
                        {style: DBZCCG.Card.Style.Freestyle, PUR: 2, alignment: DBZCCG.Personality.alignment.Hero, description: "Power: Physical attack doing 4 power stages of damage.", level: 2, name: "GOKU", highTech: false, number: 159, texturePath: "images/DBZCCG/saiyan/159.jpg",
                            personality: DBZCCG.Personality.GOKU, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]},
                        {style: DBZCCG.Card.Style.Freestyle, PUR: 3, alignment: DBZCCG.Personality.alignment.Hero, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 3, name: "GOKU", highTech: false, number: 160, texturePath: "images/DBZCCG/saiyan/160.jpg",
                            personality: DBZCCG.Personality.GOKU, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500]}]}},
            /*P2*/
            {mainPersonality: {alignment: DBZCCG.Personality.alignment.Villain, currentMainPersonalityLevel: 1, currentPowerStageAboveZero: 5, currentAngerLevel: 0,
                    angerLevelNeededToLevel: 5, personalities: [{style: DBZCCG.Card.Style.Freestyle, PUR: 2, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Once per combat, reduces the damage of an energy attack by 2 life cards.", level: 1, name: "VEGETA", highTech: false, number: 173, texturePath: "images/DBZCCG/saiyan/173.jpg",
                            personality: DBZCCG.Personality.VEGETA, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]},
                        {style: DBZCCG.Card.Style.Freestyle, PUR: 4, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Energy attack doing 3 life cards of damage. Costs 1 power stage.", level: 2, name: "VEGETA", highTech: false, number: 174, texturePath: "images/DBZCCG/saiyan/174.jpg",
                            personality: DBZCCG.Personality.VEGETA, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800]},
                        {style: DBZCCG.Card.Style.Freestyle, PUR: 4, alignment: DBZCCG.Personality.alignment.Rogue, description: "Power: Once per game, after performing a successful energy attack, steal a Dragon Ball. After this effect, the combat ends.", level: 3, name: "VEGETA", highTech: false, number: 175, texturePath: "images/DBZCCG/saiyan/175.jpg",
                            personality: DBZCCG.Personality.VEGETA, saga: DBZCCG.Card.Saga.SAIYAN, powerStages: [0, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000]}]}}
        ], camera, scene);

        // Actually there should be an entire control for all the models, and one of them should be a particle system
        DBZCCG.startSelectionParticles();
        scene.add(DBZCCG.selectionParticles);

        // set onclick callback for pass
        document.getElementById('pass-btn').onclick = function() {
            DBZCCG.passDialog(DBZCCG.passMessage);
        };

        // set onclick callback for combat
        document.getElementById('combat-btn').onclick = function() {
            DBZCCG.declareDialog();
        };

        DBZCCG.finishedLoading = true;

        function displayPhaseMessage(id, callback) {
            DBZCCG.performingAnimation = true;

            $('#turnOrder').children().removeClass('selectedTurn');
            $('#turnOrder').children(id.replace('-warn','')).addClass('selectedTurn');
            
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

            if (!DBZCCG.performingAction) {
                DBZCCG.performingAction = table.players[0];
            } else {
                // next player
                DBZCCG.performingAction = table.players[(table.players.indexOf(DBZCCG.performingAction) + 1) % table.players.length];
            }

            var player = DBZCCG.performingAction;

            listActions.push(function() {
                if (player.drawPhaseEnabled) {
                    displayPhaseMessage('#draw-phase-warn',
                            function() {
                                player.drawPhase();
                            });
                }

                listActions.push(function() {
                    if (player.nonCombatPhaseEnabled) {
                        displayPhaseMessage('#noncombat-phase-warn',
                                function() {
                                    player.nonCombatPhase();
                                });

                    }

                    listActions.push(function() {
                        if (player.purPhaseEnabled) {
                            displayPhaseMessage('#pur-phase-warn',
                                    function() {
                                        player.purPhase();
                                    });
                        }

                        listActions.push(function() {
                            if (player.declarePhaseEnabled) {
                                displayPhaseMessage('#declare-phase-warn',
                                        function() {
                                            player.declarePhase();
                                        });
                            }

                            listActions.push(function() {
                                if (DBZCCG.combat && player.combatPhaseEnabled) {
                                    displayPhaseMessage('#combat-phase-warn',
                                            function() {
                                                //player.combatPhase(combat.defending);
                                            });
                                }

                                listActions.push(function() {
                                    if (player.discardPhaseEnabled) {
                                        displayPhaseMessage('#discard-phase-warn',
                                                function() {
                                                    player.discardPhase();                        
                                                });
                                    }

                                    listActions.push(function() {
                                        if (!DBZCCG.combat && player.rejuvenationPhaseEnabled) {
                                            displayPhaseMessage('#rejuvenation-phase-warn',
                                                function() {
                                                    player.rejuvenationPhase();
                                                });
                                        }
                                    });

                                });

                            });

                        });

                    });

                });

            });

        }

        function checkLoad() {
            if (table.players[0].mainPersonality.personalities[0].zScouter === undefined) {
                window.setTimeout(checkLoad, 500);
            } else /*Begin code after everything was loaded */ {
//                DBZCCG.performingAction = table.players[0];
//                

                listActions.push(function() {
                    invokeTurn();
                });
//                listActions.push(function() {
//                    DBZCCG.performingAction.transferCards("lifeDeck",[0],"discardPile");
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction.transferCards("hand",[0],"discardPile");
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction.transferCards("hand",[0],"nonCombats");
//                });
//                
//                listActions.push(function() {
//                    DBZCCG.performingAction.transferCards("lifeDeck",[0],"hand");
//                });
//                
//                listActions.push(function () {
//                    DBZCCG.performingAction.drawBottomCards(3, "discardPile");
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction.drawTopCards(3, "lifeDeck");
//                });

//                 
//                 listActions.push(function() {
//                 DBZCCG.performingAction = table.players[1];
//                 table.players[1].mainPersonality.advanceLevels(8);
//                 });
//                 
//                 listActions.push(function() {
//                 DBZCCG.performingAction = table.players[0];
//                 table.players[0].mainPersonality.moveZScouter(0);
//                 });
//                 
//                 listActions.push(function() {
//                 DBZCCG.performingAction = table.players[0];
//                 table.players[0].mainPersonality.moveZScouter(5);
//                 });
//                 
//                 listActions.push(function() {
//                 DBZCCG.performingAction = table.players[0];
//                 table.players[0].mainPersonality.moveZScouter(12);
//                 });
//                 
//                 listActions.push(function() {
//                 DBZCCG.performingAction = table.players[0];
//                 table.players[0].mainPersonality.moveZScouter(1);
//                 });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[0];
//                    table.players[0].mainPersonality.changeAnger(1);
//                });
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[0];
//                    table.players[0].mainPersonality.changeAnger(-1);
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[0];
//                    table.players[0].mainPersonality.changeAnger(2);
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[0];
//                    table.players[0].mainPersonality.changeAnger(5);
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[0];
//                    table.players[0].mainPersonality.changeAnger(-3);
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[1];
//                    table.players[1].mainPersonality.changeAnger(-3);
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[1];
//                    table.players[1].mainPersonality.changeAnger(-3);
//                });
//
//                listActions.push(function() {
//                    DBZCCG.performingAction = table.players[1];
//                    table.players[1].mainPersonality.changeAnger(5);
//                });
            }
        }

        window.setTimeout(checkLoad, 500);

        function checkAction() {
            if (!DBZCCG.performingTurn &&
                    !DBZCCG.performingAnimation &&
                    listActions.length > 0 &&
                    $(".alertify-log:visible").length === 0 &&
                    $(".alertify-dialog:visible").length === 0) {
                listActions.shift()();
            }
        }

        window.setInterval(checkAction, 200);

        // debug
        // scene.add(MathHelper.buildAxes(1000));

        /*
         function formatnumber(n) {
         if (n < 10)
         return "00" + n;
         else if (n < 100)
         return "0" + n;
         else
         return n.toString();
         }
         
         // discard 1
         for (var i = 1; i <= 10; i++) {
         var addcard = card.clone();
         addcard.rotation.x += -90 * Math.PI / 180;
         addcard.rotation.y += -180 * Math.PI / 180;
         addcard.position.y = cornerWidth * cardThicknessScale * i * 2;
         addcard.position.x -= cardWidth + 1;
         scene.add(addcard);
         }
         
         
         
         // deck 2
         for (var i = 1; i <= 30; i++) {
         var addcard = card.clone();
         addcard.rotation.x += -90 * Math.PI / 180;
         addcard.rotation.z += 180 * Math.PI / 180;
         addcard.rotation.y += -180 * Math.PI / 180;
         addcard.position.y = cornerWidth * cardThicknessScale * i * 2;
         addcard.position.x -= 29 - (cardWidth + 1);
         addcard.position.z -= 20;
         scene.add(addcard);
         }
         
         // discard 2
         for (var i = 80; i <= 120; i++) {
         var addcard = card.clone();
         addcard.rotation.x += -90 * Math.PI / 180;
         addcard.rotation.z += 180 * Math.PI / 180;
         addcard.position.y = cornerWidth * cardThicknessScale * (i - 79) * 2;
         addcard.position.x -= 29;
         addcard.position.z -= 20;
         scene.add(addcard);
         }
         
         // Removed from the game
         card = DBZCCG.Card.create("images/DBZCCG/saiyan/250.jpg");
         card.rotation.x += 90 * Math.PI / 180;
         card.rotation.z += 90 * Math.PI / 180;
         card.position.x -= 0.75;
         card.position.z -= 5.5;
         scene.add(card);
         
         card = DBZCCG.Card.create("images/DBZCCG/saiyan/028.jpg");
         card.rotation.x += 90 * Math.PI / 180;
         card.rotation.z += -90 * Math.PI / 180;
         card.position.x -= 28.25;
         card.position.z -= 15 - 0.5;
         scene.add(card); */

    }

    function render(cameraControl, renderer, scene, camera, stats) {
        TWEEN.update();

        // Update Billboards
        DBZCCG.updateBillboards(camera);

        // Update Particles
        // TODO: This should update all model animations, not only particles
        DBZCCG.updateParticles();

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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // DEBUG
        document.body.appendChild(stats.domElement);
        stats.domElement.id = 'stats';

        var element = renderer.domElement;

        var display = document.getElementById('hud');
        projector = new THREE.Projector();

        var tooltipOptions = document.createElement('div');

        /*
         * Callbacks for the main screen
         */

        // KEYBOARD
        DBZCCG.keys = {};
        function onKeyUp(event) {
            // TODO: Create function to check if it is possible to close all active windows
            if (document.activeElement.tagName != 'INPUT' && event.keyCode == 27) {
                $('#rightBar').hide();
                $('#leftBar').hide();
                window.onresize();
            }
        }

        document.body.onkeyup = onKeyUp;

        // MOUSE
        function onDocumentMouseMove(event) {
            event.preventDefault();

            if ((event.clientX > window.innerWidth * 0.25 || !$('#leftBar').is(':visible')) && !DBZCCG.performingAnimation) {
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
                                parent.mouseOut();
                            }
                        }
                        if ($('.ui-dialog:visible').length == 0) {
                            intersected = intersections[ intersectionIndex ].object;
                        }
                    }

                    if ($('.ui-dialog:visible').length == 0) {
                        var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOver");
                        document.getElementById('body').style.cursor = parent.cursor || 'pointer';

                        if (parent.mouseOver instanceof Function) {
                            parent.mouseOver();
                        }
                    }
                }
                else if (intersected) {
                    var parent = DBZCCG.Screen.findCallbackObject(intersected, "mouseOut");
                    if (parent.mouseOut instanceof Function) {
                        parent.mouseOut();
                    }
                    document.getElementById('body').style.cursor = 'auto';
                    intersected = null;
                }
            }
        }

        display.addEventListener('mousemove', onDocumentMouseMove, false);

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
        DBZCCG.toolTip.callbacks = [];
        
        function documentOnClick(event) {
            $('#hud').qtip('hide');
            $(DBZCCG.toolTip.content).children('#tooltipEffect').hide();

            if (intersected) {
                var parent = DBZCCG.Screen.findCallbackObject(intersected, "descriptionBox");

                if (parent.effect) {
                    $(DBZCCG.toolTip.content).children('#tooltipEffect').show();
                }

                DBZCCG.toolTip.parent = parent;
                DBZCCG.toolTip.title = parent.displayName instanceof Function ? parent.displayName() : "OBJECT";

                if (parent.click instanceof Function) {
                    parent.click();
                }

                for(var i = 0; i < DBZCCG.toolTip.callbacks.length; i++) {
                    if(DBZCCG.toolTip.callbacks[i] instanceof Function) {
                        DBZCCG.toolTip.callbacks[i]();
                    }
                }

                $('#hud').qtip('show');
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
                if (typeof textReturn == "string") {
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
            if (event.button == 0) {
                $('#hud').qtip('hide');
                $('#rightBar').show();
                window.onresize();
            }
        };


        /*
         * Adding right screen
         */

        document.getElementById('closeRightBar').onclick = function(event) {
            if (event.button == 0) {
                $('#rightBar').hide();
                window.onresize();
            }
        };

        DBZCCG.rightScreen = {};
        DBZCCG.rightScreen.hideScreen = function() {
            $('#rightBarWindow').hide();
        }
        DBZCCG.rightScreen.showScreen = function() {
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
            if (event.button == 0) {
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
            if (event.button == 0) {
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
        }

        DBZCCG.leftScreen.showScreen = function() {
            $(this.renderer.domElement).show();
            $('#leftBarWindow').show();
        }

        DBZCCG.leftScreen.hideScreen = function() {
            $('#leftBarWindow').hide();
            $(this.renderer.domElement).hide();
        }

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
                renderer.domElement.style.left = window.innerWidth * 0.25 + 'px';
                DBZCCG.leftScreen.showScreen();
            } else {
                renderer.domElement.style.left = '0px';
                DBZCCG.leftScreen.hideScreen();
            }

            if ($('#rightBar').is(':visible')) {
                renderer.domElement.style.right = window.innerWidth * 0.25 + 'px';
                DBZCCG.rightScreen.showScreen();
            } else {
                renderer.domElement.style.right = '0px';
                DBZCCG.rightScreen.hideScreen();
            }

            if (DBZCCG.background.resize instanceof Function) {
                DBZCCG.background.resize();
            }

            DBZCCG.leftScreen.renderer.setSize(window.innerWidth * 0.25, window.innerHeight * 0.6);
            renderer.setSize(WIDTH, HEIGHT);

            DBZCCG.leftScreen.camera.aspect = (window.innerWidth * 0.25) / (HEIGHT * 0.6);
            DBZCCG.leftScreen.camera.updateProjectionMatrix();

            var right = renderer.domElement.style.right.replace(/px/g, '');
            var left = renderer.domElement.style.left.replace(/px/g, '');

            DBZCCG.resizeToolbar(WIDTH, left, right);
            DBZCCG.resizeTurnCounter(WIDTH, left, right);

            // Resize Scrollbars
            $('.niceScrollBar').getNiceScroll().resize();
        };

        return null;
    }

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
        }
    }, 1000);
};