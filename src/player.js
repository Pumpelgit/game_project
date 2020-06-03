class Player {
    constructor(ctx) {
        this._ctx = ctx

        this.x = this._ctx.canvas.width / 2
        this.y = this._ctx.canvas.height / 2

        this.w = 25
        this.h = 25

        this.vx = 0
        this.vy = 0

        this._horizontalSpeed = 3
        this._verticalSpeed = 3

        this.actions = {
            up: false,
            right: false,
            down: false,
            left: false
        }

        this._setListeners()

    }

    draw() {
        this._ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move() {
        this._checkActions()
        this.x += this.vx
        this.y += this.vy

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
        
        if (this.actions.up) {
            this.vy = -this._verticalSpeed
        } else if (this.actions.down) {
            this.vy = this._verticalSpeed
        } else {
            this.vy = 0
        }

        if (this.actions.right) {
            this.vx = this._horizontalSpeed
        } else if (this.actions.left) {
            this.vx = -this._horizontalSpeed
        } else {
            this.vx = 0
        }
    }
}