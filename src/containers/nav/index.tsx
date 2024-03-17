import { type ReactNode } from 'react';
import './style.scss';

type Props = {
  children: ReactNode;
  testId?: string;
};

export default function Nav({ children, testId }: Props) {
  return (
    <div className='nav-container' data-testid={testId}>
      {children}
    </div>
  );
}
