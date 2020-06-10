class Wood {
  constructor(ctx) {
    this._ctx = ctx

    this._x = Math.round(Math.random() * GAMEBOUNDSX - GAMEBOUNDSX / 2)
    this._y = Math.round(Math.random() * GAMEBOUNDSY - GAMEBOUNDSY / 2)

    this._w = 50
    this._h = 20

    this.amount = 5
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "brown"
    this._ctx.fillRect(this._x, this._y, this._w, this._h)
    this._ctx.closePath()
  }

  checkCollision(player) {
    const colX = player.x + player.w >= this._x && player.x < this._x + this._w
    const colY = player.y + player.h >= this._y && player.y < this._y + this._h

    if (colX && colY) {
      return true
    }
  }
}
