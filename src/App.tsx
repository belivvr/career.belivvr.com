import 'aframe-troika-text';
import {
  Scene,
  Box,
  Plane,
  Camera,
  Cylinder,
  Sphere,
  Assets,
  Light,
  Sky,
  AssetItem,
  GLTFModel,
  Entity,
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
import './aframe/billboard';
import TroikaText from './aframe/TroikaText';
import { randomNameGenerator } from './utils/name';
import { chatOnSpeechBubble } from './utils/chat';

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

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

interface User {
  name: string;
  position: Vector3;
  rotation: Vector3;
}

export default function App(): JSX.Element {
  const [name, setName] = useState(currentName);
  currentName = name;
  const [chats, setChats] = useState<ChatType[]>([]);
  const [users, setUsers] = useState<{ [id: string]: User }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [unrealCareer, setUnrealCareer] = useState<string>('');
  const [webrtcCareer, setWebrtcCareer] = useState<string>('');

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
    fetch('/webrtc-career.txt').then((res) => res.text()).then((text) => {
      setWebrtcCareer(text);
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
          Object.entries(users).map(([id, { name: userName, position, rotation }]) => (
            <Entity key={id} id={id} position={position}>
              <TroikaText
                value={userName}
                fontSize="0.2"
                position="0 0.1 0"
                rotation={`0 ${rotation.y + 180} 0`}
                outlineWidth="0.01"
                billboard
              />
              <GLTFModel
                src="#avatar"
                scale={{ x: 0.3, y: 0.3, z: 0.3 }}
                position={{ x: 0, y: -0.4, z: 0 }}
                rotation={{ x: 0, y: rotation.y + 90, z: rotation.x + 10 }}
              />
            </Entity>
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
          rotation={{ x: 30, y: -45, z: 0 }}
          scale={{ x: 3, y: 3, z: 3 }}
          side="double"
          color="black"
        >
          <TroikaText value={webrtcCareer} curveRadius="1" />
        </Sphere>

        <Sky
          src="#sky"
          scale={{ x: 0.1, y: 0.1, z: 0.1 }}
          position={{ x: 0, y: 10, z: 0 }}
        />

        <Light type="ambient" />

        <Assets>
          <img src="/sky.webp" alt="" id="sky" />
          <img src="/ground.jpeg" alt="" id="ground" />
          <img src="/speech.png" alt="" id="speech" />
          <AssetItem src="/avatar.glb" id="avatar" />
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
