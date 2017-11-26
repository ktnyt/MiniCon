import React, { Component } from 'react'
import PlaneController from './PlaneController'
import VerticalController from './VerticalController'
import { moveHead, moveWheel, moveArm, sound, videoSrc } from './api'

const clip = x => {
  if(x > 1) return 1
  if(x < -1) return -1
  return x
}

const convert = ({ x, y }) => {
  const l = clip(y - x)
  const r = clip(x + y)
  return { l, r }
}

const grid = 9
const size = 30

window.onkeydown = event => {
  const key = event.keyCode
  const shift = event.shiftKey
  if(48 <= key && key <= 57) {
    const value = key - 48
    const base = shift ? 10 : 0
    sound(value + base)
  }
}

class App extends Component {
  state = { arm: { left: 0, right: 0 } }

  render() {
    return (
      <div style={{ margin: 'auto', width: size * (grid + 2) + 320 }}>
        <div style={{ float: 'left' }}>
          <div style={{ clear: 'left', width: size * (grid + 2) }}>
            <PlaneController size={size} grid={grid} onChange={c => {
              const { x, y } = c
              const yaw = x
              const pitch = y
              const roll = 0.5
              moveHead(yaw, pitch, roll)
            }} />
          </div>
          <div style={{ float: 'left' }}>
            <VerticalController size={size} grid={grid} reset={false} onChange={v => {
              const { arm: { right } } = this.state
              const left = (v + 1) / 2
              moveArm(left, right)
              this.setState({ arm: { left, right } })
            }} />
          </div>
          <div style={{ float: 'left' }}>
            <PlaneController size={size} grid={grid} onChange={c => {
              const { l, r } = convert(c)
              const left = Math.floor(l * 100) * 0.5
              const right = Math.floor(r * 100) * 0.5
              moveWheel(left, right)
            }} />
          </div>
          <div style={{ float: 'left' }}>
            <VerticalController size={size} grid={grid} reset={false} onChange={v => {
              const { arm: { left } } = this.state
              const right = (v + 1) / 2
              moveArm(left, right)
              this.setState({ arm: { left, right } })
            }} />
          </div>
        </div>
        <div style={{ float: 'left', width: 320 }}>
          <img src={videoSrc} alt='video' />
        </div>
      </div>
    )
  }
}

export default App
