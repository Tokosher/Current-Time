class Time {
    constructor(elem) {
        this.target = elem;

        this._createParagraph();
        this._addListeners();
    }

    rainbow() {
        this.paragraph.addEventListener('mouseover', () => {
            clearInterval(this.templateIdStyleInterval);

            this._randomGradientRainbow();
            this.templateIdStyleInterval = setInterval(() =>{
                this._randomGradientRainbow();
            }, 500)
        });

        this.paragraph.addEventListener('mouseout', () => {
            clearInterval(this.templateIdStyleInterval);

            document.body.style.background = 'white';
        });
    }

    setTime(func=this._normalTime) {
        this._getTime();
        func.call(this);
        clearInterval(this.templateIdSetInterval);

        this.templateIdSetInterval = setInterval(() => {
            this._getTime();

            func.call(this);
            this.currentValueP = this.paragraph.innerText;
        }, 1000);

        this.currentValueP = this.paragraph.innerText;
    }

    _normalDate() {
        this.paragraph.innerText = this.date;
    }

    _normalTime() {
        this.paragraph.innerText = this.time;
    }

    _americanDate() {
        this.paragraph.innerText = this.americanDate;
    }

    _shortTime() {
        this.paragraph.innerText = this.timeHoursAndMinutes;
    }

    _createParagraph() {
        this.paragraph = document.createElement('p');

        this.target.append(this.paragraph);
    }

    _getTime() {
        this.dateTime = new Date();
        this.time = this.dateTime.toLocaleTimeString();
        this.date = this.dateTime.toLocaleDateString();

        this.timeHoursAndMinutes = this.dateTime.toLocaleTimeString('nu',{hours: '2-digits', minutes: '2-digits'});
        this.timeHoursAndMinutes = this.timeHoursAndMinutes.split(':');
        this.timeHoursAndMinutes = this.timeHoursAndMinutes[0] + ':' + this.timeHoursAndMinutes[1];
            this.americanDate =  this.dateTime.toLocaleDateString('en-US', {year: "2-digit", month: "2-digit", day: "2-digit"});
    }

    _addListeners() {
        this.paragraph.addEventListener('contextmenu', e => { // right click

            e.preventDefault();

            if(this.currentValueP === this.time || this.currentValueP === this.timeHoursAndMinutes) {
                this.setTime(this._normalDate);
            } else if(this.currentValueP === this.date || this.currentValueP === this.americanDate) {
                this.setTime(this. _normalTime);
            } else console.log("ERROR CONTEXTMENU");
        });

       this.paragraph.addEventListener('click', () => { // left click
            switch(this.currentValueP) {
                case this.time:
                    this.setTime(this._shortTime);
                    break;
                case this.timeHoursAndMinutes:
                    this.setTime(this._normalTime);
                    break;
                case this.date:
                    this.setTime(this._americanDate);
                    break;
                case this.americanDate:
                    this.setTime(this._normalDate);
                    break;
            }
        });
    }

    _shuffle(rainbow) { // shuffle array
        for (let i = rainbow.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rainbow[i], rainbow[j]] = [rainbow[j], rainbow[i]];
        }
        return rainbow;
    }

    _randomGradientRainbow(rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'deepskyblue', 'purple']) {
        rainbow = this._shuffle(rainbow);
        rainbow = rainbow.join(', ');

        document.body.style.background = `linear-gradient(${rainbow}) fixed`;
    }
}

const time = new Time(document.querySelector('.dateTime'));
time.setTime();
time.rainbow();
