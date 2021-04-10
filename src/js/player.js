window.Player = class Player extends Serializable {
    constructor(room) {
        super();

        this.currRoom = room;
        this.realityPoint = {current: 0, max: 2};
    }

    move(to, moveTime = new Time(0, 0, 5)) {
        var from = this.currRoom;

        this.currRoom = to;
        State.variables.time.add(moveTime);

        // Triggers the player movement event
        publish("onPlayerMove", {
            from, 
            to,
            moveTime
        });
    }

    get type() { return "Player" }
}