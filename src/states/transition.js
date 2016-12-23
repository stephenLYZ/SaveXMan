class Transition extends Phaser.State {
  constructor() {
    super();
    var hero,
        xman,
        deer,
        appear;
  }

  create() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    this.game.global.gameBackground.alpha = 1;
    this.add.tween(this.game.global.gameBackground).from({ alpha: 0 },1000,Phaser.Easing.Bounce.Out,true,0,0,true);
    // hp
    this.hp = this.add.sprite(10,30,'hp');

    this.drawBackground(this.sugar,250,60);
    this.drawStuffBar(this.sugar,78,60,'#e05d9a',this.game.global.sugarBar);

    this.drawBackground(this.bell,250,120);
    this.drawStuffBar(this.bell,78,120,'#4aff94',this.game.global.bellBar);

    // hero
    this.hero = this.add.sprite(this.game.world.centerX,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5,0.5);
    //xman
    this.xman = this.add.sprite(this.game.world.centerX-91,200,'xman');
    this.xman.enableBody = true;

    //deer
    this.deer = this.add.sprite(this.game.world.centerX,-200,'deer');
    this.deer.anchor.set(0.5);

    this.time.events.add(Phaser.Timer.SECOND * 2,this.changeXman,this);
    this.time.events.add(Phaser.Timer.SECOND * 5,this.changeGame,this);

    //audio
    this.appear = this.add.audio('deer-appear',1,true);
    this.appear.play();
  }


  changeXman(){
    this.xman.kill();
    this.xman = this.add.sprite(this.game.world.centerX-91,90,'xman-hit');
    var tween1 = this.add.tween(this.xman).to({ y : -400 },2000,"Quart.easeIn");
    var tween2 = this.add.tween(this.deer).to({ y : 300 }, 1000,Phaser.Easing.Linear.None);
    tween1.chain(tween2);
    tween1.start();
  }

  drawBackground(bgbar,x,y){
    var bmd = this.add.bitmapData(350,35);
    bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 350, 40);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();

    bgbar = this.add.sprite(x,y,bmd);
    bgbar.anchor.set(0.5);
  }

  drawStuffBar(stuffbar,x,y,color,width){
    var bmd = this.add.bitmapData(width,30);
    bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, 40);
		bmd.ctx.fillStyle = color;
		bmd.ctx.fill();

    stuffbar = this.add.sprite(x,y,bmd);
    stuffbar.anchor.y = 0.5;
  }

  changeGame(){
    this.appear.stop();
    this.game.state.start('game2');
  }
}

export default Transition;
