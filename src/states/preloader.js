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

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  create(){
    var background = this.add.tileSprite(0,0,this.game.width,this.game.height,'background');
    background.alpha = 0.5;
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
      this.load.image('bullet','assets/bullet.png');
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
