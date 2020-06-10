class ResourceController {
  constructor() {
    this.currentWood = 40
    this.currentFood = 40

    this.woodCarrying = 0
    this.foodCarrying = 0

  }

  addWood(amount) {
    this.currentWood += amount
  }

  addFood(amount) {
    this.currentFood += amount
  }

  pickUpWood(amount) {
      this.woodCarrying += amount
  }

  pickUpFood(amount) {
      this.foodCarrying += amount
  }

  storeResources() {
      this.addWood(this.woodCarrying)
      this.addFood(this.foodCarrying)
      this.foodCarrying = 0
      this.woodCarrying = 0
      console.log('Storing resources')
  }

  decayResources() {
    this.currentWood = this.currentWood <= 0 ? 0 : this.currentWood - (1 / 60)
    this.currentFood = this.currentFood <= 0 ? 0 : this.currentFood - (1 / 60)
  }

  isStarvingOrFreezing() {
    return this.currentWood === 0 || this.currentFood === 0
  }
}
