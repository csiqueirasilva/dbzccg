Table = {}

Table.basePlayerDistance = 1;

Table.create = function(extPlayers) {

    function TableObject(extPlayers) {

        this.players = [];

        var unparsedPlayers = [];
        var qttPlayers = extPlayers.length;

        /* Special Case */
        if (qttPlayers == 2) {
            var p1 = {data: extPlayers[0], pos: new THREE.Vector3(0, 0, Table.basePlayerDistance / 2)};
            var p2 = {data: extPlayers[1], pos: new THREE.Vector3(0, 0, -Table.basePlayerDistance / 2)};

            unparsedPlayers.push(p1);
            unparsedPlayers.push(p2);
        } else /* Use the regular polygon law and cosin law to find all position vectors of the 3+ players */ {
            for (var i = 0; i < qttPlayers; i++) {
                var angleBetween = (qttPlayers - 2) * Math.PI / qttPlayers;
                /* Use the regular polygon law and cosin law to find all position vectors of the players */
            }
        }

        for (var i = 0; i < unparsedPlayers.length; i++) {
            this.players.push(Player.create(unparsedPlayers[i].data, unparsedPlayers[i].pos));
        }

    }

    return new TableObject(extPlayers);
};