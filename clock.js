
class Clock {

  placeholders = {
    hours: null,
    minutes: null,
    seconds: null,
    meridiem: null
  };
  items = Object.keys(this.placeholders);

  constructor() {
    this.init();
  }

  init = () => {
    this.captureElements();
    setInterval(this.processTime.bind(this), 1000);
  };

  processTime = () => {
    const date = new Date();
    const hours24 = date.getHours();
    const hours12 = hours24 % 12;

    const hours = this.toPaddedString((hours12) ? hours12 : 12);
    const meridiem = (hours24 >= 12) ? 'PM' : 'AM';
    const minutes = this.toPaddedString(date.getMinutes());
    const seconds = this.toPaddedString(date.getSeconds());

    this.setElements({ hours, minutes, seconds, meridiem });
  };

  // Abstractions
  getElement = (content) => document.getElementById(content).getElementsByClassName('number')[0];

  captureElements = () => {
    this.items.forEach((item) => {
      this.placeholders[item] = this.getElement(item);
    });
  };

  toPaddedString = (data) => data.toString().padStart(2, '0');

  setElements = (data) => {
    this.items.forEach((item) => {
      this.placeholders[item].innerText = data[item];  
    });
  };

}

const clock = new Clock();
