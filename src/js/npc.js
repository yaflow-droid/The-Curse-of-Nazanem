window.Npc = class Npc extends Serializable {
    constructor(name, schedule) {
        super();

        this.name = name;
        this.schedule = schedule;
        this.location;
    }

    updatePos(time) {
        this.location = this.schedule.getPlan(time)
    }
}