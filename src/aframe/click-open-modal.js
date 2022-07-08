AFRAME.registerComponent('click-open-modal', {
  init() {
    this.el.addEventListener('click', () => {
      document.querySelector('#modal').style.display = 'flex';
    });
  },
});
