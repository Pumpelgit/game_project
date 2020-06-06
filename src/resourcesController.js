class ResourceController {
    constructor() {
        
        this._currentWood    = 15
        this._currentFood    = 15
        this._woodIntervalID = null
        this._foodIntervalID = null

        this._woodIntervalID = setInterval(()=> {
            this._currentWood--
        },1000)

        this._foodIntervalID = setInterval(()=> {
            this._currentFood--
        },1000)
    }

    addWood(amount) {
        this._currentWood +=amount
    }

    addFood(amount) {
        this._currentFood +=amount
    }
    
}