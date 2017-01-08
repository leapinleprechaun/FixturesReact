const React = require('react')
const Option = require('./Option')
const {string, array} = React.PropTypes
const manipulateData = require('./manipulateData')

const ResultPane = React.createClass({
  propTypes: {
    display: string,
    allClubs: array,
    allTeams: array,
    allGenders: array,
    allMatches: array,
    selectedClub: string
  },
  getResults (data) {
    return data.map((opt) => {
      return <Option name={opt} key={opt} />
    })
  },
  getGenderForClub (matchesForClub) {
    return manipulateData.getAvailableGenders(matchesForClub)
  },
  render (props) {
    let output
    if (this.props.display === 'clubs') {
      output = this.getResults(this.props.allClubs)
    } else if (this.props.display === 'teams') {
      output = this.getResults(this.props.allTeams)
    } else if (this.props.display === 'gender') {
      output = this.getResults(
        this.getGenderForClub(
          manipulateData.splitSpecificClubData(
            this.props.selectedClub, this.props.allMatches
            )
          )
        )
    }
    return (
      <ul className='team-checks'>
        {output}
      </ul>
    )
  }

})

module.exports = ResultPane
