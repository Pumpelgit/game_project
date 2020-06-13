class Weather {
  constructor(ctx, player) {
    this._ctx = ctx
    this._player = player

    this._x = this._player.x + this._player.w / 2
    this._y = this._player.y + this._player.h / 2

    this._currentWeatherValue = 1 //1 = open, 0 = closed

    this._hideWeatherCheat = false
    this.onWeatherValueZero = null
    this._setListeners()
  }

  draw() {
    if (this._hideWeatherCheat) {
      return
    }
    this._x = this._player.x + this._player.w / 2
    this._y = this._player.y + this._player.h / 2

    const gradient = this._ctx.createRadialGradient(this._x, this._y, 0, this._x, this._y, 400)

    if (this._currentWeatherValue < 0) {
      this._currentWeatherValue = 0
      this.onWeatherValueZero()
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

  updateWeatherValue(finalValue) {
    this._currentWeatherValue -= 0.05 / 100
  }

  setWeaterValue(value) {
    this._currentWeatherValue = value
  }

  _setListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 71) {
        this._hideWeatherCheat = !this._hideWeatherCheat
      }
    })
  }

  getWeatherValue() {
    return this._currentWeatherValue
  }
}
