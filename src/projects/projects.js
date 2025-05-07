import Project from "./project";

const INITIAL_PROJECT = {name : "General", color : "purple"}

function Projects(json=null) {
    const list = [];
    let activeProject;
    init();
    
    const getList = () => list;
    const forEach = callback => list.forEach(callback);
    const includes = project => list.includes(project);

    const add = project => {
        list.push(project);
        activeProject = project;
    };

    const remove = project => {
        const index = list.findIndex(item => project.getId() === item.getId());
        if (!(index === -1)) {
            list.splice(index, 1);
            if (activeProject.getId() === project.getId()) {
                list.length >= 1 ? activeProject = list[0] : activeProject = undefined;
            }
        }
        throw new Error("This project is not in the projects list.");
    };

    const getActiveProject = () => activeProject;
    
    function setActiveProject(project=undefined, id=undefined) {
        if (project) return (activeProject = project);
        if (id) return (activeProject = list.find(item => item.getId() === id));
        throw new Error("Neither the project nor the id are defined.");
    }

    const createJSON = () => JSON.stringify(list);

    function init() {
        if (json) {
            Object.assign(list, JSON.parse(json));
        }
        else {
            list = [Project(INITIAL_PROJECT)];
        }
        activeProject = list[0];
    }

    return {getList, add, remove, getActiveProject, setActiveProject, forEach, includes, createJSON};
}

export default Projects;