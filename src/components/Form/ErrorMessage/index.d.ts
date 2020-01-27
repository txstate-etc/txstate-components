import * as React from 'react'

export interface ErrorProps {
  error?: string,
  success?: string,
  ErrorComponent?: React.ElementType,
  SuccessComponent?: React.ElementType
}

export const ErrorMessage: React.FC<ErrorProps>
