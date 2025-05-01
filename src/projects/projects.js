import { formatRFC3339 } from "date-fns";

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

const Projects = function() {
    const list = [new Project("general")];
    let activeProject = list[0];

    const getList = () => list;
    const add = project => list.push(project);

    const remove = project => {
        const index = findIndex(project);
        if ((index === -1)) return;
        list.splice(index, 1);
    };

    function find(id) {
        return list.find(projectItem => projectItem.id === id);
    }

    function findIndex(project) {
        return list.findIndex(projectItem => projectItem.id === project.id);
    }

    const getActiveProject = () => activeProject;
    function setActiveProject({project = undefined, id = undefined}) {
        if (project) {
            activeProject = project;
            return;
        }
        activeProject = find(id);
    }

    const forEach = callback => list.forEach(callback);
    const includes = project => list.includes(project);

    return {getList, add, remove, find, findIndex,
        getActiveProject, setActiveProject, forEach, includes};
}

export {Project, Projects};