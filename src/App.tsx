import { io } from 'socket.io-client';
import { useState } from 'react';

export default function App(): JSX.Element {
  const socket = io(import.meta.env.VITE_API_URL);

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
    
    for(let [, value] of formData.entries()){
      setChats((prev) => ([
        ...prev,
        value as string,
      ]));
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {
          chats.map((chat,idx) => <li key={idx}>{chat}</li>)
        }
      </ul>

      <form action="" onSubmit={submitHandler}>
        <input type="text" name="text"/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
