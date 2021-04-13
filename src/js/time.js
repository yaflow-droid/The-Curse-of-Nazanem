window.Time = class Time extends Serializable {
    constructor(_day = 0, _hour = 0, _min = 0, _loop = 1) {
        super();

        this.min = _min;

        this.hour = _hour + Math.floor(this.min / 60);
        this.min %= 60;

        this.day = _day + Math.floor(this.hour / 24);
        this.hour %= 24;

        this.loop = _loop + Math.floor(this.day / 7);
        this.day %= 7;
    }

    add(time) {
        time = Object.assign({
            day: 0,
            hour: 0,
            min: 0,
            loop: 0
        }, time);

        this.set({
            day: time.day + this.day,
            hour: time.hour + this.hour,
            min: time.min + this.min,
            loop: time.loop + this.loop
        });
    }

    set(time) {
        var oldTime = {
            day: this.day || 0,
            hour: this.hour || 0,
            min: this.min || 0,
            loop: this.loop || 1
        };
        time = Object.assign({
            day: oldTime.day,
            hour: oldTime.hour,
            min: oldTime.min,
            loop: oldTime.loop
        }, time);

        this.min = time.min;

        this.hour = time.hour + Math.floor(this.min / 60);
        this.min %= 60;

        this.day = time.day + Math.floor(this.hour / 24);
        this.hour %= 24;

        this.loop = time.loop + Math.floor(this.day / 7);
        this.day %= 7;

        var compare = Time.compare(oldTime, this);

        if (!compare.equal) {
            setup.eventHandler.trigger("onTimeChange", {
                oldTime,
                newTime: this,
                compare: Time.compare(oldTime, this) // comparison between both time
            });
        }
    }

    static compare(timeA, timeB = State.variables.time) {
        if (!timeA instanceof Time) {
            timeA = Object.assign({
                day: 0,
                hour: 0,
                min: 0,
                loop: 1
            }, timeA);
        }
        if (!timeB instanceof Time) {
            timeB = Object.assign({
                day: 0,
                hour: 0,
                min: 0,
                loop: 1
            }, timeB);
        }

        var difference = Time.toMin(timeB) - Time.toMin(timeA);
        return {
            diff: Math.abs(difference) % 10080, // difference of time excluding loop
            equal: difference == 0,
            earlier: difference <= 0, // TimeA is later
            later: difference >= 0, // TimeB is later
            sameLoop: timeA.loop == timeB.loop,
            sameDay: timeA.day == timeB.day,
            min: difference >= 0 ? timeA : timeB,
            max: difference <= 0 ? timeA : timeB
        }
    }

    static toMin(time) {
        return (time.min || 0) + ((time.hour || 0) + ((time.day || 0) + (time.loop || 1) * 7) * 24) * 60
    }

    onPlayerMove(data) {
        this.add(data.duration);
    }

    get dayString() {
        return ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][this.day];
    }

    get time() {
        return ("00" + this.hour).slice(-2) + ":" + ("00" + this.min).slice(-2);
    }

    get type() { return "Time"; }
}