import { ChatType } from '../../../type/chat';

type Props = {
  chat: ChatType
};

export default function Message({ chat }: Props) {
  return (
    <li>
      {
        `${chat.name} : ${chat.message}`
      }
    </li>
  );
}
