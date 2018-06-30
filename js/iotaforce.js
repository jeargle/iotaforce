var score, bootScene, loadScene, titleScene, playScene, endScene, game;

score = 0;

bootScene = {
    key: 'boot',
    active: true,
    init: (config) => {
        console.log('[BOOT] init', config);
    },
    preload: () => {
        console.log('[BOOT] preload');
    },
    create: function() {
        'use strict';

        game.scene.start('load');
        game.scene.remove('boot');
    },
    update: () => {
        console.log('[BOOT] update');
    }
};

loadScene = {
    key: 'load',
    renderToTexture: true,
    x: 64,
    y: 64,
    width: 320,
    height: 200,
    init: (config) => {
        console.log('[LOAD] init', config);
    },
    preload: function() {
        'use strict';
        var loadLbl;

        loadLbl = this.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'});

        // Load images
        // game.load.tilemap('world1', 'assets/world1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemapTiledJSON('world1', 'assets/world1.json');
        this.load.image('tiles', 'assets/worldTiles.png');
        this.load.image('player', 'assets/circle-red.png');

        // Load sound effects
    },
    create: function() {
        'use strict';
        game.scene.start('title');
        game.scene.remove('load');
    },
    update: () => {
        console.log('[LOAD] update');
    }
};

titleScene = {
    key: 'title',
    init: (config) => {
        console.log('[TITLE] init', config);
    },
    preload: () => {
        console.log('[TITLE] preload');
    },
    create: function() {
        'use strict';
        var nameLbl, startLbl;

        nameLbl = this.add.text(80, 160, 'IOTA FORCE',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = this.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        // wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // wKey.onDown.addOnce(this.start, this);
        this.input.keyboard.on('keydown_W', this.start, this);
    },
    update: () => {
        console.log('[TITLE] update');
    },
    extend: {
        start: function() {
            'use strict';
            console.log('[TITLE] start');
            game.scene.switch('title', 'play');
        }
    }
};

playScene = {
    key: 'play',
    create: function() {
        'use strict';
        var tileset;

        // this.keyboard = game.input.keyboard;

        // Map
        this.map = this.add.tilemap('world1');
        tileset = this.map.addTilesetImage('worldTiles', 'tiles');
        // this.backgroundLayer = this.map.createLayer(0);
        this.backgroundLayer = this.map.createStaticLayer('backgroundLayer', tileset);
        // this.backgroundLayer.resizeWorld();

        // Player
        // this.player = this.add.sprite(150, game.world.height - 150, 'player');
        // this.player = this.add.sprite(150, this.height - 150, 'player');
        this.player = this.physics.add.sprite(150, this.height - 150, 'player');
        // this.player.anchor.setTo(0.5, 0.5);
        this.playerSpeed = 300;

        // game.physics.arcade.enable(this.player);
        // game.camera.follow(this.player);



        // Controls

        // this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // this.cursors = this.input.keyboard.addKeys({
        //     'up': Phaser.Keyboard.W,
        //     'down': Phaser.Keyboard.S,
        //     'left': Phaser.Keyboard.A,
        //     'right': Phaser.Keyboard.D,
        //     'interact': Phaser.Keyboard.SPACEBAR
        // });
        this.cursors = {};
        this.cursors.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
        // this.cursors = this.input.keyboard.addKeys({
        //     'up': Phaser.Input.Keyboard.KeyCodes.W,
        //     'down': Phaser.Input.Keyboard.KeyCodes.S,
        //     'left': Phaser.Input.Keyboard.KeyCodes.A,
        //     'right': Phaser.Input.Keyboard.KeyCodes.D,
        //     'interact': Phaser.Input.Keyboard.KeyCodes.SPACEBAR
        // });
    },
    update: function() {
        'use strict';

        // console.log('[PLAY] update');

        this.physics.add.collider(this.player, this.walls);
        // game.physics.arcade.collide(this.player, this.walls);
        // game.physics.arcade.collide(this.enemies, this.walls);
        // game.physics.arcade.overlap(this.player, this.enemies,
        //                             this.end, null, this);

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        // console.log(this.cursors.right);
        if (this.cursors.right.isDown) {
            console.log('RIGHT');
            this.player.body.setVelocityX(this.playerSpeed);
        }
        else if (this.cursors.left.isDown) {
            console.log('LEFT');
            this.player.body.setVelocityX(-this.playerSpeed);
            // this.player.body.velocity.x = -this.playerSpeed;
        }
        else if (this.cursors.up.isDown) {
            console.log('UP');
            this.player.body.setVelocityY(-this.playerSpeed);
            // this.player.body.velocity.y = -this.playerSpeed;
        }
        else if (this.cursors.down.isDown) {
            console.log('DOWN');
            this.player.body.setVelocityY(this.playerSpeed);
            // this.player.body.velocity.y = this.playerSpeed;
        }

        if (this.cursors.interact.isDown) {
            this.interact();
        }
    },
    extend: {
        interact: function() {
            'use strict';
            console.log('[PLAY] INTERACT');
        },
        end: function() {
            'use strict';
            console.log('[PLAY] end');
            game.scene.switch('play', 'end')
        }
    }
};

endScene = {
    create: function() {
        'use strict';
        var scoreLbl, nameLbl, startLbl, wKey;

        scoreLbl = this.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'});
        nameLbl = this.add.text(80, 160, 'YOU WIN',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = this.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        // wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // wKey.onDown.addOnce(this.restart, this);
        this.input.keyboard.on('keydown_W', this.restart, this);
    },
    extend: {
        restart: function() {
            'use strict';
            game.scene.switch('end', 'title')
        }
    }
};


const gameConfig = {
    type: Phaser.CANVAS,
    parent: 'game-div',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 600
            },
            height: 775,
            width: 1600,
            x: 0,
            y: -200
        }
    },
    scene: [ bootScene, loadScene, titleScene, playScene, endScene ]
};

game = new Phaser.Game(gameConfig);
game.scene.start('boot', { someData: '...arbitrary data' });
