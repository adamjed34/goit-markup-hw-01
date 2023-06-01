import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = document.querySelector('.timer');
const dateTimeInput = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const dateNow = new Date();
let selectDate;

counterDesign();

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= dateNow) {
      alert('Please choose a date in the future');
    } else {
      selectDate = selectedDates[0];

      buttonStart.disabled = false;
  
      dateTimeValue.selectedDates = selectedDates;
    }
  },
};

const dateTimeValue = flatpickr(dateTimeInput, options);

function counterDesign(){
  timer.style ='display:flex; gap:15px;';

  [...timer.children].forEach((item)=>{
    item.style = "display:flex;flex-direction:column; justify-content: center;";
    [...item.children][0].style = 'font-size:32px;text-align:center;'
  })
  
}

buttonStart.addEventListener('click', onClick);

function onClick(){
    const int = setInterval(()=>{
        const { days, hours, minutes, seconds } = convertMs(selectDate - new Date());
        if (seconds<0 ){
          clearInterval(int);
        }else{
          dataDays.textContent = days.toString().padStart(2,'0');
          dataHours.textContent = hours.toString().padStart(2,'0');
          dataMinutes.textContent = minutes.toString().padStart(2,'0');
          dataSeconds.textContent = seconds.toString().padStart(2,'0');
        }

    },1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
