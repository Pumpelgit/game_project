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

  DecreaseWeatherValue() {
    let newValue = this._currentWeatherValue - (0.025 / 100)
    this._currentWeatherValue = newValue
    if (this._currentWeatherValue < 0) {
      this._currentWeatherValue = 0
      this.onWeatherValueZero()
    }
    this._setMusicVolumeAccordingToWeather()
  }

  IncreaseWeatherValue() {
    let newValue = this._currentWeatherValue + (0.35 / 100)
    this._currentWeatherValue = newValue > 1 ? 1 : newValue  
    this._setMusicVolumeAccordingToWeather()
    
  }

  resetWeather() {
    this._currentWeatherValue = 1
  }

  _setMusicVolumeAccordingToWeather() {
    const musicVolume = this._currentWeatherValue > 0.3 ? 1 : (this._currentWeatherValue - 0.1) / 0.2

    audioController.setVolume("music", musicVolume)
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
