import React from 'react'
import { storiesOf } from '@storybook/react'
import { BehaviorSubject } from 'rxjs'
import { useSubject } from '../hooks'
import { Button } from '../components'

const CounterSubject = new BehaviorSubject(0)
function increment () {
  CounterSubject.next(CounterSubject.getValue() + 1)
}

const SubjectExample = (props) => {
  const [counterValue] = useSubject(CounterSubject)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={counterValue} onClick={increment} />
  </div>)
}

storiesOf('Hooks|useSubject', module)
  .add('paired buttons', () => {
    return <React.Fragment>
      <SubjectExample />
      <SubjectExample />
      <div>Clicking either button should increment both.</div>
    </React.Fragment>
  })
