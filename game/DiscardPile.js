DBZCCG.DiscardPile = {};

DBZCCG.DiscardPile.create = function(discardPile) {
    function discardPileObject(discardPile) {
        ClassHelper.extends(this, DBZCCG.Pile.create(discardPile, true));

        var discard = this;

        discard.display.descriptionBox = function() {
            DBZCCG.browseCardList(discard.cards, 'Number of cards in discard pile: ' + discard.cards.length);
        };

        discard.display.displayName = function() {
            return this.owner() + ' Discard Pile';
        }

        discard.display.displayObject = function() {
            var lastIndex = this.children.length - 1;
            this.children[lastIndex].leftScreenCallback = this.leftScreenCallback;
            return this.children[lastIndex];
        };

        /* DEMO CODE */

        this.getTopCard = function() {
            return this.cards[this.cards.length - 1];
        };

        this.getRandomCard = function () {
            var random = Math.floor(Math.random() * 1000) % cardList.length ;
            var card = cardList[random];
            cardList.splice(random, 1);
            return card;
        }

        this.getBottomCard = function () {
            return this.cards[0];
        };

        /* END OF DEMO CODE */
        for (var i = 0; i < discardPile.number; i++) {
            var card = DBZCCG.Card.generateRandom();
            card.display.turnGameDisplay();
            this.cards.push(card);
        }

        this.firstCardFaceUp();
        
        this.display.name = "Discard pile";
    }

    return new discardPileObject(discardPile || {number: 30});
}