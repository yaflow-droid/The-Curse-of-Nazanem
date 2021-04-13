window.NPC = class NPC extends Serializable {
    constructor(name, schedule) {
        super();

        this.name = name;
        this.schedule = schedule;
    }

    getLocation(time) {
        var i = 0; // find schedule corresponding
        while (i < this.schedule.length-1 && Time.compare(this.schedule[i + 1].start, time).later) i++;
        return {
            ...this.schedule[i], 
            end:Time.compare(time, this.schedule[(i+1)%this.schedule.length].start).sameDay ? this.schedule[(i+1)%this.schedule.length].start : {day: this.schedule[i].start.day, hour: 24}
            // Grabs the start of the next location in schedule
        };
    }

    // To get triggered when time changes
    onTimeChange(data) {
        var i = 0;
        while (i < this.schedule.length-1 && Time.compare(this.schedule[i + 1].start, data.newTime, false).later) i++;
        this.location = this.schedule[i];

        if (data.newTime.loop > 1 && this.location.location == State.variables.player.position) {
            this.schedule[i].know = true;
        }
    }

    get type() { return "NPC"; }
}