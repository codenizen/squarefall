export class Leaderboard {
  constructor (scoreService) {
    this.scoreService = scoreService
    this.isOpen = false
  }

  async toggle () {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }

    this.isOpen = !this.isOpen
  }

  async open () {
    document.getElementById('leaderboardEntries').replaceChildren()
    document.getElementById('controlsContainer').classList.add('controlsContainer-leaderboard-open')
    document.getElementById('controlsContainer').classList.remove('controlsContainer-leaderboard-closed')
    document.getElementById('leaderboardContainer').classList.remove('closed')
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

  close () {
    document.getElementById('status').classList.add('closed')
    document.getElementById('status').innerText = ''
    document.getElementById('leaderboardEntries').style.display = 'none'
    document.getElementById('leaderboardContainer').classList.add('closed')
    document.getElementById('controlsContainer').classList.remove('controlsContainer-leaderboard-open')
    document.getElementById('controlsContainer').classList.add('controlsContainer-leaderboard-closed')
    document.querySelectorAll('.score-entry-left').forEach(element => element.remove())
    document.querySelectorAll('.score-entry-right').forEach(element => element.remove())
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
