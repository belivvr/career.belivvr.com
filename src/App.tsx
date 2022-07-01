import 'aframe';
import 'aframe-mirror';
import {
  Scene, Box, Plane, Camera,
} from '@belivvr/aframe-react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { ChatType } from './type/chat';
import NicknameModal from './components/Nickname';
import MessageBox from './components/MessageBox';
import MessageForm from './components/MessageForm';
import Title from './components/Title';

const socket = io(import.meta.env.VITE_API_URL);

export default function App(): JSX.Element {
  const [name, setName] = useState('');
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => () => {
    socket.on('chat', (chat: ChatType) => {
      setChats((prev) => ([
        ...prev,
        chat,
      ]));
    });
  }, []);

  return (
    <div>
      <Scene>
        <Camera>
          <Box
            color="blue"
          />
        </Camera>

        <Plane
          position={{ x: -1, y: 0.5, z: -8 }}
          scale={{ x: 10, y: 10, z: 10 }}
          mirror
        />
      </Scene>
      {
        !name && <NicknameModal socket={socket} setName={setName} />
      }

      <Title>Message</Title>

      <MessageBox chats={chats} />

      <MessageForm socket={socket} setChats={setChats} name={name} />
    </div>
  );
}
