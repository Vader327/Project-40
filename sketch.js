var database;
var form, player, game;
var player1,player2,player3,player4;
var obs1,obs2,obs3,obs4;
var index,x,y;
var init_pos, i;
var scoreboard1, scoreboard2, scoreboard3, scoreboard4;
var player_index, rank;

var gameState = 0;
var playerCount = 0;
var posx = 1700;
var posy = 210;

var shouldMove = true;
var jumped = false;
var inAir = false;
var initialized = false;

var obs = [];
var players = [];
var allPlayers = [];

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