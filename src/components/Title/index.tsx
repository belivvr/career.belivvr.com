type Props = {
  text: string
};

export default function Title({ text }: Props) {
  return (
    <h1>{text}</h1>
  );
}
