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
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "red"
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
}
