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
        this.location = this.getLocation(data.newTime);
    }

    onPlayerMove(data) {
        if (this.location == data.destination) {
            console.log(`found ${this.name}`)
            var i = 0; // Sets that this location is known at this time
            while (time.compare(this.schedule[i].start).earlier) i++;
            this.schedule[i].know = true;
        }
        console.log(`${this.name} is at ${this.location.location}...`, this);
    }

    get type() { return "NPC"; }
}