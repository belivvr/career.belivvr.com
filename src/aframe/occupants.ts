import type { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
  getName: () => string;
}

export default function occupants({ socket, getName }: Props) {
  AFRAME.registerComponent('occupants', {
    tick() {
      const { position } = this.el.object3D;
      const rotation = this.el.getAttribute('rotation');

      socket.emit('occupants', { name: getName(), position, rotation });
    },
  });
}
