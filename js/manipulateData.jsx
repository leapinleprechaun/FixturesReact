const _ = require('lodash')

module.exports = {
  /*
   * Creates an object of match data split into all teams, all clubs and all leagues
   * @param {array} matches - an array of match data
   * @return {object} data seperated into allTeams, allLeagues and allClubs
  */
  separateData (matches) {
    const allTeams = this.getTeams(matches)
    return {
      allTeams: allTeams,
      allLeagues: this.getLeagues(matches),
      allClubs: this.getClubs(allTeams)
    }
  },
  /*
   * Returns a list of unique teams from specified dataset
   * @param {array} matches - an array of match data
   * @return {array} an array of teams
   */
  getTeams (matches) {
    return _.chain(matches)
      .map((match) => {
        return match.homeTeam
      }, _.trim)
      .uniq()
      .value()
  },
  /*
   * Returns a numeric list of league IDs
   * @param {array} matches - an array of match data
   * @return {array} an array of numbers of league ids
   */
  getLeagues (matches) {
    return _.chain(matches)
      .map((match) => {
        return Number(match.league)
      }, _.trim)
      .uniq()
      .value()
  },
  /*
   * Gets a list of uniue clubs by removing all Roman Numerals from the team titles
   * @param {array} teams - an array of team names
   * @return {array} - an array of unique club names
   */
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
  /*
   * Filters matches based on club
   * @param {string} clubName
   * @param {array} matches - an array of match data
   * @return {array} an array of filtered match data
   */
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
  /*
   * Checks if match data has specific gender in it
   * @param {string} gender - 'Womens' or 'Mens ' expected
   * @param {array} matches - an array of match data
   * @return {boolean}
   */
  hasGender (gender, matches) {
    return _.some(matches, (match) => {
      return match.leagueTitle.indexOf(gender) > -1
    })
  },
  /*
   * Checks if match data has specific gender in it
   * @param {array} matches - an array of match data
   * @return {array} choice of ['male', 'female', 'all']
   */
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
