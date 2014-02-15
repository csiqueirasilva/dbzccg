DBZCCG.LifeDeck = {};

DBZCCG.LifeDeck.minimumSize = 50;
DBZCCG.LifeDeck.maximumSize = 85;
DBZCCG.LifeDeck.namekianMaximumSize = 90;

DBZCCG.LifeDeck.create = function(deckObject) {

    function LifeDeckObject(deckObject) {

        var cardList = [];
        if(!deckObject.number) {
            /* THIS IS THE DEMO CODE */
            var allowedCards = 
                    ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010',
                '011', '012', '013', '014', '015', '016', '017', '018', '019', '020', 
                '021', '022', '023', '024', '025', '026', '027', '028', '029',
                '044', '046', '051', '055', '099'];

            while(cardList.length < DBZCCG.LifeDeck.maximumSize) {
                var idx = Math.floor((Math.random()*1000)) % allowedCards.length;

                var count = 0;
                for(var i = 0; i < cardList.length; i++) {
                    if(cardList[i].number === allowedCards[idx]) {
                        count++;
                    }
                }

                if(count === 3) {
                    allowedCards.splice(idx, 1);
                } else {
                    var cardData = DBZCCG.Saiyan[allowedCards[idx]];
                    if(cardData.limit !== count) {
                        card = DBZCCG.Card.createCard(cardData);
                        card.display.turnGameDisplay();
                        cardList.push(card);
                    } else {
                        allowedCards.splice(idx, 1);                        
                    }
                }
            }

            deckObject.number = cardList.length;
            deckObject.cards = cardList;

            /* End of demo code */
        }
        
        ClassHelper.extends(this, DBZCCG.Pile.create(deckObject));

        var deck = this;

        this.display.descriptionBox = function() {
            var content = "<div class='card-quantity'>"+this.displayName()+ "</div>";
            
            DBZCCG.descriptionBox(content);
            return content;
        };
     
        this.display.displayName = function() {
            return this.owner() + ' Life Deck';
        };
        
        this.getRandomCard = function () {
            var random = Math.floor(Math.random() * 1000) % cardList.length ;
            var card = cardList[random];
            cardList.splice(random, 1);
            return card;
        }
        
        this.display.name = "Life deck";
    }

    return new LifeDeckObject(deckObject || {});

};