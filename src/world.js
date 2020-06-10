class World {
  constructor(ctx) {
    this._ctx = ctx
    this._halfXSize = GAMEBOUNDSX / 2
    this._halfYSize = GAMEBOUNDSY / 2
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.moveTo(-this._halfXSize, -this._halfYSize)

    this._ctx.lineTo(this._halfXSize, -this._halfYSize)
    this._ctx.lineTo(this._halfXSize, this._halfYSize)
    this._ctx.lineTo(-this._halfXSize, this._halfYSize)
    this._ctx.lineTo(-this._halfXSize, -this._halfYSize)
    this._ctx.fillStyle = "black"
    this._ctx.stroke()
    this._ctx.closePath()
  }

  edgeCollision(player) {
    if (player.x <= -this._halfXSize) {
      player.actions.left = false
    }

    if (player.x + player.w >= this._halfXSize) {
      player.actions.right = false
    }

    if (player.y <= -this._halfYSize) {
      player.actions.up = false
    }

    if (player.y + player.w >= this._halfYSize) {
      player.actions.down = false
    }
  }
}
