import { useSetRecoilState } from 'recoil';
import nameState from '../../state/name';
import Title from '../Title';

type Props = {
  socket: any
};

export default function Nickname({ socket }: Props) {
  const setName = useSetRecoilState(nameState);

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
      <Title text="Nickname" />
      <form action="" onSubmit={submitHandler}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
