Macro.add("diary", {
    handler: function() {
        $(this.output).append(State.variables.diary.DOM());
    }
})