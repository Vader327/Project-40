var database;
var form, player, game;
var player1,player2,player3,player4;
var obs1,obs2,obs3,obs4;
var index,x,y;
var init_pos, i, player_end, player_index, rank;
var scoreboard1, scoreboard2, scoreboard3, scoreboard4;
var running1, running2, running3, running4;
var stop1, stop2, stop3, stop4;
var bg, hurdleIMG;
var over, restart, rankText;

var gameState = 0;
var playerCount = 0;

var overPos = null;
var shouldMove = true;
var jumped = false;
var inAir = false;
var initialized = false;

var obs = [];
var players = [];
var allPlayers = [];

function preload(){
  running1 = loadAnimation("runner1/1.png","runner1/2.png","runner1/3.png","runner1/4.png","runner1/5.png","runner1/6.png","runner1/7.png","runner1/8.png","runner1/9.png","runner1/10.png","runner1/11.png");
  running2 = loadAnimation("runner2/1.png","runner2/2.png","runner2/3.png","runner2/4.png","runner2/5.png","runner2/6.png","runner2/7.png","runner2/8.png");
  running3 = loadAnimation("runner3/1.png","runner3/2.png","runner3/3.png","runner3/4.png","runner3/5.png","runner3/6.png","runner3/7.png","runner3/8.png","runner3/9.png","runner3/10.png","runner3/11.png","runner3/12.png","runner3/13.png","runner3/14.png","runner3/15.png");
  running4 = loadAnimation("runner4/1.png","runner4/2.png","runner4/3.png","runner4/4.png","runner4/5.png","runner4/6.png","runner4/7.png","runner4/8.png");
  
  stop1 = loadImage("runner1/11.png");
  stop2 = loadImage("runner2/2.png");
  stop3 = loadImage("runner3/3.png");
  stop4 = loadImage("runner4/3.png");

  bg = loadImage("bg.png");
  hurdleIMG = loadImage("hurdle.png");
}

function setup(){
  createCanvas(displayWidth - 20, displayHeight - 155);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount===4){
    game.update(1);
  }
  if(gameState===1){
    clear();
    game.play();
  }
}