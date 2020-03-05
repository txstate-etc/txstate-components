export type Optional<T> = T | undefined
export type Maybe<T> = T | null

export type ActionType = 'set' | 'remove' | 'errors' | 'success'
export type Action<T = any> = { payload: T, path?: string, type: ActionType }

export type FormObject<T> = {
  form: T
}

export type FormErrors<T> = {
  errors?: RecursivePartial<T>
}

export type FormSuccess<T> = {
  success?: RecursivePartial<T>
}

export type OnSubmit<T> = (args: FormObject<T> & FormErrors<T>) => Promise<FormErrors<T>> | Promise<void> | void | FormErrors<T>
export type OnValidate<T> = (form: T) => Promise<FormErrors<T> & FormSuccess<T>> | Promise<void> | void | FormErrors<T> & FormSuccess<T>
export type OnChange<T> = (args: FormObject<T> & FormErrors<T> & FormSuccess<T>) => Promise<void> | void

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export interface FormRef {
  submit: () => Promise<void>
  updatePath: (path: string, value: any) => void
}

export type ErrorReport = {
  inputEvent: string
  error: boolean
  _index: number
}
