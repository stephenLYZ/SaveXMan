class Game extends Phaser.State {
  constructor() {
    super();
    var hp,
        hero,
        deer,
        bullets,
        bellBullets;
  }

  create() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');
    // hp
    this.hp = this.add.sprite(10,30,'hp');

    this.drawBackground(this.sugar,250,60);
    this.drawStuffBar(this.sugar,78,60,'#e05d9a',this.game.global.sugarBar);

    this.drawBackground(this.bell,250,120);
    this.drawStuffBar(this.bell,78,120,'#4aff94',this.game.global.bellBar);
    // hero
    this.hero = this.add.sprite(this.game.world.centerX,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5);
    this.physics.enable(this.hero,Phaser.Physics.ARCADE);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.immovable = true;
    this.hero.body.bounce.set(1);

    //deer
    this.deer = this.add.sprite(this.game.world.centerX,300,'deer');
    this.deer.anchor.set(0.5);
    this.physics.enable(this.deer,Phaser.Physics.ARCADE);

    // deer's bullets
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30,'bullet')
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
  }

  update() {
    this.game.global.gameBackground.tilePosition.y += 3;
    deerMove();
    
    this.hero.x = this.input.x;
  }

  deerMove(){

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

  gameWin(){

  }

  gameLose(){

  }
}

export default Game;
