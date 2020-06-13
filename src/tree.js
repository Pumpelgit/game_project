class Tree {
  constructor(ctx) {
    this._ctx = ctx
    this._x = this._findSpawnPosition().randomX
    this._y = this._findSpawnPosition().randomY
    this._w = 100
    this._h = 166 //1.66

    this._img = new Image()
    this._img.src = "./src/sprites/trees.png"

    //this._frameW = this._img.width / 5
    //this._frameH = this._img.height / 2

    this._frameW = 133
    this._frameH = 221

    this._frameX = Math.floor(Math.random() * 10) * this._frameW
    this._frameY = Math.floor(Math.random() * 2) * this._frameH
  }

  draw() {
    this._ctx.drawImage(
      this._img,
      this._frameX,
      this._frameY,
      this._frameW,
      this._frameH,
      this._x,
      this._y,
      this._w,
      this._h
    )
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
