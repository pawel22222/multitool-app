import './style.scss';

interface Props {
  className: string;
  rowPosition: number;
  columnPosition: number;
  onClick: () => void;
  content: string;
}

function CalculatorKey({ className, rowPosition, columnPosition, onClick, content }: Props) {
  return (
    <button
      className={`calculator-key ${className} order-${rowPosition}-${columnPosition}`}
      onClick={onClick}
      tabIndex={Number(`${rowPosition}${columnPosition}`)}
    >
      {content}
    </button>
  );
}

export default CalculatorKey;
