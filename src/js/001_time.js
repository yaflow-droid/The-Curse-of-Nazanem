window.Time = class Time extends Serializable {
    constructor(day = 0, hour = 0, minute = 0, loop = 0) {
        super();

        this.min = minute;

        this.hour = hour + Math.floor(this.min / 60);
        this.min %= 60;

        this.day = day + Math.floor(this.hour / 24);
        this.hour %= 24;

        this.loop = loop + Math.floor(this.day / 7);
        this.day %= 7;
    }

    /**
     * Adds to the current time and triggers the time change event
     * @param {Number} day number of days to add
     * @param {Number} hour number of hours to add
     * @param {Number} min number of minutes to add
     */
    add(day, hour, min, loop = 0) {
        day += this.day;
        hour += this.hour;
        min += this.min;
        loop += this.loop;
        
        hour += Math.floor(min / 60);
        min %= 60;

        day += Math.floor(hour / 24);
        hour %= 24;

        loop += Math.floor(day / 7);
        day %= 7;

        this.set(day, hour, min, loop);
    }

    /**
     * Sets the new time and triggers the corresponding event
     * @param {number} day
     * @param {number} hour
     * @param {number} min 
     * @param {number} loop by default 0
     */
    set(day, hour, min, loop=0) {
        var prev = this.clone();
        
        this.day = day;
        this.hour = hour;
        this.min = min;
        this.loop = loop;

        State.variables.npc.forEach((npcName) => {
            State.getVar(npcName).updatePos(this);
        }, this)
    }

    /**
     * @param {Time} a
     * @param {Time} b 
     * @param {boolean} includeLoop true if we count the loop
     * @returns difference of time between two set time
     */
    static compare(a, b, includeLoop = false) {
        return new Time(0, 0, b.toMin(includeLoop) - a.toMin(includeLoop), 0);
    }

    /**
     * returns the time in minute
     * @param {boolean} includeLoop true if we count the loop
     * @returns the time in minute
     */
    toMin(includeLoop = false) {
        return this.min + (this.hour + (this.day + (includeLoop ? this.loop * 7 : 0)) * 24) * 60;
    }

    /**
     * @returns day of the week
     */
    get dayStr() {
        return ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][this.day];
    }

    /**
     * @returns time in formay dd:mm
     */
    get time() {
        return ("00" + this.hour).slice(-2) + ":" + ("00" + this.min).slice(-2);
    }
}