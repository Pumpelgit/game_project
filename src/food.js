class Food {
  constructor(ctx) {
    this._ctx = ctx

    this._r = 10

    this._x = this._findSpawnPosition().randomX
    this._y = this._findSpawnPosition().randomY


    this.amount = 5
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "red"
    this._ctx.arc(this._x, this._y, this._r, 0, Math.PI * 2)
    this._ctx.fill()
    this._ctx.closePath()
  }

  checkCollision(player) {
    const colX = player.x + player.w >= this._x - this._r && player.x <= this._x + this._r
    const colY = player.y + player.h >= this._y - this._r && player.y <= this._y + this._r

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

    const colX = randomX + this._r >= invalidSpawnZoneX && randomX - this._r <= invalidSpawnZoneX + invalidSpawnZoneW
    const colY = randomY + this._r >= invalidSpawnZoneY && randomY - this._r <= invalidSpawnZoneY + invalidSpawnZoneH
    
    if (colX && colY) {
      return this._findSpawnPosition()
    }
    return { randomX, randomY }
  }
}
