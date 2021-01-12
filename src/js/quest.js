window.Quest = class Quest extends Serializable {
    constructor(name, type, description, requirement, effect) {
        super();

        this.name = name;
        this.type = type;
        this.description = description;
        this.requirement = requirement;
        this.effect = effect;
    }

    get isVisible() {
        return this.requirement(State.variables);
    }

    get type() { return "Quest" }
}