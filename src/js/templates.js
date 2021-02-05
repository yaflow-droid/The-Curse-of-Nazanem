Macro.add("a", {
    skipArgs: false,
    handler: function() {
        $(this.output).wiki(helper.addArticle(this.args.full))
    }
})