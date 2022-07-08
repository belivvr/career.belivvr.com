import type { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
  name: string;
}

export default function occupants({ socket, name }: Props) {
  AFRAME.registerComponent('occupants', {
    tick() {
      const { position } = this.el.object3D;
      const rotation = this.el.getAttribute('rotation');

      socket.emit('occupants', { name, position, rotation });
    },
  });
}
