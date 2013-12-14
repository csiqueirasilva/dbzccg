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

        this.moveZScouter = function (toPowerStages, dirVector) {

            var southDir = dirVector.clone().normalize();
            var northDir = southDir.clone();
            southDir.multiplyScalar(Card.cardHeight*0.61);
            northDir.multiplyScalar(-1*Card.personalityPowerStageDiff[this.saga][this.powerStageType]['diff']*toPowerStages);
            this.zScouter.position
                        // Move to the "0" power stage
                        .add(southDir)
                        // Raise up any number of power stages in the function parameter
                        .add(northDir);
        }

        this.addZScouter = function (scene, currentPowerStages, dirVector, distanceFromY) {
            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {
                    console.log( item, loaded, total );
            };
            
            var loader = new THREE.JSONLoader(manager);
            var personality = this;
            var eastDir = dirVector.clone().normalize();
            eastDir.multiplyScalar(Card.cardWidth*0.95);
            eastDir = MathHelper.rotateVector(eastDir);
            
            loader.load( "model/zscouter.js", function ( geometry ) {
                personality.zScouter = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({ color: 0xFF2233 }));
                personality.zScouter.rotation.y = Math.PI;
                personality.zScouter.rotation.z = Math.PI/2;
  
                personality.zScouter.rotation.y = MathHelper.angleVectors(new THREE.Vector3(0,0,-1), personality.display.position);
                personality.zScouter.position = personality.display.position.clone();
                personality.zScouter.position
                        // Move east, to match the gap in scouter to the power stages
                        .add(eastDir);

                personality.zScouter.position.y += Card.cornerWidth * Card.cardThicknessScale * distanceFromY;

                personality.moveZScouter(currentPowerStages, dirVector);
                
                scene.add(personality.zScouter);
            });
        };

        this.personality = data.personality;
        this.powerStages = data.powerStages;
        this.style = Card.Style.Freestyle;
        this.powerStageType = data.powerStageType || 'regular';
    }
    
    return new PersonalityObject(data);
};