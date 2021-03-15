export default class Speed {
  constructor (squareSideLength) {
    this.squareSideLength = squareSideLength
    this.shownValue = 0
    this.divisor = 30
    this.calculatedValue = this.calculateValue(squareSideLength, this.divisor)
  }

  increase () {
    this.shownValue += 1
    this.divisor -= 1
    this.calculatedValue = this.calculateValue(this.squareSideLength, this.divisor)
  }

  increaseIfNecessary (desiredSpeed) {
    if (desiredSpeed > this.shownValue) {
      this.increase()
      document.getElementById('speedContainer').classList.add('shaken')
      setTimeout(
        () => document.getElementById('speedContainer').classList.remove('shaken'),
        1000
      )
      document.getElementById('current-speed').innerText = this.shownValue
    }
    return this.shownValue
  }

  calculateValue (squareSideLength, divisor) {
    return Math.round(squareSideLength / divisor)
  }
}
