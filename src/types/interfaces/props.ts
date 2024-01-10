import React from 'react';

export interface IProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export interface IBaseAtomComponentProps extends IProps {
  value?: string | number;
}
export interface IPanes {
  title: string;
  content: JSX.Element;
  key: string;
}

