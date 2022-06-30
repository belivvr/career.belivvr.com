import { useRef } from 'react';

type Props = {
  socket: any
};

export default function MessageForm({ socket }: Props) {
  const input = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    (Array.from(formData.values()) as string[]).forEach((message) => {
      socket.emit('chat', message);
    });

    if (input.current) {
      input.current.value = '';
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" name="text" ref={input} />
      <button type="submit"> Submit</button>
    </form>
  );
}
