DBZCCG.Sound = {};

DBZCCG.Sound.on = true;


DBZCCG.Sound.Background = {};

DBZCCG.Sound.Background.bgm = [
//    'w3flpmg0GPM',
//    'ksPd-IFslVk',
//    'SkzT3Xy2hCs',
//    'T4JjE5I2kLI',
    '1qsecA6w5jg',
//    'klEPURFho-o',
//    '-tHSXwRAoZg',
//    'Q9XzM2VLToA',
//    '6JQ2BAkHJQI',
//    '82sCdTx1wGc',
//    '91cWRhs9VPg',
//    'ZPy0C957UmQ'
];

DBZCCG.Sound.Background.index = 0;

function onYouTubeIframeAPIReady() {

    var player;

    function checkSoundOn() {
        if (!DBZCCG.Sound.on) {
            this.setVolume(0);
        } else {
            this.setVolume(100);
        }
    }

    DBZCCG.Sound.Background.nextTrack = function() {
        player = null;
        if ($('#music-box').is(':visible')) {
            $('#music-box').stop();
            $('#music-box').fadeOut(500, function() {
                $('#music-box').remove();
                displayAudioInfo(DBZCCG.Sound.Background.bgm[++DBZCCG.Sound.Background.index
                        % DBZCCG.Sound.Background.bgm.length]);
            });
        } else {
            $('#music-box').remove();
            displayAudioInfo(DBZCCG.Sound.Background.bgm[++DBZCCG.Sound.Background.index
                    % DBZCCG.Sound.Background.bgm.length]);
        }
    };

    function displayAudioInfo(id) {
            var timeout;
            var started = false;

            function onPlayerStateChange(event) {
                switch (event.data) {
                    case YT.PlayerState.ENDED:
                        DBZCCG.Sound.Background.nextTrack();
                        break;
                    case YT.PlayerState.PLAYING:
                        document.getElementById('music-box').onmouseover = function() {
                            window.clearTimeout(timeout);
                        };

                        document.getElementById('music-box').onmouseout = function() {
                            if (!this.toggled) {
                                timeout = window.setTimeout(function() {
                                    $('#music-box').fadeOut(1000, function() {
                                    });
                                }, 2500);
                            }
                        };

                        if (!started) {
                            $('#music-box').draggable({containment: "body",
                                start: document.getElementById('music-box').onmouseover});

                            $('#music-box').children('iframe').mouseover(
                                    document.getElementById('music-box').onmouseover);
                            started = true;
                        }

                        if (DBZCCG.Sound.on) {
                            $('#music-box').stop();
                            $('#music-box').fadeIn(1000, function() {
                                timeout = window.setTimeout(function() {
                                    $('#music-box').fadeOut(1000, function() {
                                    });
                                }, 2500);
                            });
                        }
                        
                        break;
                    case YT.PlayerState.PAUSED:
                        document.getElementById('music-box').onmouseover = null;
                        document.getElementById('music-box').onmouseout = null;
                        break;
//                            case YT.PlayerState.BUFFERING:
//                                log('Video is buffering.');
//                                break;
//                            case YT.PlayerState.CUED:
//                                log('Video is cued.');
//                                break;
//                            default:
//                                log('Unrecognized state.');
                }
            }

            function displayToolTip() {
                var element = document.createElement('div');

                element.innerHTML = '<iframe id="player_' + id +
                        '" width="100%" height="100%" src="https://www.youtube.com/embed/' +
                        id + '?enablejsapi=1&html5=1&autoplay=1&autohide=1&showinfo=0" ' +
                        'frameborder="0"></iframe>';

                element.id = 'music-box';
                element.className = 'ui-corner-all';
                document.body.appendChild(element);

                player = new YT.Player('player_' + id, {
                    events: {
                        'onStateChange': onPlayerStateChange,
                        'onReady': onPlayerReady
                    }
                });
            }

            if ($('#music-box').is(':visible')) {
                var elem = document.getElementById('music-box');
                window.clearTimeout(timeout);
                elem.onmouseover = elem.onmouseout = null;
                $(elem).stop();
                $(elem).fadeOut(500, displayToolTip);
            } else {
                displayToolTip();
            }


            if (DBZCCG.Sound.on) {
                return true;
            } else {
                return false;
            }
    }

    var firstLoad = true;
    function onPlayerReady () {
        if(DBZCCG.Sound.on) {
            if (firstLoad) {
                player.setVolume(25);
                firstLoad = false;
            }
        } else {
            player.mute();
        }
    }

    DBZCCG.Sound.toggle = function () {
        DBZCCG.Sound.on = !DBZCCG.Sound.on;
        if(DBZCCG.Sound.on) {
            if(player) {
                player.unMute();
            }
        } else if (player) {
            player.mute();
        }
    };

    window.setTimeout(function() {
        var interval = window.setInterval(function() {
            if (DBZCCG.finishedLoading && displayAudioInfo(DBZCCG.Sound.Background.bgm[DBZCCG.Sound.Background.index])) {
                DBZCCG.Sound.on = false;
                window.clearInterval(interval);
            }
        }, 100);
    }, 2000);
    
    DBZCCG.Sound.loaded = true;
}


