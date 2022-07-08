import { Entity, GLTFModel, Image } from '@belivvr/aframe-react';

import TroikaText from '../aframe/TroikaText';

const NPC_SPEAK = '\'언리얼\' 개발자를 모집해요';

export default function NPC(): JSX.Element {
  return (
    <Entity
      click-open-modal
      position={{ x: -3, y: 2, z: -3 }}
      ammo-body="type: static;"
      ammo-shape="type: sphere; fit: manual; sphereRadius: 2;"
      id="npc"
    >
      <GLTFModel
        id="npc"
        src="#wizard"
        position={{ x: 0, y: -0.85, z: 0 }}
        rotation={{ x: 0, y: 45, z: 0 }}
        scale={{ x: 0.2, y: 0.2, z: 0.2 }}
      />
      <Image
        src="#speech"
        opacity={0.5}
        width={1.5}
        position={{ x: 0, y: 0.7, z: 0 }}
        billboard
      />
      <TroikaText
        value={NPC_SPEAK}
        position="0 0.8 0.01"
        fontSize="0.1"
        outlineWidth="0.01"
        billboard
      />
      <TroikaText
        value={NPC_SPEAK}
        position="0 0.8 -0.01"
        fontSize="0.1"
        outlineWidth="0.01"
        billboard
      />
    </Entity>
  );
}
