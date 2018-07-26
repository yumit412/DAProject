const WaferJobManager = require('./WaferJobManager.js')

class Robot {
  constructor() {
    this.name = 'robot'
    this.leftHandWafer = null
    this.rightHandWafer = null
  }

  getFreeHand() {
    if (this.leftHandWafer == null) return this.leftHandWafer
    if (this.rightHandWafer == null) return this.rightHandWafer

    return undefined
  }

  noHandWithFree() {
    return this.leftHandWafer != null || this.rightHandWafer != null
      ? true
      : false
  }

  pick(wafer) {}

  doMove() {
    while (true) {
      // if no hand with free
      // place wafer
      // else
      // is there Pickable Wafer
      // pick wafer
      // and wait pick done...
      // Loop
      if (this.noHandWithFree()) {
        placeHand()
      } else if ((wafer = waferManager.GetPickableWafer())) {
        pick(wafer)
      } else {
        return
      }
      next()
    }
  }
}

function test() {
  console.log('test')
}

test()
