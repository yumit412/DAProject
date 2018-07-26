class Stage {
  constructor(option) {
    option = option || {}
    this.id = option.id || undefined
    this.path = option.path || []
    this.wafer = undefined
    this.isReady = option.isReady || false
  }

  AssignWafer(wafer) {
    this.wafer = wafer || undefined
  }

  ReleaseWafer() {
    this.wafer = undefined
  }

  isReady() {}

  isEmpty() {
    return this.wafer ? false : true
  }
}

class Foup {
  constructor(option) {
    option = option || {}
    let i = 0
    let names = new Array(25).fill(null).map(v => 'slot' + i++)
    console.log(names)
    this.stages = new Array(25).fill(null).map(v => new Stage(option))
  }
}

class StageManager {
  constructor() {
    this.stages = []
  }
}

const stage_manager = new StageManager()
stage_manager.stages.push(new Foup())
stage_manager.stages.push(new Foup())

console.log(stage_manager.stages)

module.exports = stage_manager
