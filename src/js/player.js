window.Player = class Player extends Serializable {
    constructor() {
        super();

        this.realityPoint = {current: 0, max: 2};
    }

    get type() { return "Player" }
}