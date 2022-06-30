import { useState } from 'react';
import { io } from 'socket.io-client';

import { useRecoilValue } from 'recoil';
import nameState from './state/name';
import { ChatType } from './type/chat';
import NicknameModal from './components/Nickname';
import MessageBox from './components/MessageBox';
import MessageForm from './components/MessageForm';
import Title from './components/Title';

const socket = io(import.meta.env.VITE_API_URL);

export default function App(): JSX.Element {
  const name = useRecoilValue(nameState);
  const [chats, setChats] = useState<ChatType[]>([]);

  socket.on('chat', (chat: ChatType) => {
    setChats((prev) => ([
      ...prev,
      chat,
    ]));
  });

  return (
    <div>
      {
        !name && <NicknameModal socket={socket} />
      }

      <Title>Message</Title>

      <MessageBox chats={chats} />

      <MessageForm socket={socket} />
    </div>
  );
}
