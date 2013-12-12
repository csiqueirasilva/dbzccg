MainPersonality = {};

MainPersonality.maxLevel = 5;

MainPersonality.create = function(data) {
    
    function MainPersonalityObject (data) {
        this.personalities = [];
        for(var i = 0; i < data.length; i++) {
            this.personalities.push(Personality.create(data[i]));
        }

        this.addToScene = function(position, scene) {
            for(var i = 0; i < this.personalities.length; i++) {
                var card = this.personalities[i];
                card.faceup();
                card.turnThisWay(position);
                card.display.position = position.clone();
                card.display.position.multiplyScalar(1 - Card.personalityNameDiff[card.saga] * i);
                card.moveY(this.personalities.length - 1 - i);
                scene.add(card.display);
            }
        }
    }
    
    return new MainPersonalityObject(data);
};