LifeDeck = {};

LifeDeck.minimumSize = 50;
LifeDeck.maximumSize = 85;
LifeDeck.namekianMaximumSize = 90;

LifeDeck.create = function(deckObject) {

    function LifeDeckObject(deckObject) {
        
        
        // deck 1
        var card = Card.create({ texturePath: "images/DBZCCG/saiyan/001.jpg" });
        for (var i = 1; i <= 50; i++) {
            var addcard = card.clone();
            addcard.rotation.x += -90 * Math.PI / 180;
            addcard.position.y = cornerWidth * cardThicknessScale * i * 2;
            scene.add(addcard);
        }

    }

    return new LifeDeckObject(deckObject);

};