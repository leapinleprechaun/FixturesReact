const React = require('react')
const Option = require('./Option')
const {arrayOf, object} = React.PropTypes

const ChooseOption = React.createClass({
  propTypes: {
    options: arrayOf(object)
  },
  getAllOptions () {
    return this.props.options.map((opt) => {
      return <Option name={opt.name} key={opt.id} />
    })
  },
  render (props) {
    const options = this.getAllOptions()
    return (
      <ul className='options'>
        {options}
      </ul>
    )
  }

})

module.exports = ChooseOption
