import { io } from 'socket.io-client';
import { useState } from 'react';

const socket = io(import.meta.env.VITE_API_URL);

export default function App(): JSX.Element {
  const [chats, setChats] = useState<string[]>([]);

  socket.on('chat', (chat: string) => {
    setChats((prev) => ([
      ...prev,
      chat,
    ]));
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    Array.from(formData.values()).forEach((value) => socket.emit('chat', value));
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {
          chats.map((chat, index) => <li key={`${chat + index}`}>{chat}</li>)
        }
      </ul>

      <form action="" onSubmit={submitHandler}>
        <input type="text" name="text" />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
