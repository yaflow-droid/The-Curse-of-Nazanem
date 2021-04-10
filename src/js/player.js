window.Player = class Player extends Serializable {
    constructor(room) {
        super();

        this.currRoom = room;
        this.realityPoint = {current: 0, max: 2};
    }

    move(to, moveTime = new Time(0, 0, 5)) {
        var from = this.currRoom;

        this.currRoom = to;
        
        // Add time to move
        debugger;
        State.variables.time.add(moveTime.day, moveTime.hour, moveTime.min);
    }

    get type() { return "Player" }
}