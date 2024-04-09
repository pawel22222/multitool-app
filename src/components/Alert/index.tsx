import { type ReactNode } from 'react';
import { LoaderSvg } from '@/assets/svg';

interface Props {
  title?: string;
  message: string;
  alertType: 'info' | 'success' | 'danger' | 'warning';
  closeAlert?: () => void;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}

function Alert({
  children,
  title,
  message,
  alertType,
  closeAlert,
  loading = false,
  className = '',
}: Props) {
  return (
    <div className={`alert alert-${alertType} ${className}`}>
      <div style={{ minHeight: closeAlert ? '35px' : '0px' }}>
        {title && <h2>{title}</h2>}
        {closeAlert && (
          <div>
            <button className='btn-close' onClick={closeAlert} aria-label='Close'></button>
          </div>
        )}
      </div>

      <div className='me-3 w-100 d-flex align-items-center justify-content-between'>
        <div>
          {loading && <LoaderSvg />}
          {message}
        </div>

        {children}
      </div>
    </div>
  );
}

export default Alert;
