//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock

var DogImage;

function preload()
{
  //load images here
  DogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,50,100);
  dog.addImage(DogImage);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(color(46,139,87));
  drawSprites();
  //add styles here
  textSize(20);
  stroke("black");
  fill("white");
  text("NOTE: Press UP_ARROW Key Feed Dog Milk",50,30);
  text("Food remaining: " +foodS, 165, 200);
}

function keyPressed(){
  writeStock(foodS);
  dog.addImage(happyDog);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  } 
   
  database.ref('/').update({
    Food : x
  })
}



