DBZCCG.DragonBall.checkInPlay = function(db) {
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

DBZCCG.DragonBall.DragonballObject = function (data) {
    DBZCCG.Card.CardObject.apply(this, arguments);
    this.display.parentCard = this;


    this.capture = function(player, doNotUse) {
        if (this.control !== player) {
            var db = this;

            if (this.killFloatingEffect && this.floatingEffect) {
                this.floatingEffect.kill = true;
                this.floatingEffect = null;
            }

            var animation = new TWEEN.Tween(new THREE.Vector3(0,
                    0,
                    db.display.rotation.z))
                    .to(new THREE.Vector3(0, 0, player.angle - Math.PI), 200);
            
            animation.onUpdate(function() {
                db.display.rotation.z = this.z;
            });

            animation.start();

            db.control = player;
            if (!doNotUse) {
                db.effect();
                DBZCCG.performingTurn = false;
            }
        }
    };
};

DBZCCG.DragonBall.DragonballObject.prototype = Object.create(DBZCCG.Card.CardObject.prototype);
DBZCCG.DragonBall.DragonballObject.prototype.constructor = DBZCCG.DragonBall.DragonballObject;

DBZCCG.DragonBall.create = function(data) {
    return new DBZCCG.DragonBall.DragonballObject(data);
};