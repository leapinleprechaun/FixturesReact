const React = require('react')
const {Link} = require('react-router')
const {string} = React.PropTypes

const Option = React.createClass({
  propTypes: {
    name: string
  },
  render () {
    return <li><Link to={`club/${this.props.name}`}>{this.props.name}</Link></li>
  }
})

module.exports = Option
