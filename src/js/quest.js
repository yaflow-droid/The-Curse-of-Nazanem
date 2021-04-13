window.Quest = class Quest extends Serializable {
    constructor(_goal, _diary, _eventHandler) {
        super();

        this.goal = _goal;
        this.diary = _diary;
        this.eventHandler = _eventHandler;

        this.done = false;
    }

    triggerEvent(eventName, data) {
        if (this.done) return;

        if (this.eventHandler[eventName] != undefined) {
            this.eventHandler[eventName].call(this, data);
        }

        if (this.done) { // TODO: Add rewards
            setup.eventHandler.trigger("onQuestFinish", {
                quest: this,
                diary: this.diary
            });
        }
    }

    get type() { return "Quest"; }
}