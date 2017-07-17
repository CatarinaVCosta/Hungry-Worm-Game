var game = new Phaser.Game(500, 650, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update:update});

function preload() {

    game.load.image('worm', 'imagens/worm4.png');
    game.load.image('baddie', 'imagens/fruta2.png');
    game.load.image('arrow', 'imagens/arrow.png');
    game.load.image('wall', 'imagens/wall.png');
    game.load.image('bg', 'imagens/bg2.png');
    game.load.image('pause', 'imagens/pause.png', 50, 5);
    game.load.image('play', 'imagens/play.png');
    game.load.image('bomb', 'imagens/boom.png');
    game.load.image('strawberry', 'imagens/fruta5.png');
    game.load.image('bombworm', 'imagens/bombworm1.png');
    game.load.image('fruta', 'imagens/fruta.png');
    

}

var worm;
var aliens;
var strawberry;
var fruta;
var mouseangle;
var ar;
var cnt;
var s; 
var randY = 0;
var invisWall;
var wall;
var aux;
var fruit_aux;
var bomb;
var cnt=0;
var w = 500, h = 600;
var auxBomb;
var bombworm;

function create() {

    auxBomb=0;

    emitter = game.add.emitter(0, 0, 20);
    emitter.makeParticles('bomb');
    emitter.gravity = 200;

    game.add.tileSprite(0, 0, 500, 650, 'bg');
    game.physics.startSystem(Phaser.Physics.ARCADE);
   	
   	ar = game.add.sprite(250, 600, 'arrow');
    ar.anchor.set(0.5);

    game.physics.enable(ar, Phaser.Physics.ARCADE);
    ar.body.allowRotation = false;

    aliens = game.add.group();
    aliens.enableBody = true;

    strawberry = game.add.group();
    strawberry.enableBody = true;

    fruta = game.add.group();
    fruta.enableBody = true;


    bombworm = game.add.group();
    bombworm.enableBody= true;


    invisWall = game.add.sprite(5,400, 'wall');
    invisWall.scale.x = game.world.width;
    game.physics.enable(invisWall, Phaser.Physics.ARCADE);
    invisWall.body.immovable = true; 
    invisWall.renderable = false;

    wall = game.add.sprite(1,40, 'wall');
    wall.scale.x = game.world.width;
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true; 
    wall.renderable = true;

    for (var i = 0; i < 10; i++)
    {
        var randY; 
        
        do {

            randY = game.world.randomY;


        }while(randY<=40 || randY>=400);

        
        s = aliens.create(game.world.randomX, randY, 'baddie'); 
        s.name = 'alien' + s;
        s.body.collideWorldBounds = true;
        s.body.bounce.setTo(0.8, 0.8);
        //s.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40); 
    
        s2 = strawberry.create(game.world.randomX, randY, 'strawberry'); 
        s2.name = 'strawberry' + s;
        s2.body.collideWorldBounds = true;
        s2.body.bounce.setTo(0.8, 0.8);
        s2.body.immovable=true;
        //s2.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);

        s3 = fruta.create(game.world.randomX, randY, 'fruta'); 
        s3.name = 'fruta' + s;
        s3.body.collideWorldBounds = true;
        s3.body.bounce.setTo(0.8, 0.8);
        s3.body.immovable=true;
        //s3.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);


    }
    


    worm = game.add.sprite(250, 580, 'worm');
    worm.name = 'worm';
    worm.anchor.set(0.5);

    game.physics.enable(worm, Phaser.Physics.ARCADE);

    worm.body.collideWorldBounds = true;
    worm.body.bounce.set(0.8);
    worm.body.allowRotation = true;
    worm.body.immovable = true;

    this.score =0;
    this.labelScore = game.add.text(250, 5, "0",{font: "25px Cambria", fill: "#ffffff"});

    aux = 0;

    pause_label = this.add.button(20, 5, 'pause', this.managePause, this);
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
    
      play = game.add.sprite(200, 250, 'play');
      game.paused = true;
      
    });

    game.input.onDown.add(unpause, self);

}

function unpause(event){

   if(event.x >= 250 && event.x <= 277 && event.y >= 290 && event.y <= 335) {

      play.destroy();
      game.paused = false;
      
      }

    }

function initWorm() {

    worm.kill();
    worm = game.add.sprite(250, 580, 'worm');
    worm.name = 'worm';
    worm.anchor.set(0.5);

    game.physics.enable(worm, Phaser.Physics.ARCADE);

    worm.body.collideWorldBounds = true;
    worm.body.bounce.set(0.8);
    worm.body.allowRotation = true;
    worm.body.immovable = true;

    ar = game.add.sprite(250, 600, 'arrow');
    ar.anchor.set(0.5);

    game.physics.enable(ar, Phaser.Physics.ARCADE);
    ar.body.allowRotation = false;
}



function initExplosion(){
    setTimeout(function() {
        this.bomb = game.add.sprite(worm.x, worm.y, 'bomb');
        this.bomb.name = 'bomb';
        this.bomb.anchor.set(0.5);
    }, 2000);

    //this.bomb.kill();
}

