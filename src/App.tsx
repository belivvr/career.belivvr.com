import {
  Scene, Box, Plane, Camera, Cylinder, Sphere,
} from '@belivvr/aframe-react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { ChatType } from './type/chat';
import NicknameModal from './components/Nickname';
import MessageBox from './components/MessageBox';
import MessageForm from './components/MessageForm';
import Title from './components/Title';
import './aframe/look-controls-touch-y-axis';
import './aframe/joystick';

const socket = io(import.meta.env.VITE_API_URL);

AFRAME.registerComponent('click-open-modal', {
  init() {
    this.el.addEventListener('click', () => {
      document.querySelector('#modal').style.display = 'block';
    });
  },
});

AFRAME.registerComponent('detect-collision', {
  init() {
    this.el.addEventListener('collidestart', (e: any) => {
      if (e.detail.targetEl.id === 'npc') {
        console.log('hit');
      }
    });
  },
});

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
      <Scene
        physics="driver: ammo"
        cursor="rayOrigin: mouse;"
        loading-screen="enabled: false"
        joystick
      >
        {
          Object.entries(users).map(([id, { position }]) => (
            <Box
              key={id}
              id={id}
              color="red"
              position={position}
            />
          ))
        }
        <Camera
          position={{ x: 0, y: 0.8, z: 0 }}
          occupants
          magicWindowTrackingEnabled={false}
        >
          <Cylinder
            ammo-body="type: kinematic; emitCollisionEvents: true;"
            ammo-shape="type: cylinder"
            detect-collision
          />
        </Camera>

        <Plane
          id="ground"
          width={1000}
          height={1000}
          color="transparent"
          position={{ x: 0, y: -0.01, z: 0 }}
          rotation={{ x: -90, y: 0, z: 0 }}
          ammo-body="type: static;"
          ammo-shape="type: mesh"
        />

        <Box
          id="npc"
          color="red"
          position={{ x: -5, y: 0.5, z: -10 }}
          ammo-body="type: static;"
          ammo-shape="type: box"
          click-open-modal
        />

        <Sphere
          position={{ x: 5, y: 3, z: -10 }}
          ammo-body="type: static"
          ammo-shape="type: sphere"
          phiLength={180}
          thetaStart={180}
          rotation={{ x: 0, y: 0, z: 180 }}
          scale={{ x: 3, y: 3, z: 3 }}
        />
      </Scene>
      {
        !name && <NicknameModal socket={socket} setName={setName} />
      }

      <div
        id="modal"
        style={{
          display: 'none',
          width: '100px',
          height: '100px',
          background: 'black',
          position: 'absolute',
          zIndex: 199999,
        }}
      />

      <Title>Message</Title>

      <MessageBox chats={chats} />

      <MessageForm socket={socket} setChats={setChats} name={name} />
    </div>
  );
}
