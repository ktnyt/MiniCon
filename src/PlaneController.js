import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { css } from 'glamor'

class PlaneController extends Component {
  static propTypes = {
    grid: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    reset: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    reset: true,
    onChange: () => {}
  }

  state = { clicked: false }

  render = () => {
    const { grid, size, reset, onChange } = this.props
  
    const style = css({
      margin: 'auto',
      width: grid * size,
      height: grid * size,
    })

    const n = (grid - 1) / 2

    const cellStyle = (i, j) => css({
      backgroundColor: i === n || j === n ? 'red' : 'white',
      ':hover': {
        backgroundColor: 'gray'
      },
    })

    const handleOnChange = (i, j) => {
      const x = -(j - n) / n
      const y = -(n - i) / n
      onChange({ x, y })
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
              {_.range(grid).map(j => (
                <td key={j} className={`${cellStyle(i, j)}`} onMouseDown={event => {
                  handleOnChange(i, j)
                  this.setState({ clicked: true })
                }} onMouseEnter={event => {
                  if(this.state.clicked) {
                    handleOnChange(i, j)
                  }
                }} onMouseUp={event => {
                  if(reset) {
                    onChange({ x: 0, y: 0 })
                  }
                  this.setState({ clicked: false })
                }}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default PlaneController