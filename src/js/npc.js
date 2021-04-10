window.Npc = class Npc extends Serializable {
    constructor(name, schedule) {
        super();

        this.name = name;
        this.schedule = schedule;
        this.location;

        // Finds new location when times change
        subscribe("onTimeChange", function(data) {
            this.location = this.schedule.getPlan(data.newTime)
        }, this);
    }
}