import { SQUARE_SIDE_LENGTH } from '../constants.js'
import { Game } from '../game/game.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import shapeTypes from '../shape/shape.js'
import Speed from '../speed/speed.js'

describe('Squarefall', () => {
  const moveSquaresDown = (game, numberOfSquares) => {
    for (let i = 0; i < numberOfSquares * SQUARE_SIDE_LENGTH / game.speed.calculatedValue; i++) {
      game.gameLoop()
    }
  }

  describe('Move shape left keypress works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I], [O], [L], [J], [S], [Z], [T]
    ]

    test.each(cases)(' with shape of type %p', (type) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator, speed)

      game.init()

      game.gameLoop()

      const movingShape = game.grid.movingShape

      const expectedXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x - SQUARE_SIDE_LENGTH)
        .sort((a, b) => a - b)

      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })

      game.keyPressed(moveLeftKeyPressedEvent)

      const actualXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x)
        .sort((a, b) => a - b)

      expect(actualXCoordinates).toEqual(expectedXCoordinates)
    })
  })

  describe('Move shape right keypress works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I], [O], [L], [J], [S], [Z], [T]
    ]

    test.each(cases)(' with shape of type %p', (type) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator, speed)

      game.init()

      game.gameLoop()

      const movingShape = game.grid.movingShape

      const expectedXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x + SQUARE_SIDE_LENGTH)
        .sort((a, b) => a - b)

      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })

      game.keyPressed(moveRightKeyPressedEvent)

      const actualXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x)
        .sort((a, b) => a - b)

      expect(actualXCoordinates).toEqual(expectedXCoordinates)
    })
  })

  describe('Move shape to bottom keypress works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I, [950, 950, 950, 950]],
      [O, [900, 900, 950, 950]],
      [L, [900, 900, 900, 950]],
      [J, [900, 900, 900, 950]],
      [S, [900, 900, 950, 950]],
      [Z, [900, 900, 950, 950]],
      [T, [900, 950, 950, 950]]
    ]

    test.each(cases)(' with shape of type %p', (type, expectedYCoordinates) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator, speed)

      game.init()

      game.gameLoop()

      const moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

      game.keyPressed(moveToBottomKeyPressedEvent)

      const actualYCoordinates = game.grid.shapes[0].squares
        .map(square => square.point)
        .map(point => point.y)
        .sort((a, b) => a - b)

      expect(actualYCoordinates).toEqual(expectedYCoordinates)
    })
  })

  describe('Rotate shape works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I, [250, 250, 250, 250, 400, 450, 500, 550]],
      [O, [200, 200, 250, 250, 500, 500, 550, 550]],
      [L, [150, 200, 200, 200, 450, 450, 500, 550]],
      [J, [200, 250, 250, 250, 450, 500, 550, 550]],
      [S, [200, 200, 250, 250, 500, 550, 550, 600]],
      [Z, [250, 250, 300, 300, 500, 550, 550, 600]],
      [T, [250, 250, 250, 300, 500, 550, 550, 600]]
    ]

    test.each(cases)(' with shape of type %p', (type, expectedPointCoordinates) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator, speed)

      game.init()

      game.gameLoop()

      // there's not enough room initially to rotate certain shapes. to exercise them thoroughly, we first let them fall a bit
      moveSquaresDown(game, 10)

      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })

      game.keyPressed(rotateKeyPressedEvent)

      const actualPointCoordinates = game.grid.movingShape.squares
        .map(square => square.point)
        .map(point => [point.x, point.y])
        .flat()
        .sort((a, b) => a - b)

      expect(actualPointCoordinates).toEqual(expectedPointCoordinates)
    })
  })

  describe('A full bottom row can be cleared', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, J, T } = shapeTypes

    jest.spyOn(Object, 'values')
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([T])

    jest.spyOn(document, 'getElementById').mockReturnValue({})

    jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
    jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

    const game = new Game(canvas, context, shapeGenerator, speed)

    game.init()

    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    let moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    for (let i = 0; i < 2; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 3; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows

    expect(game.score.get()).toBeGreaterThan(0)

    const expectedRemainingPointCoordinates = [200, 400, 950, 950]

    const actualRemainingPointCoordinates = game.grid.shapes
      .map(shape => shape.squares)
      .flat()
      .map(square => square.point)
      .map(point => [point.x, point.y])
      .flat()
      .sort((a, b) => a - b)

    expect(actualRemainingPointCoordinates).toEqual(expectedRemainingPointCoordinates)
  })

  describe('Several contiguous rows can be cleared', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, O, L, J, S, Z, T } = shapeTypes

    jest.spyOn(Object, 'values')
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([O])
      .mockReturnValueOnce([L])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([S])
      .mockReturnValueOnce([Z])
      .mockReturnValueOnce([T])
      .mockReturnValueOnce([O])
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([J])

    jest.spyOn(document, 'getElementById').mockReturnValue({})

    jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
    jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

    const game = new Game(canvas, context, shapeGenerator, speed)

    game.init()

    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    let moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    for (let i = 0; i < 4; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    for (let i = 0; i < 2; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    for (let i = 0; i < 2; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }
    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    for (let i = 0; i < 3; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }
    for (let i = 0; i < 3; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 4)

    const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
    game.keyPressed(rotateKeyPressedEvent)

    for (let i = 0; i < 2; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    for (let i = 0; i < 3; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }

    const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
    game.keyPressed(moveRightKeyPressedEvent)

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows

    expect(game.score.get()).toBeGreaterThan(0)

    const expectedRemainingPointCoordinates = [0, 50, 50, 100, 100, 100, 150, 150, 200, 250,
      850, 900, 900, 900, 950, 950, 950, 950, 950, 950]

    const actualRemainingPointCoordinates = game.grid.shapes
      .map(shape => shape.squares)
      .flat()
      .map(square => square.point)
      .map(point => [point.x, point.y])
      .flat()
      .sort((a, b) => a - b)

    expect(actualRemainingPointCoordinates).toEqual(expectedRemainingPointCoordinates)
  })

  describe('Non-contiguous rows can be cleared', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas
    const speed = new Speed(2)
    const shapeGenerator = new ShapeGenerator(canvas, context, speed)

    const { I, O, J, S, Z } = shapeTypes

    jest.spyOn(Object, 'values')
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([Z])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([Z])
      .mockReturnValueOnce([S])
      .mockReturnValueOnce([O])
      .mockReturnValueOnce([I])

    jest.spyOn(document, 'getElementById').mockReturnValue({})

    jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
    jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

    const game = new Game(canvas, context, shapeGenerator, speed)

    game.init()

    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    let moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 2; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveSquaresDown(game, 1)

    for (let i = 0; i < 2; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }

    for (let i = 0; i < 2; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 2; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    for (let i = 0; i < 2; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }

    for (let i = 0; i < 2; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 1)

    let rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })

    game.keyPressed(rotateKeyPressedEvent)

    for (let i = 0; i < 2; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows
    game.gameLoop() // generate new shape

    moveSquaresDown(game, 2)

    rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
    game.keyPressed(rotateKeyPressedEvent)

    for (let i = 0; i < 4; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.gameLoop() // clear full rows

    expect(game.score.get()).toBeGreaterThan(0)

    const expectedRemainingPointCoordinates = [0, 0, 50, 50, 100, 100, 100, 150, 150, 200, 250, 300, 300, 300, 350, 350, 400, 450, 450, 450,
      850, 850, 850, 900, 900, 900, 900, 900, 900, 900, 900, 900, 950, 950, 950, 950, 950, 950, 950, 950]

    const actualRemainingPointCoordinates = game.grid.shapes
      .map(shape => shape.squares)
      .flat()
      .map(square => square.point)
      .map(point => [point.x, point.y])
      .flat()
      .sort((a, b) => a - b)

    expect(actualRemainingPointCoordinates).toEqual(expectedRemainingPointCoordinates)
  })
})
