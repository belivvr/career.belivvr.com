import { Camera, Cylinder } from '@belivvr/aframe-react';

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default function Me(): JSX.Element {
  return (
    <Camera
      position={{ x: 0, y: 1.6, z: 0 }}
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
  );
}
