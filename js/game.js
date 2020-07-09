class Game{
    constructor(){
    }

    getState(){
        var getStateREF = database.ref("gameState").on("value",function(data){
            gameState = data.val();
        });
    }

    update(state){
        database.ref("/").update({
            gameState : state
        })
    }

    start(){
        if(gameState === 0){
            player = new Player();
            player.getCount();

            form = new Form();
            form.display();
        }

        player1 = createSprite(100,100,30,30);
        player2 = createSprite(100,200,30,30);
        player3 = createSprite(100,300,30,30);
        player4 = createSprite(100,400,30,30);
        players = [player1,player2,player3,player4];

        for(var i = 1700; i < 5300; i += 300){
            obs1 = createSprite(i,210,10,50);
            obs2 = createSprite(i,330,10,50);
            obs3 = createSprite(i,450,10,50);
            obs4 = createSprite(i,570,10,50);
            obs.push(obs1,obs2,obs3,obs4);
        }

        scoreboard1 = createElement("p");
        scoreboard2 = createElement("p");
        scoreboard3 = createElement("p");
        scoreboard4 = createElement("p");
        scoreboard1.position(60,10);
        scoreboard2.position(60,30);
        scoreboard3.position(60,50);
        scoreboard4.position(60,70);
        scoreboard1.elt.id = "scoreboard";
        scoreboard2.elt.id = "scoreboard";
        scoreboard3.elt.id = "scoreboard";
        scoreboard4.elt.id = "scoreboard";
        scoreboard1.style("color","rgb(0, 150, 196)");
        scoreboard2.style("color","rgb(0, 150, 196)");
        scoreboard3.style("color","rgb(0, 150, 196)");
        scoreboard4.style("color","rgb(0, 150, 196)");
    }

    play(){
        form.hide();
        fill("rgb(0, 150, 196)");
        textSize(50);
        textFont("Impact");
        text("GO!", 1000, 400);

        Player.getPlayerInfo();
        player.getPlayersAtEnd();

        if(allPlayers != undefined && gameState === 1){
            index = 0;
            x = 0;
            y = 100;

            for(player_index in allPlayers){
                index+=1;
                x = displayWidth + allPlayers[player_index].distance;
                y += 120;
                
                if(player_index === "player1"){
                    scoreboard1.html(allPlayers[player_index].name + ": " + allPlayers[player_index].distance);
                }
                if(player_index === "player2"){
                    scoreboard2.html(allPlayers[player_index].name + ": " + allPlayers[player_index].distance);
                }
                if(player_index === "player3"){
                    scoreboard3.html(allPlayers[player_index].name + ": " + allPlayers[player_index].distance);
                }
                if(player_index === "player4"){
                    scoreboard4.html(allPlayers[player_index].name + ": " + allPlayers[player_index].distance);
                }

                players[index - 1].x = x;
                if(jumped === false){players[index - 1].y = y}

                if(index === player.index){
                    if(initialized === false){
                        init_pos = players[index - 1].y
                        initialized = true;
                    }

                    players[index - 1].shapeColor = "red";
                    camera.position.x = players[index - 1].x;
                    camera.position.y = displayHeight/2;

                    if(player_index === "player1"){
                        scoreboard1.style("color","red");
                    }
                    if(player_index === "player2"){
                        scoreboard2.style("color","red");
                    }
                    if(player_index === "player3"){
                        scoreboard3.style("color","red");
                    }
                    if(player_index === "player4"){
                        scoreboard4.style("color","red");
                    }

                    for(i of obs){
                        if(players[index - 1].isTouching(i)){
                            shouldMove = false;
                        }
                    }

                    if(keyWentDown("space") || keyWentDown(UP_ARROW) && players[index - 1].y > init_pos - 80 && shouldMove === true){
                        jumped = true;
                    }

                    if(shouldMove === true && jumped === true){
                        if(players[index - 1].y > init_pos - 80 && inAir === false){
                            players[index - 1].y -= 10;
                        }
                        if(players[index - 1].y === init_pos - 80){
                           inAir = true;
                        }
                        if(inAir === true){
                            players[index - 1].y += 5;
                         }
                        if(players[index - 1].y === init_pos){
                            jumped = false;
                            inAir = false;
                        }
                    }
                }
            }
        }

        if(keyDown(RIGHT_ARROW) && player.index != null && shouldMove === true){
            player.distance+=10;
            player.update();
        }

        if(player.distance === 3860){
            player.distance = 3861;
            shouldMove = false;
            player.rank += 1;
            Player.updatePlayersAtEnd(player.rank);

            rank = player.rank;

        }
        if(player.distance === 3861){
            text("You Won!", 5500, 350);
            text("Rank: " + rank, 5525, 450);
        }

        if(shouldMove === false){
            console.log("Game Over!");
        }

        drawSprites();
    }
}