window.Npc = class Npc extends Serializable {
    constructor(name, schedule) {
        super();

        this.name = name;
        this.schedule = schedule;
    }

    doing(time = State.variables.time) {
        return this.schedule.getPlan(time);
    }

    get type() { return "Npc" }
}