function update() {

  

    this.labelScore.text = this.score;

    game.physics.arcade.collide(aliens, aliens);
    game.physics.arcade.collide(aliens, strawberry);
    game.physics.arcade.collide(aliens,invisWall);
    game.physics.arcade.collide(aliens,wall);
    game.physics.arcade.collide(worm,wall);
    
    game.physics.arcade.collide(strawberry, strawberry);
    game.physics.arcade.collide(strawberry,invisWall);
    game.physics.arcade.collide(strawberry,wall);

    game.physics.arcade.collide(fruta, fruta);
    game.physics.arcade.collide(fruta,invisWall);
    game.physics.arcade.collide(fruta,wall);
    game.physics.arcade.collide(aliens, fruta);
    game.physics.arcade.collide(strawberry, fruta);

    game.physics.arcade.collide(bombworm, fruta);
    game.physics.arcade.collide(bombworm,invisWall);
    game.physics.arcade.collide(bombworm,wall);
    game.physics.arcade.collide(aliens, bombworm);
    game.physics.arcade.collide(strawberry, bombworm);

    ar.rotation = game.physics.arcade.angleToPointer(ar);

    if (game.input.activePointer.isDown && aux == 0)
    {
       game.physics.arcade.moveToPointer(worm, 300);
       ar.kill();
       aux = 1;
    }

    if (worm.y >= 582) {
        initWorm();
        aux = 0;
    }

    if(worm.y <= 582 && worm.y >= 575) {
      if (this.score <= 15 && bombworm.countLiving() == 0) {

        s4 = bombworm.create(game.world.randomX, 40 , 'bombworm'); 
        s4.name = 'bombworm' + s;
        s4.body.collideWorldBounds = true;
        s4.body.bounce.setTo(0.8, 0.8);
        s4.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);
         
    }
}
if(worm.y <= 582 && worm.y >= 575) {

    if (this.score >30 && bombworm.countLiving() <5) {

        for (var i =0; i<3 ; i++){
        s4 = bombworm.create(game.world.randomX, 40 , 'bombworm'); 
        s4.name = 'bombworm' + s;
        s4.body.collideWorldBounds = true;
        s4.body.bounce.setTo(0.8, 0.8);
        s4.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);
    }

    }
}

if(worm.y <= 582 && worm.y >= 575) {
    if (this.score > 15 &&  this.score <= 30 && bombworm.countLiving() <=2) {

        for (var i =0; i<3 ; i++){
        s4 = bombworm.create(game.world.randomX, 40 , 'bombworm'); 
        s4.name = 'bombworm' + s;
        s4.body.collideWorldBounds = true;
        s4.body.bounce.setTo(0.8, 0.8);
        s4.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);
    }
        auxBomb=1;  
}
    }


if(worm.y <= 582 && worm.y >= 575) {
   
  if(aliens.countLiving() + strawberry.countLiving() + fruta.countLiving() < 7 ){

    for (var i = 0; i < 5; i++)
    {
        do {

            randY = game.world.randomY;


        }while(randY<=40 || randY>=400);

        s = aliens.create(game.world.randomX, randY, 'baddie'); 
         
        s.name = 'alien' + s;
        s.body.collideWorldBounds = true;
        s.body.bounce.setTo(0.8, 0.8);
        //s.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40); 

        s2 = aliens.create(game.world.randomX, randY, 'strawberry'); 
        
        s2.name = 'strawberry' + s2;
        s2.body.collideWorldBounds = true;
        s2.body.bounce.setTo(0.8, 0.8);
        //s2.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);

        s3 = fruta.create(game.world.randomX, randY, 'fruta');

        s3.name = 'fruta' + s3;
        s3.body.collideWorldBounds = true;
        s3.body.bounce.setTo(0.8, 0.8);
        //s3.body.velocity.setTo( (10 + Math.random() * 40,  10 + Math.random() * 40) + 40);
       
    }
  }
}  
/**
    if(this.score == 0){
        GameOver();
    } */

    game.physics.arcade.collide(worm, strawberry, collisionStrawberry, null, this);
    game.physics.arcade.collide(worm, fruta, collisionFruit, null, this);
    game.physics.arcade.collide(worm, aliens, collisionRottenFruit, null, this);
    //game.physics.arcade.collide(worm, bombworm, collisionBombFruit, null, this);
    game.physics.arcade.collide(worm, bombworm, collisionBombWorm, null, this);
    //game.physics.arcade.collide(car, aliens, collisionBombFruit, null, this);
    //game.physics.arcade.overlap(this.car, this.A, null, this);

}


function collisionBombWorm(worm, bombworm) {

    bombworm.kill();
    this.score-=5;
   // worm.alpha = 0.2;

    game.add.tween(worm).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true); 


}
function collisionStrawberry(worm, strawberry) {
         
    strawberry.kill();
    this.score += 1;   
    cnt++;
}


function collisionFruit(worm, fruta) {
    
    fruta.kill();
    this.score += 1;   
    cnt++;
}


function collisionRottenFruit(worm, aliens){
    aliens.kill();
    this.score+=1;
  
}
/**
function collisionBombFruit(worm, wormbomb){
    wormbomb.kill();
    this.score-=5;
    
    worm.kill();
    //particleBurst(worm.x, worm.y);
    
    initWorm();
}*/
/**
function restart(){
    game.state.start('main');
}

function GameOver(){
        game.add.bitmapText(150,110,'carrier_command', 'Game Over', 30);
        game.add.bitmapText(50,180,'carrier_command', 'Press Space to Restart', 20);

        var spaceKey = 
           game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
           spaceKey.onDown.add(this.restartGame, this);
        restart();
    
}


function particleBurst(x, y){

        this.emitter.x = x;
        this.emitter.y = y;

        this.emitter.start(true, 2000, null, 20);
    }


*/
