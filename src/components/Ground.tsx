import { Plane } from '@belivvr/aframe-react';

export default function Ground(): JSX.Element {
  return (
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
  );
}
