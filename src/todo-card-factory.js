import { format } from "date-fns";


function createTodoCardFactory(todo = undefined) {
    const get = () => todo;
    const set = newTodo => todo = newTodo;

    const TodoCardClassName = () => `todo-card ${todo.priorityString} collapsed`;

    const createHeader = () => {
        const header = document.createElement("header");
        const title = document.createElement("span");
        const description = document.createElement("span");
        [title.innerText, description.innerText] = [todo.title, todo.description];
        header.append(title, description);
        return header;
    };

    const createManageTodoContainer = card => {
        const container = document.createElement("div");
        container.className = "manage-todo";

        const priorityToggle = document.createElement("button");
        priorityToggle.className = "priority-toggle";
        priorityToggle.textContent = todo.priorityString.split("-")[0];

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-todo";
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

        const expandMinimize = document.createElement("button");
        expandMinimize.className = "expand";
        expandMinimize.innerHTML = `
        <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
        <i class="fa-solid fa-window-minimize"></i>
        `;
        container.append(priorityToggle, deleteButton, expandMinimize);

        container.addEventListener("click", event => {
            const target = event.target.closest("button");
            if (target === priorityToggle) {
                todo.set("priority", todo.priority === -1 ? 0 : (todo.priority === 0 ? 1 : -1));
                priorityToggle.textContent = todo.priorityString.split("-")[0];
                card.className = TodoCardClassName();
            }
            if (target === deleteButton) {
                card.remove();
                todo.removeSelf();
            }
            if (target === expandMinimize) {
                card.classList.toggle("collapsed");
                target.classList.toggle("expand");
                target.classList.toggle("minimize");
            }
        });
        return container;
    };

    const createDatesContainer = () => {
        const datesContainer = document.createElement("div");
        datesContainer.className = "datesContainer";
        const dueDate = document.createElement("span");
        dueDate.textContent = format(todo.dueDate, "dd/MM/yyyy");
        const reminder = document.createElement("button");
        reminder.className = todo.reminderDate ? "has-reminder" : "no-reminder";
        datesContainer.append(dueDate, reminder);
        return datesContainer;
    };

    const createChecklist = () => {
        let label;
        let span;
        let inputElement;

        const checklistContainer = document.createElement("div");
        todo.checklist.forEach(item => {
            label = document.createElement("label");
            span = document.createElement("span");
            span.textContent = item;
            inputElement = document.createElement("input");
            inputElement.type = "checkbox";
            label.append(inputElement, span);
            checklistContainer.append(label);
        });
        return checklistContainer;
    }

    const createDivider = () => {
        const divider = document.createElement("div");
        divider.className = "divider";
        return divider;
    }

    const createNotesTextArea = () => {
        const notes = document.createElement("textarea");
        notes.placeholder = "notes ...";
        notes.className = "notes";
        return notes;
    }

    const createTodoCard = () => {
        const card = document.createElement("article");
        card.className = TodoCardClassName();
        card.append(
            createHeader(), 
            createManageTodoContainer(card), 
            createDatesContainer(),
            createChecklist(),
            createDivider(),
            createNotesTextArea()
        );
        return card;
    }

    return {createTodoCard, get, set};
}

const todoCardFactory = createTodoCardFactory();

export default todoCardFactory;