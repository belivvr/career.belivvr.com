import { useEffect, useState } from 'react';
import { Cylinder } from '@belivvr/aframe-react';

import TroikaText from '../aframe/TroikaText';

export default function CareerCylinder(): JSX.Element {
  const [left, setLeft] = useState<string>('');
  const [center, setCenter] = useState<string>('');
  const [right, setRight] = useState<string>('');

  useEffect(() => {
    fetch('/webrtc-career-left.txt').then((res) => res.text()).then((text) => {
      setLeft(text);
    });
    fetch('/webrtc-career-center.txt').then((res) => res.text()).then((text) => {
      setCenter(text);
    });
    fetch('/webrtc-career-right.txt').then((res) => res.text()).then((text) => {
      setRight(text);
    });
  }, []);

  return (
    <Cylinder
      position={{ x: 4, y: 0.8, z: -5 }}
      ammo-body="type: static"
      ammo-shape="type: cylinder"
      thetaStart={90}
      thetaLength={180}
      rotation={{ x: 0, y: -45, z: 0 }}
      scale={{ x: 2, y: 2, z: 2 }}
      openEnded={1}
      height={2}
      side="double"
      color="black"
      id="careerCylinder"
    >
      <TroikaText
        value={left}
        curveRadius="1"
        rotation="0 54 0"
        position="-0.8 0.3 -0.55"
        maxWidth="0.8"
      />
      <TroikaText
        value={center}
        curveRadius="1"
        position="0 0.3 -0.99"
        maxWidth="1"
      />
      <TroikaText
        value={right}
        curveRadius="1"
        rotation="0 -60 0"
        position="0.8 0.3 -0.5"
        maxWidth="1"
      />
    </Cylinder>
  );
}
