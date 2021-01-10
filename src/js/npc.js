window.Npc = class Npc extends Serializable {
    constructor(schedule) {
        super();

        this.schedule = schedule;
    }

    get type() { return "Npc" }
}