import { useEffect, useRef, type ReactNode } from 'react';

interface OutsideClickHandlerProps {
  onOutsideClick: () => void;
  children: ReactNode;
  capture?: boolean;
  className?: string;
}

const OutsideMouseDownHandler = ({
  onOutsideClick,
  capture = false,
  className = '',
  children,
}: OutsideClickHandlerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    window.addEventListener('mousedown', handleClick, { capture });

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [capture, onOutsideClick]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideMouseDownHandler;
