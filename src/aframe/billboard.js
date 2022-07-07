AFRAME.registerComponent('billboard', {
  init() {
    this.camera = document.querySelector('a-camera');
  },
  tick() {
    if (this.data === 'false') {
      return;
    }

    const rotationY = this.camera.getAttribute('rotation').y;
    const rotation = this.el.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
    this.el.setAttribute('rotation', { ...rotation, y: rotationY });
  },
});
