class Player {
  constructor(ctx) {
    this._ctx = ctx

    this.x = this._ctx.canvas.width / 2
    this.y = this._ctx.canvas.height / 2

    this.w = 20
    this.h = 20

    this.vx = 0
    this.vy = 0

    this._horizontalSpeed = 2
    this._verticalSpeed = 2

    this.actions = {
      up: false,
      right: false,
      down: false,
      left: false,
    }

    this.collisions = {
      up: false,
      right: false,
      down: false,
      left: false,
    }

    this._setListeners()

    this.insideHouse = true

    this._trailArray = []

    this._ticks = 0
  }

  draw() {
    this._trailLogic()
    if (!this.insideHouse) {
      for (let i = 0; i < this._trailArray.length; i++) {
        this._trailArray[i].draw()
      }
    }
    this._ctx.beginPath()
    this._ctx.fillStyle = "black"
    this._ctx.fillRect(this.x, this.y, this.w, this.h)
    this._ctx.closePath()

  }

  move() {
    this._checkActions()
    this.x += this.vx
    this.y += this.vy
    this._resetCollsions()
  }

  _setListeners() {
    document.addEventListener("keydown", (e) => {
      this._setAction(e.keyCode, true)
    })

    document.addEventListener("keyup", (e) => {
      this._setAction(e.keyCode, false)
    })
  }

  _setAction(key, actionState) {
    switch (key) {
      case UP:
        this.actions.up = actionState
        break
      case RIGHT:
        this.actions.right = actionState
        break
      case LEFT:
        this.actions.left = actionState
        break
      case DOWN:
        this.actions.down = actionState
        break
    }
  }

  _checkActions() {
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

  _trailLogic() {
    if (!this.insideHouse) {
      if (this._ticks++ > 2 && (this._vx != 0 || this._vy !=0)) {
        if (this._trailArray.length < MAXTRAILSPRITES) {
          this._trailArray.push(new Trail(this._ctx, this))
        }       
        this._ticks = 0
      }
    }
    for (let i = 0; i < this._trailArray.length; i++) {
      this._trailArray[i].ticksAlive++
    }

    this._trailArray = this._trailArray.filter((trail) => trail.ticksAlive <= 180)
  }
}
