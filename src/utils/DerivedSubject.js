import { BehaviorSubject } from 'rxjs'
import equal from 'fast-deep-equal'

export class DerivedSubject extends BehaviorSubject {
  constructor (subject, transform, mutate) {
    super(transform(subject.value))
    this.parentSubject = subject
    this.mutate = mutate
    subject.subscribe(newval => {
      const newderived = transform(newval)
      if (!equal(newderived, this.value)) {
        super.next(newderived)
      }
    })
  }

  next (value) {
    if (this.mutate) this.parentSubject.next(this.mutate(value, this.parentSubject.value))
  }
}
