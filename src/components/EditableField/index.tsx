import { useState } from 'react';
import './style.scss';
import OutsideMouseDownHandler from '../../containers/OutsideMouseDownHandler';

type Props = {
  value: string;
  className?: string;
  saveField: (value: string) => void;
};

export default function EditableField({ value, saveField, className = '' }: Props) {
  const [inputText, setInputText] = useState(value);
  const [isEdit, setIsEdit] = useState(false);

  function cancelEditing() {
    setIsEdit(false);
    setInputText(value);
  }

  function handleSaveField(name: string) {
    saveField(name);
    setIsEdit(false);
    setInputText(name);
  }

  return isEdit ? (
    <OutsideMouseDownHandler onOutsideClick={cancelEditing} capture>
      <input
        className='editable-field edited'
        autoFocus
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSaveField(inputText);
          if (e.key === 'Escape') cancelEditing();
        }}
      />
    </OutsideMouseDownHandler>
  ) : (
    <div
      className={`editable-field ${className}`}
      onDoubleClick={() => {
        setIsEdit(true);
      }}
    >
      {value}
    </div>
  );
}
