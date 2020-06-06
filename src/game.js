class Game {
  constructor(ctx) {
    this._ctx = ctx
    this._intervalId = null

    this._player = new Player(ctx)
    this._house = new House(ctx)

    this._woodArray = []
    this._foodArray = []

    this._resourceController = new ResourceController()

    this._textWood = new TextUI(this._ctx, this._player, 1)
    this._textFood = new TextUI(this._ctx, this._player, 2)

    this._weather = new Weather(this._ctx, this._player)

    this._canvasPosX = 0
    this._canvasPosY = 0
  }

  start() {
    this._spawnResources()
    this._intervalId = setInterval(() => this._update(), 1000 / 60)
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
    this._ctx.clearRect(
      player.x - this._ctx.canvas.width / 2,
      player.y - this._ctx.canvas.height / 2,
      this._ctx.canvas.width,
      this._ctx.canvas.height
    )
  }

  _draw() {
    if (!this._player.insideHouse) {
      for (let i = 0; i < this._woodArray.length; i++) {
        this._woodArray[i].draw()
      }

      for (let i = 0; i < this._foodArray.length; i++) {
        this._foodArray[i].draw()
      }

      this._textWood.draw(this._resourceController.currentWood)
      this._textFood.draw(this._resourceController.currentFood)

      this._house.drawRoof()
      this._player.draw()
      this._weather.draw()
    } else {
      this._house.drawOutsideBlack(this._player)
      this._house.draw()
      this._player.draw()
    }
  }

  _move() {
    this._checkPlayerHouseCollisions()
    this._player.move()
    this._checkResourcesCollision()
    this._house.checkPlayerInside(this._player)
    this._checkCanvasMovement()
  }

  _checkCanvasMovement() {
    const player = this._player

    this._canvasPosX = this._player.x - this._ctx.canvas.width / 2
    this._canvasPosY = this._player.x - this._ctx.canvas.width / 2
    this._ctx.translate(-player.x, -player.vy)
  }

  _checkResourcesCollision() {
    const player = this._player

    for (let i = 0; i < this._woodArray.length; i++) {
      if (this._woodArray[i].checkCollision(player)) {
        this._resourceController.addWood(this._woodArray[i].amount)
        this._woodArray.splice(i, 1)
      }
    }

    for (let i = 0; i < this._foodArray.length; i++) {
      this._foodArray[i].checkCollision(player)
      if (this._foodArray[i].checkCollision(player)) {
        this._resourceController.addFood(this._foodArray[i].amount)
        this._foodArray.splice(i, 1)
      }
    }
  }

  _checkPlayerHouseCollisions() {
    const player = this._player
    const houseParts = this._house.houseParts

    for (const housePart in houseParts) {
      const colX =
        player.x + player.w >= houseParts[housePart].x &&
        player.x <= houseParts[housePart].x + houseParts[housePart].w

      const colY =
        player.y + player.h >= houseParts[housePart].y &&
        player.y <= houseParts[housePart].y + houseParts[housePart].h

      if (colX && colY) {
        const colHouseLeft =
          player.x + player.w >= houseParts[housePart].x &&
          player.x <= houseParts[housePart].x

        const colHouseRight =
          player.x <= houseParts[housePart].x + houseParts[housePart].w &&
          player.x + player.w >=
            houseParts[housePart].x + houseParts[housePart].w

        const colHouseUp =
          player.y + player.h >= houseParts[housePart].y &&
          player.y <= houseParts[housePart].y

        const colHouseDown =
          player.y <= houseParts[housePart].y + houseParts[housePart].h &&
          player.y + player.h >=
            houseParts[housePart].y + houseParts[housePart].h

        if (colHouseLeft && player.actions.right) {
          player.collisions.right = true
          player.x = houseParts[housePart].x - player.w
        }

        if (colHouseRight && player.actions.left) {
          player.collisions.left = true
          player.x = houseParts[housePart].x + houseParts[housePart].w
        }

        if (colHouseUp && player.actions.down) {
          player.collisions.down = true
          player.y = houseParts[housePart].y - player.h
        }

        if (colHouseDown && player.actions.up) {
          player.collisions.up = true
          player.y = houseParts[housePart].y + houseParts[housePart].h
        }
      }
    }
  }
}
