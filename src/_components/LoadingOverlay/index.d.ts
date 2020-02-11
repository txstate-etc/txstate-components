import * as React from 'react'

export interface LoadingOverlayProps {
  ariaDescription: string
  isLoading: bool
  variant: 'primary' | 'secondary'
}

export const LoadingOverlay: React.FC<LoadingOverlayProps>
