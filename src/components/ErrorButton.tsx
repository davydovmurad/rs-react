import { ComponentProps, MouseEventHandler, useState } from 'react';

export default function ErrorButton(props: ComponentProps<'button'>) {
  const [error, setError] = useState<boolean>(false);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    setError(true);
  };

  if (error) {
    throw Error('Test error');
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button style={{ margin: '30px 0' }} onClick={handleOnClick} {...props}>
        Error button
      </button>
    </div>
  );
}