(function() {
    lowLag.init({sm2url: "lib/sm2/swf/", debug: false});

    DBZCCG.Sound.damageSounds = [
        'hit0',
        'hit1',
        'hit2',
        'hit3'
    ];

    lowLag.load("audio/fx/hit1.ogg", "hit0");
    lowLag.load("audio/fx/hit2.ogg", "hit1");
    lowLag.load("audio/fx/hit3.ogg", "hit2");
    lowLag.load("audio/fx/hit4.ogg", "hit3");

    DBZCCG.Sound.transferSounds = [
        'transfer0',
        'transfer1'
    ];

    lowLag.load("audio/fx/transfer2.ogg", "transfer0");
    lowLag.load("audio/fx/transfer1.ogg", "transfer1");

    DBZCCG.Sound.flashSounds = [
        'flash0'
    ];

    lowLag.load("audio/fx/card-flash2.ogg", "flash0");
    lowLag.load("audio/fx/card-flash1.ogg", "flash1");

    lowLag.load("audio/fx/floating-effect-appear.ogg", "floating-appear");
    lowLag.load("audio/fx/floating-effect-disappear.ogg", "floating-disappear");

    lowLag.load("audio/fx/shuffle.ogg", "shuffle");

    lowLag.load("audio/fx/turn3.ogg", "turn");
    lowLag.load("audio/fx/power-up.ogg", "power-up");
    lowLag.load("audio/fx/power-down.ogg", "power-down");
    
    lowLag.load("audio/fx/level-up.ogg", "level-up");
    lowLag.load("audio/fx/level-down.ogg", "level-down");
    
    lowLag.load("audio/fx/anger-up.ogg", "anger-up");
    lowLag.load("audio/fx/anger-down.ogg", "anger-down");    
    
    lowLag.load("audio/fx/wow-damage.ogg", "wow-damage");    
}());

DBZCCG.Sound.wowDamage = function (method) {
    if(DBZCCG.Sound.on) {
        lowLag.play("wow-damage");
    }
};

DBZCCG.Sound.floatingEffect = function (method) {
    if(DBZCCG.Sound.on) {
        lowLag.play("floating-"+method);
    }
};

DBZCCG.Sound.level = function(n) {
    if (DBZCCG.Sound.on) {
        if (n !== undefined) {
            if (n < 0) {
                lowLag.play("level-down");
            } else {
                lowLag.play("level-up");
            }
        }
    }
};

DBZCCG.Sound.anger = function(n) {
    if (DBZCCG.Sound.on) {
        if (n !== undefined) {
            if (n < 0) {
                lowLag.play("anger-down");
            } else {
                lowLag.play("anger-up");
            }
        }
    }
};

DBZCCG.Sound.power = function(n) {
    if (DBZCCG.Sound.on) {
        if (n !== undefined) {
            if (n < 0) {
                lowLag.play("power-down");
            } else {
                lowLag.play("power-up");
            }
        }
    }
};

DBZCCG.Sound.shuffle = function() {
    if (DBZCCG.Sound.on) {
        lowLag.play("shuffle");
    }
};

DBZCCG.Sound.damage = function() {
    if (DBZCCG.Sound.on) {
        lowLag.play("hit" + (Math.round((DBZCCG.Sound.damageSounds.length - 1) * Math.random())));
    }
};

DBZCCG.Sound.flash = function() {
    if (DBZCCG.Sound.on) {
        lowLag.play("flash" + (Math.round((DBZCCG.Sound.flashSounds.length - 1) * Math.random())));
    }
};

DBZCCG.Sound.turn = function() {
    if (DBZCCG.Sound.on) {
        lowLag.play('turn');
    }
};

DBZCCG.Sound.transfer = function(sound) {
    if (DBZCCG.Sound.on) {
        if (sound === undefined) {
            sound = 0;
        }
        lowLag.play("transfer" + sound);
        //lowLag.play("transfer" + (Math.round((DBZCCG.Sound.transferSounds.length - 1) * Math.random())));
    }
};