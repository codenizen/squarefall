import { beforeEach } from '@jest/globals'
import { SQUARE_SIDE_LENGTH } from '../constants.js'

import { Game } from './game.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import shapeTypes from '../shape/shape.js'
import Speed from '../speed/speed.js'

describe('Game', () => {
  let canvas
  let context
  let shapeGenerator
  let speed

  beforeEach(() => {
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d')
    shapeGenerator = new ShapeGenerator(canvas, context)
    speed = new Speed(SQUARE_SIDE_LENGTH)
  })

  test('can be instantiated', () => {
    expect(new Game(canvas)).toBeDefined()
  })

  describe('init()', () => {
    let game

    beforeEach(() => {
      game = new Game(canvas, context, shapeGenerator, speed)
      jest.spyOn(document, 'getElementById')
        .mockReturnValueOnce({}) // score
        .mockReturnValueOnce({}) // speed
    })
    test('can be called', () => {
      expect(() => {
        new Game(canvas, context, shapeGenerator, speed).init()
      }).not.toThrow()
    })

    test('sets up canvas dimensions', () => {
      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const shapeTypesIterable = Object.values(shapeTypes)

      for (const shapeType of shapeTypesIterable) {
        jest.spyOn(Object, 'values').mockReturnValueOnce([shapeType])
      }

      game.init()

      const adjustedWidth = canvas.width
      const adjustedHeight = canvas.height

      expect(adjustedWidth).toBe(500)
      expect(adjustedHeight).toBe(1000)
    })

    test('sets up a grid', () => {
      game.init()
      expect(game.grid).toBeDefined()
    })

    test('has a shape generated', () => {
      jest.spyOn(shapeGenerator, 'generateShape')
      game.init()
      expect(shapeGenerator.generateShape).toHaveBeenCalled()
    })

    test('pushes the generated shape onto the grid', () => {
      game.init()
      expect(game.grid.shapes.length).toBe(1)
      expect(game.grid.movingShape).toBeDefined()
    })

    test('draws the generated shape', () => {
      const shape = {
        draw: () => { }
      }

      jest.spyOn(shape, 'draw')
      jest.spyOn(shapeGenerator, 'generateShape').mockReturnValueOnce(shape)

      game.init()
      expect(shape.draw).toHaveBeenCalled()
    })

    test('sets up a Score', () => {
      game.init()
      expect(game.score).toBeDefined()
    })

    test('sets up a Speed', () => {
      game.init()
      expect(game.speed).toBeDefined()
    })

    test('sets up keyboard event handlers', () => {
      game.init()
      expect(game.keyHandler).toBeDefined()
      expect(game.pauseKeyHandler).toBeDefined()
    })

    test('unpauses the game', () => {
      game.init()
      expect(game.isPaused).toBeDefined()
      expect(game.isPaused).toBe(false)
    })
  })
})
