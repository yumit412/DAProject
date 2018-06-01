/* eslint-disable no-unused-vars */

class CrankSystem {
  constructor() {
    this.list = []
    this.config = {
      rpm: 0,
      rod_length: 100, // unit mm
      crank_radius: 100, // unit mm
      crank_angle: 45,
      piston_pin_position: undefined,
      piston_pin_velocity: undefined,
      piston_pin_accelation: undefined,
      crank_angular_velocity: undefined // unit rad/s
    }
  }

  // unit : mm
  PistonPinPos() {
    var value = 0.0

    var r = this.crank_radius
    var A = this.crank_angle
    var l = this.rod_length

    value =
      r * Math.cos(A) +
      Math.sqrt(Math.pow(l, 2) - Math.pow(r, 2) * Math.pow(Math.sin(A), 2))

    this.PistonPinPosition = value

    return value
  }

  // unit : mm/rad
  PistonPinVel() {
    var config = this.config
    var r = config.crank_radius
    var A = config.crank_angle
    var l = config.rod_length

    var value =
      -1 * r * Math.sin(A) -
      Math.pow(r, 2) *
        A *
        Math.cos(A) /
        Math.sqrt(Math.pow(l, 2) - Math.pow(r, 2) * Math.pow(Math.sin(A), 2))

    this.PistonPinVel = value
    return value
  }

  PistonPinAcel() {
    var config = this.config
    var value = 0.0
    var r = config.crank_radius
    var A = config.crank_angle
    var l = config.rod_length

    var value1 = -r * Math.cos(A)
    var value2 =
      Math.pow(r, 2) * Math.pow(Math.cos(A), 2) - Math.pow(Math.sin(A), 2)

    var value3 = Math.sqrt(
      Math.pow(l, 2) - Math.pow(r, 2) * Math.pow(Math.sin(A), 2)
    )

    var value4 =
      Math.pow(r, 4) * Math.pow(Math.sin(A), 2) * Math.pow(Math.cos(A), 2)

    var value5 = Math.pow(value3, 3)

    value = value1 - value2 / value3 - value4 / value5

    return value
  }

  CrankAngleVel(rpm = this.rpm) {
    return 2.0 * Math.PI * rpm / 60
  }
}
