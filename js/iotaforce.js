var score, bootState, loadState, titleState, playState, endState, game;

score = 0;

bootState = {
    create: function() {
        'use strict';

        // Load physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};

loadState = {
    preload: function() {
        'use strict';
        var loadLbl;

        loadLbl = game.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'});
        
        // Load images
        game.load.tilemap('world1', 'assets/world1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/worldTiles.png');
        game.load.image('player', 'assets/circle-red.png');

        // Load sound effects
    },
    create: function() {
        'use strict';
        game.state.start('title');
    }
};

titleState = {
    create: function() {
        'use strict';
        var nameLbl, startLbl, wKey;

        nameLbl = game.add.text(80, 160, 'IOTA FORCE',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = game.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start, this);
    },
    start: function() {
        'use strict';
        game.state.start('play');
    }
};

playState = {
    create: function() {
        'use strict';

        this.keyboard = game.input.keyboard;

        // Map
        this.map = game.add.tilemap('world1');
        this.map.addTilesetImage('worldTiles', 'tiles');
        this.backgroundLayer = this.map.createLayer(0);
        this.backgroundLayer.resizeWorld();
        
        // Player
        this.player = game.add.sprite(150, game.world.height - 150, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.playerSpeed = 300;

        game.physics.arcade.enable(this.player);
        game.camera.follow(this.player);

        // Controls
        this.cursors = game.input.keyboard.addKeys({
            'up': Phaser.Keyboard.W,
            'down': Phaser.Keyboard.S,
            'left': Phaser.Keyboard.A,
            'right': Phaser.Keyboard.D,
            'interact': Phaser.Keyboard.SPACEBAR
        });
    },
    update: function() {
        'use strict';

        game.physics.arcade.collide(this.player, this.walls);
        // game.physics.arcade.collide(this.enemies, this.walls);
        // game.physics.arcade.overlap(this.player, this.enemies,
        //                             this.end, null, this);
        
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.playerSpeed;
        }
        else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.playerSpeed;
        }
        else if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.playerSpeed;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.playerSpeed;
        }

        if (this.cursors.interact.isDown) {
            this.interact();
        }
    },
    interact: function() {
        'use strict';

    },
    end: function() {
        'use strict';
        game.state.start('end');
    }
};

endState = {
    create: function() {
        'use strict';
        var scoreLbl, nameLbl, startLbl, wKey;

        scoreLbl = game.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'});
        nameLbl = game.add.text(80, 160, 'YOU WIN',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = game.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        'use strict';
        game.state.start('title');
    }
};


game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-div');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('play', playState);
game.state.add('end', endState);

game.state.start('boot');
