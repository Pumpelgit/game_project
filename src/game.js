class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this._intervalId = null

        this._player = new Player(ctx)
        this._house = new House(ctx)

    }

    start() {

        this._intervalId = setInterval( () => this._update(), 1000 / 60)
    }

    _update() {
        this._clear()
        this._draw()
        this._move()
    }

    _clear() {
        const player = this._player
        this._ctx.clearRect( player.x - (this._ctx.canvas.width / 2), player.y - (this._ctx.canvas.height / 2), this._ctx.canvas.width, this._ctx.canvas.height)
    }

    _draw() {
        this._house.draw()
        this._player.draw()
    }

    _move() {
        this._player.move()
        this._house.isPlayerInside(this._player)
        this._checkCanvasMovement()

    }

    _checkCanvasMovement() {
        const player = this._player        
        
        this._ctx.translate( -player.vx, -player.vy)
    }

    _checkPlayerHouseCollisions() {
        const player = this._player;

        for(const houseParts in this._house.houseParts)
        {

        }
    }
}