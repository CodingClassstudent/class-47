var PLAY = 1
var END = 0
var WIN = 2
var gameState = PLAY

var trex, trex_running, trex_collided
var jungle, invisiblejungle

var obstaclesGroup, obstacle1

var score=0

var gameOver, restart
function preload() {
  person = loadImage("./assests/personrunning.png")
  zombie = loadImage("./assests/whaa-dead-ahead-zombie-warfare.gif")
  gameOver  = loadImage("./assests/gameOver.png")
  restart  = loadImage("./assests/restartbutton.png")

}

    function setup() {
    createCanvas(800, 400);
  
    jungle = createSprite(400,100,400,20);
    jungle.addImage("jungle",jungleImage);
    jungle.scale=0.3
    jungle.x = width /2;
  
    person = createSprite(50,200,20,50);
    person.addAnimation("running", person_running);
    person.addAnimation("collided", person_collided);
    person.scale = 0.15;
    person.setCollider("circle",0,0,300)
    zombie = createSprite(50,200,20,50);
    zombie.addAnimation("running", person_running);
   zombie.addAnimation("collided", person_collided);
    zombie.scale = 0.15;
    zombie.setCollider("circle",0,0,300)
      
    invisibleGround = createSprite(400,350,1600,10);
    invisibleGround.visible = false;
  
    gameOver = createSprite(400,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(550,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.1;
  
    gameOver.visible = false;
    restart.visible = false;
    
    
   
    
    score = 0;
  
  }


function draw() {
  background(backgroundImage);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




function draw() {
  background(255);
  
  person.x=camera.position.x-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(person.y)
    if(keyDown("space")&& person.y>270) {
      jumpSound.play();
      person.velocityY = -16;
    }
  
    person.velocityY = person.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

   person.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(person)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(person)){
      score = score + 1;
      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    person.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

   person.changeAnimation("collided",person_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }

  else if (gameState === WIN) {
    jungle.velocityX = 0;
    person.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    person.changeAnimation("collided",person_collided);

    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);
  
  if(score >= 5){
    person.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Congragulations!! You win the game!! ", 70,200);
    gameState = WIN;
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  person.visible = true;
  person.changeAnimation("running",
               person_running);
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();
  score = 0;
}