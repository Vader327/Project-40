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


        obs1 = createSprite(1700,210,10,50);
        obs2 = createSprite(1700,330,10,50);
        obs3 = createSprite(1700,450,10,50);
        obs4 = createSprite(1700,570,10,50);

        obs5 = createSprite(2000,210,10,50);
        obs6 = createSprite(2000,330,10,50);
        obs7 = createSprite(2000,450,10,50);
        obs8 = createSprite(2000,570,10,50);

        obs9 = createSprite(2300,210,10,50);
        obs10 = createSprite(2300,330,10,50);
        obs11 = createSprite(2300,450,10,50);
        obs12 = createSprite(2300,570,10,50);
        
        obs13 = createSprite(2600,210,10,50);
        obs14 = createSprite(2600,330,10,50);
        obs15 = createSprite(2600,450,10,50);
        obs16 = createSprite(2600,570,10,50);

        obs = [obs1,obs2,obs3,obs4,obs5,obs6,obs7,obs8,obs9,obs10,obs11,obs12,obs13,obs14,obs15,obs16];
    }

    play(){
        form.hide();
        textSize(30);
        text("GO!", 1000, 400);

        Player.getPlayerInfo();
        player.getPlayersAtEnd();

        if(allPlayers != undefined && gameState === 1){
            index = 0;
            x = 0;
            y = 100;

            for(var player_index in allPlayers){
                index+=1;
                x = displayWidth + allPlayers[player_index].distance;
                y += 120;

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

                    for(var i of obs){
                        if(players[index - 1].isTouching(i)){
                            shouldMove = false;
                        }
                    }

                    if(keyWentDown(UP_ARROW) && shouldMove === true && players[index - 1].y === init_pos){
                        players[index - 1].y = init_pos - 80;
                        jumped = true;
                    }

                    if(players[index - 1].y !== init_pos && shouldMove === true){
                        players[index - 1].y += 5;
                    }
                }
            }
        }

        if(keyIsDown(RIGHT_ARROW) && player.index != null && shouldMove === true){
            player.distance+=10;
            player.update();
        }

        if(player.distance === 1860){
            player.distance = 1861;
            shouldMove = false;
            player.rank += 1;
            Player.updatePlayersAtEnd(player.rank);
        }
        if(player.distance === 1861){
            text("You Won!", 3500, 350);
            text("Rank: " + player.rank, 3500, 450);
        }

        if(shouldMove === false){
            console.log("Game Over!");
        }

        drawSprites();
    }
}