import { useRecoilValue } from 'recoil';
import nameState from '../../state/name';

type Props = {
  socket: any
};

export default function MessageForm({ socket }: Props) {
  const name = useRecoilValue(nameState);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    (Array.from(formData.values()) as string[]).forEach((message) => {
      socket.emit('chat', {
        name,
        message,
      });
    });
  };

  return (
    <form action="" onSubmit={submitHandler}>
      <input type="text" name="text" />
      <button type="submit"> Submit</button>
    </form>
  );
}
