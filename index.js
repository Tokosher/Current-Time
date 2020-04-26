class Time {
    constructor(elem) {
        this.target = elem;

        this._createParagraph();
        this._addListeners();
    }
    _createParagraph() {
        this.pTime = document.createElement('p');
        this.pDate = document.createElement('p');

        this.pDate.classList.add('display');

        this.target.append(this.pTime,this.pDate)
    }

    setTime() {
        this._changeTime();
        setInterval(this._changeTime.bind(this), 1000);
    };

    _changeTime() {
        let dateAndTime = new Date(Date.now());
        dateAndTime = dateAndTime.toLocaleString().split(', ');

        const date = dateAndTime[0];
        const time = dateAndTime[1];

        this.pTime.innerText = time;
        this.pDate.innerText = date;
    }

    _addListeners() {
        this.target.addEventListener('contextmenu', e => {
            e.preventDefault();

            this.pTime.classList.toggle('display');
            this.pDate.classList.toggle('display');
        })
    }
}

const time = new Time(document.querySelector('.dateTime'));
time.setTime();

