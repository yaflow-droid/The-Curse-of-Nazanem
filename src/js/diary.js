window.Diary = class Diary extends Serializable {
    constructor() {
        super();

        this.entries = [];
        this.playerNotes = "";
    }

    addEntry(text) {
        this.entries.push(text);
    }

    onQuestFinish(data) {
        this.addEntry(data.diary);
    }
    
    get DOM() {
        var DOM = $(`<div class="diary"></div>`);
        
        this.entries.forEach((entry) => {
            var entryDOM = $(`<p class="diary-entry">${entry}</p>`);
            DOM.append(entryDOM);
        });
        
        var notesDOM = $(`<p contenteditable>${this.notes}</p>`);
        notesDOM.on("input", (e) => {
           this.notes = notesDOM.text();
        });

        DOM.append(notesDOM);
        return DOM;
    }

    get type() { return "Diary"; }
}