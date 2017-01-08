const _ = require('lodash')

module.exports = {
  separateData (matches) {
    const allTeams = this.getTeams(matches)
    return {
      allTeams: allTeams,
      allLeagues: this.getLeagues(matches),
      allClubs: this.getClubs(allTeams)
    }
  },
  getTeams (matches) {
    return _.chain(matches)
      .map((match) => {
        return match.homeTeam
      }, _.trim)
      .uniq()
      .value()
  },
  getLeagues (matches) {
    return _.chain(matches)
      .map((match) => {
        return Number(match.league)
      }, _.trim)
      .uniq()
      .value()
  },
  getClubs (teams) {
    return _.chain(teams)
    .map((team) => {
      let cleanupNumerals = team
      .replace(' VIII', '')
      .replace(' VII', '')
      .replace(' VI', '')
      .replace(' V', '')
      .replace(' IV', '')
      .replace(' III', '')
      .replace(' II', '')
      return cleanupNumerals
    }, _.trim)
    .uniq()
    .value()
  },
  splitSpecificClubData (clubName, matches) {
    return _.chain(matches)
      .filter((match) => {
        if (match.title.indexOf(clubName) > -1) {
          return match
        }
      })
      .compact()
      .value()
  },
  hasGender (gender, matches) {
    return _.some(matches, (match) => {
      return match.leagueTitle.indexOf(gender) > -1
    })
  },
  getAvailableGenders (matches) {
    let genders = []

    if (this.hasGender('Womens', matches)) {
      genders.push('female')
    }
    if (this.hasGender('Mens ', matches)) {
      genders.push('male')
    }

    if (genders.length === 2) {
      genders.push('all')
    }
    return genders
  }
}
