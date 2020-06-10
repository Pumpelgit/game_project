class TextUI {
    constructor(ctx, anchorPoint, offsetX, offsetY, fontSize) {
        this._ctx = ctx
        this._anchorPoint = anchorPoint
        this._offsetX = offsetX
        this._offsetY = offsetY
        this._font = `${fontSize}px Arial`
        
    }

    draw(text,color = 'black') {
        this._ctx.beginPath()
        this._ctx.fillStyle = color
        this._ctx.font = this._font
        this._ctx.fillText(text,this._anchorPoint.x + this._offsetX,this._anchorPoint.y + this._offsetY)
        this._ctx.closePath()
    }
}