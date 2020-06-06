class Weather {
  constructor(ctx, player) {
    this._ctx = ctx
    this._player = player

    this._x = this._player.x + this._player.w / 2
    this._y = this._player.y + this._player.h / 2

    this._currentWeatherValue = 1 //1 = open, 0 = closed

    this._intervalID = setInterval(()=> {
        if (!this._player.insideHouse){            
            this._currentWeatherValue -= 0.005
        }
        else {
            this._currentWeatherValue = 1
        }
    }, 100)
  }

  draw() {
    this._x = this._player.x + this._player.w / 2
    this._y = this._player.y + this._player.h / 2

    const gradient = this._ctx.createRadialGradient(
      this._x,
      this._y,
      0,
      this._x,
      this._y,
      600
    )

    if ( this._currentWeatherValue <0) {
        this._currentWeatherValue = 0
    }

    gradient.addColorStop(0, "transparent")
    gradient.addColorStop(this._currentWeatherValue, "black")
    this._ctx.fillStyle = gradient

    this._ctx.fillRect(
      this._player.x - this._ctx.canvas.width / 2,
      this._player.y - this._ctx.canvas.height / 2,
      this._ctx.canvas.width,
      this._ctx.canvas.height
    )
  }

  updateWeatherValue(value) {
      this._currentWeatherValue = value
  }
}
