const {expect, assert} = require('chai')
const manipulateData = require('../js/manipulateData')
const matchData = require('./matchData')

describe('separateData', () => {
  it('should pull out the teams', () => {
  	expect(manipulateData.separateData(matchData).allTeams)
  	.to.deep.equal(['Corinthian', 'Corinthian III', 'Wicklow', 'Loreto III', 'TRR III', 'Corinthian II', 'Monkstown V'])
  })
  it('should pull out the leagues', () => {
   	expect(manipulateData.separateData(matchData).allLeagues)
  	.to.deep.equal([1,10,25,17,9,4,13])
  })  
  it('should pull out all the clubs', () => {
   	expect(manipulateData.separateData(matchData).allClubs)
  	.to.deep.equal(['Corinthian', 'Wicklow', 'Loreto', 'TRR', 'Monkstown'])
  })
})

describe('gender related methods', () => {

  const womensOnly = [{'leagueTitle': 'Womens Div 1'}, {'leagueTitle': 'Womens Div 2'}],
        bothGenders = [{'leagueTitle': 'Mens Div 1'}, {'leagueTitle': 'Womens Div 2'}]

  it('should return true if a specified gender is present in a given set of matches', () => {
    assert.isTrue(manipulateData.hasGender('Womens', matchData))
  })

  it('should return false if a specified gender is not present in a given set of matches', () => {
    assert.isFalse(manipulateData.hasGender('Mens ', womensOnly))
  })

  it('should return an array of the available genders in a set of matches', () => {
    expect(manipulateData.getAvailableGenders(womensOnly)).to.deep.equal(['female'])
  })

  it('if both womens and mens matches are present it should also return an all option', () => {
    expect(manipulateData.getAvailableGenders(bothGenders)).to.deep.equal(['female', 'male', 'all'])
  })

})

describe('club specific data', () => {
  it('should bring back match information from a specified club', () => {
    expect(manipulateData.splitSpecificClubData('Corinthian', matchData).length).to.equal(4)
  })
})