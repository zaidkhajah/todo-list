import Todo from "../todo/todo";

function Project({ name=undefined , color=undefined, json = null, creationDate = new Date() }) {
    const state = {};
    
    init();

    const getName = () => state.name;
    const getColor = () => state.color;

    const setName = name => state.name = name;
    const setColor = color => state.color = color;

    const getItems = () => state.todoItems;
    const getId = () => state.id;

    const getTodo = id => state.todoItems.find(todo => todo.id === id);

    const add = todo => {
        state.todoItems.push(todo);
        return state.todoItems.at(-1);
    }
    const remove = id => {
        const index = state.todoItems.findIndex(item => item.id === id);
        if (!(index === -1)) return state.todoItems.splice(index, 1);
    }

    const toJSON = () => state;

    function init() {
        if (json) Object.assign(state, JSON.parse(json, function(key, value) {
            if (key === "todoItems") return value.map(json => Todo(json));
            if (key === "creationDate") return new Date(value);
            return value;
        }));

        else Object.assign(state, {
            name, color, creationDate, todoItems : [], id : crypto.randomUUID()
        });
    }

    return {getName, getColor, getItems, getId, add, remove, toJSON};
}

export default Project;