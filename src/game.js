class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this._intervalId = null

        this._player = new Player(ctx)
        this._house = new House(ctx)

        this._woodArray = []
        this._foodArray = []
        

    }

    start() {
        this._spawnResources()
        this._intervalId = setInterval( () => this._update(), 1000 / 60)
    }

    _spawnResources() {
        this._spawnWood()
        this._spawnFood()
    }

    _spawnWood() {
        for (let i = 0; i < WOODAMOUNT; i++) {
            this._woodArray.push(new Wood(this._ctx))
        }
    }

    _spawnFood() {
        for (let i = 0; i < FOODAMOUNT; i++) {
            this._foodArray.push(new Food(this._ctx))
        }
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

        for (let i = 0; i < WOODAMOUNT; i++) {
            this._woodArray[i].draw()
        }

        for (let i = 0; i < FOODAMOUNT; i++) {
            this._foodArray[i].draw()
        }
    }

    _move() {
        this._checkPlayerHouseCollisions()
        this._player.move()
        this._house.checkPlayerInside(this._player)
        this._checkCanvasMovement()

    }

    _checkCanvasMovement() {
        const player = this._player        
        
        this._ctx.translate( -player.vx, -player.vy)
    }

    _checkPlayerHouseCollisions() {
        const player = this._player;
        const houseParts = this._house.houseParts

        for(const housePart in houseParts)
        {

            const colX = player.x + player.w > houseParts[housePart].x && player.x < houseParts[housePart].x + houseParts[housePart].w
            const colY = player.y + player.h > houseParts[housePart].y && player.y < houseParts[housePart].y + houseParts[housePart].h

            
            const colLeft  = player.x + player.w > houseParts[housePart].x && player.x < houseParts[housePart].x 
            const colRight = player.x < houseParts[housePart].x + houseParts[housePart].w && player.x + player.w > houseParts[housePart].x + houseParts[housePart].w
            const colUp    = player.y + player.h > houseParts[housePart].y && player.y < houseParts[housePart].y
            const colDown  = player.y < houseParts[housePart].y + houseParts[housePart].h && player.y + player.h > houseParts[housePart].y + houseParts[housePart].h

            if ( colX && colY )
            {
                if (colLeft && player.actions.right) {
                    player.collisions.right = true
                }
    
                if (colRight && player.actions.left) {
                    player.collisions.left = true
                }
                   
                if (colUp && player.actions.down) {
                    player.collisions.down = true
                }
    
                if (colDown && player.actions.up) {
                    player.collisions.up = true
                }
            }
        }
    }
}