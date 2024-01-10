import React from 'react';
import { IProps } from 'interfaces/props';
import { ILinkData } from 'interfaces/general';
import Link from 'next/link';

interface Props extends IProps {
  href: string | ILinkData;
}

const BaseLink: React.FC<Props> = ({ href, className, ...props }) => {
  return (
    <Link href={href} {...props}>
      <a className={className}>
      {props.children}
      </a>
    </Link>
  );
};
export default BaseLink;
