
class Project {
    constructor(name = "untitled", creationDate = new Date()) {
        this.name = name;
        this.creationDate = creationDate;
        this.todoList = [];
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