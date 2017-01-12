const React = require('react')
const Heading = require('./Heading')
const {object} = React.PropTypes

const SelectedClubChooseGender = React.createClass({
  getInitialState () {

    return Object.assign(this.props.state, {display: 'gender', selectedClub: this.props.params.club})
  },
  propTypes: {
    params: object,
    state: object
  },
  render () {
    return <Heading heading={`Selected Club: ${this.props.params.club}`} />
  }
})

module.exports = SelectedClubChooseGender
