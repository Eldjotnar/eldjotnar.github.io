var Easy = function(game) {};

var topMargin = 70;
var foodPos = new Array;
var score = 0; 
var tickCount = 0;
var foodPos = new Array;
var ate = false;
var loopTimer = 1000/4;
var highScore;

Easy.prototype = {
	randPos: function(object) {
		//NOTE: numbers come from field dimensions
		//generate random y and round
		var y = Math.floor(Math.random() * (540 - 80)) + 80;
		y = Math.round(y/pheight)*pheight - 20;

		//generate random x and round
		var x = Math.floor(Math.random() * (760 - 20)) + 20;
		x = Math.round(x/pwidth)*pwidth - 20;

		//set positions
		object.position.x = x;
		object.position.y = y;
	},

	getKeys: function() {
		if(cursors.left.isDown){
			direction = Phaser.LEFT;
		} else if(cursors.right.isDown){
			direction = Phaser.RIGHT;
		} else if(cursors.up.isDown){
			direction = Phaser.UP;
		} else if(cursors.down.isDown) {
			direction = Phaser.DOWN;
		}
	},

	hitSomething: function(player, walls) {
		if(gameOptions.wrap){
			if(player.position.x == 780){
				player.position.x = 20;
			} else if(player.position.x == -20){
				player.position.x = 740;
			} else if(player.position.y == 30){
				player.position.y = 530;
			} else if(player.position.y == 580){
				player.position.y = 80;
			} else {
				if(gameOptions.playSounds){hit.play();}
				game.time.events.paused = true;
				player.kill();
				if(score > highScore || highScore == undefined){
					highScore = score;
				}
				game.state.start('Death');
			}
		} else {
			if(gameOptions.playSounds){hit.play();}
			game.time.events.paused = true;
			player.kill();
			if(score > highScore || highScore == undefined){
				highScore = score;
			}
			game.state.start('Death');
		}
	},

	movePlayer: function() {
		tickCount++;
		switch(direction){
			case Phaser.RIGHT:
				player.position.x += pwidth;
				break;
			case Phaser.LEFT:
				player.position.x -= pwidth;
				break;
			case Phaser.UP:
				player.position.y -= pheight;
				break;
			case Phaser.DOWN:
				player.position.y += pheight;
		}
	},

	ateFood: function() {
		ate = true;
		if(gameOptions.playSounds){blip.play();}
		if(20-tickCount <= 0){
			score += 1;
		} else {
			score += 20-tickCount;
		}
	
		if(loopTimer > 500){
			loopTimer -= 5;
		}
		game.time.events.removeAll();
		game.time.events.loop(loopTimer, Easy.prototype.movePlayer, this);
	
		scoreText.text = "SCORE: " + score;
		tickCount = 0;
		old_pos = JSON.stringify(food.position);
		
		Easy.prototype.randFood();
		return;
	},

	//a seperate function is needed to allow for recursion
	randFood: function() {
		this.randPos(food);
		for(i = 0; i < foodPos.length; i++){
			if(foodPos[i] === JSON.stringify(food.position)){
				this.randFood();
			}
		}
		foodPos.push(JSON.stringify(food.position));
		return;
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#535353';
		obstacles = game.add.group();

		//create border walls NOTE: fixed dimensions
		walls = game.add.group();
		walls.enableBody = true;
		game.physics.arcade.enable(walls);
		walls.create(10, topMargin,'wall_tall');
		walls.create(10, topMargin,'wall_wide');
		walls.create(780, topMargin,'wall_tall');
		walls.create(10, 580,'wall_wide');

		// ASFDASFDASDFASDFASDFASDFASDF-----------------
		scoreText = game.add.bitmapText(10, 12, 'font', 'SCORE: 0', 30);
		score = 0;

		//begin music
		if (!gameOptions.playMusic) {
      		music.stop();
    	}

		//create food(s)
		food = game.add.sprite(20,80,'food');
	
		//create player
		player = game.add.sprite(20, 80, 'player');
		pwidth = player.width;
		pheight = player.height;

		game.physics.arcade.enable(food);
		game.physics.arcade.enable(player);
		this.randPos(player);
		this.randPos(food);

		foodPos.push(JSON.stringify(food.position));

		//generate starting direction TODO:look for optimization
		var dir = Math.floor(Math.random() * (4 - 1)) + 1;
		switch(dir){
			case 1:
				direction = Phaser.LEFT;
				break;
			case 2:
				direction = Phaser.RIGHT;
				break;
			case 3:
				direction = Phaser.UP;
				break;
			case 4:
				direction = Phaser.DOWN;
		}

		//setup input and timer
		cursors = game.input.keyboard.createCursorKeys();
		game.time.events.loop(loopTimer, this.movePlayer, this);
		game.time.events.paused = false;
	},

	update: function(){
		game.physics.arcade.collide(player, walls, this.hitSomething);
		game.physics.arcade.collide(player, food, this.ateFood);
	
		if(ate && JSON.stringify(player.position) != old_pos){
			walls.create(player.previousPosition.x, player.previousPosition.y, 'player');
			ate = false;
		}

		this.getKeys();
	}
};