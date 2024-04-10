import './style.scss';
import { useState, type ReactNode } from 'react';
import { LittleArrowSvg } from '@/assets/svg';

type Props = {
  title: string;
  defaultShowContent?: boolean;
  customShowContentState?: [showContent: boolean, setShowContent: (showContent: boolean) => void];
  children: ReactNode;
};

export default function DropdownContent({
  title,
  defaultShowContent = false,
  customShowContentState,
  children,
}: Props) {
  const showContentState = useState(defaultShowContent);
  const [showContent, setShowContent] = customShowContentState || showContentState;

  const toggleShowContent = () => setShowContent(!showContent);

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
