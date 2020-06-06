class Wood {
    constructor(ctx) {
        this._ctx = ctx

        this._x = Math.round(Math.random() * GAMEBOUNDSX)
        this._y = Math.round(Math.random() * GAMEBOUNDSY)

        this._w = 50
        this._h = 20
    }


    draw(){
        this._ctx.beginPath()
        this._ctx.fillStyle = "brown"
        this._ctx.fillRect(this._x, this._y, this._w, this._h)
        this._ctx.closePath()
    }
}