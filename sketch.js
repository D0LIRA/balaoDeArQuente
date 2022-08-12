var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var bird;
var blue_build;
var red_build;
var light_pole;
var blue_balloon;
var obsBottom;
var bottomObsGroup;
var obsTop;
var topObsGroup;
var PLAY = 1;
var END =  0;
var gameState = PLAY;
var gameOver;
var gameOverImg;
var restart;
var restartImg;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

bird = loadImage("assets/obsTop2.png")

blue_build = loadImage("assets/obsBottom3.png")

red_build = loadImage("assets/obsBottom1.png")

light_pole = loadImage("assets/obsBottom2.png")

blue_balloon = loadImage("assets/obsTop1.png")

gameOverImg = loadImage("assets/fimdejogo.png");

restartImg = loadImage("assets/restart.png");
}


function setup(){

//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//criando canto superior e inferior
bottomGround = createSprite(200,407,800,1);
bottomGround.visible = true;


topGround = createSprite(200,-1,800,1);
topGround.visible = true;
      
//criando o balão     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.15;

bottomObsGroup = new Group();
topObsGroup = new Group();

gameOver = createSprite(200,150);
gameOver.addImage(gameOverImg);
restart = createSprite(200,250);
restart.addImage(restartImg);
restart.scale = 0.9;

}

function draw() {
  
  background("black");
  
  if(gameState == PLAY){

    restart.visible = false;
    gameOver.visible = false;

    if(keyDown("space")) {
      balloon.velocityY = -4 ;          
    }

    balloon.velocityY = balloon.velocityY + 1;

    spawnObstaclesBottom();  
    spawnObstaclesTop()

    if(balloon.isTouching(topGround) || balloon.isTouching(bottomGround) || 
       topObsGroup.isTouching(balloon) || bottomObsGroup.isTouching(balloon)){

        gameState = END;
       }

    console.log(gameState);

    bottomObsGroup.setLifetimeEach(-1);
  }

  if(gameState == END){
    restart.visible = true;
    gameOver.visible = true;
    balloon.velocityY = balloon.velocityY+1
    topObsGroup.setVelocityXEach(-1);
    bottomObsGroup.setVelocityXEach(0);
    topObsGroup.setLifetimeEach(550);
  }
    //fazendo o balão de ar quente pular
  

    //adicionando gravidade
  
   

   
  balloon.collide(bottomGround); 
  drawSprites();

  console.log(gameState); 
}

function spawnObstaclesBottom(){
  if(frameCount%110 == 0){
    obsBottom = createSprite(420,337,1,1)
    obsBottom.addImage(red_build);
    obsBottom.velocityX = -2;
    obsBottom.scale = 0.07;
    balloon.depth+=1
    obsBottom.lifetime = 230;
    var rand = round(random(1,3))
    switch (rand) {
      case 1: obsBottom.addImage(red_build)
              break;
      case 2: obsBottom.addImage(light_pole)
              break;
      case 3: obsBottom.addImage(blue_build)
              break;
      default:
        break;
    }
    bottomObsGroup.add(obsBottom);
  }
}

function spawnObstaclesTop(){
  if(frameCount%90 == 0){
    obsTop = createSprite(450,round(random(20,200)),1,1)
    obsTop.addImage(bird);
    obsTop.velocityX = -4;
    obsTop.scale = 0.08;
    balloon.depth+=1
    obsTop.lifetime = 230;
    var rand = round(random(1,3))
    switch (rand) {
      case 1: obsTop.addImage(bird)
              break;
      case 2: obsTop.addImage(blue_balloon)
              break;
      default:
        break;
    }
    topObsGroup.add(obsTop);
  }
}