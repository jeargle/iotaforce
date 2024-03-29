let score, game

score = 0

class BootScene extends Phaser.Scene {
    constructor() {
        super('boot')
    }

    init(config) {
        console.log('[BOOT] init', config)
    }

    preload() {
        console.log('[BOOT] preload')
    }

    create() {
        game.scene.start('load')
        game.scene.remove('boot')
    }

    update() {
        console.log('[BOOT] update')
    }
}

class LoadScene extends Phaser.Scene {
    constructor() {
        super('load')
    }

    init(config) {
        console.log('[LOAD] init', config)
    }

    preload() {
        let loadLbl

        loadLbl = this.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'})

        // Load images
        this.load.tilemapTiledJSON('world1', 'assets/world1.json')
        this.load.image('tiles', 'assets/worldTiles.png')
        this.load.image('player', 'assets/circle-red.png')

        // Load sound effects
    }

    create() {
        game.scene.start('title')
        game.scene.remove('load')
    }

    update() {
        console.log('[LOAD] update')
    }
}

class TitleScene extends Phaser.Scene {
    constructor() {
        super('title')
    }

    init(config) {
        console.log('[TITLE] init', config)
    }

    preload() {
        console.log('[TITLE] preload')
    }

    create() {
        let nameLbl, startLbl

        nameLbl = this.add.text(80, 160, 'IOTA FORCE',
                                {font: '50px Courier',
                                 fill: '#ffffff'})
        startLbl = this.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'})

        this.input.keyboard.on('keydown-W', this.start, this)
    }

    update() {
        console.log('[TITLE] update')
    }

    start() {
        console.log('[TITLE] start')
        game.scene.switch('title', 'play')
    }
}

class PlayScene extends Phaser.Scene {
    constructor() {
        super('play')
    }

    create() {
        let tileset

        // Map
        this.map = this.add.tilemap('world1')
        tileset = this.map.addTilesetImage('worldTiles', 'tiles')
        this.backgroundLayer = this.map.createLayer('backgroundLayer', tileset)
        // this.backgroundLayer.resizeWorld()

        // Player
        this.player = this.physics.add.sprite(150, 150, 'player')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.playerSpeed = 300

        this.physics.add.collider(this.player, this.walls)

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player)

        // Controls
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'interact': Phaser.Input.Keyboard.KeyCodes.SPACE
        })

        // this.physics.add.collider(this.enemies, this.walls)
        // this.physics.add.collider(this.enemies, this.enemies)
        // this.physics.add.overlap(this.player, this.enemies,
        //                          this.end, null, this)

    }

    update() {
        console.log('[PLAY] update')

        this.player.body.setVelocityX(0)
        this.player.body.setVelocityY(0)

        if (this.cursors.right.isDown) {
            console.log('RIGHT')
            this.player.body.setVelocityX(this.playerSpeed)
        }
        else if (this.cursors.left.isDown) {
            console.log('LEFT')
            this.player.body.setVelocityX(-this.playerSpeed)
        }
        else if (this.cursors.up.isDown) {
            console.log('UP')
            this.player.body.setVelocityY(-this.playerSpeed)
        }
        else if (this.cursors.down.isDown) {
            console.log('DOWN')
            this.player.body.setVelocityY(this.playerSpeed)
        }

        if (this.cursors.interact.isDown) {
            this.interact()
        }
    }

    interact() {
        console.log('[PLAY] INTERACT')
    }

    end() {
        console.log('[PLAY] end')
        game.scene.switch('play', 'end')
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('end')
    }

    create() {
        let scoreLbl, nameLbl, startLbl, wKey

        scoreLbl = this.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'})
        nameLbl = this.add.text(80, 160, 'YOU WIN',
                                {font: '50px Courier',
                                 fill: '#ffffff'})
        startLbl = this.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'})

        this.input.keyboard.on('keydown-W', this.restart, this)
    }

    restart() {
        game.scene.switch('end', 'title')
    }
}


const gameConfig = {
    type: Phaser.CANVAS,
    parent: 'game-div',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            height: 1600,
            width: 1600,
            x: 0,
            y: 0
        }
    },
     scene: [
        BootScene,
        LoadScene,
        TitleScene,
        PlayScene,
        EndScene
    ]
}

game = new Phaser.Game(gameConfig)
game.scene.start('boot', { someData: '...arbitrary data' })
