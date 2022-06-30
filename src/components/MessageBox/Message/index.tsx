import { ChatType } from '../../../type/chat';

type Props = {
  chat: ChatType
};

export default function Message({ chat: { name, message } }: Props) {
  return (
    <li>{`${name} : ${message}`}</li>
  );
}
