DBZCCG.DiscardPile = {};

DBZCCG.DiscardPile.create = function(discardPile, owner) {
    function discardPileObject(discardPile, owner) {
        ClassHelper.extends(this, DBZCCG.Pile.create(discardPile, true, owner));

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

        this.getTopCard = function() {
            return this.cards[this.cards.length - 1];
        };

        this.getBottomCard = function() {
            return this.cards[0];
        };

        this.firstCardFaceUp();

        this.display.name = "Discard pile";
    }

    return new discardPileObject(discardPile || {number: 0}, owner);
}