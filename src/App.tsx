import { io } from 'socket.io-client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import chatState from './state/chat';

export default function App(): JSX.Element {
  const [chats, setChats] = useRecoilState(chatState);
  const socket = io(import.meta.env.VITE_API_URL);
  const [sendingText, setSendingText] = useState('');

  socket.on('chat', (chat: string) => {
    setChats([
      ...chats,
      chat,
    ]);
  });

  const changeHandler = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSendingText(value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('chat', sendingText);
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
