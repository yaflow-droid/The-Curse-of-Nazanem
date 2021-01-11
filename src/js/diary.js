window.Diary = class Diary extends Serializable {
    constructor(entries = [], notes = "") {
        super();

        this.entries = entries;
        this.notes = notes;
    }

    addEntry(description) {
        // Avoid empty entries
        if (description === "") return;

        this.entries.push("");
    }

    getEntryDOM(entry, i) {
        const container = $(`<div></div>`);
        const diary = this;

        const description = $(`<p>${entry.description}</p>`);
        container.append(description);

        return container;
    }

    get DOM() {
        const diary = $(`<div class="diary"></div>`);
        const d = this;
        this.entries.forEach((entry, i) => {
            diary.append(d.getEntryDOM(entry, i));
        })
        
        const notes = $(`<p contenteditable></p>`);
        notes.html(this.notes);
        notes.on("input", (e) => {
            d.notes = notes.html();
        })
        diary.append(notes);

        return diary;
    }

    get type() { return "Diary" }
}