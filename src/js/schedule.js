window.Schedule = class Schedule extends Serializable {
    constructor(plan) {
        super();

        this.plan = plan;
    }

    getPlan(time) {
        return this.plan.find((plan) => {
            return Time.compare(time, plan.from) >= 0 
                && Time.compare(time, plan.to) <= 0
        }) || {
            action: "unknown", 
            location: "unknown", 
            from: Time.Unknown(), 
            to: Time.Unknown()
        }
    }

    get type() { return "Schedule" }
}