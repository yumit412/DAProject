class Motion {
  constructor(InitialVel, InitialAcc) {
    this.config = {
      time: [],
      vel: [InitialVel],
      acc: [InitialAcc]
    }
  }

  Tranjection(t, v, s) {}
}

// eslint-disable-next-line no-unused-vars
function TestCode() {
  var motion = new Motion(0, 0)
  motion.add_point(0, 0, 0)
  motion.add_point(10)
}
