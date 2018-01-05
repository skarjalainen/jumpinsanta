cc.Class({
    extends: cc.Component,

    properties: {
        presentPrefab: {
            default: null,
            type: cc.Prefab
        },
        player: {
            default: null,
            type: cc.Node,
        },
        menuAudio: {
            default: null,
            url: cc.AudioClip
        },
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        scoreLabel: {
            default: null,
            type: cc.Label,
        },
        gameOverNode: {
            default: null,
            type: cc.Node,
        },
        startTextNode: {
            default: null,
            type: cc.Node,
        },
        controlsLabel: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad () {
        this.score = 0;
        this.fallSpeed = 200;
        this.scoreLabel.string = this.score;
        this.running = false;
        this.gameOverNode.setPositionX(3000);
        this.startTextNode.setPositionX(0);
        this.controlsLabel.setPositionX(0);
        this.player.getComponent('Player').game = this;
        cc.audioEngine.playEffect(this.menuAudio, false);
    },

    startGame () {
        this.score = 0;
        this.scoreLabel.string = this.score;
        this.running = true;
        this.fallSpeed = 200;
        this.spawnNewPresent();
        this.gameOverNode.setPositionX(3000);
        this.startTextNode.setPositionX(3000);
        this.controlsLabel.setPositionX(3000);
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.gameAudio, false);
    },

    gameOver () {
        this.running = false;
        this.gameOverNode.setPositionX(0);
        this.startTextNode.setPositionX(0);
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.menuAudio, false);
    },

    addScore () {
        this.score += 100;
        this.scoreLabel.string = this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    spawnNewPresent () {
        this.fallSpeed += 10;
        var newPresent = cc.instantiate(this.presentPrefab);
        this.node.addChild(newPresent);
        newPresent.setPosition(cc.p(cc.randomMinus1To1() * (this.node.width*0.8)/2, 480));
        newPresent.getComponent('Present').game = this;
    },

    update (dt) {
    },
});
