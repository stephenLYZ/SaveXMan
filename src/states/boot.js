class Boot extends Phaser.State {

  constructor() {
    super();
    var ui;
  }

  preload() {
    this.load.baseURL = 'http://cdn.muxixyz.com/'
    this.load.crossOrigin = 'anonymous';
    this.load.image('preloader', 'load.png'); // 进度条
    this.load.image('background','background.png'); // 背景图片

  }

  create() {
    this.game.input.maxPointers = 1;

    this.stage.backgroundColor = '#fd7e00';

    //setup device scaling

      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  320;
      this.game.scale.minHeight = 480;
      this.game.scale.maxWidth = 480;
      this.game.scale.maxHeight = 640;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.updateLayout(true);

    this.initGlobalVariables();

    this.game.state.start('preloader');
  }

  initGlobalVariables(){
    this.game.global = {
      sugarBar: 0,
      bellBar: 0,
      gameBackground: ''
    };
  }

}

export default Boot;
