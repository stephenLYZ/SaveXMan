class Gamelose extends Phaser.State {

  constructor() {
    super();
    var lose,
        ui;
  }

  create() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    
    // deer 
    this.deer = this.add.sprite(this.game.world.centerX,300,'deer');
    this.deer.anchor.set(0.5);
    
    // hero
    this.hero = this.add.sprite(this.game.world.centerX,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5);
    this.hero.alpha = 1;

    this.add.tween(this.hero).to({ alpha: 0 },500,Phaser.Easing.Linear.None,true,500,2,false,);
    
    this.time.events.add(Phaser.Timer.SECOND * 2.5 , this.gameLose,this);

    //audio
    this.ui = this.add.audio('ui'); 
    this.lose = this.add.audio('lose',1,true);
    this.lose.play();
  }


  gameLose(){
    this.add.tileSprite(0,0,this.game.width,this.game.height,'mask');

    this.blood = this.add.sprite(this.game.world.centerX,-300,'blood');
    this.blood.anchor.setTo(0.5);
    this.blood.scale.setTo(1,1);
    this.blood.inputEnabled = true;
    this.blood.events.onInputDown.add(this.loseDisplay,this);

    var tween1 = this.add.tween(this.blood).to({ y: this.game.world.centerY + 100 },2000,Phaser.Easing.Bounce.Out,true,0,0,false)
    var tween2 = this.add.tween(this.blood.scale).to({ x: 1.2,y: 1.2 },1000,Phaser.Easing.Linear.None,true,0,1000,true);
    tween1.chain(tween2);
    tween1.start();
  }

  loseDisplay(){
    this.ui.play(); 
    this.blood.kill();
    var lose = this.add.sprite(this.game.world.centerX,this.game.world.centerY ,'lose');
    lose.anchor.set(0.5);

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
    this.lose.stop();
  }
  
  restartGame () {
    this.ui.play(); 
    this.resetGlobalVariables();
    this.game.state.start('game1');
  }

}

export default Gamelose;
