import 'aframe-troika-text';
import {
  Scene,
  Plane,
  Camera,
  Cylinder,
  Assets,
  Light,
  Sky,
  AssetItem,
} from '@belivvr/aframe-react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import './aframe/look-controls-touch-y-axis';
import './aframe/joystick';
import './aframe/billboard';

import type { User } from './type/User';

import { randomNameGenerator } from './utils/name';
import { chatOnSpeechBubble } from './utils/chat';

import MessageForm from './components/MessageForm';
import Modal from './components/Modal';
import Loading from './components/Loading';
import Boundary from './components/Boundary';
import NPC from './components/NPC';
import CareerSphere from './components/CareerSphere';
import Users from './components/Users';

const socket = io(import.meta.env.VITE_API_URL);
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let currentName = randomNameGenerator();

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
    const rotation = this.el.getAttribute('rotation');

    socket.emit('occupants', { name: currentName, position, rotation });
  },
});

export default function App(): JSX.Element {
  const [name, setName] = useState(currentName);
  const [users, setUsers] = useState<{ [id: string]: User }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [unrealCareer, setUnrealCareer] = useState<string>('');

  useEffect(() => {
    socket
      .on('chat', chatOnSpeechBubble)
      .on('all occupants', (data: { [id: string]: User }) => {
        setUsers(data);
      })
      .on('occupants', ({
        id, name: userName, position, rotation,
      }) => {
        setUsers((prev) => ({ ...prev, [id]: { name: userName, position, rotation } }));
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
        renderer={{
          colorManagement: true,
          physicallyCorrectLights: true,
        }}
        physics="driver: ammo"
        cursor="rayOrigin: mouse;"
        loading-screen="enabled: false"
        joystick
      >
        <Users users={users} />
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

        <NPC />
        <CareerSphere />

        <Sky
          src="#sky"
          scale={{ x: 0.1, y: 0.1, z: 0.1 }}
          position={{ x: 0, y: 10, z: 0 }}
        />

        <Light type="ambient" intensity={2} />

        <Boundary />

        <Assets>
          <img src="/sky.webp" alt="" id="sky" />
          <img src="/ground.jpeg" alt="" id="ground" />
          <img src="/speech.png" alt="" id="speech" />
          <AssetItem src="/wizard.glb" id="wizard" />
          <AssetItem src="/avatar.glb" id="avatar" />
          <AssetItem src="/road_block.glb" id="boundary" />
        </Assets>
      </Scene>
      <Modal>{unrealCareer}</Modal>

      <MessageForm
        socket={socket}
        name={name}
        setName={(value) => {
          setName(value);
          currentName = value;
        }}
      />
    </div>
  );
}
