import React from 'react'
import { storiesOf } from '@storybook/react'
import { BehaviorSubject } from 'rxjs'
import { useSubject, useDerivedSubject, useSubFromContext } from '../hooks'
import { Button } from '../components'

const counterSubject = new BehaviorSubject(0)
function increment () {
  counterSubject.next(counterSubject.getValue() + 1)
}

const SubjectExample = (props) => {
  const [counterValue] = useSubject(counterSubject)
  console.log('rendering')
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={increment} />
  </div>)
}

storiesOf('Hooks|useSubject', module)
  .add('simple', () => {
    return <React.Fragment>
      <SubjectExample />
      <SubjectExample />
      <div>Clicking either button should increment both.</div>
    </React.Fragment>
  })

const ExampleContext = React.createContext()
const ContextExample = (props) => {
  const counterValue = useSubFromContext(ExampleContext)
  console.log('rendering')
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={increment} />
  </div>)
}

storiesOf('Hooks|useSubject', module)
  .add('context', () => {
    return <ExampleContext.Provider value={counterSubject}>
      <ContextExample />
      <ContextExample />
      <div>Clicking either button should increment both.</div>
    </ExampleContext.Provider>
  })

const parentSubject = new BehaviorSubject({ first: 0, second: 0 })
const DerivedExample = props => {
  const [counterValue, setCounter] = useDerivedSubject(parentSubject,
    counters => counters[props.which],
    (value, counters) => ({ ...counters, [props.which]: value })
  )
  console.log('rendering', props.which)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={() => setCounter(counterValue + 1)} />
  </div>)
}

storiesOf('Hooks|useSubject', module)
  .add('derivation', () => {
    return <React.Fragment>
      <DerivedExample which='first' />
      <DerivedExample which='first' />
      <DerivedExample which='second' />
      <DerivedExample which='second' />
      <div>Top two buttons and bottom two buttons should be linked.</div>
    </React.Fragment>
  })

const AccessorExample = props => {
  const [counterValue, setCounter] = useDerivedSubject(parentSubject, props.which)
  console.log('rendering', props.which)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={() => setCounter(counterValue + 1)} />
  </div>)
}

storiesOf('Hooks|useSubject', module)
  .add('accessor', () => {
    return <React.Fragment>
      <AccessorExample which='first' />
      <AccessorExample which='first' />
      <AccessorExample which='second' />
      <AccessorExample which='second' />
      <div>Top two buttons and bottom two buttons should be linked.</div>
    </React.Fragment>
  })
