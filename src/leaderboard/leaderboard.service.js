export class LeaderboardService {
  constructor () {
    this.boardUrl = 'https://scorepion.herokuapp.com/boards/e855ad08-4dc0-4527-af49-47f06d7fcfe3'
    this.scoresUrl = this.boardUrl + '/scores'
    this.eligibilityUrl = this.boardUrl + '/eligibility'
  }

  submit (name, value) {
    window.fetch(this.scoresUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        value
      })
    })
  }

  async fetch () {
    try {
      const response = await window.fetch(this.scoresUrl)
      if (!response.ok) {
        console.log(response)
        const { status, statusText } = response
        const errorMessage = `error: ${status}\t${statusText}`
        return { status: errorMessage }
      }
      const scores = await response.json()
      return { scores }
    } catch (error) {
      console.log(error)
      return { status: 'error: API not available' }
    }
  }

  async isEligible (score) {
    try {
      const params = new URLSearchParams({
        score
      })
      const response = await window.fetch(`${this.eligibilityUrl}?${params}`)
      if (!response.ok) {
        const { status, statusText } = response
        const errorMessage = `error: ${status}\t${statusText}`
        console.log(errorMessage)
        return false
      }
      const isEligible = await response.json()
      return isEligible
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
