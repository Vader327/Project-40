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

        shouldMove = true;
        overPos = null;

        player1 = createSprite(100,100,30,30);
        player1.addAnimation("animation1", running1);
        player1.addAnimation("over1", stop1);
        player1.scale = 0.2;
        player1.setCollider("rectangle",0,0,200,280);

        player2 = createSprite(100,200,30,30);
        player2.addAnimation("animation2", running2);
        player2.addAnimation("over2", stop2);
        player2.scale = 0.3;
        player2.setCollider("rectangle",0,0,120,180);

        player3 = createSprite(100,300,30,30);
        player3.addAnimation("animation3", running3);
        player3.addAnimation("over3", stop3);
        player3.scale = 0.2;
        player3.setCollider("rectangle",0,0,200,280);

        player4 = createSprite(100,400,30,30);
        player4.addAnimation("animation4", running4);
        player4.addAnimation("over4", stop4);
        player4.scale = 0.2;
        player4.setCollider("rectangle",0,0,200,280);

        players = [player1,player2,player3,player4];

        for(var i = 1700; i < 5300; i += 300){
            obs1 = createSprite(i,200,10,50);
            obs1.addImage("hurdle", hurdleIMG);
            obs1.scale = 0.2;
            obs1.setCollider("rectangle",120,20,30,310);

            obs2 = createSprite(i,340,10,50);
            obs2.addImage("hurdle", hurdleIMG);
            obs2.scale = 0.2;
            obs2.setCollider("rectangle",120,20,30,310);

            obs3 = createSprite(i,480,10,50);
            obs3.addImage("hurdle", hurdleIMG);
            obs3.scale = 0.2;
            obs3.setCollider("rectangle",120,20,30,310);

            obs4 = createSprite(i,620,10,50);
            obs4.addImage("hurdle", hurdleIMG);
            obs4.scale = 0.2;
            obs4.setCollider("rectangle",120,20,30,310);

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
        scoreboard1.style("color","#41e3ff");
        scoreboard2.style("color","#41e3ff");
        scoreboard3.style("color","#41e3ff");
        scoreboard4.style("color","#41e3ff");

        over = createElement("h3");
        over.elt.id = "over";
        over.position(displayWidth/2 - 150, displayHeight/2 - 300);
        over.html("Game Over!");
        over.hide();

        rankText = createElement("p");
        rankText.elt.id = "over";
        rankText.position(displayWidth/2 - 40, displayHeight/2 - 170);
        rankText.style("font-size", "25px");
        rankText.hide();

        restart = createButton("Play Again");
        restart.elt.id = "restart";
        restart.position(over.x + 80, over.y + 200);
        restart.hide();
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
            image(bg, 0, 70, displayWidth*5, displayHeight - 150);

            index = 0;
            x = 0;
            y = 60;

            for(player_index in allPlayers){
                index+=1;
                x = displayWidth + allPlayers[player_index].distance;
                y += 140;
                
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
                    fill("red");
                    ellipse(x, players[index - 1].y, 40, 40);
                    camera.position.x = players[index - 1].x;
                    camera.position.y = displayHeight/2;

                    if(player_index === "player1"){
                        scoreboard1.style("color","#ff9c1c");
                        if(shouldMove === false){
                            players[index - 1].changeAnimation("over1", stop1);
                        }
                    }
                    if(player_index === "player2"){
                        scoreboard2.style("color","#ff9c1c");
                        if(shouldMove === false){
                            players[index - 1].changeAnimation("over2", stop2);
                        }
                    }
                    if(player_index === "player3"){
                        scoreboard3.style("color","#ff9c1c");
                        if(shouldMove === false){
                            players[index - 1].changeAnimation("over3", stop3);
                        }
                    }
                    if(player_index === "player4"){
                        scoreboard4.style("color","#ff9c1c");
                        if(shouldMove === false){
                            players[index - 1].changeAnimation("over4", stop4);
                        }
                    }

                    for(i of obs){
                        if(players[index - 1].isTouching(i)){
                            shouldMove = false;
                            overPos = players[index - 1].x + 15;
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
            overPos = 5230;
        }

        if(shouldMove === false){
            if(player.distance < 3850){
                over.show();
                restart.show();
            }
            if(player.distance > 3850){
                over.position(displayWidth/2 - 130, displayHeight/2 - 300);
                over.html("You Won!");
                rankText.html("Rank: " + rank);

                over.show();
                rankText.show();
                restart.show();
            }
        }

        restart.mousePressed(()=>{
            clear();
            gameState = 0;
            player.distance = 0;

            over.remove();
            rankText.remove();
            restart.remove();
            scoreboard1.remove();
            scoreboard2.remove();
            scoreboard3.remove();
            scoreboard4.remove();

            form.title.position(displayWidth/2 - 290, 0);
            form.title.elt.id = "title";
            form.destroy();

            playerCount-=1;
            player.updateCount(playerCount);
            console.log(allPlayers);

            player1.destroy();
            player2.destroy();
            player3.destroy();
            player4.destroy();

            for(i of obs){
                i.destroy();
            }
            obs = [];

            if(playerCount === 0){
                game.update(0);
                allPlayers = [];
                Player.updatePlayersAtEnd(0);
                //database.ref("Players/player" + player.index).remove();
                database.ref("Players").remove();
            }

            index = 0;
            x = 0;
            y = 60;
            init_pos = null;
            initialized = false;

            game.start();
        })

        drawSprites();

        if(overPos !== null){
            stroke("orange");
            strokeWeight(5);
            fill("#4eb5f1");
            rectMode(CENTER);
            rect(overPos, (displayHeight/2 - 70), 400, 250, 2);
        }
    }
}