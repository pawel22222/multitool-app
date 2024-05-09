import './style.scss';

type Tab = {
  id: string;
  name: string;
};

type Props = {
  tabs: Tab[];
  activeTabId: string | null;
  onClick: (id: string) => void;
  testid?: string;
};

export default function NavTabs({ tabs, activeTabId, onClick, testid }: Props) {
  return (
    <nav className='nav-tabs' data-testid={testid}>
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
