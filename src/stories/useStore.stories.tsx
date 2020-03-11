import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Store, useStore, useStoreFromContext, useAndUpdateDerivedStore } from '..'

const counterSubject = new Store(0)
function increment () {
  counterSubject.next(counterSubject.getValue() + 1)
}

const StoreExample = () => {
  const counterValue = useStore(counterSubject)
  console.log('rendering')
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={increment} />
  </div>)
}

const ExampleContext = React.createContext(counterSubject)
const ContextExample = () => {
  const counterValue = useStoreFromContext(ExampleContext)
  console.log('rendering')
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={increment} />
  </div>)
}

const parentStore = new Store({ first: 0, second: 0 }, { immutable: true })
const DerivedExample = (props: { which:'first'|'second' }) => {
  const [counterValue, setCounter] = useAndUpdateDerivedStore(parentStore,
    counters => counters[props.which],
    (value, counters) => ({ ...counters, [props.which]: value })
  )
  console.log('rendering', props.which)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={() => setCounter(counterValue + 1)} />
  </div>)
}

const AccessorExample = (props: { which:'first'|'second' }) => {
  const [counterValue, setCounter] = useAndUpdateDerivedStore(parentStore, props.which)
  console.log('rendering', props.which)
  return (<div style={{ marginBottom: '10px' }}>
    <Button label={String(counterValue)} onClick={() => setCounter(counterValue + 1)} />
  </div>)
}

storiesOf('Hooks/useStore', module)
  .add('simple', () => {
    return <React.Fragment>
      <StoreExample />
      <StoreExample />
      <div>Clicking either button should increment both.</div>
    </React.Fragment>
  })
  .add('context', () => {
    return <ExampleContext.Provider value={counterSubject}>
      <ContextExample />
      <ContextExample />
      <div>Clicking either button should increment both.</div>
    </ExampleContext.Provider>
  })
  .add('derivation', () => {
    return <React.Fragment>
      <DerivedExample which='first' />
      <DerivedExample which='first' />
      <DerivedExample which='second' />
      <DerivedExample which='second' />
      <div>Top two buttons and bottom two buttons should be linked.</div>
    </React.Fragment>
  })
  .add('selector', () => {
    return <React.Fragment>
      <AccessorExample which='first' />
      <AccessorExample which='first' />
      <AccessorExample which='second' />
      <AccessorExample which='second' />
      <div>Top two buttons and bottom two buttons should be linked.</div>
    </React.Fragment>
  })
