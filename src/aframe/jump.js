AFRAME.registerComponent('jump', {
  schema: {
    gravity: { type: 'number', default: 9.8 },
    power: { type: 'number', default: 160 },
    jumpKey: { type: 'string', default: ' ' },
    pressToJump: { type: 'string', default: '' },
  },

  init() {
    this.initialPositionY = this.el.sceneEl.camera.el.getAttribute('position').y;

    if (this.data.pressToJump) {
      document.querySelector(this.data.pressToJump).addEventListener('click', () => {
        if (this.isJump) {
          return;
        }

        this.isJump = true;
        this.velocity = this.data.power;
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key !== this.data.jumpKey || this.isJump) {
        return;
      }

      this.isJump = true;
      this.velocity = this.data.power;
    });
  },

  tick() {
    if (!this.isJump) {
      return;
    }

    const position = this.el.getAttribute('position');
    const nextPositionY = position.y + (this.velocity / 1000);

    if (nextPositionY < this.initialPositionY) {
      this.el.setAttribute('position', { ...position, y: this.initialPositionY });
      this.isJump = false;
      return;
    }

    this.el.setAttribute('position', { ...position, y: nextPositionY });

    this.velocity -= this.data.gravity;
  },
});
