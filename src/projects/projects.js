import Project from "./project";

const INITIAL_PROJECT = {name : "General", color : "purple"}

function Projects(json=null) {
    const list = [];
    let activeProject;
    init();
    
    const getList = () => list;
    const forEach = callback => list.forEach(callback);
    const includes = project => list.includes(project);
    const getProject = id => list.find(project => project.id === id);

    const add = project => {
        list.push(project);
        return list.at(-1);
    };

    const remove = id => {
        const index = list.findIndex(project => project.getId() === id);
        if (index === -1) throw new Error("the provided id does not match any project id.");;
        return list.splice(index, 1);
    };

    const toJSON = () => list;

    function init() {
        if (json) {
            Object.assign(list, JSON.parse(json, function(key, value) {
                value.map(json => Project({json}));
            }));
        }
        else {
            list = [Project(INITIAL_PROJECT)];
        }
        activeProject = list[0];
    }

    return {getList, add, remove, forEach, getProject, includes, toJSON};
}

export default Projects;