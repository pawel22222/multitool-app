import { ReactNode } from 'react';
import './style.scss';

interface Props {
  children: ReactNode;
}
function PulpitContainer({ children }: Props) {
  return <div className='pulpit-container'>{children}</div>;
}

export default PulpitContainer;
