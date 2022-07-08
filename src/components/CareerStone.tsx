import { Cylinder } from '@belivvr/aframe-react';
import { useEffect, useState } from 'react';
import TroikaText from '../aframe/TroikaText';

export default function CareerStone(): JSX.Element {
  const [webrtcCareer, setWebrtcCareer] = useState<string>('');

  useEffect(() => {
    fetch('/webrtc-career.txt').then((res) => res.text()).then((text) => {
      setWebrtcCareer(text);
    });
  }, []);

  return (
    <Cylinder
      position={{ x: 3, y: 1, z: -3 }}
      ammo-body="type: static"
      ammo-shape="type: cylinder"
      thetaStart={90}
      thetaLength={180}
      rotation={{ x: 0, y: -45, z: 0 }}
      scale={{ x: 2, y: 2, z: 2 }}
      openEnded={1}
      side="double"
      color="black"
    >
      <TroikaText
        value={webrtcCareer}
        curveRadius="1"
        position="0 0 -0.99"
        maxWidth="2.5"
      />
    </Cylinder>
  );
}
