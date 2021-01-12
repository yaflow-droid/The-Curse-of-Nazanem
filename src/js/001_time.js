window.Time = class Time extends Serializable {
    constructor(day = 0, hour = 0, minute = 0, loop = 0) {
        super();

        this.day = day;
        this.hour = hour;
        this.minute = minute;

        this.loop = loop; // Do not change manually
    }

    get getHour() {
        return `${("00" + this.hour).slice(-2)}:${("00" + this.minute).slice(-2)}`
    }

    add(time) {
        const t = Time.toMinute(time);
        const lastTime = Time.toMinute(this);

        this.minute += t;
        this.hour += Math.floor(this.minute / 60);
        this.day += Math.floor(this.hour / 24);
        this.loop += Math.floor(this.day / 7);
        
        this.minute %= 60;
        this.hour %= 24;
        this.day %= 7;

        // Ugly, but ensures counters set in endDay or endLoop are working
        // Might want to pass the difference of time instead
        for (var i = Math.floor(lastTime / 1440); i < Math.floor((t + lastTime) / 1440); i++) {
            this.endDay();
            if (i % 7) this.endLoop();
        }
    }

    endDay() {
        const sv = State.variables;

        sv.player.realityPoint.current = Math.min(sv.player.realityPoint.max, sv.player.realityPoint.current + 1);
    }

    endLoop() {
        // Todo: set new loop val
    }

    static compare(time1, time2, useDay = true) {
        return Time.toMinute(time1, useDay) - Time.toMinute(time2, useDay); 
    }

    static toMinute(time, useDay = true) {
        return ((useDay ? time.day : 0) * 24 + time.hour) * 60 + time.minute; 
    }

    static Unknown() {
        return new Time(undefined, undefined, undefined, undefined);
    }

    get type() {return "Time"}
}