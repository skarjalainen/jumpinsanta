cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 75,
    },

    getPlayerDistance () {
        if (this.game) {
            var playerPos = this.game.player.getPosition();
            var dist = cc.pDistance(this.node.position, playerPos);
            return dist;
        }
        return cc.p(-500, -500);
    },

    onPicked () {
        this.game.addScore();
        this.game.spawnNewPresent();
        this.node.destroy();
    },

    onDestroyed () {
        this.node.destroy();
        this.game.gameOver();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pickRadius = 75;
    },

    start () {

    },

    update (dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
        this.node.y -= this.game.fallSpeed * dt;
        if (this.node.y < -640) {
            this.onDestroyed();
        }
    },
});
