import { type ReactNode } from 'react';
import './style.scss';

type Props = {
  children: ReactNode;
  testid?: string;
  className?: string;
};

export default function Nav({ children, testid, className }: Props) {
  return (
    <div className={`nav-container ${className || ''}`} data-testid={testid}>
      {children}
    </div>
  );
}
