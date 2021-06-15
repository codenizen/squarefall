import { SQUARE_SIDE_LENGTH } from '../constants.js'

import Grid from '../grid/grid.js'
import Score from '../score/score.js'

import vertexShaderSource from '../shaders/vertex-shader.glsl.js'
import fragmentShaderSource from '../shaders/fragment-shader.glsl.js'

export class Game {
  constructor (canvas, context, shapeGenerator, speed, leaderboard) {
    this.canvas = canvas
    this.context = context
    this.shapeGenerator = shapeGenerator
    this.speed = speed
    this.leaderboard = leaderboard
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
    const gl = this.context;
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.grid.shapes.forEach(shape => shape.draw(this.shaderProgram))
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

    this.initGraphics()

    window.setTimeout(() => {
      document.getElementById('loading').hidden = true
      document.getElementById('container').style.display = 'grid'
    }, 200) // to allow the user some time to spot the loading text

    this.grid = new Grid(this.canvas, this.context, this.speed)
    this.score = new Score()
    document.getElementById('current-speed').innerText = this.speed.shownValue
    this.SCORE_PER_SPEED_INCREASE = 10
    this.MAX_SPEED = 9
    this.paused = (event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'p': this.pause(); break
          case 'b': this.toggleLeaderboard(); break
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

  initGraphics () {
    const gl = this.context

    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.shaderProgram = this.createProgram(gl, vertexShader, fragmentShader)

    const positionAttributeLocation = gl.getAttribLocation(this.shaderProgram, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(this.shaderProgram, "u_resolution");

    const positionBuffer = gl.createBuffer();

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(this.shaderProgram);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2;          // 2 components per iteration
    const type = gl.FLOAT;   // the data is 32bit floats
    const normalized = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalized, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  }

  toggleLeaderboard () {
    this.pause()
    this.leaderboard.toggle()
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

    this.leaderboard.showScoreSubmissionModalIfEligible(this.score.get())
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

  createProgram (gl, vertexShader, fragmentShader) {
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    const success = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (success) {
      return shaderProgram;
    }

    console.log(gl.getProgramInfoLog(shaderProgram));
    gl.deleteProgram(shaderProgram);
  }

  createShader (gl, type, source) {
    const shader = gl.createShader(type)
    // Send the source to the shader object
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
}
