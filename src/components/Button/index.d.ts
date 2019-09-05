import * as React from 'react';

export type ButtonVariant = "primary" | "outline" | "transparent";

export interface ButtonProps {
  label: string;
  ariaLabel: string;
  variant?: ButtonVariant;
  onClick?: (...args: any[]) => any;
}

export const Button: React.FC<ButtonProps>;

