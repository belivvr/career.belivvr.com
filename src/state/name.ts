import { atom } from 'recoil';

const nameState = atom<string>({
  key: 'name',
  default: '',
});

export default nameState;
