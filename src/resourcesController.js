class ResourceController {
    constructor() {
        
        this.currentWood    = 15
        this.currentFood    = 16
        this._woodIntervalID = null
        this._foodIntervalID = null

        this._woodIntervalID = setInterval(()=> {
            this.currentWood--
        },1000)

        this._foodIntervalID = setInterval(()=> {
            this.currentFood--
        },1000)
    }

    addWood(amount) {
        this.currentWood +=amount
    }

    addFood(amount) {
        this.currentFood +=amount
    }
    
}