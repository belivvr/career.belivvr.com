import { useRef } from 'react';
import { ChatType } from '../../type/chat';

type CallbackType = (prev: ChatType[]) => ChatType[];

type Props = {
  socket: any,
  setChats: (prev: CallbackType) => void,
  name: string
};

export default function MessageForm({ socket, setChats, name }: Props) {
  const input = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    (Array.from(formData.values()) as string[]).forEach((message) => {
      socket.emit('chat', message);

      setChats((prev: ChatType[]) => ([
        ...prev,
        {
          id: socket.id,
          name,
          message,
        },
      ]));
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
