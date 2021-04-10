window.Schedule = class Schedule extends Serializable {
    constructor(plan) {
        super();

        this.plan = plan;
    }

    getPlan(time) {
        return this.plan.find((plan) => {
            return Time.compare(time, plan.from) >= 0 
                && Time.compare(time, plan.to) <= 0
        })
    }
}