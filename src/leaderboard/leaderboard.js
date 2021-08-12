export class Leaderboard {
  constructor (scoreService) {
    this.scoreService = scoreService
  }

  async reset () {
    document.getElementById('leaderboardEntries').replaceChildren()
    document.getElementById('status').innerText = 'Loading...'
    document.getElementById('status').classList.remove('closed')

    const response = await this.scoreService.fetch()
    const { status, scores } = response
    if (status) {
      document.getElementById('status').innerText = status
      document.getElementById('leaderboardEntries').style.display = 'none'
    } else if (scores) {
      document.getElementById('status').classList.add('closed')
      document.getElementById('leaderboardEntries').style.display = 'grid'
      for (const score of scores) {
        const { name, value } = score
        const leftDiv = document.createElement('div')
        const rightDiv = document.createElement('div')
        leftDiv.innerText = name
        rightDiv.innerText = value
        leftDiv.classList.add('score-entry-left')
        rightDiv.classList.add('score-entry-right')
        document.getElementById('leaderboardEntries').append(leftDiv, rightDiv)
      }
    }
  }

  async fetch () {
    return this.scoreService.fetch()
  }

  submit (name, value) {
    this.scoreService.submit(name, value)
  }

  async showScoreSubmissionModalIfEligible (score) {
    const isEligible = await this.scoreService.isEligible(score)

    if (isEligible) {
      if (document.getElementById('leaderboard-modal').classList.contains('closed')) {
        document.getElementById('submitted-name').value = 'Ann Onymous'
        document.getElementById('submitted-score').innerText = score
        document.getElementById('submit-button').addEventListener('click', () => {
          const name = document.getElementById('submitted-name').value
          const value = score
          this.scoreService.submit(name, value)
          window.setTimeout(() => this.reset(), 3000)
          this.toggleModals()
        })
        window.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            this.toggleModals()
          }
        })
        document.getElementById('close-modal-button').addEventListener('click', () => {
          this.toggleModals()
        })
      }
      this.toggleModals()
    }
  }

  toggleModals () {
    document.getElementById('modal-overlay').classList.toggle('closed')
    document.getElementById('leaderboard-modal').classList.toggle('closed')
  }
}
