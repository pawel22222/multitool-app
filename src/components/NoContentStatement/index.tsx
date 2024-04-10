import './style.scss';

type Props = {
  title: string;
  message?: string;
};

export default function NoContentStatement({ title, message }: Props) {
  return (
    <div className='no-content-statement'>
      <div className='title'>{title}</div>
      {message && <div className='message'>{message}</div>}
    </div>
  );
}
