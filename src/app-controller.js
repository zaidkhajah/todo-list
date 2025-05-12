import Project from "./projects/project";
import Projects from "./projects/projects";

function AppController() {
    // initialize and manage projets and todos.

    // initialize from local storage.
    // initialize from scratch.
    const init = () => {
        const json = localStorage.getItem("projects");
        if (json) {
            return Projects(json);
        }
        return Projects();
    }
    const projects = init();

    let activeProject;
    const getActiveProject = () => activeProject;
    function setActiveProject(id=null) {
        if (id) return projects.getProject(id);
        throw new Error("this id is invalid.");
    };

    // need to create a function that generates colors that makes sense.
    //https://css-tricks.com/re-pleasing-color-palettes/
    const addProject = ({name="untitled", color="black"}) => projects.add(Project({name, color}));
    const removeProject = id => projects.remove(id);

    const addTodo = inputs => activeProject.add(Todo(inputs));
    const removeTodo = id => activeProject.remove(id);
    const toggleTodoPriority = id => {
        const todo = activeProject.getTodo(id);
        todo.togglePriority();
    }

    return {addProject, removeProject, getActiveProject, setActiveProject, addTodo, removeTodo, toggleTodoPriority};
}

export default AppController;