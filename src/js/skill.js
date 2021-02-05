window.Skill = class Skill extends Serializable {
    constructor(name, childSkills, cost, description) {
        super();

        this.name = name;
        this.childSkills = childSkills;
        this.cost = cost;
        this.description = description;
        this.apply = apply;
    }

    get type() { return "Skill" }
}