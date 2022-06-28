import { atom } from 'recoil';

const chatState = atom<string[]>({
  key: 'chat',
  default: [],
});

export default chatState;
