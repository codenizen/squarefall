export default class Speed {
  constructor (pixelsPerFrame) {
    this.shownValue = 1
    this.calculatedValue = pixelsPerFrame
  }

  increase () {
    this.shownValue += 1
    this.calculatedValue = parseFloat((this.calculatedValue + 0.1).toFixed(1))
  }

  increaseIfNecessary (desiredShownValue) {
    if (desiredShownValue > this.shownValue) {
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
}
