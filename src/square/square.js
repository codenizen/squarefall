import { SQUARE_SIDE_LENGTH } from '../constants.js'

export default class Square {
  constructor (point, fillStyle, context, speed) {
    // The point of a Square always refers to its top left point
    this.point = point
    this.fillStyle = fillStyle
    this.context = context
    this.sideLength = SQUARE_SIDE_LENGTH
    this.speed = speed
  }

  draw () {
    this.context.beginPath()
    this.context.fillStyle = this.fillStyle
    this.context.fillRect(this.point.x, this.point.y, this.sideLength, this.sideLength)
  }

  clear () {
    this.context.clearRect(this.point.x, this.point.y, this.sideLength, this.sideLength)
  }

  equals (otherSquare) {
    return otherSquare !== undefined &&
      otherSquare instanceof Square &&
      this.sideLength === otherSquare.sideLength &&
      this.point.equals(otherSquare.point)
  }

  overlaps (otherSquare) {
    return otherSquare !== undefined &&
      otherSquare instanceof Square &&
      this.sideLength === otherSquare.sideLength &&
      Math.abs(this.point.x - otherSquare.point.x) < SQUARE_SIDE_LENGTH &&
      Math.abs(this.point.y - otherSquare.point.y) < SQUARE_SIDE_LENGTH
  }

  moveDownBy (distance) {
    this.point.moveDownBy(distance)
  }

  moveLeft () {
    this.point.moveLeft()
  }

  moveRight () {
    this.point.moveRight()
  }

  transformClockwise (x, y) {
    this.point.transformClockwise(x, y)
  }

  transformCounterClockwise (x, y) {
    this.point.transformCounterClockwise(x, y)
  }

  isBelowLimit (yLimit) {
    return this.point.y < yLimit
  }

  hasOccupiedPoint (x, y) {
    return this.point.occupiesCoordinates(x, y)
  }

  roundYCoordinateToNearestTen () {
    this.point.roundYCoordinateToNearestTen()
  }
}
