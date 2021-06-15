import { ShapeGenerator } from './shape-generator.js'
import shapeTypes from '../shape/shape.js'

describe('ShapeGenerator', () => {
  test('can be instantiated', () => {
    expect(new ShapeGenerator()).toBeDefined()
  })

  describe('generated shape', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl')
    context.canvas = canvas

    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I], [O], [L], [J], [S], [Z], [T]
    ]

    test.each(cases)('is of type %p', (type) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])
      const shape = shapeGenerator.generateShape()
      expect(shape).toBeInstanceOf(type)
    })
  })
})
