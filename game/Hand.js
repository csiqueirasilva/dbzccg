DBZCCG.Hand = {};

DBZCCG.Hand.create = function (hand) {
    function handObject (hand) {
        this.addToField = function (field, position, direction) {
            for(var i = 0; i < this.cards.length; i++) {
                // new THREE.Vector3(0,0,-1) is the starting position of the card
                this.cards[i].display.position.x = -this.cards.length*(DBZCCG.Card.cardWidth)/2 + i*(DBZCCG.Card.cardWidth) + DBZCCG.Card.cardWidth/2 ;
                this.display.add(this.cards[i].display);
            }
            
            this.display.rotation.y = MathHelper.angleVectors(direction, new THREE.Vector3(0,0,-1));
            if(this.display.position.y == 0 && this.display.position.z == 0) {
                this.display.position.copy(position.clone().normalize().multiplyScalar(DBZCCG.Player.Field.Height));
                this.display.position.y = 5;
            }
            
            field.add(this.display);
        }

        this.display = new THREE.Object3D();
        DBZCCG.objects.push(this.display);
        this.cards = hand;
    }
    
    return new handObject(hand || [DBZCCG.Card.generateRandom(), DBZCCG.Card.generateRandom(), DBZCCG.Card.generateRandom()]);
};