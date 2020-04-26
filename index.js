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
        this.inter = setInterval(this._changeTime.bind(this), 1000);
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
        });

        this.target.addEventListener('click', e => {

            if(this.pDate.innerText.split('.').length === 3) {
                clearInterval(this.interDate);

                this.interDate = setInterval(() => {

                    let dateAndTime = new Date(Date.now());
                    dateAndTime = dateAndTime.toLocaleString().split(', ');

                    const date = dateAndTime[0];

                    let template = date.split('.');

                    this.pDate.innerText = template[1] + '/' + template[0] + '/' + template[2];
                }, 1000);
            } else {
                clearInterval(this.inter);
                this._changeTime();
            }

            if(this.pTime.innerText.split(':').length === 2) {
                clearInterval(this.inter);
                this.inter = setInterval(this._changeTime.bind(this), 1000);
            } else {
                clearInterval(this.inter);
                this.inter = setInterval(() => {
                    let dateAndTime = new Date(Date.now());
                    dateAndTime = dateAndTime.toLocaleString().split(', ');

                    let time = dateAndTime[1].split(':');
                    time = time[0] + ':' + time[1];
                    this.pTime.innerText = time;
                }, 1000);
            }





        });
    }
}

const time = new Time(document.querySelector('.dateTime'));
time.setTime();