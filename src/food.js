class Food {
  constructor(cells, rows, color = ['red', 'blue', 'yellow', 'pink']) {
    // this.map = map;
    this.cells = cells;
    this.rows = rows;
    this.colors = color;
    this.data = null;
    this.create();
  }
  // 随机创建食物
  create() {
    let x = Math.floor(Math.random() * this.cells);
    let y = Math.floor(Math.random() * this.rows);
    let color = this.colors[parseInt(Math.random() * this.colors.length)];
    this.data = {
      x,
      y,
      color
    };
  }
}

export default Food;
