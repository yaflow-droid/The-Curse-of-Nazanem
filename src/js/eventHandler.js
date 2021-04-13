window.EventHandler = class EventHandler extends Serializable {
    constructor() {
        super();
    }

    trigger(event, data) { // Maybe improve this later
        var sv = State.variables;

        /* Current events are:
            onTimeChange
            onPlayerMove
            onQuestFinish
        */

        if (State.variables.debug)
            console.log(`Triggering event "${event}" with data: `, data);
        switch (event) {              
            case "onTimeChange":
                // Move all npc
                sv.npc.forEach((npcName) => {
                    var npc = State.getVar(npcName);
                    npc.onTimeChange(data);
                })
                break;
            case "onPlayerMove":
                // Execute first
                sv.time.onPlayerMove(data);

                break;
            case "onQuestFinish":
                sv.diary.onQuestFinish(data);
                break;
        }

        // Trigger for each quest
        sv.questList.forEach((quest) => {
            quest.triggerEvent(event, data);
        })
    }

    get type() { return "EventHandler"; }
}