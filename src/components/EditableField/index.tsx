import { useState } from 'react';
import './style.scss';
import OutsideMouseDownHandler from '@/containers/OutsideMouseDownHandler';
import Input from '../Input';

type Props = {
  value: string;
  className?: string;
  type?: 'text' | 'textarea';
  saveField: (value: string) => void;
};

export default function EditableField({ value, saveField, type = 'text', className = '' }: Props) {
  const [inputText, setInputText] = useState(value);
  const [isEdit, setIsEdit] = useState(false);

  function cancelEditing() {
    setIsEdit(false);
    setInputText(value);
  }

  function handleSaveField() {
    saveField(inputText);
    setIsEdit(false);
  }

  return isEdit ? (
    <OutsideMouseDownHandler
      onOutsideClick={handleSaveField}
      capture
      className='editable-field-container'
    >
      <Input
        type={type}
        className='editable-field edited'
        autoFocus
        value={inputText}
        setValue={setInputText}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) handleSaveField();
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
      {inputText}
    </div>
  );
}
