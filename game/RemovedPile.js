DBZCCG.RemovedPile.RemovedPileObject = function(removedPile, faceUp) {
    DBZCCG.Pile.PileObject.apply(this, arguments);

    var removed = this;
    removed.display.descriptionBox = function() {
        DBZCCG.Interface.browseCardList(removed.cards, 'Number of cards removed from the game: ' + removed.cards.length);
    };

    removed.display.displayName = function() {
        return this.owner() + ' Removed from the game';
    };

    this.display.doNotFocus = true;
    this.display.name = "Removed from the game";
};

DBZCCG.RemovedPile.RemovedPileObject.prototype = Object.create(DBZCCG.Pile.PileObject.prototype);
DBZCCG.RemovedPile.RemovedPileObject.prototype.constructor = DBZCCG.RemovedPile.RemovedPileObject;

DBZCCG.RemovedPile.create = function(removedPile) {
    return new DBZCCG.RemovedPile.RemovedPileObject(removedPile || [], true);
};