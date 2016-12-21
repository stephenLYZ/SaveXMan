class Game extends Phaser.State {
  constructor() {
    super();
    var hp,
        hero,
        deer,
        _sugarBar,
        _bellBar,
        bullets,
        bellBullets,
        firingTime,
        heroTime,
        bellCacheWidth,
        sugarCacheWidth;
  }

  create() {
    this.game.global.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'fight-background');

    // cachewidth
    this.sugarCacheWidth = new Phaser.Rectangle(0, 0, this.game.global.sugarBar, 30);
    this.bellCacheWidth = new Phaser.Rectangle(0, 0, this.game.global.bellBar, 30);

    // hp
    this.hp = this.add.sprite(10,30,'hp');

    this.drawBackground(this.sugar,250,60);
    this._sugarBar = this.drawStuffBar(this.sugar,78,60,'#e05d9a',this.game.global.sugarBar,this.sugarCacheWidth);

    this.drawBackground(this.bell,250,120);
    this._bellBar = this.drawStuffBar(this.bell,78,120,'#4aff94',this.game.global.bellBar,this.bellCacheWidth);

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
    var time = this.rnd.integerInRange(1000,2000);

    // deer's hp
    this.deer.life = 5;

    // deer's move
    this.deer.x = 300;
    this.add.tween(this.deer).to({ x: 700 },time,"Cubic.easeInOut",true, 0, 1000, true);

    // deer's bullets
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30,'bullet')
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    // hero's bullets
    this.bellBullets = this.add.group();
    this.bellBullets.enableBody = true;
    this.bellBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bellBullets.createMultiple(30,'bellBullet')
    this.bellBullets.setAll('anchor.x', 0.5);
    this.bellBullets.setAll('anchor.y', 1);
    this.bellBullets.setAll('outOfBoundsKill', true);
    this.bellBullets.setAll('checkWorldBounds', true);

  }

  update() {
    this.game.global.gameBackground.tilePosition.y += 3;

    //judge win or lose
    if(this.bellCacheWidth.width >= 0 && this.sugarCacheWidth.width > 0){

      //herofire
      this.heroFires();
      this._bellBar.updateCrop();

      if(this.deer.life > 0){
        // enemyFire
        this.enemyFires();
        this._sugarBar.updateCrop();
      }else{
        this.gameWin();
      }
    }else if(this.bellCacheWidth.width <= 0 && this.sugarCacheWidth.width > 0){
      this.time.events.add(Phaser.Timer.SECOND * 3,this.relay,this);
    }else{
      this.gameLose();
    }

    this.physics.arcade.overlap(this.bullets,this.hero,this.hitHero,null,this);
    this.physics.arcade.overlap(this.bellBullets,this.deer,this.hitEnemy,null,this);
    this.hero.x = this.input.x;
  }

  enemyFires(){
    var bullet = this.bullets.getFirstExists(false);
    if(bullet){
      if(this.time.now > (this.firingTime || 0)){
        bullet.reset(this.deer.body.x + 300,this.deer.body.y + 100);
        this.physics.arcade.moveToObject(bullet,this.hero,this.rnd.integerInRange(200,500));
        this.firingTime = this.time.now + 500;
      }
    }
  }

  heroFires(){
    var bullet = this.bellBullets.getFirstExists(false);
    if(bullet){
      if(this.time.now > (this.heroTime || 0)){
        bullet.reset(this.hero.x ,this.hero.y + 8);
        bullet.body.velocity.y = -300;
        this.heroTime = this.time.now + 500;
        this.bellCacheWidth.width -= 3 ;
      }
    }
  }

  hitEnemy(hero,bullent){
    bullent.kill();
    if(this.deer.life < 0){
      this.deer.life = 0;
    }
    this.deer.life --;
  }

  hitHero(deer,bullent){
    bullent.kill();
    if(this.sugarCacheWidth.width < 0){
      this.sugarCacheWidth.width = 0;
    }
    this.sugarCacheWidth.width -= 3;
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

  drawStuffBar(stuffbar,x,y,color,width,cacheWidth){
    var bmd = this.add.bitmapData(width,30);
    bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, 40);
		bmd.ctx.fillStyle = color;
		bmd.ctx.fill();

    stuffbar = this.add.sprite(x,y,bmd);
    stuffbar.anchor.y = 0.5;
    stuffbar.cropEnabled = true;
    stuffbar.crop(cacheWidth);

    return stuffbar;
  }

  relay(){
    if(this.deer.life > 0){
      this.gameLose();
    }else{
      this.gameWin();
    }
  }

  gameWin(){
    this.game.state.start('gamewin');
  }

  gameLose(){
    this.game.state.start('gamelose');
  }
}

export default Game;
