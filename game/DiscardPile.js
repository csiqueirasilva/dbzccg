DBZCCG.DiscardPile = {};

DBZCCG.DiscardPile.create = function(discardPile) {
    function discardPileObject(discardPile) {
        ClassHelper.extends(this, Pile.create(discardPile, true));

        var discard = this;

        discard.display.descriptionBox = function() {
            DBZCCG.browseCardList(discard.cards, 'Number of cards in discard pile: ' + discard.currentCards);
        };

        discard.display.displayName = function() {
            return this.owner() + ' Discard Pile';
        };

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
            return cardList.shift();
        };

        /* END OF DEMO CODE */
        this.cards = [];

        for (var i = 0; i < discardPile.number; i++) {
            var card = DBZCCG.Card.generateRandom();
            card.display.turnGameDisplay();
            this.cards.push(card);
        }

        this.firstCardFaceUp();
    }

    return new discardPileObject(discardPile || {number: 30});
}