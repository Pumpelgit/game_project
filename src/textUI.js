class TextUI {
    constructor(ctx, player, offsetY) {
        this._ctx = ctx
        this._player = player
        this._offsetY = offsetY

        
        
    }

    draw(amount) {
        this._ctx.fillText(amount,this._player.x,this._player.y + this._player.h +(16 * this._offsetY))
    }
}