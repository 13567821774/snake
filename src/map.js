// 地图类
class Map {
  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr]);
  }
  static setStyle(el, attr, val) {
    el.style[attr] = val + 'px';
  }
  constructor(el, rect = 10) {
    this.el = el;
    this.rect = rect;
    // 数据
    this.data = [];
    // 行数
    this.rows = Math.ceil(Map.getStyle(el, 'height') / rect);
    // 列数
    this.cells = Math.ceil(Map.getStyle(el, 'width') / rect);
    Map.setStyle(el, 'height', this.rows * rect);
    Map.setStyle(el, 'width', this.cells * rect);
  }
  // 坐标上是否包含值
  include({ x, y }) {
    return this.data.some((item) => item.x === x && item.y === y);
  }
  // 设置数据
  setData(newData) {
    this.data = this.data.concat(newData);
  }
  // 清空数据
  clearData() {
    this.data.length = 0;
  }
  // 渲染视图
  render() {
    this.el.innerHTML = this.data
      .map((item) => {
        return `<span style="position:absolute;
        left:${item.x * this.rect}px;
        top:${item.y * this.rect}px;
        width:${this.rect}px;
        height:${this.rect}px;
        background:${item.color}">
        </span>`;
      })
      .join('');
  }
}

export default Map;
