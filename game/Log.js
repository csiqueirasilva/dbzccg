DBZCCG.Log = {};

DBZCCG.Log.entries = [];

DBZCCG.Log.Type = {};

DBZCCG.Log.Type.sufferedDamage = 0;

// create the log
DBZCCG.Log.logEntry = function(msg, card, type) {
    function LogObject(msg, card) {
        this.turn = $('#turnCounterNumber').html();
        this.phaseId = DBZCCG.phaseCounter;
        this.phase = $('.selectedTurn').attr('title');
        this.msg = msg;
        this.card = card;
        this.type = type;
        this.entryDate = new Date();
        this.player = DBZCCG.performingAction;

        if (card && !msg) {
            this.msg = 'Played ' + card.logName();
        }

        DBZCCG.Log.entries.push(this);

        var log = document.createElement('div');
        log.innerHTML = '';
        if (DBZCCG.performingAction === DBZCCG.mainPlayer) {
            log.innerHTML += '>> ';
        } else {
            log.innerHTML += '<< ';
        }
        
        log.innerHTML += '<b>' + DBZCCG.performingAction.displayName() + '</b>' + '@' + this.phase + "[" + this.entryDate.toLocaleString() + "]" + '<br />';
        log.innerHTML += this.msg;

        document.getElementById("logBox").appendChild(log);
        $('#logBox').animate({scrollTop: $('#logBox')[0].scrollHeight}, 'slow');
    }

    return new LogObject(msg, card);
};

DBZCCG.Log.checkEventThisPhase = function (event, check) {
    for(var i = 0; i < DBZCCG.Log.entries.length; i++) {
        if(DBZCCG.Log.entries[i].type === event) {
            var ret = true;
            if(check && check instanceof Object) {
                for(var j in check) {
                    if(DBZCCG.Log.entries[i][j] !== check[j]) {
                        ret = false;
                    }
                }
            }
            
            if(ret) {
                return true;
            }
        }
    }
    
    return false;
};