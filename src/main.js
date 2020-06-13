const ctx = document.getElementById("canvas").getContext("2d")

const audioController = new AudioController()
const game = new Game(ctx)

function startGame() {
    game.start()
}

window.addEventListener('load', () => {
    const calculatePricesBtn = document.getElementById('start-game');
    calculatePricesBtn.addEventListener('click', startGame);
  
    //... your code goes here
  });
