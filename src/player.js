class Player {
    constructor(ctx) {
        this._ctx = ctx

        this.x = this._ctx.canvas.width / 2
        this.y = this._ctx.canvas.height / 2

        this.w = 25
        this.h = 25

        this.vx = 0
        this.vy = 0

        this._horizontalSpeed = 4
        this._verticalSpeed = 4

        this.actions = {
            up: false,
            right: false,
            down: false,
            left: false
        }

        this.collisions = {
            up: false,
            right: false,
            down: false,
            left: false
        }

        this._setListeners()

        this.insideHouse = true

    }

    draw() {
        this._ctx.beginPath()
        this._ctx.fillStyle = "red"
        this._ctx.fillRect(this.x, this.y, this.w, this.h)
        this._ctx.closePath()
        this._checkMapEdges()
    }

    move() {
        this._checkActions()
        this.x += this.vx
        this.y += this.vy
        this._resetCollsions()
    }

    _setListeners() {
        document.addEventListener('keydown', e => {
            this._setAction(e.keyCode,true)
        })

        document.addEventListener('keyup', e => {
            this._setAction(e.keyCode,false)
        })
    }

    _setAction(key, actionState) {
        switch(key) {
            case UP:
                this.actions.up = actionState
                break;
            case RIGHT:
                this.actions.right = actionState
                break;
            case LEFT:
                this.actions.left = actionState
                break;
            case DOWN:
                this.actions.down = actionState
                break;
        }
    }

    _checkActions() {
        
        //console.log(`action up ${this.actions.up} col up ${this.collisions.up}`)
        //console.log(`action down ${this.actions.down} col down ${this.collisions.down}`)
        //console.log(`action left ${this.actions.left} col left ${this.collisions.left}`)
        //console.log(`action right ${this.actions.right} col right ${this.collisions.right}`)
        
        if (this.actions.up && !this.collisions.up) {
            this.vy = -this._verticalSpeed
        } else if (this.actions.down && !this.collisions.down) {
            this.vy = this._verticalSpeed
        } else {
            this.vy = 0
        }

        if (this.actions.right && !this.collisions.right) {
            this.vx = this._horizontalSpeed
        } else if (this.actions.left && !this.collisions.left) {
            this.vx = -this._horizontalSpeed
        } else {
            this.vx = 0
        }
    }

    _resetCollsions() {
        for (const elements in this.collisions) {
            this.collisions[elements] = false
        }
    }

    _checkMapEdges() {

        this._ctx.beginPath();
        this._ctx.moveTo(-(GAMEBOUNDSX / 2), -(GAMEBOUNDSY / 2));

        this._ctx.lineTo( (GAMEBOUNDSX / 2), -(GAMEBOUNDSY / 2));
        this._ctx.lineTo( (GAMEBOUNDSX / 2),  (GAMEBOUNDSY / 2));
        this._ctx.lineTo(-(GAMEBOUNDSX / 2),  (GAMEBOUNDSY / 2));
        this._ctx.lineTo(-(GAMEBOUNDSX / 2), -(GAMEBOUNDSY / 2));
        this._ctx.stroke(); 
        this._ctx.closePath();

        if( this.x <= -(GAMEBOUNDSX / 2)) {
            this.actions.left = false
        }

        if( this.x + this.w >= (GAMEBOUNDSX / 2)) {
            this.actions.right = false
        }

        if( this.y <= -(GAMEBOUNDSY / 2)) {
            this.actions.up = false
        }

        if( this.y + this.w >= (GAMEBOUNDSY / 2)) {
            this.actions.down = false
        }
    }
}