class FreezingUI {
  constructor(ctx, player) {
    this._ctx = ctx
    this._player = player

    this._w = 30
    this._h = 20

    this._positiveImg = new Image()

    this._positiveImg.src = "./src/sprites/snowflakepos.png"
    this._ticks = 0
  }

  draw(freezing,weatherValue) {
    if (weatherValue == 1) {
      return
    }
    if(this._ticks++< 400)
    {
      const offsetY = Math.floor((this._ticks++ / 400) * 30)
      if(freezing) {
        this._ctx.globalAlpha = this._ticks/400
        this._ctx.drawImage(this._positiveImg, this._player.x, this._player.y - (20 + offsetY), this._w, this._h)
        this._ctx.globalAlpha = 1
      }
    }

    if(this._ticks++>= 800)
    {
      this._ticks = 0
    }
  }
}
