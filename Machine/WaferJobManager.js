class Wafer {
  constructor(option) {
    option = option || {}
    this.id = option.id || undefined
    this.path = option.path || []
    this.stage = this.path[Symbol.iterator]()
    this.currentIndex = 0
    this.nextIndex = 0
  }

  nextStage() {
    return (nextStage =
      this.currentIndex + 1 < this.path.length
        ? this.path[this.currentIndex + 1]
        : undefined)
  }

  currentStage() {
    return (currentStage =
      this.currentIndex < this.path.length
        ? this.path[this.currentIndex]
        : undefined)
  }

  isPickable() {
    return this.currentStage().isReady() && this.nextStage().isEmpty()
  }
}

class WaferJobManager {
  constructor() {
    this.que = [] //array of Wafer[class]
  }

  GetPickableWafer() {
    let wafer = undefined

    return (wafer = this.que.find(wafer => {
      wafer.isPickable()
    }))
  }
}

const waferJobManager = new WaferJobManager()

module.exports = waferJobManager
