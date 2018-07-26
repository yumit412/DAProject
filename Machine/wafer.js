const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class Aligner {
  constructor(option) {
    option = option || []
    this.name = 'aligner'
    this.wafer = undefined
  }

  async Align() {
    // do align action
    console.log('[Aligner] align command is excuted')
    await delay(1000)
    // get wafer next target
    console.log('[Aligner] wafer id is readed' + this.wafer)
    // request to robot that pick wafer

    await robot.Pick(this.wafer)
  }

  WakeUp() {
    this.Align()
  }

  empty() {
    console.log('[aligner] wafer is popout')
    this.wafer = undefined
  }

  isReady() {
    if (!this.wafer) {
      return true
    }

    return false
  }

  isFree() {
    if (!this.wafer) {
      return true
    }

    return false
  }
}

class FoupManager {
  constructor(option) {
    option = option || {}
    this.wafers = ['1', '2', '3']
  }

  MoveWafer() {
    console.log('[FoupManager] MoveWafer()')
    if (robot.isBusy()) {
      robot.Reserve(this.MoveWafer)
      return
    }

    let wafer = this.wafers.pop()

    if (wafer) {
      console.log(wafer)
      robot.Pick(wafer)
      robot.Reserve(this.MoveWafer)
    }
  }

  Done() {
    console.log('[FoupManager] all wafer is moved')
  }
}

class Robot {
  constructor(option) {
    option = option || {}
    this.leftArm = {
      status: 'free',
      name: 'lefthand'
    }
    this.rightArm = {
      status: 'free',
      name: 'righthand'
    }
    this.reserve = []
    this.isbusy = false
    this.waferQue = []
  }

  addQue(wafer) {
    // this.waferQue.push(wafer)
    this.waferQue = wafer

    if (!this.isbusy) {
      this.doMove()
    }
  }

  noFreeHand() {
    if (this.leftArm.status != 'free' && this.rightArm.status != 'free') {
      return true
    }

    return false
  }

  async doMove() {
    let wafer = {}
    this.isbusy = true
    // 만약 ... 집을수 있는 웨이퍼가 없다면...
    let wafer = this.waferQue.getPickableWafer()
    // 손이 있는 웨이퍼를 놓는다.

    // 집읍수 있는 웨이퍼가 있다면...
    // findNextPossibleWafer()
    // = 웨이퍼의 다음 타겟이 비어있는 상태이고, 로봇의 손이 자유롭다면
    // 집는다...

    while ((wafer = this.waferQue.pop())) {
      if (this.noFreeHand()) {
        // 손에 있는걸 놓는다.
        let wafer = this.leftArm.wafer
        let target_staget = wafer.path[0]
        await this.Place(wafer, target)
      }

      let target_stage = wafer.path[0]
      wafer.path.shift()
      // 다음 웨이퍼의 다음 스테이지가 비어짔다면....
      if (target_stage.isFree()) {
        await this.Pick(wafer)
      }
    }
  }

  isBusy() {
    return false
  }

  Done() {
    let action = this.reserve.pop()
    if (action) {
      action()
    }
  }

  Reserve(action) {
    this.reserve.push(action)
  }

  FreeHand() {
    if (this.leftArm.status == 'free') return this.leftArm
    if (this.rightArm.status == 'free') return this.rightArm

    return false
  }

  async Pick(target, callback) {
    if (!this.FreeHand()) {
      console.log('[Robot] Robot is busy')
      return false
    }

    let hand = this.FreeHand()
    hand.status = 'reserved'

    console.log('[robot] pick wafer : ' + target.id + ' with ' + hand.name)
    console.log('[robot] pick command is excuted')

    await delay(1000)
    console.log('[robot] pick command is done')
    hand.wafer = target

    target.path.splice(0, 1) // remove path

    // if wafer next target is not empty
    // try to place wafer to next target
    // but next target is not Ready
    // callback reserve place action and return
    await this.MoveWafer()

    if (callback) {
      callback()
    }
  }

  async Place(wafer, target) {
    console.log('[Robot] Place wafer[' + wafer.id + '] to ' + target.name)
    console.log('[Robot] Place Command is excuted')
    // command place
    await delay(1000)
    // when place is done
    console.log('[Robot] Place Command is done')
    target.wafer = wafer

    // WakeUp target()
    target.WakeUp()
  }
}

class Foup {
  constructor(option) {
    option = option || {}
    this.name = option.name || 'foup'
    this.wafers = option.wafers || []
  }

  SortWafers() {
    robot.addQue(this.wafers)
  }

  FindNextPossibleWafer() {
    let wafer = this.wafers.find(function(wafer) {
      return wafer.nextStage().isFree() == true
    })

    return wafer
  }

  async WakeUp() {}
}

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
    let nextStage = null
    return (nextStage =
      this.currentIndex + 1 < this.path.length
        ? this.path[this.currentIndex + 1]
        : undefined)
  }
}

foupManger = new FoupManager()
robot = new Robot()
foup1 = new Foup({ name: 'foup1' })
foup2 = new Foup({ name: 'foup2' })
aligner = new Aligner()

function testcode() {
  let option = { path: [foup1, aligner, foup2] }

  //create test wafers
  let wafers = new Array(25).fill(null).map(v => new Wafer(option))

  foup1.wafers = wafers

  console.log(foup1.wafers[0])
  let stage = foup1.wafers[0].nextStage()

  console.log(stage)
}

testcode()
