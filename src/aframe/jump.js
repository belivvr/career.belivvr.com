AFRAME.registerComponent('jump', {
  member: {
    isJump: false,
    jumpTime: 60,
    jumpPower: 0.065,
    jumpVelocity: 0.002,
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
      this.el.object3D.position.y += this.member.jumpPower;
      this.member.jumpPower -= this.member.jumpVelocity;
      if (this.member.jumpPower < 0) {
        clearInterval(jumpUpAnimation);
        this.setJumpDownAnimation();
      }
    }, 10);
  },
  setJumpDownAnimation() {
    const jumpDownAnimation = setInterval(() => {
      this.el.object3D.position.y -= this.member.jumpPower;
      this.member.jumpPower += this.member.jumpVelocity;

      if (this.member.jumpPower > 0.065) {
        clearInterval(jumpDownAnimation);
        this.member.isJump = false;
        this.member.jumpPower = 0.065;
      }
    }, 10);
  },
});
