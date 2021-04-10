window.Skill = class Skill extends Serializable {
    constructor(name, cost, description) {
        super();

        this.name = name;
        this.cost = cost;
        this.description = description;
        this.apply = apply;
    }

    get type() { return "Skill" }
}