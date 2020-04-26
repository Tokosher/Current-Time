class Timer {
    constructor(hours, minutes, sec, UTC) {
        this.hours = hours;
        this.minutes = minutes;
        this.sec = sec;
        this.UTC = UTC;

        this.curTime();
    }

    curTime = () => {
        this.currentTime();
        setInterval(this.currentTime, 1000);
    };

    currentTime = () => {
            const currentHours = Math.floor((Date.now() / 1000 / 60 / 60 % 24));
            const currentMinutes = Math.floor((Date.now() / 1000 / 60 % 60));
            const currentSec = Math.floor(Date.now() / 1000 % 60);

            this.hours.value = currentHours <= 9 ? 0 + (+currentHours + this.UTC).toString() : +currentHours + this.UTC;
            this.minutes.value = currentMinutes <= 9 ? 0 + currentMinutes.toString() : currentMinutes;
            this.sec.value = currentSec <= 8 ? 0 + currentSec.toString() : currentSec;
    }
}

const hours = document.querySelector('#inp1');
const minutes = document.querySelector('#inp2');
const sec = document.querySelector('#inp3');

const time = new Timer(hours, minutes, sec, 3);