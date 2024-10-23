import { Stack } from '../components'

export default {
  title: 'Components | Stack',
  component: Stack
}

export const VerticalStackStory = {
  name: 'Vertical Stack',
  component: Stack,
  render: () => {
    return <Stack style={{backgroundColor: '#005481'}}>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>1</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>2</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>3</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>4</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>5</div>
    </Stack>
  }
}

export const HorizontalStackStory = {
  name: 'Horizontal Stack',
  component: Stack,
  render: () => {
    return <Stack horizontal horizontalAlign='start' spacing={12} style={{backgroundColor: '#005481'}}>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>1</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>2</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>3</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>4</div>
      <div style={{ width: 50, height: 50, backgroundColor: 'white', border: 'solid 2px #501214', boxSizing: 'border-box' }}>5</div>
    </Stack>
  }
}

