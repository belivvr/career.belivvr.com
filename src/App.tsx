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
import UnrealModal from './components/Modal';
import './aframe/look-controls-touch-y-axis';

const socket = io(import.meta.env.VITE_API_URL);

AFRAME.registerComponent('click-open-modal', {
  init() {
    this.el.addEventListener('click', () => {
      document.querySelector('#modal').style.display = 'block';
    });
  },
});

AFRAME.registerComponent('detect-collision', {
  attributes: {
    prevZ: 0,
    isCollide: false,
  },
  init() {
    this.el.addEventListener('collidestart', (e: any) => {
      this.attributes.prevZ = this.el.object3D.position.z;
      this.attributes.isCollide = true;

      if (e.detail.targetEl.id === 'npc') {
        document.querySelector('#modal').style.display = 'block';

        document.querySelector('#modal').classList.add('on');
      }
    });

    this.el.addEventListener('collideend', () => {
      this.attributes.isCollide = false;
    });
  },
  tick() {
    const currentZ = this.el.object3D.position.z;

    if (this.attributes.isCollide && this.attributes.prevZ > currentZ) {
      this.el.object3D.position.z = this.attributes.prevZ;
    }
  },

});

AFRAME.registerComponent('occupants', {
  tick() {
    const { position } = this.el.object3D;
    socket.emit('occupants', { position });
    const prevZ = position.z;

    if (document.querySelector('#modal').classList.contains('on')) {
      position.z = prevZ;
    }
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
          detect-collision
        >
          <Cylinder
            ammo-body="type: kinematic; emitCollisionEvents: true;"
            ammo-shape="type: cylinder"
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

      <UnrealModal />

      <Title>Message</Title>

      <MessageBox chats={chats} />

      <MessageForm socket={socket} setChats={setChats} name={name} />
    </div>
  );
}
