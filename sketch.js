var database;
var gameState = 0;
var playerCount = 0;
var form, player, game;
var allPlayers = [];
var player1,player2,player3,player4;
var players = [];
var index,x,y;
var shouldMove = true;
var jumped = false;
var initialized = false;
var init_pos;
var obs1,obs2,obs3,obs4,obs5,obs6,obs7,obs8,obs9,obs10,obs11,obs12,obs13,obs14,obs15,obs16;
var obs = [];

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