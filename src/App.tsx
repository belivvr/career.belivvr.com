import {
  Scene, Box, Plane, Camera, Cylinder, Sphere, Assets, Light, Sky,
} from '@belivvr/aframe-react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { ChatType } from './type/chat';
import NicknameModal from './components/Nickname';
import MessageBox from './components/MessageBox';
import MessageForm from './components/MessageForm';
import Title from './components/Title';
import Modal from './components/Modal';
import Loading from './components/Loading';
import './aframe/look-controls-touch-y-axis';
import './aframe/joystick';

const socket = io(import.meta.env.VITE_API_URL);
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

AFRAME.registerComponent('click-open-modal', {
  init() {
    this.el.addEventListener('click', () => {
      document.querySelector('#modal').style.display = 'flex';
    });
  },
});

AFRAME.registerComponent('detect-collision', {
  init() {
    this.el.addEventListener('collidestart', (e: any) => {
      if (e.detail.targetEl.id === 'npc') {
        document.querySelector('#modal').style.display = 'flex';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [unrealCareer, setUnrealCareer] = useState<string>('');

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

    const interval = setInterval(() => {
      if (document.querySelector('.a-enter-vr')) {
        setLoading(false);
        clearInterval(interval);
      }
    }, 100);

    fetch('/unreal-career.md').then((res) => res.text()).then((text) => {
      setUnrealCareer(text);
    });
  }, []);

  return (
    <div>
      {loading && <Loading />}
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
          lookControls={{
            magicWindowTrackingEnabled: !isMobileDevice,
          }}
          wasdControls={{
            acceleration: 10,
          }}
        >
          <Cylinder
            ammo-body="type: kinematic; emitCollisionEvents: true;"
            ammo-shape="type: cylinder"
            detect-collision
          />
        </Camera>

        <Plane
          width={1000}
          height={1000}
          color="transparent"
          position={{ x: 0, y: -0.01, z: 0 }}
          rotation={{ x: -90, y: 0, z: 0 }}
          ammo-body="type: static;"
          ammo-shape="type: mesh"
          src="#ground"
          repeat={{ x: 600, y: 600 }}
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
          position={{ x: 5, y: 2, z: -10 }}
          ammo-body="type: static"
          ammo-shape="type: sphere"
          phiLength={180}
          thetaStart={180}
          rotation={{ x: 30, y: -45, z: 180 }}
          scale={{ x: 3, y: 3, z: 3 }}
          side="double"
          color="black"
        />

        <Sky
          src="#sky"
          scale={{ x: 0.1, y: 0.1, z: 0.1 }}
          position={{ x: 0, y: 10, z: 0 }}
        />

        <Light type="ambient" />

        <Assets>
          <img src="/sky.webp" alt="" id="sky" />
          <img src="/ground.jpeg" alt="" id="ground" />
        </Assets>
      </Scene>
      {
        !name && <NicknameModal socket={socket} setName={setName} />
      }

      <Modal>{unrealCareer}</Modal>

      <Title>Message</Title>

      <MessageBox chats={chats} />

      <MessageForm socket={socket} setChats={setChats} name={name} />
    </div>
  );
}
