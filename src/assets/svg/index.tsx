import { ReactNode } from 'react';
import './style.scss';

interface SvgProps {
  className?: string;
  type?: 'active' | 'white' | 'danger';
}
interface SvgWrapperProps extends SvgProps {
  children: ReactNode;
}
type Direction = 'top' | 'right' | 'bottom' | 'left';

function SvgWrapper({ className = '', type = 'active', children }: SvgWrapperProps) {
  return (
    <svg
      className={`icon-svg ${className} ${type}`}
      width='100%'
      height='100%'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {children}
    </svg>
  );
}

export const EditSvg = ({ className, type }: SvgProps) => {
  return (
    <SvgWrapper className={className} type={type}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4' />
      <path d='M13.5 6.5l4 4' />
    </SvgWrapper>
  );
};
export const TrashSvg = ({ className, type }: SvgProps) => {
  return (
    <SvgWrapper className={className} type={type}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 7l16 0' />
      <path d='M10 11l0 6' />
      <path d='M14 11l0 6' />
      <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
      <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
    </SvgWrapper>
  );
};

export const PlusSvg = ({ className, type }: SvgProps) => {
  return (
    <SvgWrapper className={className} type={type}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M12 5l0 14' />
      <path d='M5 12l14 0' />
    </SvgWrapper>
  );
};

export const ClearAllSvg = ({ className, type }: SvgProps) => {
  return (
    <SvgWrapper className={className} type={type}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 6h12' />
      <path d='M6 12h12' />
      <path d='M4 18h12' />
    </SvgWrapper>
  );
};

export const ArrowSvg = ({ className, type, direction }: SvgProps & { direction?: Direction }) => {
  console.log(direction);

  return (
    <SvgWrapper className={className} type={type}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 12l14 0' />
      <path d='M5 12l6 6' />
      <path d='M5 12l6 -6' />
    </SvgWrapper>
  );
};
