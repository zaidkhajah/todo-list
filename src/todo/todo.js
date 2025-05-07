
const PRIORITY = {low : -1, normal : 0, high : 1};
const STATUS = {new : 0, overdue : -1, complete : 1};

function Todo({
    title = "untitled", project = "general", description = "", dueDate = new Date(), reminderDate = undefined, priority = PRIORITY.low, checklist=[], json=null
}) {
    const state = {};
    init();
    const noPropError = propName => new ReferenceError(`todo item does not have the property ${propName}`);


    const proxy = new Proxy(state, {
        get(target, prop) {
        if (Object.hasOwn(state, propName)) return state[propName];
        throw noPropError();
        },

        set(target, prop, value) {
            if (Object.hasOwn(state, propName)) {
                state[propName] = newValue;
                return newValue;
            }
            throw noPropError();
        }
    });

    const createJSON = () => JSON.stringify(state);

    function init() {
        if (json) Object.assign(state, JSON.parse(json));
        else Object.assign(state, {
            title, project, description, dueDate, reminderDate, priority, checklist, status : STATUS.new, id : crypto.randomUUID(),
        });
    }

    return {proxy, createJSON};
}