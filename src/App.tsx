import AFRAME from 'aframe';
import 'aframe-mirror';
import {
  Scene, Box, Plane, Camera,
} from '@belivvr/aframe-react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { isEqual } from 'lodash';

import { ChatType } from './type/chat';
import { PositionType, RotationType } from './type/object3D';
import NicknameModal from './components/Nickname';
import MessageBox from './components/MessageBox';
import MessageForm from './components/MessageForm';
import Title from './components/Title';

type UserType = {
  [id: string]: {
    position: PositionType,
    rotation: RotationType
  }
};

const socket = io(import.meta.env.VITE_API_URL);

let beforePosition = { x: 0, y: 0, z: 0 };
let beforeRotation = { x: 0, y: 0, z: 0 };

const isEqualsLastPause = (
  position: PositionType,
  rotation: RotationType,
): boolean => isEqual(position, beforePosition) && isEqual(rotation, beforeRotation);

const users: UserType = {};

socket.on('occupants', ({ id, position, rotation }) => {
  users[id].position = position;
  users[id].rotation = rotation;
});

AFRAME.registerComponent('occupants', {
  tick() {
    const { position, rotation } = this.el.object3D;

    if (isEqualsLastPause(position, rotation)) {
      return;
    }

    beforePosition = position;
    beforeRotation = rotation;
    socket.emit('occupants', { id: socket.id, position, rotation });
  },
});

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
