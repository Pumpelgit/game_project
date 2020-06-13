class AudioController {
    constructor() {
        this._audioArray = []


        this._audioList = {
            music: './src/sounds/An invisible force - Carlos Santafe.mp3',
            campfireloop: './src/sounds/campfireloop.mp3',
            door: './src/sounds/doorclose.mp3',
            freeze: './src/sounds/freeze.mp3',
            lose: './src/sounds/lose.mp3',
            pickup1: './src/sounds/pickup1.wav',
            pickup2: './src/sounds/pickup2.wav',
            pickup3: './src/sounds/pickup3.wav',
            uiclick: './src/sounds/uiclick.wav'
        }

        this._loadAudio()

    }

    _loadAudio() {
        for (const audioName in this._audioList) {
            this._audioArray.push({
                name: audioName,
                audio: new Audio(),
                path: this._audioList[audioName]
            })
        }

        for ( let i = 0; i < this._audioArray.length; i++) {
            this._audioArray[i].audio.src = this._audioArray[i].path            
        }
    }

    playAudio(audioName) {
        const element = this._audioArray.find((audio) => audio.name === audioName)

        element.audio.play()
    }

    stopAll() {
        for (const element in this._audioArray) {
            element.audio.pause()
        }
    }
}