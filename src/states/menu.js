class Menu extends Phaser.State {

  constructor() {
    super();
    var ui;
  }

  create() {
    this.stage.backgroundColor = '#fd7e00';
    this.add.tileSprite(0,0,this.game.width,this.game.height,'background');

    var xmanHead = this.add.sprite(395,-10,'xman-head');

    var title = this.add.sprite(this.game.world.centerX,750,'title');
    title.anchor.set(0.5);

    var role = this.add.sprite(480,960,'role');
    role.alpha = 1;

    var button = this.add.sprite(360,1000,'button');
    button.alpha = 1;
    button.inputEnabled = true
    button.events.onInputDown.add(this.startGame,this)

    // ui声音
    this.ui = this.add.audio('ui'); 

    this.add.tween(title).from({ y: -200 },1000,Phaser.Easing.Linear.None,true);
    this.add.tween(xmanHead).from({ x: 600 },1000,Phaser.Easing.Linear.None,true);
    this.add.tween(button).from({ y: 500,alpha: 0 },1000,Phaser.Easing.Bounce.Out,true,700);
    this.add.tween(role).from({ x: 460 , y: 1020,alpha: 0 },800,Phaser.Easing.Linear.None,true,1300);
  }

  update() {}

  startGame () {
    this.ui.play(this.button);
    this.game.state.start('game1');
  }

}

export default Menu;
