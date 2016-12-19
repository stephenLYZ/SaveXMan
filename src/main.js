import Boot from './states/boot';
import Game1 from './states/game1';
import Game2 from './states/game2';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gamewin from './states/gamewin';
import Gamelose from './states/gamelose';
import Transition from './states/transition';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'SaveXMan-game');

game.state.add('boot', new Boot());
game.state.add('game1', new Game1());
game.state.add('transition', new Transition());
game.state.add('game2', new Game2());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gamewin', new Gamewin());
game.state.add('gamelose', new Gamelose());

game.state.start('boot');
