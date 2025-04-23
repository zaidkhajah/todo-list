import "./todo-styles.css"
import createHTMLElementFromJSON from "./create-html-element-from-json";
import Todo from "./todo";
import generateTodoCardStructure from "./generate-todo-card-structure";



function createTodoCard(todo = new Todo({})) {
    const card = createHTMLElementFromJSON(generateTodoCardStructure(todo));
    card.addEventListener("click", event => {
        const target = event.target;
        if (target.closest(".expand") || target.closest(".minimize")) {
            const expMinBtn = target.closest(".expand") || target.closest(".minimize");
            card.classList.toggle("collapsed");
            expMinBtn.classList.toggle("expand");
            expMinBtn.classList.toggle("minimize");
        }
    });
    return card
}

export default createTodoCard;