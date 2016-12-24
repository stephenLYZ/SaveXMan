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
      this.load.image('title','title.png');
      this.load.image('xman-head','xman-head.png');
      this.load.image('button','button.png');
      this.load.image('role','role.png');
      this.load.image('game-background','game-background.png');
      this.load.image('fight-background','fight-background.png');
      this.load.image('xman','xman.png');
      this.load.image('xman-hit','xman-hit.png');
      this.load.image('hero','hero.png');
      this.load.image('bell','bell.png');
      this.load.image('sugar','sugar.png');
      this.load.image('hp','hp.png');
      this.load.image('deer','deer.png');
      this.load.image('good-deer','good-deer.png');
      this.load.image('bullet','bullet.png');
      this.load.image('bellBullet','bellBullet.png');
      this.load.image('blood','blood.png');
      this.load.image('mask','mask.png');
      this.load.image('gift','gift.png');
      this.load.image('win','win.png');
      this.load.image('lose','lose.png');
      this.load.image('again-btn','again-btn.png');
      this.load.image('xiazi-btn','xiazi-btn.png');
      this.load.spritesheet('clean-deer','animation.png',563,291,4);

      // audio
      this.load.audio('attack','attack.wav');
      this.load.audio('deer-appear','deer.wav');
      this.load.audio('fight','fight.mp3');
      this.load.audio('game','game.mp3');
      this.load.audio('hitted','hitted.wav');
      this.load.audio('win','win.wav');
      this.load.audio('lose','lose.wav');
      this.load.audio('ui','ui.wav');
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
