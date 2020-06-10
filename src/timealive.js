class TimeAlive {
    constructor(ctx,player) {
    
        this._ctx = ctx
        this._player = player

        this.daysPassed = 0
        this.hoursPassed = 0

        this._timeAliveUI = new TextUI(this._ctx,this._player,-50,-(this._ctx.canvas.width / 3 ) + 60,16)

        this._intervalID = null

        this.startInterval()
    }

    draw(weatherValue) {
        let color = 'black'
        if (this._player.insideHouse || weatherValue <= 0.5) {
            color = 'white'
        }
        
        this._timeAliveUI.draw(`Days: ${this.daysPassed} Hours: ${this.hoursPassed}`, color)
    }

    drawGameOver() {
        this._timeAliveUI.draw(`You survived ${this.daysPassed} days and ${this.hoursPassed} hours.`,'white')
    }

    stopInterval() {
        clearInterval(this._intervalID)
        this._timeAliveUI = new TextUI(ctx,this._player,-100,100,14)
    }

    startInterval() {
        this._intervalID = setInterval(() => {
            this.hoursPassed++
            if( this.hoursPassed === 24) {
                this.hoursPassed = 0
                this.daysPassed++
            }
        }, 1000);
    }
}