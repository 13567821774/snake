import Map from './map.js';
import Food from './food.js';
import Snake from './snake.js';
import Event from './event.js';
class Game extends Event {
  constructor(el, rect, toControl = null, toGrade = null) {
    super();
    this.map = new Map(el, rect);
    this.food = new Food(this.map.cells, this.map.rows);
    this.snake = new Snake();
    this.creatFood(this.snake.data);
    this.render();
    this.keyDown = this.keyDown.bind(this);
    this.toControl = toControl;
    this.toGrade = toGrade;
    this.timer = 0;
    this.grade = 0;
    this.interval = 200;
    // 初始化控制器
    this.control();
  }
  // 开始游戏
  start() {
    this.move();
  }
  // 暂停游戏
  stop() {
    clearInterval(this.timer);
  }
  // 初始化游戏
  reset() {
    this.stop();
    this.timer = 0;
    this.grade = 0;
    this.interval = 200;
    this.snake.reset();
    this.start();
  }
  // 控制移动
  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      if (this.isOver()) {
        this.over(0);
        return;
      }
      if (this.isEat()) {
        // 增加分数
        this.grade++;
        this.snake.eatFood();
        this.creatFood();
        this.changeGrade(this.grade);
        if (this.grade > 20) {
          this.over(1);
          return;
        }
        // 加速
        this.interval *= 0.8;
        this.stop();
        this.start();
      }
      this.render();
    }, this.interval);
  }
  // 判断是否结束
  isOver() {
    // 蛇出地图
    if (
      this.snake.data[0].x < 0 ||
      this.snake.data[0].x > this.map.cells ||
      this.snake.data[0].y < 0 ||
      this.snake.data[0].y > this.map.rows
    ) {
      console.log('出地图', this.snake.data[0].x, this.map.cells);
      return true;
    }
    for (let i = 1; i < this.snake.data.length; i++) {
      if (this.snake.data[0].x === this.snake.data[i].x && this.snake.data[0].y === this.snake.data[i].y) {
        console.log('碰到自己');
        return true;
      }
    }
    return false;
  }
  // 游戏结束
  over(overState = 1) {
    this.stop();
    /*
    overState 0 挂了
    overState 1 赢了
    */
    if (overState) {
      alert('赢了,你他妈是个天才');
    } else {
      alert('废物啊,这都撞到了');
    }
  }
  // 创建食物
  creatFood() {
    this.food.create();
    if (this.map.include(this.food.data)) {
      console.log('存在');
      this.creatFood();
    }
  }
  // 判断是否吃到食物
  isEat() {
    return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y;
  }
  // 控制方向
  keyDown({ keyCode }) {
    switch (keyCode) {
      case 37:
        // 向左
        this.snake.changeDir('left');
        break;
      case 38:
        this.snake.changeDir('top');
        // 向上
        break;
      case 39:
        this.snake.changeDir('right');
        // 向右
        break;
      case 40:
        this.snake.changeDir('bottom');
        // 向下
        break;
    }
  }
  // 控制器
  control() {
    if (this.toControl) {
      this.toControl();
      return;
    }
    window.addEventListener('keydown', this.keyDown);
  }
  // 删除默认控制器
  removeControl() {}
  // 地图渲染
  render() {
    this.map.clearData();
    this.map.setData(this.snake.data);
    this.map.setData(this.food.data);
    this.map.render();
  }
  addControl(fn) {
    fn.call(this);
    window.removeEventListener('keydown', this.keyDown);
  }
  // 分数改变
  changeGrade(grade) {
    document.querySelector('h1').innerHTML = grade;
  }
}
export default Game;
