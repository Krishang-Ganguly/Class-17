
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,ground
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1;
  
  ground = createSprite(400,380,900,10);
   ground.velocityX = -4
  ground.x = ground.width /2;
  

  
  
  
  //create Obstacle and Cloud Groups
  obstacleGroup = new Group();
  FoodGroup = new Group();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  score = 0;
  
  
}

function draw() {
  
  background(255);
  //displaying score
  stroke("black");
  textSize(20);
   score = Math.ceil(frameCount/frameRate());
    
  text("Survival Time: "+ score, 100,50);
  


    
   
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 340) {
        monkey.velocityY = -12;
  }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
 
      
     
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
     
    
  
 
  //stop trex from falling down
  monkey.collide(ground);
  
  


  drawSprites();
}


function spawnObstacles(){
 if (frameCount%300===0){
   var obstacle = createSprite(600,350,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}