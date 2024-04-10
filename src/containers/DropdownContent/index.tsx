import './style.scss';
import { useState, type ReactNode } from 'react';
import { LittleArrowSvg } from '@/assets/svg';

type Props = {
  title: string;
  defaultShowContent?: boolean;
  children: ReactNode;
};

export default function DropdownContent({ title, defaultShowContent = false, children }: Props) {
  const [showContent, setShowContent] = useState(defaultShowContent);

  const toggleShowContent = () => setShowContent((prev) => !prev);

  return (
    <div className='dropdown-content'>
      <div role='presentation' className='title-container' onClick={toggleShowContent}>
        <span className='title'>{title}</span>

        <LittleArrowSvg
          className='little-arrow'
          type='white'
          direction={showContent ? 'top' : 'bottom'}
        />
      </div>

      {showContent && <div className='content'>{children}</div>}
    </div>
  );
}
