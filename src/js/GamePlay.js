/* eslint-disable no-alert */

export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.cellEnterListeners = [];
    this.newGameListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-restart" class="btn">New Game</button>
      </div>
      <div class="score-container"> 
        Hits:<span data-id="hits" class="score hits">0</span>
        Missed:<span data-id="missed" class="score missed">0</span>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.newGameEl.addEventListener('click', (event) => this.onNewGameClick(event));
    this.boardEl = this.container.querySelector('[data-id=board]');
    this.hits = this.container.querySelector('[data-id=hits]');
    this.missed = this.container.querySelector('[data-id=missed]');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((o) => o.call(null));
  }

  // eslint-disable-next-line class-methods-use-this
  showMessage(message) {
    alert(message);
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
