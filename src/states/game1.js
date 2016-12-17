class Game extends Phaser.State {

  constructor() {
    super();
    var gameBackground,
        hero,
        xman;
  }

  create() {
    this.gameBackground = this.add.tileSprite(0,0,this.game.width,this.game.height,'game-background');

    // hero
    this.hero = this.add.sprite(this.game.world.centerX-47,this.game.height-150,'hero');
    this.hero.anchor.setTo(0.5,0.5);
    this.physics.enable(this.hero,Phaser.Physics.ARCADE);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.immovable = true;
    this.hero.body.bounce.set(1);

    // xman
    this.xman = this.add.sprite(this.game.world.centerX-91,200,'xman');
  }

  update() {
    this.gameBackground.tilePosition.y += 3;

    this.hero.x = this.input.x;
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
