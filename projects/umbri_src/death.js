var Death = function () {};

Death.prototype = {
	create: function(){
		var title = game.add.bitmapText(game.world.centerX, 30, 'font', 'YOU DIED', 50);
		title.anchor.setTo(0.5, 0);

		var final = game.add.bitmapText(game.world.centerX, 150, 'font', 'FINAL SCORE: ', 25);
		final.text = "FINAL SCORE: " + score;
		final.anchor.setTo(0.5,0);

		var high = game.add.bitmapText(game.world.centerX, 200, 'font', 'HIGH SCORE: ', 25);
		high.text = "HIGH SCORE: " + highScore;
		high.anchor.setTo(0.5,0);

		var restart = game.add.bitmapText(game.world.centerX-200, 500, 'font', 'RESTART', 25);
		var menu = game.add.bitmapText(game.world.centerX+200, 500, 'font', 'MAIN MENU', 25);
		restart.anchor.setTo(0.5,0);
		menu.anchor.setTo(0.5,0);
		menu.inputEnabled = true;
		restart.inputEnabled = true;

		restart.events.onInputUp.add(function() {
			if(gameOptions.hard){
				game.state.start('Hard');
			} else {
				game.state.start('Easy');
			}
		});

		menu.events.onInputUp.add(function() {
			music.stop();
			game.state.start('Main');
		});
	}
};