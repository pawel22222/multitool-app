import './style.scss';

interface Props {
  className: string;
  rowPosition: number;
  columnPosition: number;
  onClick: () => void;
  content: string;
  testid: string;
}

function CalculatorKey({
  className,
  rowPosition,
  columnPosition,
  onClick,
  content,
  testid,
}: Props) {
  return (
    <button
      className={`calculator-key ${className} order-${rowPosition}-${columnPosition}`}
      onClick={onClick}
      tabIndex={Number(`${rowPosition}${columnPosition}`)}
      data-testid={testid}
    >
      {content}
    </button>
  );
}

export default CalculatorKey;
