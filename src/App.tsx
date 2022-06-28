import { io } from 'socket.io-client';
import { useState } from 'react';

export default function App(): JSX.Element {
  const socket = io(import.meta.env.VITE_API_URL);
  
  const [chats, setChats] = useState<string[]>([]);
  const [sendingText, setSendingText] = useState('');

  socket.on('chat', (chat: string) => {
    setChats((prev) => ([
      ...prev,
      chat,
    ]));
  });

  const changeHandler = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSendingText(value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('chat', sendingText);
    setChats((prev) => ([
      ...prev,
      sendingText,
    ]));
    setSendingText('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {
          chats.map((chat) => <li>{chat}</li>)
        }
      </ul>

      <form action="" onSubmit={submitHandler}>
        <input type="text" onChange={changeHandler} value={sendingText} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
