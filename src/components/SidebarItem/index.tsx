import './style.scss';

type Props = {
  onClick: () => void;
  label: string;
  isSelected: boolean;
  hideLabel?: boolean;
  iconSrc?: string;
  alt?: string;
};

export default function SidebarItem({
  onClick,
  label,
  isSelected,
  hideLabel = false,
  iconSrc,
  alt,
}: Props) {
  return (
    <button className={`sidebar-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {iconSrc && <img src={iconSrc} alt={alt} className='icon' />}

      <span className={`label ${hideLabel ? 'hide' : ''}`}>{label}</span>
    </button>
  );
}
