import * as React from 'react';

export type ButtonVariant = "primary" | "outline" | "transparent";
export type ButtonType = "submit" | "button" | "reset";

export interface ButtonProps {
  label: string;
  ariaLabel?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: ButtonType;
  onClick?: (...args: any[]) => any;
}

export const Button: React.FC<ButtonProps>;

