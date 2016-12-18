class Game extends Phaser.State {

  constructor() {
    super();
    var gameBackground,
        hero,
        hp,
        shp,
        bhp,
        xman,
        sugarBar,
        bellBar,
        sugarLife,
        bellLife,
        bell,
        sugar,
        widthLife;

  }

  create() {
    this.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'game-background');

    // hp
    this.hp = this.add.sprite(10,30,'hp');

    var bmd = this.add.bitmapData(350,35);
    bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 350, 40);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();

    this.sugarBar = this.add.sprite(250,60,bmd);
    this.sugarBar.anchor.set(0.5);

    bmd = this.add.bitmapData(0,30);
    bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 350, 40);
		bmd.ctx.fillStyle = '#e05d9a';
		bmd.ctx.fill();

    this.widthLife = new Phaser.Rectangle(0, 0, 0, bmd.height);

    this.sugarLife = this.add.sprite(250,60,bmd);
    this.sugarLife.anchor.set(0.5);
    this.sugarLife.cropEnabled = true;




    // this.bellBar = this.add.sprite(80,105,this.bhp);
    // hero
    this.hero = this.add.sprite(this.game.world.centerX-47,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5,0.5);
    this.physics.enable(this.hero,Phaser.Physics.ARCADE);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.immovable = true;
    this.hero.body.bounce.set(1);

    // xman
    this.xman = this.add.sprite(100,200,'xman');
    this.xman.enableBody = true;
    this.xman.physicsBodyType = Phaser.Physics.ARCADE;
    this.add.tween(this.xman).to({ x: 700 },1500,Phaser.Easing.Linear.None, true, 0, 1000, true);

    // bell
    this.bell = this.add.group();
    this.bell.enableBody  = true;
    this.bell.createMultiple(15,'bell');
    this.bell.setAll('outOfBoundsKill', true);
    this.bell.setAll('checkWorldBounds', true);
    this.time.events.loop(Phaser.Timer.SECOND * 0.7,this.generateStuff,this,this.bell);

    // sugar
    this.sugar = this.add.group();
    this.sugar.enableBody  = true;
    this.sugar.createMultiple(15,'sugar');
    this.sugar.setAll('outOfBoundsKill', true);
    this.sugar.setAll('checkWorldBounds', true);
    this.time.events.loop(Phaser.Timer.SECOND * 0.7,this.generateStuff,this,this.sugar);
  }

  update() {
    this.gameBackground.tilePosition.y += 3;


    // this.shp.ctx.rect(0,0,this.sugarBar,30);
    // this.shp.ctx.fillStyle = '#e05d9a';
    // this.shp.ctx.fill();
    //
    // this.bhp.ctx.rect(0,0,this.bellBar,30);
    // this.bhp.ctx.fillStyle = '#4aff94';
    // this.bhp.ctx.fill();

    this.widthLife.width = this.widthLife.width; 
    this.physics.arcade.overlap(this.bell,this.hero,this.getBellBar,null,this);
    this.physics.arcade.overlap(this.sugar,this.hero,this.getBellBar,null,this);
    this.hero.x = this.input.x;
  }


  getBellBar(o1,o2){
    o2.kill();

    if(this.widthLife.width  > 350){
      this.widthLife.width  = 350;
    }
    this.widthLife.width += 2

    console.log(this.widthLife.width)
  }

  generateStuff(stuff){
    var _stuff = stuff.getFirstExists(false);
    _stuff.reset(this.rnd.integerInRange(200,800),250);
    _stuff.body.velocity.y = this.rnd.integerInRange(200,600);
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
