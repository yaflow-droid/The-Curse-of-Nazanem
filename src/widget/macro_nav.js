Macro.add("optionnal", {
    tags: [],
    handler: function() {
        const link = this.args;
        const content = this.payload[0].contents;

        const DOM_Link = $(`<a></a>`).wiki(link);
        const DOM_Content = $(`<span class="hidden"></span>`).wiki(content);
        DOM_Link.on("click", function() {
            DOM_Content.removeClass("hidden")
        })

        $(this.output).append(DOM_Link);
        $(this.output).append(DOM_Content);
    }
})

Macro.add("chooseoption", {
    tags: [],
    handler: function() {
        const link = this.args;
        const content = this.payload[0].contents;

        const DOM_Link = $(`<a></a>`).wiki(link);
        const DOM_Content = $(`<span class="hidden"></span>`).wiki(content);
        DOM_Link.on("click", function() {
            $(this).addClass("link-disabled");
            DOM_Content.removeClass("hidden")
        })

        $(this.output).append(DOM_Link);
        $(this.output).append(DOM_Content);
    }
})

Macro.add("toggle", {
    tags: [],
    handler: function() {
        const link = this.args;
        const content = this.payload[0].contents;

        const DOM_Link = $(`<a></a>`).wiki(link);
        const DOM_Content = $(`<span class="hidden"></span>`).wiki(content);
        DOM_Link.on("click", function() {
            DOM_Content.toggleClass("hidden")
        })

        $(this.output).append(DOM_Link);
        $(this.output).append(DOM_Content);
    }
})

Macro.add("travelSelect", {
    tags: [],
    handler: function() {
        const DOM = $("<ul></ul>");
        Object.values(State.variables.location).forEach(loc => {
            const loc_DOM = $(`<li></li>`);
            loc_DOM.wiki(`<<link "${loc.name}" "Room Template">><<set $player.move("${loc.name}")>><</link>>`)
            DOM.append(loc_DOM);
        });

        $(this.output).append(DOM);
    }
})