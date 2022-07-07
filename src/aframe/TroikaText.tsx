interface Props {
  value: string;
}

export default function TroikaText({ value }: Props) {
  return (
    // @ts-ignore
    <a-troika-text
      value={value}
      font="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff"
      curve-radius="1"
      font-size="0.04"
    />
  );
}
