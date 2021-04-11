Macro.add("a", {
    skipArgs: false,
    handler: function() {
        $(this.output).wiki(helper.addArticle(this.args.full))
    }
})

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

Macro.add("tabs", {
    tags: ["tab"],
    handler: function() {
        const DOM = $("<div class='tabs'></div>");
        const navDOM = $("<div class='tabs-title'></div>");
        const tabListDOM = $("<ul class='tabs-title-list'></ul>");
        const contentDOM = $("<div class='tabs-content'></div>");

        this.payload.forEach((payload) => {
            var tabDOM = $(`<li class="tab-title">${payload.args[0]}</li>`);
            if (payload.args.length >= 2 && payload.args[1] == "selected") { 
                tabDOM.addClass("tab-selected");
                contentDOM.wiki(payload.contents);
            }
            $(tabListDOM).append(tabDOM);
            $(tabDOM).click(() => {
                $(".tab-title").removeClass("tab-selected");
                $(tabDOM).addClass("tab-selected");
                contentDOM.empty();
                contentDOM.wiki(payload.contents);
            })
        })
        
        $(navDOM).append(tabListDOM);
        $(DOM).append(navDOM);
        $(DOM).append(contentDOM);
        $(this.output).append(DOM);
    }
})

Macro.add("diary", {
    handler: function() {
        $(this.output).append(State.variables.diary.DOM());
    }
})