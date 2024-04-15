import './style.scss';
import { useState } from 'react';
import SidebarItem from '../SidebarItem';
import { LittleArrowSvg } from '@/assets/svg';
import Button from '../Button';

type Props<T extends string> = {
  header?: string;
  className?: string;
  items: { id: T; label: string; iconSrc?: string }[];
  selectedId: T;
  setSelectedId: (item: T) => void;
};

export default function Sidebar<T extends string>({
  className = '',
  header = '',
  items,
  selectedId,
  setSelectedId,
}: Props<T>) {
  const [hideLabels, sethideLabels] = useState(false);

  return (
    <aside className={`sidebar-container ${hideLabels ? 'unpinned' : ''} ${className}`}>
      <div className='header-container'>
        {header && <h2 className='sidebar-header'>{header}</h2>}

        <Button
          className='menu-button'
          icon={<LittleArrowSvg type='white' direction={hideLabels ? 'right' : 'left'} />}
          onClick={() => sethideLabels((prev) => !prev)}
        />
      </div>

      <div className='sidebar-list'>
        {items.map(({ id, label, iconSrc }) => (
          <SidebarItem
            key={id}
            label={label}
            isSelected={id === selectedId}
            hideLabel={hideLabels}
            onClick={() => setSelectedId(id)}
            iconSrc={iconSrc}
            alt={`${label} icon`}
          />
        ))}
      </div>
    </aside>
  );
}
