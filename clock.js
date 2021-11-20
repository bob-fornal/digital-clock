
class Clock {

  placeholders = {
    hours: null,
    minutes: null,
    seconds: null,
    meridiem: null
  };

  constructor() {
    this.init();
  }

  init = () => {
    this.placeholders.hours = document.getElementById('hours').getElementsByClassName('number')[0];
    this.placeholders.minutes = document.getElementById('minutes').getElementsByClassName('number')[0];
    this.placeholders.seconds = document.getElementById('seconds').getElementsByClassName('number')[0];
    this.placeholders.meridiem = document.getElementById('meridiem').getElementsByClassName('number')[0];
    console.log(this.placeholders);

    setInterval(this.processTime.bind(this), 1000);
  };

  processTime = () => {
    const date = new Date();

    const hours = ((date.getHours() % 12) ? (date.getHours() % 12) : 12).toString().padStart(2, '0');
    const meridiem = (date.getHours() >= 12) ? 'PM' : 'AM';
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    this.placeholders.hours.innerText = hours;
    this.placeholders.minutes.innerText = minutes;
    this.placeholders.seconds.innerText = seconds;
    this.placeholders.meridiem.innerText = meridiem;
  };

}

const clock = new Clock();
