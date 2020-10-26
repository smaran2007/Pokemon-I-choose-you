// These are the gamestates.
var PLAY = 1;
var END = 0;
var gameState = 1; 

// to declare objects.
var pokeField;

var pokemon;

var pokeBall;

var ash;

var invisibleBrick;

var pokemonGroup, fighterGroup, ballGroup, ashGroup;

var youWin, gameOver, restart;

// to declare the score and lose points
var score;

var lose = 0;


function preload(){
  // you have preload images which you want to make it appear.
  poke_Field = loadImage("pokemon.jpg");
  
  poke_Ball = loadImage("pokeball-removebg-preview.png");
  
  ash_C = loadImage("ash-removebg-preview.png");
  
  pikachu = loadImage("pikachu-removebg-preview.png");
  charmander = loadImage("charmander-removebg-preview.png");
  squirtle = loadImage("squirtle-removebg-preview.png");
  bulbasaur = loadImage("bulbasaur-removebg-preview.png");
  
  gary_C = loadImage("gary-removebg-preview.png");
  brock_C = loadImage("brock-removebg-preview-removebg-preview.png");
  
  game_over = loadImage("game-removebg-preview.png");
  black_1 = loadImage("balck.jpg");
  restart_1 = loadImage("reset-removebg-preview.png");
  you_win = loadImage("winner-removebg-preview.png");
  
}

function setup() {
  // to create a canvas where you can work.
  createCanvas(748,421);
  
  //these are the declared objects.
  pokeField = createSprite(374,210,508,360);
  pokeField.addImage(poke_Field);
  pokeField.x = pokeField.width/2;
  
  ash = createSprite(80,300,25,100);
  ash.addImage(ash_C);
  ash.scale = 0.3
  
  invisibleBrick = createSprite(106,380,100,10);
  invisibleBrick.visible = false;
  
  youWin = createSprite(374,120);
  youWin.addImage(you_win);
  
  gameOver = createSprite(374,120);
  gameOver.addImage(game_over);
  
  restart = createSprite(374,250);
  restart.addImage(restart_1);
  restart.scale = 0.2;
  
  pokemonGroup = createGroup();
  fighterGroup = createGroup();
  ballGroup = createGroup();
  ashGroup = createGroup();
  
  //give the score a value.
  score = 0;
}

