import * as React from 'react';

export interface TagProps {
  children?: React.ReactNode;
  /** When provided, shows a remove affordance and calls this on click. */
  onRemove?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Lightweight keyword chip, optionally removable. */
export function Tag(props: TagProps): JSX.Element;
