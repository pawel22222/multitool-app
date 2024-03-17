import { useState } from 'react';
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
      className={className}
      onDoubleClick={() => {
        setIsEdit(true);
      }}
    >
      {value}
    </div>
  );
}
