var road,p;
var o1,o2,o3;
var roadImg,pA1,pA2;

var oP1Img,oP2Img;
var oY1Img,oY2Img;
var oR1Img,oR2Img;
var gameOverImg,bell;

var pinkG, yellowG,redG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  roadImg = loadImage("images/Road.png");
  pA1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  pA2= loadAnimation("images/mainPlayer3.png");
  
  oP1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oP2Img = loadAnimation("images/opponent3.png");
  
  oY1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oY2Img = loadAnimation("images/opponent6.png");
  
  oR1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oR2Img = loadAnimation("images/opponent9.png");
  
  bell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
road=createSprite(100,150);
road.addImage(roadImg);
road.velocityX = -5;

//creating boy running
p  = createSprite(70,150);
p.addAnimation("SahilRunning",pA1);
p.scale=0.07;
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkG = new Group();
yellowG = new Group();
redG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   road.velocityX = -(6 + 2*distance/150);
  
   p.y = World.mouseY;
  
   edges= createEdgeSprites();
   p .collide(edges);
  
  //code to reset the background
  if(road.x < 0 ){
    road.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    bell.play();
  }
  
  //creating continous opponent os
  var select_oppO = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppO == 1) {
      pinkCyclists();
    } else if (select_oppO == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkG.isTouching(p)){
     gameState = END;
     o1.velocityY = 0;
     o1.addAnimation("opponentO1",oP2Img);
    }
    
    if(yellowG.isTouching(p)){
      gameState = END;
      o2.velocityY = 0;
      o2.addAnimation("opponentO2",oY2Img);
    }
    
    if(redG.isTouching(p)){
      gameState = END;
      o3.velocityY = 0;
      o3.addAnimation("opponentO3",oR2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    road.velocityX = 0;
    p.velocityY = 0;
    p.addAnimation("SahilRunning",pA2);
  
    pinkG.setVelocityXEach(0);
    pinkG.setLifetimeEach(-1);
  
    yellowG.setVelocityXEach(0);
    yellowG.setLifetimeEach(-1);
  
    redG.setVelocityXEach(0);
    redG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists(){
        o1 =createSprite(1100,Math.round(random(50, 250)));
        o1.scale =0.06;
        o1.velocityX = -(6 + 2*distance/150);
        o1.addAnimation("opponentO1",oP1Img);
        o1.setLifetime=170;
        pinkG.add(o1);
}

function yellowCyclists(){
        o2 =createSprite(1100,Math.round(random(50, 250)));
        o2.scale =0.06;
        o2.velocityX = -(6 + 2*distance/150);
        o2.addAnimation("opponentO2",oY1Img);
        o2.setLifetime=170;
        yellowG.add(o2);
}

function redCyclists(){
        o3 =createSprite(1100,Math.round(random(50, 250)));
        o3.scale =0.06;
        o3.velocityX = -(6 + 2*distance/150);
        o3.addAnimation("opponentO3",oR1Img);
        o3.setLifetime=170;
        redG.add(o3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  p.addAnimation("SahilRunning",pA1);
  
  pinkG.destroyEach();
  yellowG.destroyEach();
  redG.destroyEach();
  
  distance = 0;
}
