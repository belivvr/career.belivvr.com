AFRAME.registerComponent('jump', {
  member: {
    isJump: false,
    jumpTime: 0,
    jumpPower: 0.065,
  },
  init() {
    window.addEventListener('keydown', (e) => this.keydownHanlder(e));
  },
  keydownHanlder(e) {
    if (e.key === ' ' && !this.member.isJump) {
      this.member.isJump = true;
      this.setJumpUpAnimation();
    }
  },
  setJumpUpAnimation() {
    const jumpUpAnimation = setInterval(() => {
      this.member.jumpTime += 1;

      this.el.object3D.position.y += this.member.jumpPower;

      if (this.member.jumpTime === 20) {
        clearInterval(jumpUpAnimation);
        this.member.jumpTime = 0;
        this.setJumpDownAnimation();
      }
    }, 10);
  },
  setJumpDownAnimation() {
    const jumpDownAnimation = setInterval(() => {
      this.member.jumpTime += 1;

      this.el.object3D.position.y -= this.member.jumpPower;
      if (this.member.jumpTime === 20) {
        clearInterval(jumpDownAnimation);
        this.member.jumpTime = 0;
        this.member.isJump = false;
      }
    }, 10);
  },
});
