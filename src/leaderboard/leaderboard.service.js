export class LeaderboardService {
  constructor () {
    this.url = 'https://scorepion.herokuapp.com/boards/e855ad08-4dc0-4527-af49-47f06d7fcfe3/scores'
  }

  submit (name, value) {
    window.fetch(this.url, {
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
      const response = await window.fetch(this.url)
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
}
