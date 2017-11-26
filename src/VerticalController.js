import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { css } from 'glamor'

class VerticalController extends Component {
  static propTypes = {
    grid: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    reset: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    reset: false,
    onChange: () => {}
  }

  state = { clicked: false }

  render = () => {
    const { grid, size, reset, onChange } = this.props

    const style = css({
      width: size,
      height: grid * size,
    })

    const n = (grid - 1) / 2

    const cellStyle = i => css({
      backgroundColor: i === n ? 'red' : 'white',
      ':hover': {
        backgroundColor: 'gray'
      },
    })

    const handleOnChange = i => {
      const v = -(i - n) / n
      onChange(v)
    }

    return (
      <table
      border={1}
      cellSpacing={0}
      className={`${style}`}
      >
        <tbody>
          {_.range(grid).map(i => (
            <tr key={i}>
              <td className={`${cellStyle(i)}`} onMouseDown={event => {
                  handleOnChange(i)
                  this.setState({ clicked: true })
                }} onMouseEnter={event => {
                  if(this.state.clicked) {
                    handleOnChange(i)
                  }
                }} onMouseUp={event => {
                  if(reset) {
                    onChange(0)
                  }
                  this.setState({ clicked: false })
                }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default VerticalController
