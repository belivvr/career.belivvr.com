import nipplejs from 'nipplejs';

export default AFRAME.registerComponent('joystick', {
  init() {
    this.moveX = 0;
    this.moveZ = 0;

    const joystick = document.createElement('div');
    joystick.style.position = 'fixed';
    joystick.style.zIndex = '100000';
    joystick.style.left = '80px';
    joystick.style.bottom = '80px';
    document.body.appendChild(joystick);

    const { camera } = document.querySelector('a-scene');
    this.camera = camera;

    const manager = nipplejs.create({
      mode: 'static',
      zone: joystick,
      color: '#0F0000',
      fadeTime: 10,
    });
    manager.options.mode = 'dynamic';

    manager.on('move', (_, { force, angle: { radian } }) => {
      if (isNaN(radian)) {
        return;
      }

      joystick.children[0].style.display = 'none';

      const vector = radian + (Math.PI / 180) * camera.rotation.y;
      const xVector = Math.cos(vector);
      const yVector = Math.sin(vector);

      this.moveX = (force / 15) * xVector;
      this.moveZ = (force / 15) * yVector;
    });

    manager.on('end', () => {
      joystick.children[0].style.display = 'block';

      this.moveX = 0;
      this.moveZ = 0;
    });
  },

  tick() {
    if (this.moveX === 0 && this.moveZ === 0) {
      return;
    }

    const { x, y, z } = this.camera.el.getAttribute('position');

    this.camera.el.setAttribute('position', `${x + this.moveX} ${y} ${z - this.moveZ}`);
  },
});
