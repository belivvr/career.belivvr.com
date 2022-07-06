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
  const [isOpenModal, setIsOpenModal] = useState(false);

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

    AFRAME.registerComponent('click-open-modal', {
      init() {
        this.el.addEventListener('click', () => {
          setIsOpenModal(true);
        });
      },
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
          ammo-body="type: static"
          ammo-shape="type: mesh"
        />

        <Box
          color="red"
          position={{ x: -5, y: 0.5, z: -10 }}
          ammo-body="type: static"
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
          display: isOpenModal ? 'block' : 'none',
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

/**
 * 개발자 채용 페이지
 *
 * - 어떤 사람을 뽑을 것인지 Job Description 소개
 * - 어떻게 지원해야 하는지 설명
 *
 * ---------
 * 지금 만들고 있는 개발자 Career 페이지
 *
 * - VR 지원
 * - 다른 사람들이 뭘 보고있는지 보임
 * - 채팅도 할 수 있음
 * - 뭔가 물체가 있고 가까이 가거나 클릭하면 JD가 나옴
 *   - 어떤 형태로 나올 것인가
 *   - NPC?: 자네 언리얼을 하고싶다고?
 *   - 컨셉을 잡아야 함
 * - 게시판 처럼 있고 가까이 가서 보는 형태면?
 */
