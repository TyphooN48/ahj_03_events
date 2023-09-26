import randomMinMaxNot from './utils';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.hits = 0;
    this.missed = 0;
    this.interval = null;
    this.gameOver = false;
  }

  init() {
    this.gamePlay.drawUi();
    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));
    this.gamePlay.addNewGameListener(() => this.newGame());
    this.gamePlay.cells[randomMinMaxNot(0, 15, 20)].classList.add('target');
    this.gameLoopInterval();
  }

  newGame() {
    this.gameOver = false;
    this.hits = 0;
    this.missed = 0;
    clearInterval(this.interval);
    this.init();
  }

  onCellClick(index) {
    if (!this.gameOver) {
      if (this.gamePlay.cells[index].classList.contains('target')) {
        this.hits += 1;
        this.gamePlay.hits.innerHTML = this.hits;
        clearInterval(this.interval);
        this.interval = null;
        this.isGameOver();
        if (!this.gameOver) {
          this.gameLoop();
          this.gameLoopInterval();
        }
      }
    }
  }

  gameLoop() {
    if (!this.gameOver) {
      const activeCell = this.gamePlay.cells.find((el) => el.classList.contains('target'));
      const index = this.gamePlay.cells.indexOf(activeCell);
      activeCell.classList.remove('target');
      this.gamePlay.cells[randomMinMaxNot(0, 15, index)].classList.add('target');
    }
  }

  gameLoopWithMiss() {
    this.missed += 1;
    this.gamePlay.missed.innerHTML = this.missed;
    this.gameLoop();
    this.isGameOver();
  }

  gameLoopInterval() {
    this.interval = setInterval(() => {
      this.gameLoopWithMiss.call(this);
    }, 1000);
  }

  isGameOver() {
    if (this.hits >= 5) {
      this.gameOver = true;
      this.gamePlay.addCellClickListener((index) => this.onCellClick(index));
      this.gamePlay.showMessage('Поздравляем Вы победили!');
      clearInterval(this.interval);
      this.interval = null;
    } else if (this.missed >= 5) {
      this.gameOver = true;
      clearInterval(this.interval);
      this.interval = null;
      this.gamePlay.showMessage('Вы проиграли\nПопробуйте еще раз');
    }
  }
}
