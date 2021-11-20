
class Clock {

  placeholders = {
    hours: null,
    minutes: null,
    seconds: null,
    meridiem: null
  };
  flip = {
    hours: {
      parent: null,
      top: null,
      bottom: null,
      back: null,
      backBottom: null
    },
    minutes: {
      parent: null,
      top: null,
      bottom: null,
      back: null,
      backBottom: null
    },
    seconds: {
      parent: null,
      top: null,
      bottom: null,
      back: null,
      backBottom: null
    },
    meridiem: {
      parent: null,
      top: null,
      bottom: null,
      back: null,
      backBottom: null
    }
  };
  previous = {
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
    console.log(this.flip.seconds);

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

    if (hours !== this.previous.hours) this.processValue('hours', hours);
    if (minutes !== this.previous.minutes) this.processValue('minutes', minutes);
    if (seconds !== this.previous.seconds) this.processValue('seconds', seconds);
    if (meridiem !== this.previous.meridiem) this.processValue('meridiem', meridiem);
  };

  // Abstractions
  processValue = (type, value) => {
    if (this.previous[type] >= 0) {
      this.flip[type].back.setAttribute('data-value', this.previous[type]);
      this.flip[type].bottom.setAttribute('data-value', this.previous[type]);  
    }
    this.flip[type].top.innerText = value;
    this.flip[type].backBottom.setAttribute('data-value', value);

    this.flip[type].parent.classList.remove('flip');
    void this.flip[type].parent.offsetWidth;
    this.flip[type].parent.classList.add('flip');

    this.previous[type] = value;
  };

  getElement = (content) => document.getElementById(content).getElementsByClassName('number')[0];

  captureElements = () => {
    this.items.forEach((item) => {
      this.placeholders[item] = this.getElement(item);

      this.flip[item].parent = document.getElementById(`flip-${ item }`);
      this.flip[item].top = document.getElementById(`flip-${ item }`).getElementsByClassName('number-top')[0];
      this.flip[item].bottom = document.getElementById(`flip-${ item }`).getElementsByClassName('outer-bottom')[0];
      this.flip[item].back = document.getElementById(`flip-${ item }`).getElementsByClassName('number-back')[0];
      this.flip[item].backBottom = document.getElementById(`flip-${ item }`).getElementsByClassName('inner-bottom')[0];  
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
