let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.rotating = false;
  }

  init(paper) {
    paper.style.transform = `rotateZ(${this.rotation}deg)`;

    paper.addEventListener('pointerdown', (e) => this.onPointerDown(e, paper));
    paper.addEventListener('pointermove', (e) => this.onPointerMove(e, paper));
    paper.addEventListener('pointerup', () => this.onPointerUp());
    paper.addEventListener('pointercancel', () => this.onPointerUp());

    paper.addEventListener('gesturestart', (e) => this.onGestureStart(e));
    paper.addEventListener('gestureend', () => this.onGestureEnd());
  }

  onPointerDown(e, paper) {
    if (this.holdingPaper) return;

    this.holdingPaper = true;
    paper.style.zIndex = highestZ++;
    this.startX = e.clientX - this.currentX;
    this.startY = e.clientY - this.currentY;
  }

  onPointerMove(e, paper) {
    if (!this.holdingPaper) return;

    if (!this.rotating) {
      this.currentX = e.clientX - this.startX;
      this.currentY = e.clientY - this.startY;
      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  onPointerUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  onGestureStart(e) {
    e.preventDefault();
    this.rotating = true;
  }

  onGestureEnd() {
    this.rotating = false;
  }
}

const papers = document.querySelectorAll('.paper');
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
