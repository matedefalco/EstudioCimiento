import * as React from 'react';

export interface Phase {
  title: string;
  desc: string;
}

export interface PhaseListProps {
  /** Defaults to the four service phases. */
  phases?: Phase[];
  /** Index of the active phase (bronze accent), or -1 for none. */
  active?: number;
  style?: React.CSSProperties;
}

/**
 * The four-phase service as ascending, numbered steps that echo the brand symbol.
 * @startingPoint section="Brand" subtitle="Four-phase service as ascending steps" viewport="700x340"
 */
export function PhaseList(props: PhaseListProps): JSX.Element;
