export default function clickOpenModal(socket) {
  AFRAME.registerComponent('click-open-modal', {
    init() {
      this.el.addEventListener('click', () => {
        document.querySelector('#modal').style.display = 'flex';
        socket.emit('logging', { behavior: 'unity-modal-open' });
      });
    },
  });
}
