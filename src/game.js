class Game {
  constructor(ctx) {
    this._ctx = ctx
    this._intervalId = null
    this._resourcesSpawnIntervalId = null

    this._player = new Player(ctx)
    this._house = new House(ctx)

    this._woodArray = []
    this._foodArray = []
    this._treeArray = []

    this._resourceController = new ResourceController()

    this._textWood = new TextUI(this._ctx, this._house.chimney, -10, 0, 12)

    this._textFood = new TextUI(
      this._ctx,
      this._house.houseParts.foodBasket,
      this._house.houseParts.foodBasket.w / 2,
      this._house.houseParts.foodBasket.h / 2,
      12
    )

    this._freezingUI = new FreezingUI(ctx,this._player)

    this._timeAliveUI = new TimeAlive(this._ctx,this._player)

    this._weather = new Weather(this._ctx, this._player)

    this._canvasPosX = this._player.x
    this._canvasPosY = this._player.y

    this._world = new World(ctx)
    this._gameover = null

    this._house.onPlayerEnter = () => {
      this._resourceController.storeResources()
    }
    this._gameFinished = false

    this._weather.onWeatherValueZero = () => {
      this._gameover = new GameOver(this._ctx, this._player,"You froze to death")
      this._gameFinished = true
      this._timeAliveUI.stopInterval()
      const button = document.getElementById("start-game")
      button.style.visibility = "visible"
      button.innerText = "Restart"
    }
  }

  start() {
    audioController.stopAll()
    this._resetGame()
    this._intervalId = setInterval(() => this._update(), 1000 / 60)
    audioController.playAudio('music',1,true)
    audioController.playAudio('campfireloop',1,true)
  }

  _resetGame() {
    clearInterval(this._intervalId)
    document.getElementById("start-game").style.visibility = "hidden"
    document.getElementById("title").style.visibility = "hidden"
    clearInterval(this._resourcesSpawnIntervalId)
    this._initializeResources()
    this._player.resetPlayerPosition()
    this._resourceController.resetResources()
    this._gameFinished = false
    this._timeAliveUI.resetTimer()
    this._weather.resetWeather()
  }

  _initializeResources() {
    this._woodArray = []
    this._foodArray = []
    this._treeArray = []

    for (let i = 0; i < STARTWOODAMOUNT; i++) {
      this._spawnWood()
    }

    for (let i = 0; i < STARTFOODAMOUNT; i++) {
      this._spawnFood()
    }
    this._resourcesSpawnIntervalId = setInterval(() => this._spawnResources(), 7000)
    this._spawnTrees()
  }

  _spawnResources() {
    if (this._woodArray.length< MAXWOOD) {
      this._spawnWood()
    }

    if (this._foodArray.length< MAXFOOD) {
      this._spawnFood()
    }
  }

  _spawnWood() {
      this._woodArray.push(new Wood(this._ctx))    
  }

  _spawnFood() {
    this._foodArray.push(new Food(this._ctx))
  }

  _spawnTrees() {
    for (let i = 0; i < TREES; i++) {
      this._treeArray.push(new Tree(this._ctx))
    }
  }

  _update() {
    this._clear()
    if (this._gameFinished) {

      this._gameover.draw()
      this._timeAliveUI.drawGameOver()

    } else {

      this._draw()
      this._move()
    }
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
    if (this._player.insideHouse) {

      document.getElementById("canvas").style.backgroundColor = "black"

      //this._house.drawOutsideBlack(this._player)
      this._house.draw()
      //this._textWood.draw(this._resourceController.currentWood)
      //this._textFood.draw(this._resourceController.currentFood)
      this._player.draw()
    } else {

      document.getElementById("canvas").style.backgroundColor = "whitesmoke"
      for (let i = 0; i < this._woodArray.length; i++) {
        this._woodArray[i].draw()
      }

      for (let i = 0; i < this._foodArray.length; i++) {
        this._foodArray[i].draw()
      }

      
      this._player.draw()
      this._house.drawRoof()
          for (let i = 0; i < this._treeArray.length; i++) {
            this._treeArray[i].draw()
          }
    }
    
    if (!this._player.insideHouse || this._resourceController.isStarvingOrFreezing()) {
      this._freezingUI.draw(true,this._weather.getWeatherValue())
      this._weather.draw()
      this._weather.DecreaseWeatherValue()
    } else {
      this._freezingUI.draw(false,this._weather.getWeatherValue())
      this._weather.IncreaseWeatherValue()
    }
    this._world.draw()
    this._timeAliveUI.draw(this._weather.getWeatherValue())
  }

  _move() {
    this._checkPlayerHouseCollisions()
    this._world.edgeCollision(this._player)
    this._player.move()
    this._checkResourcesCollision()
    this._house.checkPlayerInside(this._player)
    this._checkCanvasMovement()
    this._checkResourcesCollected()
  }

  _checkCanvasMovement() {
    const player = this._player
    this._ctx.translate(this._canvasPosX - player.x, this._canvasPosY - player.y)
    this._canvasPosX = this._player.x
    this._canvasPosY = this._player.y
  }

  _checkResourcesCollected() {
    this._resourceController.decayResources()
    this._house.setChimneyValue(this._resourceController.currentWood / MAXWOOD)
    this._house.setFoodBasketValue(this._resourceController.currentFood / MAXFOOD)
  }

  _checkResourcesCollision() {
    const player = this._player

    for (let i = 0; i < this._woodArray.length; i++) {
      if (this._woodArray[i].checkCollision(player)) {
        this._resourceController.pickUpWood(this._woodArray[i].amount)
        this._woodArray.splice(i, 1)
      }
    }

    for (let i = 0; i < this._foodArray.length; i++) {
      this._foodArray[i].checkCollision(player)
      if (this._foodArray[i].checkCollision(player)) {
        this._resourceController.pickUpFood(this._foodArray[i].amount)
        this._foodArray.splice(i, 1)
      }
    }
  }

  _checkPlayerHouseCollisions() {
    const player = this._player
    const houseParts = this._house.houseParts

    for (const housePart in houseParts) {
      if (!houseParts[housePart].collidable) {
        continue
      }

      const colX =
        player.x + player.w >= houseParts[housePart].x && player.x <= houseParts[housePart].x + houseParts[housePart].w

      const colY =
        player.y + player.h >= houseParts[housePart].y && player.y <= houseParts[housePart].y + houseParts[housePart].h

      if (colX && colY) {
        const colHouseLeft = player.x + player.w >= houseParts[housePart].x && player.x <= houseParts[housePart].x

        const colHouseRight =
          player.x <= houseParts[housePart].x + houseParts[housePart].w &&
          player.x + player.w >= houseParts[housePart].x + houseParts[housePart].w

        const colHouseUp = player.y + player.h >= houseParts[housePart].y && player.y <= houseParts[housePart].y

        const colHouseDown =
          player.y <= houseParts[housePart].y + houseParts[housePart].h &&
          player.y + player.h >= houseParts[housePart].y + houseParts[housePart].h

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
