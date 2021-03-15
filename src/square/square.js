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

  drawPoint () {
    this.context.beginPath()
    this.context.strokeStyle = 'red'
    this.context.arc(this.point.x, this.point.y, 10, 0, 2 * Math.PI)
    this.context.stroke()
  }

  drawCoordinates () {
    this.context.fillStyle = 'black'
    this.context.fillText(`${this.point.x} | ${this.point.y}`, this.point.x, this.point.y)
  }

  drawEdgePoints () {
    this.drawEdgePoint('yellow', this.point.x, this.point.y)
    this.drawEdgePoint('blue', this.point.x + SQUARE_SIDE_LENGTH, this.point.y)
    this.drawEdgePoint('magenta', this.point.x + SQUARE_SIDE_LENGTH, this.point.y + SQUARE_SIDE_LENGTH)
    this.drawEdgePoint('black', this.point.x, this.point.y + SQUARE_SIDE_LENGTH)
  }

  drawEdgePoint (color, x, y) {
    this.context.beginPath()
    this.context.strokeStyle = color
    this.context.arc(x, y, 10, 0, 2 * Math.PI)
    this.context.stroke()
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
    this.clear()
    this.point.moveDownBy(distance)
    this.draw()
  }

  clearAndMoveDownBy (distance) {
    this.clear()
    this.point.moveDownBy(distance)
  }

  moveLeft () {
    this.clear()
    this.point.moveLeft()
    this.draw()
  }

  moveRight () {
    this.clear()
    this.point.moveRight()
    this.draw()
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
