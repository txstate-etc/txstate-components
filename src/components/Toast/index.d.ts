export enum GRAVITY {
  TOP_LEFT = 'toast-top-left',
  TOP_CENTER = 'toast-top-center',
  TOP_RIGHT = 'toast-top-right',
  BOTTOM_CENTER = 'toast-bottom-center',
  BOTTOM_LEFT = 'toast-bottom-left',
  BOTTOM_RIGHT = 'toast-bottom-right'
}

export interface MakeTextArgs {
  message: string
  gravity: GRAVITY,
  duration: number
}

export interface Toast {
  GRAVITY: GRAVITY
  makeText: (arg: MakeTextArgs) => void
}

export const toast: Toast

