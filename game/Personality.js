Personality = {};

Personality.GOKU = 1;
Personality.NAPPA = 2;
Personality.VEGETA = 3;
Personality.RADITZ = 4;
Personality.PICCOLO = 5;
Personality.CHIAOTZU = 6;
Personality.TIEN = 7;
Personality.KRILLIN = 8;
Personality.GOHAN = 9;
Personality.YAMCHA = 10;
Personality.YAJIROBI = 11;
Personality.BULMA = 12;
Personality.CHICHI = 13;

Personality.SaiyanHeritage = [Personality.GOKU, Personality.NAPPA, Personality.VEGETA, Personality.RADITZ, Personality.GOHAN];
Personality.NamekianHeritage = [Personality.PICCOLO];

Personality.create = function (data) {
    
    function PersonalityObject(data) {
        card = Card.create(data);
        
        for(var key in card) {
            this[key] = card[key];
        }

        this.personality = data.personality;
        this.powerStages = data.powerStages;
        this.style = Card.Style.Freestyle;
    }
    
    return new PersonalityObject(data);
};