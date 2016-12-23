class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 325, this.game.height * 0.5 - 32, 'preloader');
    this.load.setPreloadSprite(this.asset);

    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5 - 100, 'Loading...', {
      font: '70px Arial', fill: '#7E3600', align: 'center'
    });
    text.anchor.set(0.5);

    var background = this.add.tileSprite(0,0,this.game.width,this.game.height,'background');
    background.alpha = 0.2;

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  update() {
      // if (this.ready) {
        this.game.state.start('menu');
      // }
  }

  loadResources() {
      // load your resources here
      // images
      this.load.image('title','assets/title.png');
      this.load.image('xman-head','assets/xman-head.png');
      this.load.image('button','assets/button.png');
      this.load.image('role','assets/role.png');
      this.load.image('game-background','assets/game-background.png');
      this.load.image('fight-background','assets/fight-background.png');
      this.load.image('xman','assets/xman.png');
      this.load.image('xman-hit','assets/xman-hit.png');
      this.load.image('hero','assets/hero.png');
      this.load.image('bell','assets/bell.png');
      this.load.image('sugar','assets/sugar.png');
      this.load.image('hp','assets/hp.png');
      this.load.image('deer','assets/deer.png');
      this.load.image('good-deer','assets/good-deer.png');
      this.load.image('bullet','assets/bullet.png');
      this.load.image('bellBullet','assets/bellBullet.png');
      this.load.image('blood','assets/blood.png');
      this.load.image('mask','assets/mask.png');
      this.load.image('gift','assets/gift.png');
      this.load.image('win','assets/win.png');
      this.load.image('lose','assets/lose.png');
      this.load.image('again-btn','assets/again-btn.png');
      this.load.image('xiazi-btn','assets/xiazi-btn.png');
      this.load.spritesheet('clean-deer','assets/animation.png',563,291,4);
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
