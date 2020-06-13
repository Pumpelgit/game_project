class SmokeParticle {
  constructor(ctx, xPos, yPos) {
    this._ctx = ctx

    this._smokeImg = new Image()
    this._smokeImg.src = "./src/sprites/smoke.png"
    this._x = xPos
    this._y = yPos - 10
    this._w = 15
    this._h = 15

    this._particleAmount = 5
    this._particlePositionsArray = []

    this._initializeParticles()
  }

  _initializeParticles() {
    for (let i = 0; i < this._particleAmount; i++) {
      this._particlePositionsArray.push({
        x: this._x,
        y: this._y,
        vx: 0.02,
        vy: -0.1,
        ticks: i * 100
      })
    }
  }

  draw() {
    for (let i = 0; i < this._particlePositionsArray.length; i++) {
      this._drawParticle(this._particlePositionsArray[i])
    }
  }

  _drawParticle(particle) {
    const randVX = Math.random() * 2 - 1
    const randVY = Math.random() * 2 - 1

    particle.x += particle.vx + randVX
    particle.y += particle.vy + randVY
    this._ctx.drawImage(this._smokeImg, particle.x, particle.y, this._w, this._h)

    if( particle.ticks++ >= 500) {
        particle.ticks = 0
        particle.x = this._x
        particle.y = this._y
    }
    
  }
}
