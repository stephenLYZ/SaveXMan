class Gamewin extends Phaser.State {

  constructor() {
    super();
    var cleanDeer;
  }

  create() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    
    // this.game.global.gameBackground.alpha = 0;
    // this.add.tween(this.game.global.gameBackground).from({ alpha: 1 },2000,Phaser.Easing.Bounce.Out,true,0,0,true);

    //deer
    // this.deer = this.add.sprite(this.game.world.centerX,300,'deer');
    // this.deer.anchor.set(0.5);
    // 
    this.deer = this.game.add.sprite(this.game.world.centerX,300,'clean-deer');
    this.deer.anchor.set(0.5);
    this.deer.smoothed = false;
    this.deer.animations.add('walk');

    this.time.events.add(Phaser.Timer.SECOND * 2, this.changeBackground,this);
    // hero
    this.hero = this.add.sprite(this.game.world.centerX,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5,0.5);

    // mask
    // this.add.tileSprite(0,0,this.game.width,this.game.height,'mask');

    // gift
    // var gift = this.add.sprite(this.game.world.centerX + 85,this.game.world.centerY,'gift');
    // gift.anchor.setTo(0.5);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }

  showTweens(){
    this.deer.kill();
    this.deer = this.game.add.sprite(this.game.world.centerX,300,'clean-deer');
    this.deer.smoothed = false;
    this.deer.animations.add('walk');
    // var tween1 = this.
  }

  addMask(){
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'game-background');
  }

  update() {}

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

}

export default Gamewin;
