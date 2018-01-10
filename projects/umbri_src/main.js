var
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSounds: true,
    playMusic: true,
    wrap: false,
    hard: false
  },
  musicPlayer;

Main.prototype = {
	preload: function(){
		game.stage.backgroundColor = '#535353';
		game.renderer.renderSession.roundPixels = true;  
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas) 

		game.load.bitmapFont('font', 'font.png', 'font.fnt');

		game.load.script('Easy', 'easy.js');
		game.load.script('Death', 'death.js');
		game.load.script('Hard', 'hard.js');
		game.load.script('Options', 'options.js')

		game.load.image('player','player.png');
		game.load.image('enemy', 'enemy.png');
		game.load.image('wall_tall', 'wall_tall.png');
		game.load.image('wall_wide', 'wall_wide.png');
		game.load.image('food', 'food.png');

		game.load.audio('title_music', 'title.wav');
		game.load.audio('hit', 'hit.wav');
		game.load.audio('blip', 'blip.wav');
	},

	create: function(){
		var title = game.add.bitmapText(20, 20, 'font', 'UMBRI', 40);
		var easy_mode = game.add.bitmapText(60, 100, 'font', 'EASY MODE', 30);
		var hard_mode = game.add.bitmapText(60, 170, 'font', 'HARD MODE', 30);
		var options = game.add.bitmapText(60, 240, 'font', 'OPTIONS', 30);

		var credits = game.add.bitmapText(game.world.centerX, 550, 'font', 'This game produced by: TOTALLY NOT ROBOTS', 15);
		credits.anchor.setTo(0.5, 0);

		easy_mode.inputEnabled = true;
		hard_mode.inputEnabled = true;
		options.inputEnabled = true;

		game.state.add('Easy', Easy);
		game.state.add('Hard', Hard);
		game.state.add('Death', Death);
		game.state.add('Options', Options);

		//add sound effects
		blip = game.add.audio('blip');
		hit = game.add.audio('hit');

		music = game.add.audio('title_music');
    	music.loop = true;
    	if(gameOptions.playMusic && !music.isPlaying){
    		music.play();
    	}
		
		easy_mode.events.onInputUp.add(function() {
			game.state.start('Easy');
		});

		hard_mode.events.onInputUp.add(function() {
			gameOptions.hard = true;
			game.state.start('Hard');
		});

		options.events.onInputUp.add(function() {
			game.state.start('Options');
		});
	}
};

game.state.add('Main', Main);
game.state.start('Main');
