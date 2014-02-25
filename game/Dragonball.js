DBZCCG.Dragonball = {};
DBZCCG.Dragonball['Earth Dragonball 1'] = 0;
DBZCCG.Dragonball['Earth Dragonball 2'] = 1;
DBZCCG.Dragonball['Earth Dragonball 3'] = 2;
DBZCCG.Dragonball['Earth Dragonball 4'] = 3;
DBZCCG.Dragonball['Earth Dragonball 5'] = 4;
DBZCCG.Dragonball['Earth Dragonball 6'] = 5;
DBZCCG.Dragonball['Earth Dragonball 7'] = 6;

DBZCCG.Dragonball.checkInPlay = function(db) {
    var result = false;
    var players = DBZCCG.table.players;
    // check if dragonball is in play
    for (var i = 0; i < players.length && !result; i++) {
        var dragonballs = players[i].dragonballs.cards;
        for (var j = 0; j < dragonballs.length && !result; j++) {
            if (dragonballs[j].dbCode === db.dbCode) {
                result = true;
            }
        }
    }

    return result;
};

DBZCCG.Dragonball.create = function(data) {

    function DragonballObject(data) {
        ClassHelper.extends(this, DBZCCG.Card.create(data));

        this.display.parentCard = this;

        this.dbCode = data.dbCode;

        this.capture = function(player, doNotUse) {
            if(this.control !== player) {
                var db = this;
                
                if(this.killFloatingEffect && this.floatingEffect) {
                    this.floatingEffect.kill = true;
                    this.floatingEffect = null;
                }
                
                var animation = new TWEEN.Tween(new THREE.Vector3(0,
                        0,
                        db.display.rotation.z))
                        .to(new THREE.Vector3(0, 0, (db.display.position.z < 0 && player.dirVector.z > 0) 
                        || (db.display.position.z > 0 && player.dirVector.z < 0) ? Math.PI : 0), 200);

                animation.onUpdate(function() {
                    db.display.rotation.z = this.z;
                });

                animation.start();

                db.control = player;
                if(!doNotUse) {
                    db.effect();
                    DBZCCG.performingTurn = false;
                }
            }
        };
    }

    return new DragonballObject(data);
};