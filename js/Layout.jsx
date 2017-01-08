const React = require('react')
const jsonp = require('jsonp')
const {object} = React.PropTypes
const ResultPane = require('./ResultPane')
const ALL = 'all'
const manipulateData = require('./manipulateData')

const Layout = React.createClass({
  getInitialState () {
    return {
      display: 'clubs',
      allMatches: '',
      filteredMatches: [],
      selectedClub: ALL,
      selectedGender: ALL,
      selectedLeague: ALL,
      allClubs: [],
      allTeams: [],
      allGenders: ['male', 'female', ALL]
    }
  },
  componentWillMount () {
    if (this.props.params.club) {
      this.setState({selectedClub: this.props.params.club})
    }
  },
  propTypes: {
    children: object,
    params: object,
    club: object
  },
  componentDidMount () {
    let callbackName = 'checkGames' + new Date().getTime() + Math.floor(Math.random() * 10000)
    let url = 'http://www.hookhockey.com/index.php/gillian-leagues-proj/?callback' + callbackName

    jsonp(url, null, function (err, data) {
      if (err) {
        console.error(err.message)
      } else {
        const {matches} = data
        const {allClubs, allTeams, allLeagues} = manipulateData.separateData(matches)
        this.setState({
          allMatches: matches,
          allLeagues,
          allTeams,
          allClubs
        })
      }
    }.bind(this))
  },
  render () {
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        state: this.state
      })
    }.bind(this))

    return (
      <div className='main-body'>
        {children}
        <ResultPane {...this.state} />
      </div>
    )
  }
})

module.exports = Layout
