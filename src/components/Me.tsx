import { Camera, Cylinder } from '@belivvr/aframe-react';
import { useEffect } from 'react';

import { isMobileDevice } from '../utils/device';

const DEFAULT_ACCELERATION = 10;
const BOOST_ACCELERATION = 40;

export default function Me(): JSX.Element {
  useEffect(() => {
    const camera = document.querySelector('a-camera')!;

    window.addEventListener('keydown', (e) => {
      if (e.key.toUpperCase() === 'SHIFT') {
        camera.setAttribute('wasd-controls', { acceleration: BOOST_ACCELERATION });
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key.toUpperCase() === 'SHIFT') {
        camera.setAttribute('wasd-controls', { acceleration: DEFAULT_ACCELERATION });
      }
    });
  }, []);

  return (
    <Camera
      jump="pressToJump: #jump;"
      position={{ x: 0, y: 1.6, z: 0 }}
      occupants
      lookControls={{
        magicWindowTrackingEnabled: !isMobileDevice,
      }}
      wasdControls={{
        acceleration: DEFAULT_ACCELERATION,
      }}
    >
      <Cylinder
        ammo-body="type: kinematic; emitCollisionEvents: true;"
        ammo-shape="type: cylinder"
        detect-collision
      />
    </Camera>
  );
}
