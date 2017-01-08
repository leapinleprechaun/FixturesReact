const React = require('react')
const {string} = React.PropTypes

const Heading = (params) => (
  <h1>{params.heading}</h1>
)

Heading.propTypes = {
  heading: string
}

module.exports = Heading
