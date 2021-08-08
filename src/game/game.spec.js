import { beforeEach } from '@jest/globals'

import { Game } from './game.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import shapeTypes from '../shape/shape.js'
import Speed from '../speed/speed.js'

describe('Game', () => {
  let canvas
  let context
  let shapeGenerator
  let speed
  const leaderboard = { toggle: () => { } }

  beforeEach(() => {
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d')
    speed = new Speed(2)
    shapeGenerator = new ShapeGenerator(canvas, context, speed)
  })

  test('can be instantiated', () => {
    expect(new Game(canvas)).toBeDefined()
  })

  describe('init()', () => {
    let game

    beforeEach(() => {
      game = new Game(canvas, context, shapeGenerator, speed, leaderboard)
      jest.spyOn(document, 'getElementById')
        .mockReturnValueOnce({}) // score
        .mockReturnValueOnce({}) // speed
    })
    test('can be called', () => {
      expect(() => {
        new Game(canvas, context, shapeGenerator, speed, leaderboard).init()
      }).not.toThrow()
    })

    describe('sets up canvas dimensions', () => {
      const cases = [
        [720, 600],
        [768, 650],
        [900, 750],
        [1024, 850],
        [1050, 850],
        [1080, 850],
        [1200, 850],
        [1440, 850],
        [1536, 850],
        [1600, 850],
        [2048, 850],
        [2160, 850]
      ]

      test.each(cases)('with screen height %i, game height becomes %i', (screenHeight, setHeight) => {
        jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
        jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(screenHeight)

        const shapeTypesIterable = Object.values(shapeTypes)

        for (const shapeType of shapeTypesIterable) {
          jest.spyOn(Object, 'values').mockReturnValueOnce([shapeType])
        }

        game.init()

        const adjustedWidth = canvas.width
        const adjustedHeight = canvas.height

        expect(adjustedWidth).toBe(500)
        expect(adjustedHeight).toBe(setHeight)
      })
    })

    test('sets up a grid', () => {
      game.init()
      expect(game.grid).toBeDefined()
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

  describe('update()', () => {
    let game

    beforeEach(() => {
      game = new Game(canvas, context, shapeGenerator, speed, leaderboard)
      jest.spyOn(document, 'getElementById')
        .mockReturnValueOnce({}) // score
        .mockReturnValueOnce({}) // speed
      game.init()
    })

    test('can be called', () => {
      expect(() => {
        game.update()
      }).not.toThrow()
    })

    test('has a shape generated', () => {
      jest.spyOn(shapeGenerator, 'generateShape')
      game.update()
      expect(shapeGenerator.generateShape).toHaveBeenCalled()
    })

    test('pushes the generated shape onto the grid', () => {
      game.update()
      expect(game.grid.shapes.length).toBe(1)
      expect(game.grid.movingShape).toBeDefined()
    })
  })
})
