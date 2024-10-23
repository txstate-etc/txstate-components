import { Toast, Stack, Button } from '../components'

export default {
  title: 'Components | Toast',
  component: Toast
}

export const ToastStory = {
  name: 'Toast',
  component: Toast,
  render: () => {
    return <>
      <Stack horizontal horizontalAlign='center'>
        <Button label='Show Toast' onClick={() => Toast.makeText({ message: 'Greetings!', gravity: Toast.GRAVITY.TOP_LEFT })} />
      </Stack>
    </>
  }
}
