class Form{
    constructor(){
        this.title = createElement("h1");
        this.title.html("Horizontal Hurdles");
        this.title.position(displayWidth/2 - 290, 0);
        this.title.elt.id = "title";

        this.input = createInput();
        this.input.elt.placeholder = "Enter Username";
        this.input.position(displayWidth/2 - 170, displayHeight/2 - 120);
        this.input.elt.id = "name_input";
        
        this.submit = createButton("Play!");
        this.submit.position(this.input.x + 100, this.input.y + 100);
        this.submit.elt.id = "submit";

        this.resetButton = createButton("Reset");
        this.resetButton.position(displayWidth - 100, 20);
        //this.resetButton.hide();

        this.greeting = createElement("h2");
        this.greeting.position(displayWidth/2 - 110, displayHeight/4);
        this.greeting.elt.id = "info";
        this.greeting.hide();

        this.info = createElement("p");
        this.info.position(this.greeting.x - 250, this.greeting.y + 50);
        this.info.html("Please be patient while the others join.<br>You can also invite them by sharing the following link:<br>" + window.location.href);
        this.info.elt.id = "info";
        this.info.hide();
    }
    hide(){
        this.input.hide();
        this.submit.hide();
        this.greeting.hide();
        this.info.hide();
    }
    destroy(){
        this.title.remove();
        this.input.remove();
        this.submit.remove();
        this.greeting.remove();
        this.info.remove();
    }
    display(){
        this.submit.mousePressed(()=>{
            playerCount+=1;
            player.index = playerCount;
            player.name = this.input.value();
            player.update();
            player.updateCount(playerCount);
            
            this.input.hide();
            this.submit.hide();

            this.title.position(displayWidth/2 - 140, -10);
            this.title.elt.id = "title_small";

            this.greeting.html("Hello " + player.name + "!");
            this.greeting.show();
            this.info.show();
        })

        this.resetButton.mousePressed(()=>{
            game.update(0);
            player.updateCount(0);
            database.ref("Players").remove();
            Player.updatePlayersAtEnd(0);
        })
    }
}