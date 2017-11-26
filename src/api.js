import 'whatwg-fetch'

const host = process.env.REACT_APP_MINIDORA_HOST
const port = process.env.REACT_APP_MINIDORA_PORT

export const moveHead = (yaw, pitch, roll) => fetch(`http://${host}:${port}/servo_motor/head`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ yaw, pitch, roll }),
})

export const moveWheel = (left, right) => fetch(`http://${host}:${port}/dc_motor/wheel`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ left, right }),
})

export const moveArm = (left, right) => fetch(`http://${host}:${port}/servo_motor/arm`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ left, right }),
})

export const sound = id => fetch(`http://${host}:${port}/sound`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id }),
})

export const videoSrc = `http://${host}:${port}/video_feed`