const React = require('react')
const Layout = require('./Layout')
const ChooseAClub = require('./ChooseAClub')
const SelectedClubChooseGender = require('./SelectedClubChooseGender')
const SelectedGenderShowMatches = require('./SelectedGenderShowMatches')
const {Route, Router, IndexRoute, hashHistory} = require('react-router')
          // <Route path='/search' component={Search} />

const App = React.createClass({
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout} >
          <IndexRoute component={ChooseAClub} />
          <Route path='/club/:club' component={SelectedClubChooseGender} />
          <Route path='/club/:club/gender/:gender' component={SelectedGenderShowMatches} />
        </Route>
      </Router>
    )
  }
})

module.exports = App
