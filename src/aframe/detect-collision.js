export default function detectCollision(socket) {
  AFRAME.registerComponent('detect-collision', {
    init() {
      this.el.addEventListener('collidestart', (e) => {
        if (e.detail.targetEl.id === 'npc') {
          document.querySelector('#modal').style.display = 'flex';
          socket.emit('logging', { behavior: 'unity-modal-open' });
        }

        if (e.detail.targetEl.id === 'careerCylinder') {
          socket.emit('logging', { behavior: 'webrtc-career-enter' });
        }
      });

      this.el.addEventListener('collideend', (e) => {
        if (e.detail.targetEl.id === 'careerCylinder') {
          socket.emit('logging', { behavior: 'webrtc-career-leave' });
        }
      });
    },
  });
}
