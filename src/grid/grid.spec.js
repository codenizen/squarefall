import { Game } from '../game/game.js'
import Grid, { emptySquareCharacter, fullSquareCharacter } from './grid.js'
import Point from '../point/point.js'
import shapeTypes, { Shape } from '../shape/shape.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import Speed from '../speed/speed.js'
import { SQUARE_SIDE_LENGTH } from '../constants.js'

describe('Grid', () => {
  test('can be instantiated', () => {
    expect(new Grid()).toBeDefined()
  })

  describe('hasOccupiedPoint()', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(1, 3)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const grid = new Grid()
    grid.shapes.push(shape)

    const cases = [
      [grid, 1, 4, false],
      [grid, 2, 3, false],
      [grid, 1, 2, true],
      [grid, 1, 3, true]
    ]
    test.each(cases)('%o.hasOccupiedPoint(%i, %i)', (grid, x, y, expected) => {
      expect(grid.hasOccupiedPoint(x, y)).toBe(expected)
    })
  })

  describe('rotateShape()', () => {
    describe('restores the original coordinates of the shape when trying to rotate out of canvas bounds', () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const speed = new Speed(2)
      const shapeGenerator = new ShapeGenerator(canvas, context)
      const leaderboard = { reset: () => {} }

      const { I, L, J, S, Z, T, O } = shapeTypes

      jest.spyOn(Object, 'values')
        .mockReturnValueOnce([I])
        .mockReturnValueOnce([L])
        .mockReturnValueOnce([J])
        .mockReturnValueOnce([S])
        .mockReturnValueOnce([Z])
        .mockReturnValueOnce([T])
        .mockReturnValueOnce([O])

      const cases = [
        [I], [L], [J], [S], [Z], [T], [O]
      ]

      test.each(cases)(' with shape of type %p', (type) => {
        jest.spyOn(Object, 'values').mockReturnValueOnce([type])

        jest.spyOn(document, 'getElementById').mockReturnValue({})

        jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
        jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

        const game = new Game(canvas, context, shapeGenerator, speed, leaderboard)

        game.init()

        const shape = shapeGenerator.generateShape()

        game.grid.movingShape = shape
        game.grid.shapes.push(shape)

        shape.squares.forEach(square => {
          square.point.y -= SQUARE_SIDE_LENGTH
        })

        const coordinatesBeforeRotation = shape.getCoordinatesOfSquares()

        game.grid.movingShape = shape
        game.grid.rotateShape()

        const coordinatesAfterRotation = shape.getCoordinatesOfSquares()

        expect(coordinatesAfterRotation).toEqual(coordinatesBeforeRotation)
      })
    })
  })

  test('print()', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, J, Z } = shapeTypes

    jest.spyOn(Object, 'values')
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([Z])

    const iShape = shapeGenerator.generateShape()
    const jShape = shapeGenerator.generateShape()
    const zShape = shapeGenerator.generateShape()

    iShape.squares.forEach(square => {
      square.point.y = square.point.y + 10 * SQUARE_SIDE_LENGTH
    })

    jShape.squares.forEach(square => {
      square.point.x = square.point.x + 4 * SQUARE_SIDE_LENGTH
    })

    zShape.squares.forEach(square => {
      square.point.x = square.point.x + 2 * SQUARE_SIDE_LENGTH
      square.point.y = square.point.y + 2 * SQUARE_SIDE_LENGTH
    })

    canvas.width = 500
    canvas.height = 1000

    const grid = new Grid(canvas, context)
    grid.shapes.push(iShape, jShape, zShape)

    const firstRow = emptySquareCharacter.repeat(6) + fullSquareCharacter.repeat(3) + emptySquareCharacter
    const secondRow = emptySquareCharacter.repeat(8) + fullSquareCharacter + emptySquareCharacter
    const thirdRow = emptySquareCharacter.repeat(4) + fullSquareCharacter.repeat(2) + emptySquareCharacter.repeat(4)
    const fourthRow = emptySquareCharacter.repeat(5) + fullSquareCharacter.repeat(2) + emptySquareCharacter.repeat(3)
    const eleventhRow = emptySquareCharacter + fullSquareCharacter.repeat(4) + emptySquareCharacter.repeat(5)
    const emptyRow = emptySquareCharacter.repeat(10)

    let expectedOutput = firstRow + '\n' + secondRow + '\n' + thirdRow + '\n' + fourthRow + '\n'
    for (let i = 0; i < 6; i++) {
      expectedOutput += emptyRow + '\n'
    }
    expectedOutput += eleventhRow + '\n'
    for (let i = 0; i < 8; i++) {
      expectedOutput += emptyRow + '\n'
    }
    expectedOutput += emptyRow

    const actualOutput = grid.print()
    expect(actualOutput).toBe(expectedOutput)
  })

  describe('removeFullRows()', () => {
    test('removes shapes without any squares left from the grid', () => {
      const canvas = document.createElement('canvas')
      canvas.width = 500
      canvas.height = 1000

      const context = canvas.getContext('2d')
      const shapeGenerator = new ShapeGenerator(canvas, context)

      const { I, J, T } = shapeTypes

      jest.spyOn(Object, 'values')
        .mockReturnValueOnce([I])
        .mockReturnValueOnce([J])
        .mockReturnValueOnce([T])

      const iShape = shapeGenerator.generateShape()
      const jShape = shapeGenerator.generateShape()
      const tShape = shapeGenerator.generateShape()

      iShape.squares.forEach(square => {
        square.point.x = square.point.x - 150
        square.point.y = square.point.y + 500
      })

      jShape.squares.forEach(square => {
        square.point.x = square.point.x + 150
        square.point.y = square.point.y + 500
      })

      tShape.squares.forEach(square => {
        square.point.y = square.point.y + 450
      })

      const grid = new Grid(canvas, context)
      grid.shapes.push(iShape, jShape, tShape)

      grid.removeFullRows()

      expect(grid.shapes.length === 2)
      expect(grid.shapes[0] instanceof J)
      expect(grid.shapes[1] instanceof T)
    })
  })
})
