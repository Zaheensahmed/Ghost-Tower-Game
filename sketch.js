var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  spookySound.loop()
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(0);
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.8
    if(keyDown("left")){
      ghost.x = ghost.x - 3
    }
    if(keyDown("right")){
      ghost.x = ghost.x + 3
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy()
      gameState = "end"
    }
  spawndoors()
    drawSprites()
  }
  if(gameState === "end"){
    textSize(50)
    stroke("white")
    strokeWeight(5)
    fill("blue")
    text("Game Over", 200,250)

  }
  
   
  
}
function spawndoors(){
  if(frameCount % 240 === 0 ){
    door = createSprite(Math.round(random(120, 400)), -50)
    door.addImage(doorImg)
    door.velocityY = 1
    door.lifetime = 700
    doorsGroup.add(door)
    climber = createSprite(door.x, 10)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 700
    climbersGroup.add(climber)
    ghost.depth = door.depth + 1
    invisibleBlock = createSprite(door.x, 15, climber.width, 2)
    invisibleBlock.visible = false
    invisibleBlock.velocityY = 1
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.lifetime = 700
  }

}
