
class CountdownTimer {

    constructor({selector, targetDate,onTick,onLabelControl,onTimerEnd}) {
        this.setIntervalId = null;
        this.selector = selector;
        this.targetDate = new Date(targetDate);
        this.onTick = onTick;
        this.onLabelControl = onLabelControl;
        this.onTimerEnd = onTimerEnd;
    }

    start() {
        this.setIntervalId = setInterval(() => {
            const currentDate = Date.now();
            const leftTime = this.targetDate.getTime() - currentDate;
            if(leftTime < 0) {
                clearInterval(this.setIntervalId);
                this.onTimerEnd(this.selector);
                return;
            }
            this.onTick(this.selector,  this.getTimeElements(leftTime));
            this.onLabelControl(this.selector,  this.getTimeElements(leftTime));
        }, 1000);
    };

    pad(value){
        return String(value).padStart(2,'0');
    };

    getTimeElements(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return {days, hours, mins, secs};
    };
}

function countdownRender(selector, {days, hours, mins, secs}) {
    const timerEl = document.querySelector(`${selector}`);
    timerEl.querySelector('span[data-value="days"]').textContent = `${days}`;
    timerEl.querySelector('span[data-value="hours"]').textContent = `${hours}`;
    timerEl.querySelector('span[data-value="mins"]').textContent = `${mins}`;
    timerEl.querySelector('span[data-value="secs"]').textContent = `${secs}`;
}

function countdownLabelRender(selector, {days, hours, mins, secs}) {
    const timerEl = document.querySelector(`${selector}`);
    timerEl.querySelector('span[data-label="days"]').textContent = days == 1? 'Day':'Days';
    timerEl.querySelector('span[data-label="hours"]').textContent = hours == 1? 'Hour':'Hours';
    timerEl.querySelector('span[data-label="mins"]').textContent = mins == 1? 'Minute':'Minutes';
    timerEl.querySelector('span[data-label="secs"]').textContent = secs == 1? 'Second':'Seconds';
}

function timerEnd(selector) {
  const timerEl = document.querySelector(`${selector}`);
  (timerEl.querySelectorAll('.value')).forEach(element => element.classList.add('done'));
}

const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Oct 12, 2024'),
    // targetDate: new Date(2021,9,11,19,24,10),
    onTick: countdownRender,
    onLabelControl: countdownLabelRender,
    onTimerEnd: timerEnd,

  });

timer.start();
