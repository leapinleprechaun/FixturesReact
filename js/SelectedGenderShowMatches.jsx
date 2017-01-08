const React = require('react')
const Heading = require('./Heading')
const {object} = React.PropTypes

const SelectedGenderShowMatches = React.createClass({
  propTypes: {
    params: object
  },
  render () {
    return <Heading heading={`Selected Gender: ${this.props.params.gender} Selected Club: ${this.props.params.club}`} />
  }
})

module.exports = SelectedGenderShowMatches
