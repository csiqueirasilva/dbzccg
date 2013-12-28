LifeDeck = {};

LifeDeck.minimumSize = 50;
LifeDeck.maximumSize = 85;
LifeDeck.namekianMaximumSize = 90;

LifeDeck.create = function(deckObject) {

    function LifeDeckObject(deckObject) {
        var deck = Deck.create(deckObject);

        for (var key in deck) {
            this[key] = deck[key];
        }
        
        this.addToField = function(position, field) {
            this.display.position.copy(position);
            DBZCCG.objects.push(this.display);
            field.add(this.display);
        }
    }

    return new LifeDeckObject(deckObject || {number: 50});

};