import TroikaText from '../aframe/TroikaText';

export default function Milestone(): JSX.Element {
  return (
    <>
      <TroikaText
        value="WebRTC 개발자 모집 공고  →"
        position="0 1 -5"
        rotation="0 0 0"
        align="center"
        fontSize="0.3"
        outlineWidth="0.03"
      />

      <TroikaText
        value="←  Unreal 개발자 모집 공고"
        position="0 1.5 -5"
        rotation="0 0 0"
        align="center"
        fontSize="0.3"
        outlineWidth="0.03"
      />
    </>
  );
}
