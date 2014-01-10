DBZCCG.RemovedPile = {};

DBZCCG.RemovedPile.create = function (removedPile) {
    function removedPileObject (removedPile) {
        ClassHelper.extends(this, DBZCCG.DiscardPile.create(removedPile));
        
        var removed = this;
        removed.display.descriptionBox = function() {
            DBZCCG.browseCardList(removed.cards, 'Number of cards removed from the game: ' + removed.cards.length);
        };

        removed.display.displayName = function() {
            return this.owner() + ' Removed from the game';
        };
        
        this.display.name = "Removed pile";
    }
    
    return new removedPileObject(removedPile || {number: 10});
}