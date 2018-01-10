var Options = function(){};

Options.prototype = {
	create: function(){
		var title = game.add.bitmapText(game.world.centerX, 30, 'font', 'GAME OPTIONS', 50);
		title.anchor.setTo(0.5, 0);

		var music_text = game.add.bitmapText(game.world.centerX, 150, 'font', 'MUTE MUSIC', 25);
		music_text.anchor.setTo(0.5, 0);
		var sound = game.add.bitmapText(game.world.centerX, 220, 'font', 'MUTE SOUNDS', 25);
		sound.anchor.setTo(0.5, 0);
		var wrap = game.add.bitmapText(game.world.centerX, 290, 'font', 'ENABLE WRAP', 25);
		wrap.anchor.setTo(0.5, 0);

		//adjusting to current settings
		if(!gameOptions.playMusic){
			music_text.text = "UNMUTE MUSIC";
		}
		if(!gameOptions.playSounds){
			sound.text = "UNMUTE SOUNDS";
		}
		if(gameOptions.wrap){
			wrap.text = "DISABLE WRAP";
		}

		var back = game.add.bitmapText(game.world.centerX, 500, 'font', 'GO BACK', 25);
		back.anchor.setTo(0.5, 0);

		music_text.inputEnabled = true;
		sound.inputEnabled = true;
		wrap.inputEnabled = true;
		back.inputEnabled = true;

		music_text.events.onInputUp.add(function() {
			if(gameOptions.playMusic){
				gameOptions.playMusic = false;
				music_text.text = "UNMUTE MUSIC";
				music.stop();
			} else {
				gameOptions.playMusic = true;
				music_text.text = "MUTE MUSIC";
			}
		});

		sound.events.onInputUp.add(function() {
			if(gameOptions.playSounds){
				gameOptions.playSounds = false;
				sound.text = "UNMUTE SOUNDS";
			} else {
				gameOptions.playSounds = true;
				sound.text = "MUTE SOUNDS"
			}
		});

		wrap.events.onInputUp.add(function() {
			if(gameOptions.wrap){
				gameOptions.wrap = false;
				wrap.text = "ENABLE WRAP";
			} else {
				gameOptions.wrap = true;
				wrap.text = "DISABLE WRAP";
			}
		});

		back.events.onInputUp.add(function() {
			music.stop();
			game.state.start('Main');
		});
	}
};