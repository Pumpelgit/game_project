class Wood {
  constructor(ctx) {
    this._ctx = ctx

    this._x = this._findSpawnPosition().randomX
    this._y = this._findSpawnPosition().randomY

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

  _findSpawnPosition() {
    const randomX = Math.round(Math.random() * GAMEBOUNDSX - GAMEBOUNDSX / 2)
    const randomY = Math.round(Math.random() * GAMEBOUNDSY - GAMEBOUNDSY / 2)

    const invalidSpawnZoneX = this._ctx.canvas.width / 2 - 50
    const invalidSpawnZoneY = this._ctx.canvas.height / 2 - 50
    const invalidSpawnZoneW = 170
    const invalidSpawnZoneH = 160

    const colX = randomX + this._w >= invalidSpawnZoneX && randomX - this._w <= invalidSpawnZoneX + invalidSpawnZoneW
    const colY = randomY + this._h >= invalidSpawnZoneY && randomY - this._h <= invalidSpawnZoneY + invalidSpawnZoneH

    if (colX && colY) {
      return this._findSpawnPosition()
    }
    return { randomX, randomY }
  }
}
