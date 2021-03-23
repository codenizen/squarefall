import { Game } from '../game/game.js'
import Speed from './speed.js'

describe('Speed', () => {
  test('can be instantiated', () => {
    expect(new Speed()).toBeDefined()
  })

  test('keeps increasing as expected', () => {
    const speed = new Speed()
    const game = new Game(undefined, undefined, undefined, speed)
    while (speed.shownValue < game.MAX_SPEED) {
      const baselineShownValue = speed.shownValue
      const baselineCalculatedValue = speed.calculatedValue

      speed.increaseIfNecessary(baselineShownValue + 1)

      const increasedShownValue = speed.shownValue
      const increasedCalculatedValue = speed.calculatedValue

      expect(increasedShownValue).toBeGreaterThan(baselineShownValue)
      expect(increasedCalculatedValue).toBeGreaterThan(baselineCalculatedValue)
    }
  })
})
