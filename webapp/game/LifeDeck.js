DBZCCG.LifeDeck.minimumSize = 50;
DBZCCG.LifeDeck.maximumSize = 85;
DBZCCG.LifeDeck.namekianMaximumSize = 90;

DBZCCG.LifeDeck.LifeDeckObject = function(deckObject, faceUp, owner) {
    var cardList = [];

    if (deckObject.length === undefined) {
        /* THIS IS THE DEMO CODE */
        var allowedCards = [];

        for (var i in DBZCCG.Card.sourceCardsReference) {
            if (!isNaN(parseInt(i))) {
                allowedCards.push(i);
            }
        }

        //exceptions
        allowedCards.splice(allowedCards.indexOf('141'), 6);

        var card;
        while (cardList.length < DBZCCG.LifeDeck.maximumSize - 3) {
            var idx = Math.floor((Math.random() * 1000)) % allowedCards.length;

            var count = 0;
            for (var i = 0; i < cardList.length; i++) {
                if (cardList[i].id === allowedCards[idx]) {
                    count++;
                }
            }

            if (count === 3) {
                allowedCards.splice(idx, 1);
            } else {
                var cardData = DBZCCG.Card.sourceCardsReference[allowedCards[idx]];
                
                if (cardData.limit !== count) {
                    card = DBZCCG.Card.createCard({"texturePath":"images/cardimages/CCG/saiyan/" + cardData.number + ".jpg","sourceCard": allowedCards[idx],"foil":null,"alternativeArt":false,"specularMapPath":"images/cardimages/CCG/saiyan/specularmap.jpg","offerTrade":false,"tradeable":false});
                    card.display.turnGameDisplay();
                    cardList.push(card);
                } else {
                    allowedCards.splice(idx, 1);
                }
            }
        }

        deckObject = cardList;
        
        /* End of demo code */
    } else {
        for(var i = 0; i < deckObject.length; i++) {
            deckObject[i] = DBZCCG.Card.createCard(deckObject[i]);
        }
    }

    console.log(deckObject);

    DBZCCG.Pile.PileObject.apply(this, arguments);

    var deck = this;

    this.display.descriptionBox = function() {
        var content = "<div class='card-quantity'>" + this.displayName() + "</div>";

        DBZCCG.descriptionBox(content);
        return content;
    };

    this.display.displayName = function() {
        return this.owner() + ' Life Deck';
    };

    this.getRandomCard = function() {
        var random = Math.floor(Math.random() * 1000) % cardList.length;
        var card = cardList[random];
        cardList.splice(random, 1);
        return card;
    };

    this.display.name = "Life deck";
};

DBZCCG.LifeDeck.LifeDeckObject.prototype = Object.create(DBZCCG.Pile.PileObject.prototype);
DBZCCG.LifeDeck.LifeDeckObject.prototype.constructor = DBZCCG.LifeDeck.LifeDeckObject;

DBZCCG.LifeDeck.create = function(deckObject, owner) {
    return new DBZCCG.LifeDeck.LifeDeckObject(deckObject || {}, false, owner);

};