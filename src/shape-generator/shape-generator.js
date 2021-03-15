import shapeTypes from '../shape/shape.js'

export class ShapeGenerator {
  constructor (canvas, context, speed) {
    this.canvas = canvas
    this.context = context
    this.speed = speed
  }

  generateShape () {
    const shapeTypesAsArray = Object.values(shapeTypes)
    const chosenShapeIndex = Math.round(Math.random() * (shapeTypesAsArray.length - 1))
    const ChosenShapeType = shapeTypesAsArray[chosenShapeIndex]
    const xCoordinateOfAppearance = this.canvas.width / 2
    const shape = new ChosenShapeType(xCoordinateOfAppearance, this.context, this.speed)
    return shape
  }
}
