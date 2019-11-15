import React from 'react'
import { storiesOf } from '@storybook/react'
import { useStore, useStoreFromContext, useAndUpdateDerivedStore } from '../hooks'
import { Button } from '../components'
import { Store } from '../utils'

const counterSubject = new Store(0)
function increment () {
  counterSubject.next(counterSubject.getValue() + 1)
}

const StoreExample = (props) => {
  const counterValue = useStore(counterSubject)
  console.log('rendering')
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={increment} />
  </div>)
}

storiesOf('Hooks|useStore', module)
  .add('simple', () => {
    return <React.Fragment>
      <StoreExample />
      <StoreExample />
      <div>Clicking either button should increment both.</div>
    </React.Fragment>
  })

const ExampleContext = React.createContext()
const ContextExample = (props) => {
  const counterValue = useStoreFromContext(ExampleContext)
  console.log('rendering')
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={increment} />
  </div>)
}

storiesOf('Hooks|useStore', module)
  .add('context', () => {
    return <ExampleContext.Provider value={counterSubject}>
      <ContextExample />
      <ContextExample />
      <div>Clicking either button should increment both.</div>
    </ExampleContext.Provider>
  })

const parentStore = new Store({ first: 0, second: 0 })
const DerivedExample = props => {
  const [counterValue, setCounter] = useAndUpdateDerivedStore(parentStore,
    counters => counters[props.which],
    (value, counters) => ({ ...counters, [props.which]: value })
  )
  console.log('rendering', props.which)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={() => setCounter(counterValue + 1)} />
  </div>)
}

storiesOf('Hooks|useStore', module)
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
  const [counterValue, setCounter] = useAndUpdateDerivedStore(parentStore, props.which)
  console.log('rendering', props.which)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={() => setCounter(counterValue + 1)} />
  </div>)
}

storiesOf('Hooks|useStore', module)
  .add('selector', () => {
    return <React.Fragment>
      <AccessorExample which='first' />
      <AccessorExample which='first' />
      <AccessorExample which='second' />
      <AccessorExample which='second' />
      <div>Top two buttons and bottom two buttons should be linked.</div>
    </React.Fragment>
  })
