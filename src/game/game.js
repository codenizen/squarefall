import { SQUARE_SIDE_LENGTH } from '../constants.js'

import Grid from '../grid/grid.js'
import Score from '../score/score.js'

export class Game {
  constructor (canvas, context, shapeGenerator, speed) {
    this.canvas = canvas
    this.context = context
    this.shapeGenerator = shapeGenerator
    this.speed = speed
  }

  update () {
    if (this.grid.movingShape) {
      if (this.grid.thereIsRoomToMoveDown()) {
        this.grid.moveShapeDown()
      } else {
        this.grid.movingShape.roundYCoordinatesToNearestTen()
        this.grid.movingShape = undefined
        const fullRowCount = this.grid.removeFullRows()
        if (fullRowCount > 0) {
          this.requestScoreIncrease(fullRowCount)
          this.requestSpeedIncrease()
        }
      }
    } else {
      const generatedShape = this.shapeGenerator.generateShape()
      if (this.grid.noOtherShapeIsInTheWay(generatedShape)) {
        this.grid.shapes.push(generatedShape)
        this.grid.movingShape = generatedShape
      } else {
        this.end()
      }
    }
  }

  draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.grid.shapes.forEach(shape => {
      shape.draw()
    })
  }

  gameLoop () {
    if (!this.isPaused && !this.isOver) {
      this.update()
      this.draw()
      this.currentAnimationFrameRequestId = window.requestAnimationFrame(() => this.gameLoop())
    }
  }

  init () {
    this.setCanvasWidth()
    this.setCanvasHeight()

    window.setTimeout(() => {
      document.getElementById('loading').hidden = true
      document.getElementById('container').style.display = 'grid'
    }, 200) // to allow the user some time to spot the loading text

    this.grid = new Grid(this.canvas, this.context, this.speed)
    this.score = new Score()
    document.getElementById('current-speed').innerText = this.speed.shownValue
    this.SCORE_PER_SPEED_INCREASE = 50
    this.MAX_SPEED = 9
    this.paused = (event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'p': this.pause(); break
          default: break
        }
      }
    }
    this.keyPressed = (event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'j':
            this.grid.moveShapeLeft()
            break
          case 'k':
            this.grid.rotateShape()
            break
          case 'l':
            this.grid.moveShapeRight()
            break
          case ' ':
            this.grid.moveShapeToBottom()
            break
          default: break
        }
      }
    }
    this.keyHandler = this.keyPressed.bind(this)
    window.addEventListener('keypress', this.keyHandler)
    this.pauseKeyHandler = this.paused.bind(this)
    window.addEventListener('keypress', this.pauseKeyHandler)

    this.isPaused = false

    this.currentAnimationFrameRequestId = window.requestAnimationFrame(() => this.gameLoop())
  }

  setCanvasWidth () {
    const desiredWidth = 10 * SQUARE_SIDE_LENGTH

    if (desiredWidth < window.screen.availWidth) {
      this.canvas.width = desiredWidth
    }
  }

  setCanvasHeight () {
    let desiredHeight = window.screen.availHeight

    if (desiredHeight % 100 !== 0) {
      desiredHeight -= desiredHeight % 100
    }

    desiredHeight -= 100 // To leave room for browser/OS UI toolbars

    if (desiredHeight > 20 * SQUARE_SIDE_LENGTH) {
      desiredHeight = 20 * SQUARE_SIDE_LENGTH
    }

    this.canvas.height = desiredHeight
  }

  end () {
    this.score.submit()
    Game.showGameOverText()
    window.clearInterval(this.heartbeatInterval)
    window.removeEventListener('keypress', this.keyHandler)
    window.removeEventListener('keypress', this.pauseKeyHandler)
    this.isOver = true
  }

  requestSpeedIncrease () {
    if (this.speed.shownValue < this.MAX_SPEED) {
      const desiredShownValue = Math.trunc(this.score.get() / this.SCORE_PER_SPEED_INCREASE) + 1
      this.speed.increaseIfNecessary(desiredShownValue)
    }
  }

  requestScoreIncrease (rowsCleared) {
    this.score.increment(rowsCleared)
  }

  pause () {
    if (this.isPaused) {
      this.isPaused = false
      window.addEventListener('keypress', this.keyHandler)
      this.gameLoop()
    } else {
      this.isPaused = true
      window.cancelAnimationFrame(this.currentAnimationFrameRequestId)
      window.removeEventListener('keypress', this.keyHandler)
    }
  }

  static showGameOverText () {
    document.getElementById('gameOverContainer').hidden = false
  }
}
