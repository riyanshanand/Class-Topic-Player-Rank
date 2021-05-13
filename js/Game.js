class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(carsImg1)
    car2 = createSprite(300,200);
    car2.addImage(carsImg2)
    car3 = createSprite(500,200);
    car3.addImage(carsImg3)
    car4 = createSprite(700,200);
    car4.addImage(carsImg4)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    // to get rank info from database
    player.getRank();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
background("Red")
// to apply track
//image(imagename,x,y,width,height)
image(Track,0,-displayHeight*4,displayWidth,displayHeight*5)


      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 165
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("Red")
          stroke(3)
          ellipse(x,y,70,70)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }

    if(player.distance>4000){
      gameState = 2
      player.Rank += 1
      // updating value in database
      Player.updateRank(player.Rank)
    }
    drawSprites();
  }

  // creatng extra method to end the game
  end(){
    console.log("GAME END")
    console.log("Rank = " + player.Rank)

  }
}
