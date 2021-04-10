subscribe("onTimeChange", function(data) {
    console.log("%c!Time changed!", "font-weight: bold")
    console.table(data);
}, this);

subscribe("onLoopChange", function(data) {
    console.log("%c!New Loop!", "font-weight: bold")
    console.table(data);
}, this);