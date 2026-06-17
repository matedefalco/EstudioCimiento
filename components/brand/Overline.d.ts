import * as React from 'react';

export interface OverlineProps {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

/** Wide-tracked lowercase section label, echoing the logo's "estudio". */
export function Overline(props: OverlineProps): JSX.Element;