function draw() {
 // give background to the canvas.
  background(poke_Field);
  
 // if condition for gameState PLAY.
  if(gameState === PLAY){
    
 // giving velocity to the background.
    pokeField.velocityX = -3;
    
  //make you win, gameOver and restart invisible
    youWin.visible = false;
    gameOver.visible = false;
    restart.visible = false;
  
    // to make the moving background proper to its lenght wiidth and height.
  if(pokeField.x < 280){
    pokeField.x = pokeField.width /2;
  }
// is touching condition when pokemons touch pokeball the catched score will get increased.
  if(pokemonGroup.isTouching(ballGroup)){
    
    // destroys pokeball and pokemon as to show that it has been catched.
    ballGroup.destroyEach();
    pokemonGroup.destroyEach();
    
    score = score +1;
  }
  //is touching condition when ash touches fighters lose points increases.
  if(fighterGroup.isTouching(ashGroup)){
    lose = lose +1;
  }
  //when space key pressed a pokeball comes out.
  if(keyDown("space")){
    pokeBall();
  }
  //when up arrow key is pressed ash fights with fighters and jump.
  if(keyDown(UP_ARROW)){
    // velocity for jump.
    ash.velocityY = -12;
  } 
    //when catched points reach 35 appears you win.
    if(score === 1){
    
      //makes restart and you win visible
      restart.visible = true;
      youWin.visible = true;
        
      //when mouse is pressed on restart everything starts from first.
      if(mousePressedOver(restart)){
        reset();
      }
      
      //set lifetime to the objects so that they are never destroyed.
    pokemonGroup.setLifetimeEach(-1);
    fighterGroup.setLifetimeEach(-1);
    
    // making velocity of pokemons and fighters '0' as to stop them.
    pokemonGroup.setVelocityXEach(0);
    fighterGroup.setVelocityXEach(0);
    
    // stoping the velocity of background. 
    pokeField.velocityX = 0;
    
    //changing image.
    pokeField.addImage(black_1);
    
    //adjust the depth
    fighterGroup.depth = pokeField.depth;
    pokeField.depth = pokeField.depth +3;
      
    //adjust depth
    pokeField.depth = restart.depth;
    restart.depth = restart.depth +5;
      
    //adjust depth
    pokeField.depth = youWin.depth;
    youWin.depth = youWin.depth +5;
      
      
    }
    
  //when lose points reach 1500 gamestate PLAY turns to gamestate END.
  if(lose === 1500){
    gameState = END;
  }
  // adding gravity to ash when jumped.
  ash.velocityY = ash.velocityY + 0.8
    
  // stop falling from te canvas.
    ash.collide(invisibleBrick);
    
    // calling functions.
      spawnPokemon();
      spawnFighter();
  } 
  //else if condition to gamestate END.
  else if(gameState === END){
    
    //make gameover and restart visible.
    gameOver.visible = true;
    restart.visible = true;
    
    //set lifetime to the objects so that they are never destroyed.
    pokemonGroup.setLifetimeEach(-1);
    fighterGroup.setLifetimeEach(-1);
    
    // making velocity of pokemons and fighters '0' as to stop them.
    pokemonGroup.setVelocityXEach(0);
    fighterGroup.setVelocityXEach(0);
    
    // stoping the velocity of background. 
    pokeField.velocityX = 0;
    
    //changing image.
    pokeField.addImage(black_1);
    
    //adjust the depth
    fighterGroup.depth = pokeField.depth;
    pokeField.depth = pokeField.depth +1;
    
    //adjust the depth.
    pokeField.depth = gameOver.depth;
    gameOver.depth = gameOver.depth +2;
    
    //adjust the depth.
    pokeField.depth = restart.depth;
    restart.depth = restart.depth +2;
    
    // when mouse is pressed on restart icon reset function is called.
    if(mousePressedOver(restart)){
      reset();
    }
    }
  
//make sprites or objects appear.
  drawSprites();
  
  //text related.
  // stroke is used for thickness color.
  stroke("black");
  
  //used to give text size
  textSize(20);
  
  //give color to text.
  fill("black");
  
  //type what you need on the canvas.
  text("Catched: "+score,510,50);
  
  //text related.
  // stroke is used for thickness color.
  stroke("black");
  
  //used to give text size
  textSize(20);
  
  //give color to text.
  fill("black");
  
  //type what you need on the canvas.
  text("Lose: "+lose,50,50);
  
}
//reset function.
function reset(){
  
  //makes gamestate to play.
  gameState = PLAY;
  
  //make gameover and restart invisible
  gameOver.visible = false;
  restart.visible = false;
  
  //destroy fighters and pokemons.
  fighterGroup.destroyEach();
  pokemonGroup.destroyEach();
  
  //changing image to the background.
  pokeField.addImage(poke_Field);
  
  // change the values to '0' from some more values.
  lose = 0;
  score = 0;
}
//pokeball function.
function pokeBall(){
  
  //declaring and creating pokeball.
  var pokeBall = createSprite(200,120);
  
  //adding image to the pokeball.
  pokeBall.addImage(poke_Ball);
  
  //making the pokeball at the needed size.
  pokeBall.scale = 0.1;
  
  //giving velocity to pokeball
  pokeBall.velocityX = 4;
  
  //adding pokeball to ball group.
  ballGroup.add(pokeBall);
}
//creating pokemon function
function spawnPokemon(){
  
  //if condition for framecount.
  // the pokemons appear after every 170 frames.
  if (frameCount % 170 === 0){
    
    //declaring and creating pokemons inside if and framecount condition.
   var pokemon = createSprite(600,120,50,50);
    
    //giving velocity to pokemons.
   pokemon.velocityX = -6;
    
   //random appear for pokemons 1to 4.
    var rand = Math.round(random(1,4));
    
    //switches randomly in 4 types of pokemons.
    switch(rand) {
        //these are the cases of four types of pokemons.
      case 1: pokemon.addImage(pikachu);
              break;
      case 2: pokemon.addImage(charmander);
              break;
      case 3: pokemon.addImage(squirtle);
              break;
      case 4: pokemon.addImage(bulbasaur);
              break;
      default: break;
    }
  //set size to pokemons.
    pokemon.scale = 0.4;
    
    //give lifeTime to avoid memory leaks.
    pokemon.lifetime = 300;
    
    //adding pokemon to pokemon group.
    pokemonGroup.add(pokemon);
 }

}
//creating function fighters.
function spawnFighter(){
  
  //if condition for framecount.
  // the fighters appear after every 250 frames.
  if(frameCount % 250 === 0){
    
    //generate random fighters.
    var fighter = createSprite(510,300,50,80);
    
    //add velocity to fighters.
    fighter.velocityX = -2;
    
    //random appear of fighters between 1 to 2.
    var rand = Math.round(random(1,2));
    
    //switches randomly.
    switch(rand){
        //cases of to types of fighters.
      case 1: fighter.addImage(gary_C);
              break;
      case 2: fighter.addImage(brock_C);
              break;
              default: break;
    }
    // dbugging the fighters.
    fighter.debug = true;
    
    //set colliders according to height width and length.
    fighter.setCollider("rectangle",1,1,1,1);
    
    //set size to fighters
    fighter.scale = 0.2;
    
    //giving lifetime to avoid memory leaks.
    fighter.lifetime = 300;
    
    //ading fighters to fightergroup
    fighterGroup.add(fighter);
    
    //adding ash to ashgroup.
    ashGroup.add(ash);
  }
}
