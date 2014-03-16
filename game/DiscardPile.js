DBZCCG.DiscardPile = {};

DBZCCG.DiscardPile.DiscardPileObject = function (discardPile, faceUp, owner) {
    DBZCCG.Pile.PileObject.apply(this, arguments);

    var discard = this;

    discard.display.descriptionBox = function() {
        DBZCCG.Interface.browseCardList(discard.cards, 'Number of cards in discard pile: ' + discard.cards.length);
    };

    discard.display.displayName = function() {
        return this.owner() + ' Discard Pile';
    };

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

    this.display.doNotFocus = true;

    this.firstCardFaceUp();

    this.display.name = "Discard pile";
};

DBZCCG.DiscardPile.DiscardPileObject.prototype = Object.create(DBZCCG.Pile.PileObject.prototype);
DBZCCG.DiscardPile.DiscardPileObject.prototype.constructor = DBZCCG.DiscardPile.DiscardPileObject;

DBZCCG.DiscardPile.create = function(discardPile, owner) {
    return new DBZCCG.DiscardPile.DiscardPileObject(discardPile || {number: 0}, true, owner);
};