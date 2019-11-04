import { BehaviorSubject } from 'rxjs'
import { skip } from 'rxjs/operators'
import equal from 'fast-deep-equal'
import get from 'lodash/get'
import set from 'lodash/set'

export class DerivedSubject extends BehaviorSubject {
  constructor (subject, transform, mutate) {
    if (typeof transform === 'string') {
      const accessor = transform
      transform = parentValue => get(parentValue, accessor)
      mutate = (value, parentValue) => set(parentValue, accessor, value)
    }
    super(transform(subject.value))
    this.parentSubject = subject
    this.mutate = mutate
    this.subscription = subject.pipe(skip(1)).subscribe(newval => {
      const newderived = transform(newval)
      if (!equal(newderived, this.value)) {
        super.next(newderived)
      }
    })
  }

  next (value) {
    if (this.mutate) this.parentSubject.next(this.mutate(value, this.parentSubject.value))
  }

  complete () {
    this.subscription.unsubscribe()
    super.complete()
  }
}
