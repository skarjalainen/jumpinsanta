require=function e(t,c,i){function s(o,a){if(!c[o]){if(!t[o]){var r="function"==typeof require&&require;if(!a&&r)return r(o,!0);if(n)return n(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var d=c[o]={exports:{}};t[o][0].call(d.exports,function(e){var c=t[o][1][e];return s(c||e)},d,d.exports,e,t,c,i)}return c[o].exports}for(var n="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({Player:[function(e,t,c){"use strict";cc._RF.push(t,"15bdfH/vBJKoLzkOwUDJUbE","Player"),cc.Class({extends:cc.Component,properties:{jumpDuration:0,jumpHeight:0,maxMoveSpeed:0,accel:0,jumpAudio:{default:null,url:cc.AudioClip}},jump:function(){cc.audioEngine.playEffect(this.jumpAudio,!1);var e=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),t=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());this.node.runAction(cc.sequence(e,t))},setInputControl:function(){var e=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(t,c){switch(t){case cc.KEY.w:case cc.KEY.space:case cc.KEY.up:e.canJump&&Math.round(e.node.y)<=-256&&(e.jump(),e.canJump=!1);break;case cc.KEY.a:case cc.KEY.left:e.node.scaleX=1,e.accLeft=!0,e.accRight=!1;break;case cc.KEY.d:case cc.KEY.right:e.node.scaleX=-1,e.accLeft=!1,e.accRight=!0;break;case cc.KEY.enter:!1===e.game.running&&e.game.startGame()}},onKeyReleased:function(t,c){switch(t){case cc.KEY.a:case cc.KEY.left:e.accLeft=!1;break;case cc.KEY.d:case cc.KEY.right:e.accRight=!1;break;case cc.KEY.w:case cc.KEY.up:case cc.KEY.space:e.canJump=!0}}},this.node)},onLoad:function(){this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.setInputControl(),this.node.y=-256,this.canJump=!0},start:function(){},update:function(e){var t=this.accel*e;this.canJump&&Math.round(this.node.y)<=-256&&(this.accLeft?this.xSpeed-=t:this.accRight?this.xSpeed+=t:this.xSpeed>t?this.xSpeed-=t:this.xSpeed<-t?this.xSpeed+=t:this.xSpeed=0),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x<-640&&(this.node.x=-640,this.xSpeed=0),this.node.x>640&&(this.node.x=640,this.xSpeed=0),this.node.x+=this.xSpeed*e}}),cc._RF.pop()},{}],Present:[function(e,t,c){"use strict";cc._RF.push(t,"0a8beD5ONJGV6mmmtpRKMul","Present"),cc.Class({extends:cc.Component,properties:{pickRadius:75},getPlayerDistance:function(){if(this.game){var e=this.game.player.getPosition();return cc.pDistance(this.node.position,e)}return cc.p(-500,-500)},onPicked:function(){this.game.addScore(),this.game.spawnNewPresent(),this.node.destroy()},onDestroyed:function(){this.node.destroy(),this.game.gameOver()},onLoad:function(){this.pickRadius=75},start:function(){},update:function(e){this.getPlayerDistance()<this.pickRadius?this.onPicked():(this.node.y-=this.game.fallSpeed*e,this.node.y<-640&&this.onDestroyed())}}),cc._RF.pop()},{}],game:[function(e,t,c){"use strict";cc._RF.push(t,"ecbb8lfpLBDyLG6Z7eUbaWP","game"),cc.Class({extends:cc.Component,properties:{presentPrefab:{default:null,type:cc.Prefab},player:{default:null,type:cc.Node},menuAudio:{default:null,url:cc.AudioClip},gameAudio:{default:null,url:cc.AudioClip},scoreAudio:{default:null,url:cc.AudioClip},scoreLabel:{default:null,type:cc.Label},gameOverNode:{default:null,type:cc.Node},startTextNode:{default:null,type:cc.Node},controlsLabel:{default:null,type:cc.Node}},onLoad:function(){this.score=0,this.fallSpeed=200,this.scoreLabel.string=this.score,this.running=!1,this.gameOverNode.setPositionX(3e3),this.startTextNode.setPositionX(0),this.controlsLabel.setPositionX(0),this.player.getComponent("Player").game=this,cc.audioEngine.playEffect(this.menuAudio,!1)},startGame:function(){this.score=0,this.scoreLabel.string=this.score,this.running=!0,this.fallSpeed=200,this.spawnNewPresent(),this.gameOverNode.setPositionX(3e3),this.startTextNode.setPositionX(3e3),this.controlsLabel.setPositionX(3e3),cc.audioEngine.stopAll(),cc.audioEngine.playEffect(this.gameAudio,!1)},gameOver:function(){this.running=!1,this.gameOverNode.setPositionX(0),this.startTextNode.setPositionX(0),cc.audioEngine.stopAll(),cc.audioEngine.playEffect(this.menuAudio,!1)},addScore:function(){this.score+=100,this.scoreLabel.string=this.score,cc.audioEngine.playEffect(this.scoreAudio,!1)},spawnNewPresent:function(){this.fallSpeed+=10;var e=cc.instantiate(this.presentPrefab);this.node.addChild(e),e.setPosition(cc.p(cc.randomMinus1To1()*this.node.width/2,480)),e.getComponent("Present").game=this},update:function(e){}}),cc._RF.pop()},{}]},{},["Player","Present","game"]);