window.Player = class Player extends Serializable {
    constructor(position) {
        super();
        
        this.position = position;
        this.realityPoint = {current: 0, max: 2};
    }

    move(destination, duration = {min: 5}) {
        var from = this.position;
        this.position = destination;

        setup.eventHandler.trigger("onPlayerMove", {
            from,
            destination,
            duration
        })
    }
}