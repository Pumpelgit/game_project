class Food {
    constructor(ctx) {
        this._ctx = ctx

        this._x = Math.round(Math.random() * GAMEBOUNDSX)
        this._y = Math.round(Math.random() * GAMEBOUNDSY)

        this._r = 10
    }


    draw(){
        this._ctx.beginPath()
        this._ctx.fillStyle = 'red'
        this._ctx.arc(this._x, this._y, this._r, 0, Math.PI * 2)
        this._ctx.fill()
        this._ctx.closePath()
    }
}