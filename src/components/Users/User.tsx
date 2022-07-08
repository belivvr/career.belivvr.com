import { Entity, GLTFModel } from '@belivvr/aframe-react';

import TroikaText from '../../aframe/TroikaText';
import type { Vector3 } from '../../type/Vector3';

interface Props {
  id: string;
  name: string;
  position: Vector3;
  rotation: Vector3;
}

export default function User({
  id, name, position, rotation,
}: Props): JSX.Element {
  return (
    <Entity id={id} position={position}>
      <TroikaText
        value={name}
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
  );
}
