class Transition extends Phaser.State {
  constructor() {
    super();
    var hero,
        xman;
  }

  create() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'game-background');
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

  }

  update() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    this.game.global.gameBackground.alpha = 1;
    this.add.tween(this.game.global.gameBackground).from({ alpha: 0 },1000,Phaser.Easing.Bounce.Out,true,0,40,true);
  }
  changeBackground(){
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    this.game.global.gameBackground.alpha = 1;
    this.add.tween(this.game.global.gameBackground).from({ alpha: 0, z: -1 },1000,Phaser.Easing.Bounce.In,true,0,4,true);
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

  }
}

export default Transition;
