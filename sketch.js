var gameState = "play";
var tower, towerImg;
var door, doorImg, doorsGrp;
var railing, railingImg, railingsGrp;
var ghost, ghostImg;
var invisibleBlock, invisibleBlocksGrp;
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  railingImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  
  doorsGrp = new Group();
  railingsGrp = new Group();
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  invisibleBlocksGrp = new Group();
}

function draw(){
  background(0);
  
  if (gameState === "play"){
  if (tower.y > 400){
    tower.y = 300;
  }
  
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if (railingsGrp.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if (ghost.y > 600 || invisibleBlocksGrp.isTouching(ghost)){
    ghost.destroy();
    gameState = "end";
  }
  
  spawnDoor();
  drawSprites();
  }
  if (gameState === "end"){
    fill("yellow");
    stroke("yellow");
    text("GAME OVER",250,250);
    textSize(30);
  }
}

function spawnDoor(){
  if (frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGrp.add(door);
    
    railing = createSprite(200,10);
    railing.addImage("railing",railingImg);
    railing.x = door.x;
    railing.velocityY = 1;
    railing.lifetime = 800;
    railingsGrp.add(railing);
    
    invisibleBlock = createSprite(200,15,railing.width,2);
    invisibleBlock.x = railing.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.visible = false;
    invisibleBlock.debug = true;
    invisibleBlocksGrp.add(invisibleBlock);
    
    ghost.depth = door.depth; 
    ghost.depth +=1;
  }
}