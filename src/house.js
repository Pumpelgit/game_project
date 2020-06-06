class House {
  constructor(ctx) {
    this._ctx = ctx

    this._x = this._ctx.canvas.width / 2 - 50
    this._y = this._ctx.canvas.height / 2 - 50

    this.houseParts = {
      leftWallUpper: {
        x: this._x,
        y: this._y,
        w: 20,
        h: 60,
      },
      lefWallLower: {
        x: this._x,
        y: this._y + 100,
        w: 20,
        h: 60,
      },
      upperWall: {
        x: this._x + 20,
        y: this._y,
        w: 130,
        h: 20,
      },
      rightWall: {
        x: this._x + 150,
        y: this._y,
        w: 20,
        h: 160,
      },
      lowerWall: {
        x: this._x + 20,
        y: this._y + 140,
        w: 130,
        h: 20,
      },
    }

    this.roof = {
      x: this._x,
      y: this._y,
      w: 170,
      h: 160,
    }

    this.insideArea = {
      x: this.houseParts.leftWallUpper.x + this.houseParts.leftWallUpper.w,
      y: this.houseParts.upperWall.y + this.houseParts.upperWall.h,
      w: this.houseParts.upperWall.w,
      h:
        this.houseParts.rightWall.h -
        this.houseParts.upperWall.h -
        this.houseParts.lowerWall.h,
    }
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "lightgrey"
    this._ctx.fillRect(this._x, this._y, 170, this.houseParts.rightWall.h)
    this._ctx.closePath()

    this._ctx.beginPath()
    this._ctx.fillStyle = "RosyBrown"
    for (const elements in this.houseParts) {
      this._ctx.fillRect(
        this.houseParts[elements].x,
        this.houseParts[elements].y,
        this.houseParts[elements].w,
        this.houseParts[elements].h
      )
    }
    this._ctx.closePath()
  }

  drawRoof() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "SaddleBrown"
    this._ctx.fillRect(this.roof.x, this.roof.y, this.roof.w, this.roof.h)
    this._ctx.closePath()

  }

  drawOutsideBlack(player) {
    this._ctx.beginPath()
    this._ctx.fillStyle = "black"
    this._ctx.fillRect(
      player.x - this._ctx.canvas.width / 2,
      player.y - this._ctx.canvas.height / 2,
      this._ctx.canvas.width,
      this._ctx.canvas.height
    )
    this._ctx.closePath()
  }

  checkPlayerInside(player) {
    const colX =
      player.x + player.w > this.insideArea.x &&
      player.x < this.insideArea.x + this.insideArea.w
    const colY =
      player.y + player.h > this.insideArea.y &&
      player.y < this.insideArea.y + this.insideArea.h

    player.insideHouse = colX && colY
  }
}
