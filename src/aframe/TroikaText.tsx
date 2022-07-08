interface Props {
  value: string;
  fontSize?: string;
  position?: string;
  rotation?: string;
  curveRadius?: string;
  outlineWidth?: string;
  billboard?: boolean;
}

export default function TroikaText({
  value,
  fontSize = '0.04',
  position = '0 0 0',
  rotation = '0 0 0',
  curveRadius = '0',
  outlineWidth = '0',
  billboard = false,
}: Props) {
  return (
    // @ts-ignore
    <a-troika-text
      value={value}
      font="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff"
      curve-radius={curveRadius}
      font-size={fontSize}
      position={position}
      rotation={rotation}
      outline-width={outlineWidth}
      billboard={billboard}
    />
  );
}
