import { SQUARE_SIDE_LENGTH } from './constants.js'

import { Game } from './game/game.js'
import { ShapeGenerator } from './shape-generator/shape-generator.js'
import Speed from './speed/speed.js'

const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'gameCanvas')

const gameContainer = document.getElementById('gameContainer')
gameContainer.append(canvas)

const context = canvas.getContext('2d')
const speed = new Speed(SQUARE_SIDE_LENGTH)
const shapeGenerator = new ShapeGenerator(canvas, context, speed)
const game = new Game(canvas, context, shapeGenerator, speed)

game.init()
