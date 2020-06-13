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
        h: 50,
        color: "RosyBrown",
        collidable: true,
      },
      lefWallLower: {
        x: this._x,
        y: this._y + 110,
        w: 20,
        h: 50,
        color: "RosyBrown",
        collidable: true,
      },
      upperWall: {
        x: this._x + 20,
        y: this._y,
        w: 130,
        h: 20,
        color: "RosyBrown",
        collidable: true,
      },
      rightWall: {
        x: this._x + 150,
        y: this._y,
        w: 20,
        h: 160,
        color: "RosyBrown",
        collidable: true,
      },
      lowerWall: {
        x: this._x + 20,
        y: this._y + 140,
        w: 130,
        h: 20,
        color: "RosyBrown",
        collidable: true,
      },
      foodBasket: {
        x: this._x + 22,
        y: this._y + 22,
        w: 50,
        h: 20,
        color: "SaddleBrown",
        collidable: false,
      },
    }

    this._roofImg = new Image()
    this._roofImg.src = "./src/sprites/roof.png"
    this.roof = {
      x: this._x,
      y: this._y,
      w: 170,
      h: 160,
    }

    this.chimney = {
      x: this._x + 150,
      y: this._y + 80,
      r: 70,
      startAngle: Math.PI / 2,
      endAngle: Math.PI * (3 / 2),
      drawValue: 1,
    }

    this.insideArea = {
      x: this.houseParts.leftWallUpper.x + this.houseParts.leftWallUpper.w,
      y: this.houseParts.upperWall.y + this.houseParts.upperWall.h,
      w: this.houseParts.upperWall.w,
      h: this.houseParts.rightWall.h - this.houseParts.upperWall.h - this.houseParts.lowerWall.h,
    }

    this.onPlayerEnter = null

    this._smoke = new SmokeParticle(this._ctx, this.chimney.x, this.chimney.y)
  }

  draw() {
    this._ctx.beginPath()
    this._ctx.fillStyle = "lightgrey"
    this._ctx.fillRect(this._x, this._y, 170, this.houseParts.rightWall.h)
    this._ctx.closePath()

    this._drawChimney()

    for (const elements in this.houseParts) {
      this._ctx.beginPath()
      this._ctx.fillStyle = this.houseParts[elements].color
      this._ctx.fillRect(
        this.houseParts[elements].x,
        this.houseParts[elements].y,
        this.houseParts[elements].w,
        this.houseParts[elements].h
      )
      this._ctx.closePath()
    }
  }

  drawRoof() {
    /*this._ctx.beginPath()
    this._ctx.fillStyle = "SaddleBrown"
    this._ctx.fillRect(this.roof.x, this.roof.y, this.roof.w, this.roof.h)
    this._ctx.closePath()*/
    this._ctx.drawImage(this._roofImg, this.roof.x, this.roof.y, this.roof.w, this.roof.h)

    if (this.chimney.drawValue > 0) {
      this._smoke.draw()
    }
  }

  _drawChimney() {
    if (this.chimney.drawValue <= 0) {
      this.chimney.drawValue = 0
      return
    }

    this._ctx.beginPath()
    const gradient = this._ctx.createRadialGradient(
      this.chimney.x,
      this.chimney.y,
      0,
      this.chimney.x,
      this.chimney.y,
      this.chimney.r
    )

    const finalValue = this.chimney.drawValue + this._randomiseChimneyAnimation()

    gradient.addColorStop(0, "DarkOrange")
    gradient.addColorStop(0.35 * finalValue, "Gold")
    gradient.addColorStop(finalValue, "lightgrey")
    this._ctx.fillStyle = gradient

    this._ctx.arc(this.chimney.x, this.chimney.y, this.chimney.r, this.chimney.startAngle, this.chimney.endAngle)
    this._ctx.fill()
    this._ctx.closePath()
  }

  _drawSmokeOutSide() {}

  _randomiseChimneyAnimation() {
    const randValue = Math.random() * 0.1

    if (this.chimney.drawValue + randValue >= 1) {
      return 0
    }

    return randValue
  }

  setChimneyValue(value) {
    this.chimney.drawValue = value > 1 ? 1 : value
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
    const colX = player.x + player.w > this.insideArea.x && player.x < this.insideArea.x + this.insideArea.w
    const colY = player.y + player.h > this.insideArea.y && player.y < this.insideArea.y + this.insideArea.h

    //check if it comes from outside so it only fires once
    if (!player.insideHouse && colX && colY) {
      this.onPlayerEnter()
      console.log("player enters house")
    }
    player.insideHouse = colX && colY
  }
}
