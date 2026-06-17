import * as React from 'react';

export interface CardProps {
  elevation?: 'flat' | 'raised' | 'floating';
  /** Bronze hairline along the top edge for an emphasized card. */
  accentEdge?: boolean;
  padding?: string;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Calm content container; hairline separation, shadow only when raised.
 * @startingPoint section="Core" subtitle="Surface container with elevation + accent edge" viewport="700x240"
 */
export function Card(props: CardProps): JSX.Element;
