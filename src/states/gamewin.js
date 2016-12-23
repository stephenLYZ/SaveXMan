class Gamewin extends Phaser.State {

  constructor() {
    super();
    var cleanDeer,
        gift,
        againBtn,
        xiaziBtn,
        win,
        ui;
  }

  create() {
    this.stage.backgroundColor = '#4d122e';
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    
    // this.game.global.gameBackground.alpha = 0;
    // this.add.tween(this.game.global.gameBackground).from({ alpha: 1 },2000,Phaser.Easing.Bounce.Out,true,0,0,true);

    //deer
    this.deer = this.add.sprite(this.game.world.centerX,300,'deer');
    this.deer.anchor.set(0.5);
    
    // hero
    this.hero = this.add.sprite(this.game.world.centerX,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5,0.5);

    this.time.events.add(Phaser.Timer.SECOND * 0.5 , this.deerClean,this);
    this.time.events.add(Phaser.Timer.SECOND * 2, this.changeBackground,this);
    this.time.events.add(Phaser.Timer.SECOND * 3, this.showTweens,this);

    //audio
    this.ui = this.add.audio('ui'); 
    this.win = this.add.audio('win',1,true);
    this.win.play();
  }

  showTweens(){
    this.add.tileSprite(0,0,this.game.width,this.game.height,'mask');

    this.gift = this.add.sprite(this.game.world.centerX + 65,this.game.world.centerY - 800,'gift');
    this.gift.anchor.setTo(0.5);
    this.gift.scale.setTo(1,1);
    this.gift.inputEnabled = true;
    this.gift.events.onInputDown.add(this.winDisplay,this);

    
    var tween1 = this.add.tween(this.gift).to({ y: this.game.world.centerY + 50 },2000,Phaser.Easing.Bounce.Out,true,0,0,false)
    var tween2 = this.add.tween(this.gift.scale).to({ x: 1.2,y: 1.2 },1000,Phaser.Easing.Linear.None,true,0,1000,true);
    tween1.chain(tween2);
    tween1.start();
  }

  changeBackground(){
    this.win.play()
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'game-background');
    this.game.global.gameBackground.alpha = 1
    this.add.tween(this.game.global.gameBackground).to({ alpha: 0 },1000,Phaser.Easing.Bounce.Out,true,0,0,true)

  }

  deerClean(){
    this.deer.kill();
    this.deer = this.game.add.sprite(this.game.world.centerX,300,'clean-deer');
    this.deer.anchor.set(0.5);
    this.deer.smoothed = false;
    var change = this.deer.animations.add('change');
    this.deer.animations.play('change',4,false);
  }
  
  winDisplay(){
    this.ui.play(); 
    this.gift.kill();
    var win = this.add.sprite(this.game.world.centerX,this.game.world.centerY ,'win');
    win.anchor.set(0.5);

    // button
    this.againBtn = this.add.sprite(this.game.world.centerX - 160,this.game.world.centerY + 290,'again-btn');
    this.againBtn.anchor.set(0.5);
    this.againBtn.inputEnabled = true;
    this.againBtn.events.onInputDown.add(this.restartGame,this);

    this.xiaziBtn = this.add.sprite(this.game.world.centerX + 160,this.game.world.centerY + 290,'xiazi-btn');
    this.xiaziBtn.anchor.set(0.5);
    this.xiaziBtn.inputEnabled = true;
    this.xiaziBtn.events.onInputDown.add(this.openXiazi,this);
  }

  openXiazi(){
    this.ui.play(); 
    window.open("http://ccnubox.muxixyz.com/", "_blank");
  }

  resetGlobalVariables(){
    this.game.global.sugarBar = 0;
    this.game.global.bellBar = 0;
    this.stage.backgroundColor = '#fd7e00';
    this.win.stop();
  }

  restartGame () {
    this.ui.play(); 
    this.resetGlobalVariables();
    this.game.state.start('game1');
  }

}

export default Gamewin;
