window.Location = class Location extends Serializable {
    constructor(name) {
        super();

        this.name = name;
    }

    getPresent(npcList = State.variables.npc.map((npc) => State.getVar(npc)), time = State.variables.time) {
        const npcIsHere = npcList.map((npc) => {
            return npc.doing(time).location === this.name
        });
        return npcList.filter((npc, i) => npcIsHere[i]);
    }
}