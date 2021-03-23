import { Shape } from './shape.js'
import Point from '../point/point.js'

describe('Shape', () => {
  test('can be instantiated', () => {
    expect(new Shape()).toBeDefined()
  })

  describe('hasOccupiedPoint()', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(1, 3)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const cases = [
      [shape, 1, 4, false],
      [shape, 2, 3, false],
      [shape, 1, 2, true],
      [shape, 1, 3, true]
    ]
    test.each(cases)('%o.hasOccupiedPoint(%i, %i)', (shape, x, y, expected) => {
      expect(shape.hasOccupiedPoint(x, y)).toBe(expected)
    })
  })

  test('getCoordinatesOfSquares() works as expected', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(1, 3)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const expectedCoordinatesOfSquares = [{ x: 1, y: 2 }, { x: 1, y: 3 }]

    const actualCoordinatesOfSquares = shape.getCoordinatesOfSquares()

    expect(actualCoordinatesOfSquares).toEqual(expectedCoordinatesOfSquares)
  })

  test('restoreCoordinatesOfSquares() works as expected', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(3, 4)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const originalCoordinates = [{ x: 1, y: 2 }, { x: 3, y: 4 }]

    shape.squares[0].point.x = 12345
    shape.squares[0].point.y = -22

    shape.squares[1].point.x = 23
    shape.squares[1].point.y = 111.333

    shape.restoreCoordinatesOfSquares(originalCoordinates)

    const actualSquare0PointX = shape.squares[0].point.x
    const actualSquare0PointY = shape.squares[0].point.y

    const actualSquare1PointX = shape.squares[1].point.x
    const actualSquare1PointY = shape.squares[1].point.y

    expect(actualSquare0PointX).toEqual(originalCoordinates[0].x)
    expect(actualSquare0PointY).toEqual(originalCoordinates[0].y)

    expect(actualSquare1PointX).toEqual(originalCoordinates[1].x)
    expect(actualSquare1PointY).toEqual(originalCoordinates[1].y)

    const expectedSmallestX = 1
    const expectedLargestX = 3
    const expectedLargestY = 4

    const actualSmallestX = shape.getSmallestX()
    const actualLargestX = shape.getLargestX()
    const actualLargestY = shape.getLargestY()

    expect(actualSmallestX).toEqual(expectedSmallestX)
    expect(actualLargestX).toEqual(expectedLargestX)
    expect(actualLargestY).toEqual(expectedLargestY)
  })
})
