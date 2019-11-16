import { BehaviorSubject } from 'rxjs'
import { skip } from 'rxjs/operators'
import equal from 'fast-deep-equal'
import get from 'lodash/get'
import setWith from 'lodash/setWith'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'

// Extension of BehaviorSubject that only sends updates to subscribers when
// its value changes. If next is invoked twice with the same value, the second
// will be ignored.
//
// A store is intended to contain simple state: only cloneable values as described
// by the lodash.clone() documentation. If there are functions related to the store,
// create a subclass and give it prototype methods.
//
// If you really need a store that contains functions or classes, you can set the
// 'immutable' option and the data will not be cloned. Take care that you do not
// create infinite loops by updating the store with unchanged values after subscribing
// to the store in a component.
//
// You can also set the immutable option to improve performance, as long as you never
// update the store value in place.
export class Store extends BehaviorSubject {
  constructor (initialvalue, options = {}) {
    super(initialvalue)
    this.options = {
      immutable: options.immutable
    }
    this.valueclone = this.cloneDeep(initialvalue)
  }

  cloneDeep (val) {
    return this.options.immutable ? val : cloneDeep(val)
  }

  next (value) {
    if (!equal(value, this.valueclone)) {
      this.valueclone = this.cloneDeep(value)
      super.next(value)
    }
  }
}
function immutableSet (state, path, value) {
  return setWith(clone(state), path, value, clone)
}

export class DerivedStore extends Store {
  constructor (store, getter, setter) {
    const options = {
      immutable: store.options.immutable
    }
    if (typeof getter === 'string') {
      const accessor = getter
      getter = parentValue => get(parentValue, accessor)
      setter = (value, parentValue) => immutableSet(parentValue, accessor, value)
      options.immutable = true
    }
    super(getter(store.value), options)
    this.parentStore = store
    this.setter = setter
    this.subscription = store.pipe(skip(1)).subscribe(newval => {
      super.next(getter(newval))
    })
  }

  next (value) {
    if (this.setter) this.parentStore.next(this.setter(value, this.parentStore.value))
  }

  complete () {
    this.subscription.unsubscribe()
    super.complete()
  }
}
