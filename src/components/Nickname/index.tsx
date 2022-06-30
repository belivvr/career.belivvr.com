import Title from '../Title';

type Props = {
  socket: any,
  setName: (name: string) => void
};

export default function Nickname({ socket, setName }: Props) {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    (Array.from(formData.values()) as string[]).forEach((value) => {
      setName(value);
      socket.emit('name', {
        name: value,
      });
    });
  };

  return (
    <>
      <Title>Nickname</Title>
      <form action="" onSubmit={submitHandler}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
