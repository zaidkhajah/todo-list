
class Project {
    constructor(name = "untitled", color = "#000000", creationDate = new Date()) {
        this.name = name;
        this.creationDate = creationDate;
        this.color = color;
        this.todoList = [];
        this.id = crypto.randomUUID();
    }
    add(todo) {
        this.todoList.push(todo);
    }
    remove(todo) {
        const index = this.todoList.findIndex(item => item.id === todo.id);
        if (index === -1) return;
        this.todoList.splice(index, 1);
    }
}

export default Project;