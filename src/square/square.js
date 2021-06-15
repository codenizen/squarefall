import { SQUARE_SIDE_LENGTH } from '../constants.js'

export default class Square {
  constructor (point, colorRgb, context, speed) {
    // The point of a Square always refers to its top left point
    this.point = point
    this.colorRgb = colorRgb
    this.context = context
    this.sideLength = SQUARE_SIDE_LENGTH
    this.speed = speed
  }

  draw (shaderProgram) {
    const gl = this.context

    this.setRectangle(gl, this.point.x, this.point.y, this.sideLength, this.sideLength);

    var colorUniformLocation = gl.getUniformLocation(shaderProgram, "u_color");

    const [r, g, b] = this.colorRgb

    // set color
    gl.uniform4f(colorUniformLocation, r / 255, g / 255, b / 255, 1);

    // Draw the rectangle.
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // Fills the buffer with the values that define a rectangle.
  setRectangle (gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
    // whatever buffer is bound to the `ARRAY_BUFFER` bind point
    // but so far we only have one buffer. If we had more than one
    // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2]), gl.STATIC_DRAW);
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
