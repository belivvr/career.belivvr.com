import { ChatType } from '../../type/chat';
import Message from './Message';

type Props = {
  chats: ChatType[]
};

export default function MessageBox({ chats }: Props) {
  return (
    <ul>
      {
          chats.map((chat, index) => (
            <Message key={`${chat.id + index}`} chat={chat} />
          ))
        }
    </ul>
  );
}
