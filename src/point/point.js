import {
  SQUARE_SIDE_LENGTH
} from '../constants.js'

export default class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  moveDownBy (distance) {
    this.y += distance
  }

  moveLeft () {
    this.x += -SQUARE_SIDE_LENGTH
  }

  moveRight () {
    this.x += SQUARE_SIDE_LENGTH
  }

  transformClockwise (oldX, oldY) {
    this.translate(-oldX, -oldY)
    this.rotateClockwise()
    this.translate(oldX, oldY)
  }

  translate (offsetX, offsetY) {
    this.x = this.x + offsetX
    this.y = this.y + offsetY
  }

  rotateClockwise () {
    const oldX = this.x
    const oldY = this.y

    /*
    We are performing a clockwise 90 degree rotation in a 2D coordinate system.
    https://en.wikipedia.org/wiki/Rotation_matrix

    90 degrees = Math.PI / 2 radians
    Math.sin(Math.PI / 2) = 1
    Math.cos(Math.PI / 2) = 0

    newX = oldX * 0 - oldY * 1 = -oldY
    newY = oldX * 1 + oldY * 0 = oldX
    */

    this.x = -oldY
    this.y = oldX

    this.roundXCoordinateToNearestTen()
    this.roundYCoordinateToNearestTen()
  }

  equals (otherPoint) {
    return otherPoint instanceof Point &&
      typeof otherPoint.x === 'number' &&
      typeof otherPoint.y === 'number' &&
      this.x === otherPoint.x &&
      this.y === otherPoint.y
  }

  occupiesCoordinates (x, y) {
    return this.x === x && this.y === y
  }

  roundYCoordinateToNearestTen () {
    this.y = this.roundToNearestTen(this.y)
  }

  roundXCoordinateToNearestTen () {
    this.x = this.roundToNearestTen(this.x)
  }

  roundToNearestTen (number) {
    const numberDividedByTen = number / 10 // e.g. 85.1
    const numberWhole = numberDividedByTen.toFixed() // e.g. 85
    const numberWholeTimesTen = numberWhole * 10 // e.g. 850
    return numberWholeTimesTen
  }
}
