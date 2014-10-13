// Object initializer
var DBZCCG = {};

DBZCCG.Album = {};
DBZCCG.Album.reflections = [];

DBZCCG.Worker = {};
DBZCCG.Worker.events = [];
DBZCCG.Load = {};
DBZCCG.Card = {};
DBZCCG.Card.Saga = {};
DBZCCG.Card.Collection = {};
DBZCCG.Card.sourceCardsReference = {};

DBZCCG.Match = {};
DBZCCG.Match.Type = {};

DBZCCG.CardGroup = {};
DBZCCG.Combat = {};
DBZCCG.Combat.Effect = {};
DBZCCG.DiscardPile = {};
DBZCCG.DragonBall = {};
DBZCCG.DragonBall.Type = {};
DBZCCG.Card.FloatingEffect = {};
DBZCCG.Interface = {};
DBZCCG.Interface.cachedCards = {};
DBZCCG.Interface.lastSelectedCards = [];

if(typeof window !== "undefined" && window !== null) { 
    window.InterfaceDBZ = DBZCCG.Interface;
}

DBZCCG.LifeDeck = {};
DBZCCG.Limits = {};
DBZCCG.Log = {};
DBZCCG.Log.Type = {};
DBZCCG.MainPersonality = {};
DBZCCG.Network = {};
DBZCCG.Personality = {};
DBZCCG.Personality.Personalities = {};
DBZCCG.Personality.alignment = {};
DBZCCG.Pile = {};
DBZCCG.Pile.Face = {};
DBZCCG.Player = {};
DBZCCG.Player.Field = {};
DBZCCG.RemovedPile = {};

// sagas
DBZCCG['Collectible Card Game'] = {};
DBZCCG['Collectible Card Game'].Saiyan = {};
DBZCCG['Collectible Card Game'].Saiyan.Foil = {};

// Legacy, should be removed as soon as the work is wrapped into the database
DBZCCG.Saiyan = {};
DBZCCG.Saiyan.Foil = {};
DBZCCG.Frieza = {};
DBZCCG.Frieza.Foil = {};
DBZCCG.General = {};
// End of Legacy

DBZCCG.Screen = {};
DBZCCG.Sound = {};
DBZCCG.Sound.Background = {};
DBZCCG.Table = {};
DBZCCG.Table.Camera = {};
DBZCCG.Chat = {};
DBZCCG.Foil = {};