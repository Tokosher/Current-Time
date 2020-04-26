const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOURS = 60;
const HOURS_AT_DAY = 24;

class Timer {
    constructor(hours, minutes, sec, UTC) {
        this.hours = hours;
        this.minutes = minutes;
        this.sec = sec;
        this.UTC = UTC;

        this.currentTime();
    }

    currentTime = () => {
        this.changeTime();
        setInterval(this.changeTime, 1000);
    };

    changeTime = () => {
            const current_hours = Math.floor((Date.now() / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE / MINUTES_IN_HOURS % HOURS_AT_DAY));
            const current_minutes = Math.floor((Date.now() / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE % MINUTES_IN_HOURS));
            const current_seconds = Math.floor(Date.now() / MILLISECONDS_IN_SECOND % SECONDS_IN_MINUTE);

            this.hours.value = current_hours <= 9 ? 0 + (+current_hours + this.UTC).toString() : +current_hours + this.UTC;
            this.minutes.value = current_minutes <= 9 ? 0 + current_minutes.toString() : current_minutes;
            this.sec.value = current_seconds <= 9 ? 0 + current_seconds.toString() : current_seconds;
    }
}

const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const sec = document.querySelector('#seconds');

const time = new Timer(hours, minutes, sec, 3);