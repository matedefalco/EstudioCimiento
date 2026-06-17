import * as React from 'react';

export interface ButtonProps {
  /** Visual weight. primary = bronze accent (use once per view). */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill container width. */
  full?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Primary action control for Estudio Cimiento.
 * @startingPoint section="Core" subtitle="Pill button, bronze accent + variants" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
