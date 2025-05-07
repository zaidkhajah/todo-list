

function Project({ name=undefined , color=undefined, json = null, creationDate = new Date() }) {
    const state = {};
    
    init();

    const getName = () => state.name;
    const getColor = () => state.color;

    const setName = name => state.name = name;
    const setColor = color => state.color = color;

    const getItems = () => state.todoItems;
    const getId = () => state.id;


    const add = todo => state.todoItems.push(todo);
    const remove = todo => {
        const index = state.todoItems.findIndex(item => item.getId() === todo.getId());
        if (!(index === -1)) return state.todoItems.splice(index, 1);
    }

    const createJSON = () => {
        return JSON.stringify(state);
    }

    function init() {
        if (json) Object.assign(state, JSON.parse(json));
        else Object.assign(state, {
            name, color, creationDate, todoItems : [], id : crypto.randomUUID()
        });
    }

    return {getName, getColor, getItems, getId, add, remove, createJSON};
}

export default Project;