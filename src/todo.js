const PRIORITY = {low : -1, normal : 0, high : 1};
const STATUS = {new : 0, overdue : -1, complete : 1};

class ChecklistItem {
    constructor(text="", status=false) {
        this.text = text;
        this.status = status;
        this._id = crypto.randomUUID();
    }
    updateText(text) {
        this.text = text;
    }
    updateStatus(status) {
        this.status = status;
    }

    get id() {
        return this._id;
    }
}

class Todo {
    constructor({
        title = "untitled", project = "general", description = "", dueDate = new Date(), 
        reminderDate = undefined, priority = PRIORITY.low, checklist=[]
    }) {
        this.title = title === "" ? "untitled" : title;
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
                return "normal-priority";
            case 1:
                return"high-priority";
            default:
                throw new Error("Unauthorized value");
        }
    }

    removeSelf() {
        console.log(this.project.todoList);
        this.project.remove(this);
        console.log(this.project.todoList);
    }

    addCheckListItem(text, status) {
        const newItem = new ChecklistItem(text, status);
        this.checklist.push(newItem);
        return newItem;
    }

    updateCheckListItem(text, status, checkListItem) {
        const index = this.checklist.findIndex(item => item.id === checkListItem.id);
        console.log(index);
        this.checklist[index].updateText(text);
        this.checklist[index].updateStatus(status);
    }
}

export default Todo;
