var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground;

var banana, bananaImage,bananasGroup;
var obstacle,obstacleImage,obstaclesGroup;

var score;

function preload(){
   monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 200);

   monkey = createSprite(50,160,20,50);
   monkey.addAnimation("running", monkey_running);
   monkey.scale = 0.075;
  
  ground = createSprite(300,180,2000,20);
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  score = 0;
  
}

function draw() {
  
  background(180);
  
  text("Score: "+ score, 200,50);
  
    score = score + Math.round(getFrameRate()/60);
  
   if(gameState === PLAY){
   
    if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
  
  spawnBananas();
  spawnObstacles()
   }
    if(obstaclesGroup.isTouching(monkey)){
     
       gameState = END;
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
      
    }

  monkey.collide(ground);
          
  drawSprites();

}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,155,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("obtacleimage",obstacleImage );         
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   
   obstacle.setCollider("rectangle",0,0,450,450);
  // obstacle.debug = true
   
    obstaclesGroup.add(obstacle);
   
 }
}

function spawnBananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.075;
    banana.velocityX = -3;
 
    banana.lifetime = 200;

    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
    bananasGroup.add(banana);
   
  }
}
