AFRAME.registerComponent('detect-collision', {
  init() {
    this.el.addEventListener('collidestart', (e) => {
      if (e.detail.targetEl.id === 'npc') {
        document.querySelector('#modal').style.display = 'flex';
      }
    });
  },
});
