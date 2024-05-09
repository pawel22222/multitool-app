import './style.scss';
import { useState } from 'react';
import { SettingsCategories } from './types';
import Sidebar from '@/components/Sidebar';
import GeneralForm from './components/GeneralForm';
import PersonalForm from './components/PersonalForm';

export default function Settings() {
  const [selectedCategory, setSelectedCategory] = useState<SettingsCategories>('general');

  const settingsCategories: {
    id: SettingsCategories;
    label: string;
    iconSrc?: string;
  }[] = [
    {
      id: 'general',
      label: 'General',
      iconSrc: './settings-icon.png',
    },
    {
      id: 'personal',
      label: 'Personal',
      iconSrc: './person-icon.svg',
    },
  ];

  function switchCategory(category: SettingsCategories) {
    switch (category) {
      case 'general':
        return <GeneralForm />;
      case 'personal':
        return <PersonalForm />;

      default:
        return null;
    }
  }

  return (
    <div className='settings-container'>
      <Sidebar
        header='Categories'
        items={settingsCategories}
        selectedId={selectedCategory}
        setSelectedId={setSelectedCategory}
        testid='settings-categories'
      />

      <main className='main'>{switchCategory(selectedCategory)}</main>
    </div>
  );
}
