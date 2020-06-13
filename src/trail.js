class Trail {
  constructor(ctx, player) {
    this._ctx = ctx
    this._x = player.x
    this._y = player.y

    this._img = new Image()
    this._img.src = "./src/sprites/trail.png"

    this._w = 20
    this._h = 20

    this._offsetX = player.w / 2 - this._w / 2
    this._offsetY = player.h / 2 - this._h / 2

    this.ticksAlive = 0
  }

  draw() {
    this._ctx.globalAlpha = 1 -  (this.ticksAlive / 180)
    this._ctx.drawImage(this._img, this._x + this._offsetX, this._y + this._offsetY, this._w, this._h)
    this._ctx.globalAlpha = 1
  }
}
