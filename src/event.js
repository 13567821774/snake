class Event {
  events = {};
  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].includes(fn)) {
      this.events[eventName].push(fn);
    }
  }
  off(eventName, fn) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = this.events[eventName].filters((item) => item !== fn);
  }
  dispatch(eventName, ...arg) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach((item) => {
      item.call(this, ...arg);
    });
  }
}

export default Event;
