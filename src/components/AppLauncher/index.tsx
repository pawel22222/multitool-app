type Props = {
  icon: string;
  alt: string;
  onClick: () => void;
  disabled: boolean;
};

export default function AppLauncher({ icon, alt, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled}>
      <img src={icon} alt={alt} width='25px' height='25px' />
    </button>
  );
}
