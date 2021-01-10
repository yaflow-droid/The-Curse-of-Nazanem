const MISSING_LOC = null;

window.Schedule = class Schedule extends Serializable {
    constructor(plans = Array(Array(24),Array(24),Array(24),Array(24),Array(24),Array(24),Array(24))) {
        super();
        
        this.plans = plans;
    }

    getLoc(day, hour) {
        return this.plans[day][hour];
    }

    get type() { return "Schedule" }
}