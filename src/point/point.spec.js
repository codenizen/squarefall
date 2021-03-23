import Point from './point.js'

describe('Point', () => {
  test('can be instantiated', () => {
    expect(new Point()).toBeDefined()
  })

  describe('equals()', () => {
    const point = new Point(1, 2)
    const cases = [
      [point, undefined, false],
      [point, {}, false],
      [point, new Point(undefined, 2), false],
      [point, new Point(1, undefined), false],
      [point, new Point(undefined, undefined), false],
      [point, new Point(null, 2), false],
      [point, new Point(1, null), false],
      [point, new Point(null, null), false],
      [point, new Point('', 2), false],
      [point, new Point(1, ''), false],
      [point, new Point('', ''), false],
      [point, new Point({}, 2), false],
      [point, new Point(1, {}), false],
      [point, new Point({}, {}), false],
      [point, new Point(3, 2), false],
      [point, new Point(1, 4), false],
      [point, new Point(6, 7), false],
      [point, new Point(1, 2), true]
    ]
    test.each(cases)('%o.equals(%o)', (a, b, expected) => {
      expect(a.equals(b)).toBe(expected)
    })
  })

  describe('occupiesCoordinates()', () => {
    const point = new Point(1, 2)
    const cases = [
      [point, 2, 3, false],
      [point, 1, 2, true]
    ]
    test.each(cases)('%o.occupiesCoordinates(%i, %i)', (point, x, y, expected) => {
      expect(point.occupiesCoordinates(x, y)).toBe(expected)
    })
  })

  test('rotateClockWise() rounds both coordinates to nearest 10 as expected', () => {
    const point = new Point(333.3333, 46.66666666667)
    point.rotateClockwise()
    expect(Math.abs(point.x)).toBe(50)
    expect(Math.abs(point.y)).toBe(330)
  })

  test('roundXCoordinateToNearestTen() works as expected', () => {
    const point = new Point(111.11111, 100)
    point.roundXCoordinateToNearestTen()
    expect(point.x).toBe(110)
  })

  test('roundYCoordinateToNearestTen() works as expected', () => {
    const point = new Point(100, 88.888888)
    point.roundYCoordinateToNearestTen()
    expect(point.y).toBe(90)
  })

  test('roundToNearestTen() works as expected', () => {
    const point = new Point()
    const expectedRoundedNumber = 120
    const actualRoundedNumber = point.roundToNearestTen(123.456)
    expect(actualRoundedNumber).toBe(expectedRoundedNumber)
  })
})
