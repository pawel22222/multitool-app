interface Props {
  className: string;
  rowPosition: number;
  columnPosition: number;
  onClick: () => void;
  content: string;
}

function Key({ className, rowPosition, columnPosition, onClick, content }: Props) {
  return (
    <button className={`key ${className} order-${rowPosition}-${columnPosition}`} onClick={onClick}>
      {content}
    </button>
  );
}

export default Key;
