import './style.scss';
import { type ReactNode } from 'react';
import { CloseSvg, LoaderSvg } from '@/assets/svg';

interface Props {
  message: string;
  alertType: 'info' | 'success' | 'danger' | 'warning';
  title?: string;
  closeAlert?: () => void;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}

function Alert({
  children,
  message,
  alertType,
  closeAlert,
  title = 'Info',
  loading = false,
  className = '',
}: Props) {
  return (
    <div className={`alert alert-${alertType} ${className}`}>
      <div className='header-container' style={{ minHeight: closeAlert ? '35px' : '0px' }}>
        <h2 className='title'>{title}</h2>

        {closeAlert && (
          <button className='btn-close' onClick={closeAlert} aria-label='Close'>
            <CloseSvg className='alert-close' />
          </button>
        )}
      </div>

      <div className='main-container'>
        <div className='message-container'>
          {loading && (
            <div className='loader-container'>
              <LoaderSvg />
            </div>
          )}
          {message}
        </div>

        {children}
      </div>
    </div>
  );
}

export default Alert;
