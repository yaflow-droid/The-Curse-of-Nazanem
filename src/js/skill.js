window.Skill = class Skill extends Serializable {
    constructor(name, parentSkill, cost, description) {
        super();

        this.name = name;
        this.parentSkill = parentSkill;
        this.cost = cost;
        this.description = description;
        this.apply = apply;
    }

    get DOM() {
        
    }

    get type() { return "Skill" }
}