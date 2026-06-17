import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  hint?: string;
  /** When set, field renders in error state and shows this message. */
  error?: string;
  style?: React.CSSProperties;
}

/** Text field with optional label, hint and error state; bronze focus ring. */
export function Input(props: InputProps): JSX.Element;
