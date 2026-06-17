import * as React from 'react';

export interface LogoProps {
  /** full = symbol + lowercase wordmark; symbol = mark only. */
  variant?: 'full' | 'symbol';
  /** Wordmark font-size in px (symbol scales relative to it). */
  size?: number;
  /** Override accent color; defaults to themed bronze/copper. */
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Estudio Cimiento brand lockup — ascending steps + lowercase wordmark.
 * @startingPoint section="Brand" subtitle="Brand symbol + lowercase wordmark" viewport="700x160"
 */
export function Logo(props: LogoProps): JSX.Element;
