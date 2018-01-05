cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration: 0,
        jumpHeight: 0,
        maxMoveSpeed: 0,
        accel: 0,
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    jump () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        this.node.runAction(cc.sequence(jumpUp, jumpDown));
    },

    setInputControl () {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (keyCode, event) => {
                switch(keyCode) {
                    case cc.KEY.w:
                    case cc.KEY.space:
                    case cc.KEY.up:
                        if (this.canJump && Math.round(this.node.y) <= -256) {
                            this.jump();
                            this.canJump = false;
                        }
                        break;
                    case cc.KEY.a:
                    case cc.KEY.left:
                        this.node.scaleX = 1;
                        this.accLeft = true;
                        this.accRight = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        this.node.scaleX = -1;
                        this.accLeft = false;
                        this.accRight = true;
                        break;
                    case cc.KEY.enter:
                        if (this.game.running === false) {
                            this.game.startGame();
                        }
                        break;
                }
            },
            onKeyReleased: (keyCode, event) => {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        this.accLeft = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        this.accRight = false;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                    case cc.KEY.space:
                        this.canJump = true;
                        break;
                }
            }
        }, this.node);
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        this.setInputControl();
        this.node.y = -256;
        this.canJump = true;
    },

    start () {

    },

    update (dt) {
        var accel = this.accel * dt;
        if (this.accLeft) {
            this.xSpeed -= accel;
        } else if (this.accRight) {
            this.xSpeed += accel;
        } else {
            if (this.xSpeed > accel) {
                this.xSpeed -= accel;
            } else if (this.xSpeed < -accel) {
                this.xSpeed += accel;
            } else {
                this.xSpeed = 0;
            }
        }
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        if (this.node.x < -640) {
            this.node.x = -640;
            this.xSpeed = 0;
        }
        if (this.node.x > 640) {
            this.node.x = 640;
            this.xSpeed = 0;
        }        

        this.node.x += this.xSpeed * dt;
    },
});
