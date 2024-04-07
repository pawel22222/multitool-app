import { type ReactNode } from 'react';
import './style.scss';

type Props = {
  children: ReactNode;
  testId?: string;
  className?: string;
};

export default function Nav({ children, testId, className }: Props) {
  return (
    <div className={`nav-container ${className || ''}`} data-testid={testId}>
      {children}
    </div>
  );
}
