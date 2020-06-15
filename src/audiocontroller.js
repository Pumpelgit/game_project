class AudioController {
  constructor() {
    this._audioArray = []

    this._audioList = {
      music: "./src/sounds/An invisible force - Carlos Santafe.mp3",
      campfireloop: "./src/sounds/campfireloop.mp3",
      door: "./src/sounds/doorclose.wav",
      freeze: "./src/sounds/freeze.mp3",
      lose: "./src/sounds/lose.mp3",
      pickup0: "./src/sounds/pickup0.wav",
      pickup1: "./src/sounds/pickup1.wav",
      pickup2: "./src/sounds/pickup2.wav",
      uiclick: "./src/sounds/uiclick.wav",
    }

    this._loadAudio()
  }

  _loadAudio() {
    for (const audioName in this._audioList) {
      this._audioArray.push({
        name: audioName,
        audio: new Audio(),
        path: this._audioList[audioName],
      })
    }

    for (let i = 0; i < this._audioArray.length; i++) {
      this._audioArray[i].audio.src = this._audioArray[i].path
    }
  }

  playAudio(audioName, volume = 1, loop = false) {
    const element = this._getAudio(audioName)

    element.audio.play()
    element.audio.volume = volume
    element.audio.loop = loop
  }

  stopAll() {
    for (let i = 0; i < this._audioArray.length; i++) {
      this._audioArray[i].audio.currentTime = 0
      this._audioArray[i].audio.pause()
    }
  }

  fadeVolume(audioName, time) {
    const element = this._getAudio(audioName)
    const fadeAudioIntervalId = setInterval(() => {
      element.audio.volume = element.audio.volume - 0.1 < 0 ? 0 : element.audio.volume - 0.1
      if (element.audio.volume <= 0) {
        element.audio.pause()
        element.audio.volume = 1
        clearInterval(fadeAudioIntervalId)
      }
    }, time)
  }

  setVolume(audioName, volume) {
    const element = this._getAudio(audioName)
    let temp_volume = volume
    if( temp_volume < 0) {
        temp_volume = 0
    } else if (temp_volume > 1) {
        temp_volume = 1
    }
    element.audio.volume = temp_volume
  }

  _getAudio(audioName) {
    return this._audioArray.find(element => element.name === audioName)
  }
}
