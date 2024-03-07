import { useEffect, useRef } from 'react';

interface OutsideClickHandlerProps {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

const OutsideMouseDownHandler = ({ onOutsideClick, children }: OutsideClickHandlerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideMouseDownHandler;
