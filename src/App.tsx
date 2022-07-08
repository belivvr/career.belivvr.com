import 'aframe-troika-text';
import {
  Scene,
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
import './aframe/click-open-modal';
import './aframe/detect-collision';
import occupants from './aframe/occupants';

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
import Ground from './components/Ground';
import Me from './components/Me';

const socket = io(import.meta.env.VITE_API_URL);
let currentName = randomNameGenerator();

occupants({ socket, getName: () => currentName });

export default function App(): JSX.Element {
  const [name, setName] = useState(currentName);
  const [users, setUsers] = useState<{ [id: string]: User }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [unrealCareer, setUnrealCareer] = useState<string>('');

  const updateUser = ({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    id, name, position, rotation,
  }: any) => setUsers((prev) => ({ ...prev, [id]: { name, position, rotation } }));

  const removeUser = (id: string) => {
    setUsers((prev) => {
      const next = prev;
      delete next[id];

      return next;
    });
  };

  useEffect(() => {
    socket
      .on('chat', chatOnSpeechBubble)
      .on('all occupants', setUsers)
      .on('occupants', updateUser)
      .on('leave', removeUser);

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
    <>
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
        <Me />

        <Users users={users} />

        <Ground />

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
          <AssetItem src="/ghost/scene.gltf" id="avatar" />
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
    </>
  );
}
