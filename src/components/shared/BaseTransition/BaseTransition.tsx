'use client';
import { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

type BaseTransition = {
  timeout: number;
  classNames: string;
  flag?: boolean | null | undefined;
  children: ReactNode;
};

export function BaseTransition({
  timeout,
  classNames,
  children,
  flag
}: BaseTransition) {
  let configIn = true;
  if (typeof flag !== 'undefined' && typeof flag !== 'object') {
    configIn = flag;
  }

  return (
    <CSSTransition
      in={configIn}
      timeout={timeout}
      classNames={classNames}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
}
