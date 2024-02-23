import { ReactNode } from 'react';
import './style.scss';

type Props = {
  children: ReactNode;
};

export default function Nav({ children }: Props) {
  return <div className='nav-container'>{children}</div>;
}
