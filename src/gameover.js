class GameOver {
  constructor(ctx, player, textToShow) {
    this._ctx = ctx
    this._player = player
    this._gameOverUI = new TextUI(
      this._ctx,
      this._player,
      -100,
      0,
      24
    )

    this._gameOverText = textToShow
    audioController.fadeVolume('music',30)
    audioController.playAudio('freeze')
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "black"
    this._ctx.fillRect(this._player.x - this._ctx.canvas.width / 2, this._player.y - this._ctx.canvas.height / 2, this._ctx.canvas.width, this._ctx.canvas.height)
    this._ctx.closePath()
    this._gameOverUI.draw(this._gameOverText,'grey')
  }
}
