import * as React from 'react';

export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'positive' | 'warning' | 'danger';
  /** Filled soft background (default) vs outline only. */
  soft?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Compact status or category marker. */
export function Badge(props: BadgeProps): JSX.Element;
