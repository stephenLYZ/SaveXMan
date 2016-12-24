class Game extends Phaser.State {

  constructor() {
    super();
    var hero,
        hp,
        shp,
        bhp,
        xman,
        bell,
        sugar,
        timer,
        bgm,
        attack;

  }

  create() {
    //audio
    this.bgm = this.add.audio('game',1,true);
    this.attack = this.add.audio('attack');

    this.bgm.play();
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'game-background');

    // hp
    this.hp = this.add.sprite(10,30,'hp');

    this.drawBackground(this.sugar,250,60);
    this.drawStuffBar(this.sugar,78,60,'#e05d9a',this.game.global.sugarBar);

    this.drawBackground(this.bell,250,120);
    this.drawStuffBar(this.bell,78,120,'#4aff94',this.game.global.bellBar);


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
    this.time.events.add(Phaser.Timer.SECOND * this.rnd.integerInRange(2222,25),this.changeGame,this);
  }

  update() {
    this.game.global.gameBackground.tilePosition.y += 3;


    this.physics.arcade.overlap(this.bell,this.hero,this.getBellBar,null,this);
    this.physics.arcade.overlap(this.sugar,this.hero,this.getSugarBar,null,this);
    this.hero.x = this.input.x;
  }


  getBellBar(o1,o2){
    o2.kill();

    this.attack.play();

    if(this.game.global.bellBar > 340){
      this.game.global.bellBar  = 340;
    }
    this.game.global.bellBar += 12

    this.drawStuffBar(this.bell,78,120,'#4aff94',this.game.global.bellBar);
  }

  getSugarBar(o1,o2){
    o2.kill();

    this.attack.play();

    if(this.game.global.sugarBar > 340){
      this.game.global.sugarBar  = 340;
    }
    this.game.global.sugarBar += 12

    this.drawStuffBar(this.sugar,78,60,'#e05d9a',this.game.global.sugarBar);
  }

  generateStuff(stuff){
    var _stuff = stuff.getFirstExists(false);
    _stuff.reset(this.rnd.integerInRange(200,800),250);
    _stuff.body.velocity.y = this.rnd.integerInRange(500,700);
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
    stuffbar.cropEnabled = true;
  }

  changeGame() {
    this.bgm.stop();
    this.game.state.start('transition');
  }

}

export default Game;
