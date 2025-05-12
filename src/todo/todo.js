import CheckListItem from "./checkl-list-item";
import todoCardFactory from "./todo-card-factory";

const PRIORITY = {low : -1, normal : 0, high : 1};
const STATUS = {new : 0, overdue : -1, complete : 1};

function Todo({
    title = "untitled", project = null, description = "", dueDate = new Date(), reminderDate = undefined, priority = PRIORITY.low, checklist=[], json=null
}) {
    const state = {};
    init();
    const noPropError = propName => new ReferenceError(`todo item does not have the property ${propName}`);


    const props = new Proxy(state, {
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

    const findCheckListItemIndex = id => state.checklist.findIndex(item => item.id === id);

    const addCheckListItem = (text="", status=false) => {
        const newItem = new CheckListItem(text, status)
        state.checklist.push(new CheckListItem(text, status));
        return newItem;
    }

    const updateCheckListItem = (text=null, status=null, id=null) => {
        const index = findCheckListItemIndex(id);
        if (text !== null && text !== undefined) state.checklist[index].updateText(text);
        if (status != null && status !== undefined) state.checklist[index].updateStatus(status);
    }

    const removeCheckListItem = id => {
        const index = findCheckListItemIndex(id);
        state.checklist.splice(index, 1);
    }

    const getPriorityString = () => {
        switch (state.priority) {
            case PRIORITY.low:
                return "Priority: Low";
            case PRIORITY.normal:
                return "Priority: Normal";
            case PRIORITY.high:
                return "Priority: High";
        }
    }

    const togglePriority = () => {
        switch (state.priority) {
            case PRIORITY.low:
                state.priority = PRIORITY.normal;
                break;
            case PRIORITY.normal:
                state.priority = PRIORITY.high;
                break;
            case PRIORITY.high:
                state.priority = PRIORITY.low;
                break;
        }
    }

    const removeFromProject = () => state.project.remove(state.id);

    const toJSON = () => state;

    function init() {
        if (json) {
            Object.assign(state, JSON.parse(json, function(key, value) {
                if (key === "dueDate" || key === "reminderDate") {
                    if (value === "undefined") return value;
                    return new Date(value);
                }
                if (key === "checklist") {
                    return value.map(json => CheckListItem({json}));
                }
                return value;
            }));
        }
        else Object.assign(state, {
            title, project, description, dueDate, reminderDate, priority, checklist, status : STATUS.new, id : crypto.randomUUID(),
        });
    }

    return {props, toJSON, updateCheckListItem, addCheckListItem, removeCheckListItem, getPriorityString, togglePriority, removeFromProject};
}

export default Todo;