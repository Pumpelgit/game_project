class Food {
    constructor(ctx) {
        this._ctx = ctx

        this._x = Math.round((Math.random() * GAMEBOUNDSX) - (GAMEBOUNDSX / 2))
        this._y = Math.round((Math.random() * GAMEBOUNDSY) - (GAMEBOUNDSY / 2))

        this._r = 10

        this.amount = 5
    }


    draw(){
        this._ctx.beginPath()
        this._ctx.fillStyle = 'red'
        this._ctx.arc(this._x, this._y, this._r, 0, Math.PI * 2)
        this._ctx.fill()
        this._ctx.closePath()
    }

    checkCollision(player) {
        const colX = player.x + player.w >= this._x - this._r && player.x <= this._x + this._r
        const colY = player.y + player.h >= this._y - this._r && player.y <= this._y + this._r

        if ( colX && colY) {
            return true
        }
    }
}