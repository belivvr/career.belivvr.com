import AFRAME from 'aframe';
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

AFRAME.registerComponent('occupants', {
  tick() {
    const { position } = this.el.object3D;

    socket.emit('occupants', { position });
  },
});

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

interface User {
  position: Vector3;
}

export default function App(): JSX.Element {
  const [name, setName] = useState('');
  const [chats, setChats] = useState<ChatType[]>([]);
  const [users, setUsers] = useState<{ [id: string]: User }>({});

  useEffect(() => {
    socket
      .on('chat', (chat: ChatType) => {
        setChats((prev) => ([
          ...prev,
          chat,
        ]));
      })
      .on('all occupants', (data: { [id: string]: User }) => {
        setUsers(data);
      })
      .on('occupants', ({ id, position }) => {
        setUsers((prev) => ({ ...prev, [id]: { position } }));
      })
      .on('leave', (id) => {
        setUsers((prev) => {
          const next = prev;
          delete next[id];

          return next;
        });
      });
  }, []);

  return (
    <div>
      <Scene>
        {
          Object.entries(users).map(([id, { position }]) => id !== socket.id && (
            <Box
              key={id}
              id={id}
              color="red"
              position={position}
            />
          ))
        }
        <Camera occupants>
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
