window.Time = class Time extends Serializable {
    constructor(day = 0, hour = 0, minute = 0, loop = 0) {
        super();

        this.day = day;
        this.hour = hour;
        this.minute = minute;

        this.loop = loop; // Do not change manually
    }

    add(time) {
        this.minute += time.minute;
        this.hour += time.hour + Math.floor(this.minute / 60);
        this.minute %= 60;
        this.day += time.day + Math.floor(this.hour / 24);
        this.hour %= 24;

        while (this.day > 6) {
            this.nextLoop();
            this.loop++;
            this.day -= 7;
        }
    }

    nextLoop() {
        //todo Triggers a new loop
        console.log("next loop");
    }

    static compare(time1, time2, useDay = true) {
        return Time.toMinute(time1, useDay) - Time.toMinute(time2, useDay); 
    }

    static toMinute(time, useDay = true) {
        return ((useDay ? time.day : 0) * 24 + time.hour) * 60 + time.minute; 
    }

    get type() {return "Time"}
}