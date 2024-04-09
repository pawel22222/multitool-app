import './style.scss';

type Tab = {
  id: string;
  name: string;
};

type Props = {
  tabs: Tab[];
  activeTabId: string | undefined;
  onClick: (id: string) => void;
};

export default function NavTabs({ tabs, activeTabId, onClick }: Props) {
  return (
    <nav className='nav-tabs'>
      {tabs.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => onClick(id)}
          className={`nav-tabs-item ${activeTabId === id ? 'active' : ''}`}
        >
          {name}
        </button>
      ))}
    </nav>
  );
}
