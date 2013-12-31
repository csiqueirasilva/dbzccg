DBZCCG.LifeDeck = {};

DBZCCG.LifeDeck.minimumSize = 50;
DBZCCG.LifeDeck.maximumSize = 85;
DBZCCG.LifeDeck.namekianMaximumSize = 90;

DBZCCG.LifeDeck.create = function(deckObject) {

    function LifeDeckObject(deckObject) {
        ClassHelper.extends(this, Pile.create(deckObject));

        var deck = this;
        this.display.descriptionBox = function() {
            var content = "<div class='card-quantity'>Number of cards in life deck: " + deck.currentCards + "</div>";
            
            DBZCCG.descriptionBox(content);
            return content;
        };
     
        this.display.displayName = function() {
            return this.owner() + ' Life Deck';
        }
        
        /* THIS IS THE DEMO CODE */
        var cardList = [];
        for(var i = 0; i < deckObject.number; i++) {
            var card = DBZCCG.Card.generateRandom();
            card.display.turnGameDisplay();
            cardList.push(card);
        }
        
        /*
         * @position - Position of the card on the deck at time of removal (random, top or bottom).
         */
        
        this.getTopCard = function () {
            return cardList.pop();
        };

        this.getRandomCard = function () {
            var random = Math.floor(Math.random() * 1000) % cardList.length ;
            var card = cardList[random];
            cardList.splice(random, 1);
            return card;
        }

        this.getBottomCard = function () {
            return cardList.shift();
        };
        
        /* END OF DEMO CODE */
    }

    return new LifeDeckObject(deckObject || {number: 50});

};