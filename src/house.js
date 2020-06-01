class House {
    constructor(ctx) {

        this._ctx = ctx

        this._x = (this._ctx.canvas.width / 2) - 50
        this._y = (this._ctx.canvas.height / 2) - 50

        this.houseParts = {
            leftWallUpper: {
                x: this._x,
                y: this._y,
                w: 20,
                h: 60
            },
            lefWallLower: {
                x: this._x,
                y: this._y + 100,
                w: 20,
                h: 60
            },
            upperWall: {
                x: this._x + 20,
                y: this._y,
                w: 130,
                h: 20
            },
            rightWall: {
                x: this._x + 150,
                y: this._y,
                w: 20,
                h: 160
            },
            lowerWall: {
                x: this._x + 20,
                y: this._y + 140,
                w: 130,
                h: 20
            },
            roof: {
                x: this._x,
                y: this._y,
                w: 170,
                h: 160
            }
        }

        this.isPlayerInside = true

        this.door = {
            x: this.houseParts.leftWallUpper.x,
            y: this.houseParts.leftWallUpper.y + this.houseParts.leftWallUpper.h,
            w: this.houseParts.leftWallUpper.w,
            h: (this.houseParts.leftWallUpper.y + this.houseParts.leftWallUpper.h) - this.houseParts.lefWallLower.y
        }
    }

    draw() {
        for (const elements in this.houseParts) {
            if( elements === 'roof' && this.isPlayerInside)
                return
            this._ctx.fillRect(
                this.houseParts[elements].x,
                this.houseParts[elements].y,
                this.houseParts[elements].w,
                this.houseParts[elements].h
            )
        }
    }
}