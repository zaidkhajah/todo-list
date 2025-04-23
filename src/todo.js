const PRIORITY = {low : -1, medium : 0, high : 1};
const STATUS = {new : 0, overdue : -1, complete : 1};


class Todo {
    constructor({
        title = "untitled", project = "general", description = "", dueDate = new Date(), 
        reminderDate = new Date(), priority = PRIORITY.low, checklist={}
    }) {
        this.title = title;
        this.project = project;
        this.description = description;
        this.dueDate = dueDate;
        this.reminderDate = reminderDate;
        this.priority = priority;
        this.checklist = checklist;
        this.status = STATUS.new;
        this.id = crypto.randomUUID();
    }

    set( propertyName, newValue ) {
        this[`${propertyName}`] = newValue;
    }

    get priorityString() {
        switch (this.priority) {
            case -1:
                return "low-priority";
            case 0:
                return "medium-priority";
            case 1:
                return"high-priority";
            default:
                throw new Error("Unauthorized value");
        }
    }
}

export default Todo;
