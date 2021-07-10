// 蛇类
class Snake {
  constructor() {
    this.reset();
  }
  // 移动蛇头
  move() {
    let i = this.data.length - 1;
    this.lastData = {
      x: this.data[i].x,
      y: this.data[i].y,
      color: this.data[i].color
    };
    // 后面的格子移到前面的格子中
    for (i; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x;
      this.data[i].y = this.data[i - 1].y;
    }
    // 根据方向移动蛇头
    switch (this.direction) {
      case 'left':
        this.data[0].x--;
        break;
      case 'right':
        this.data[0].x++;
        break;
      case 'top':
        this.data[0].y--;
        break;
      case 'bottom':
        this.data[0].y++;
        break;
    }
  }
  // 改变方向
  changeDir(dir) {
    // 如果蛇左右移动,只能上下移动
    // 如果蛇上下移动,只能左右移动
    if (this.direction === 'left' || this.direction === 'right') {
      if (dir === 'left' || dir === 'right') {
        return false;
      }
    } else {
      if (dir === 'top' || dir === 'bottom') {
        return false;
      }
    }
    this.direction = dir;
    return true;
  }
  // 吃食物,蛇变长
  eatFood() {
    this.data.push(this.lastData);
  }
  // 初始化蛇
  reset() {
    this.data = [
      {
        x: 6,
        y: 4,
        color: 'green'
      },
      {
        x: 5,
        y: 4,
        color: 'blue'
      },
      {
        x: 4,
        y: 4,
        color: 'blue'
      },
      {
        x: 3,
        y: 4,
        color: 'blue'
      },
      {
        x: 2,
        y: 4,
        color: 'blue'
      }
    ];
    this.direction = 'right';
  }
}

export default Snake;
