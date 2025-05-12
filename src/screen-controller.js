
import AppController from "./app-controller";

function ScreenController() {
    const app = AppController();
    const todoCardFactory = TodoCardFactory();
    const projectElementFactory = ProjectElementFactory();

    const projectsDiv = document.getElementById("projects-list");
    const projectContent = document.getElementById("project-content");

    const addProject = (name, color) => {
        const project = app.addProject({name, color});
        projectsDiv.appendChild(projectElementFactory.createElement(project));
    }

    const addTodo = inputs => {
        const todo = app.addTodo(inputs);
        projectContent.appendChild(todoCardFactory.createCard(todo));
    }

    const deleteProject = projectElement => {
        return () => {
            app.removeProject(projectElement.dataset.id);
            projectElement.remove();
        }
    }

    const deleteTodo = todoCard => {
        app.removeTodo(todoCard.dataset.id);
        todoCard.remove();
    }

    const expandMinimize = todoCard => {
        todoCard.classList.toggle("collapsed");
        target.classList.toggle("expand");
        target.classList.toggle("minimize");
    }

    const togglePriority = todoCard => {
        app.toggleTodoPriority(todoCard.dataset.id);
        todoCard.first
        priorityToggle.textContent = todo.getPriorityString();
        setCardClassName();
    }




    function ProjectElementFactory(project=undefined) {
        const setProject = newProject => project = newProject;
    
        const createNameElement = () => {
            const name = document.createElement("input");
            name.textContent = project.getName();
            return name;
        }
    
        const createColorElement = () => {
            const color = document.createElement("input");
            color.type = "color";
            color.value = project.getColor();
            return color;
        }
    
        const createDeleteButton = () => {
           const deleteBtn = document.createElement("button");
           deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
           deleteBtn.addEventListener("click", deleteProject(this.parentElement));
           return deleteBtn;
        }
    
        const createElement = project => {
            setProject(project);
            const element = document.createElement();
            element.className = "project";
            element.dataset.id = project.getId();
            element.append(
                createColorElement,
                createNameElement,
                createDeleteButton
            );
            return element;
        }
        return { createElement }
    }


    function TodoCardFactory(todo=undefined) {
        const setTodo = newTodo => todo = newTodo;
    
        const createHeader = () => {
            const header = document.createElement("header");
            const title = document.createElement("span");
            const description = document.createElement("span");
            [title.innerText, description.innerText] = [todo.props.title, todo.props.description];
            header.append(title, description);
            return header;
        };
    
        const createManager = handler => {
            const manager = document.createElement("div");
            manager.className = "manager";
    
            const priorityToggle = document.createElement("button");
            priorityToggle.className = "priority-toggle";
            priorityToggle.textContent = todo.getPriorityString();
    
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-todo";
            deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
    
            const expandMinimize = document.createElement("button");
            expandMinimize.className = "expand";
            expandMinimize.innerHTML = `
            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
            <i class="fa-solid fa-window-minimize"></i>
            `;
    
            manager.addEventListener("click", handler);
            return manager;
        };
    
        const createDatesContainer = () => {
            const datesContainer = document.createElement("div");
            datesContainer.className = "datesContainer";
            const dueDate = document.createElement("span");
            dueDate.textContent = format(todo.dueDate, "dd / MM / yyyy");
            const reminder = document.createElement("button");
            reminder.className = todo.reminderDate ? "has-reminder" : "no-reminder";
            datesContainer.append(dueDate, reminder);
            return datesContainer;
        };
    
        function createChecklistElement(checkListItem=null) {
            const isFromCheckListItem = Boolean(checkListItem);
            if (isFromCheckListItem) checkListItem = todo.addCheckListItem();
    
            const checkListElement = document.createElement("div");
    
            const textInput = document.createElement("input");
            textInput.type = "text";
            textInput.value = isFromCheckListItem ? checkListItem.getText() : "";
    
            const inputElement = document.createElement("input");
            inputElement.type = "checkbox";
            inputElement.checked = isFromCheckListItem ? checkListItem.status : false;
    
            checkListElement.append(inputElement, textInput);
            checkListElement.addEventListener("click", checkListElementHandler);
    
            function checkListElementHandler(event) {
                const target = event.target.closest("input");
                if (target.type === "text") {
                    return todo.updateCheckListItem(text = target.value, id=checkListItem.getId());
                }
                if (target.type === "checkbox") {
                    return todo.updateCheckListItem(status = target.checked, id=checkListItem.getId());
                }
            }
            return checkListElement;
        };
    
        const createChecklist = () => {
            const checklistContainer = document.createElement("div");
            checklistContainer.className = "checklist";
    
            const addChecklistitemBtn = document.createElement("button");
            addChecklistitemBtn.textContent = "+Add Checklist Item";
    
            checklistContainer.appendChild(addChecklistitemBtn);
    
            addChecklistitemBtn.addEventListener("click", () => checklistContainer.appendChild(createChecklistElement()));
    
            todo.checklist.forEach(
                checkListItem => checklistContainer.append(createChecklistElement(checkListItem))
            );
    
            return checklistContainer;
        };
    
        const createDivider = () => {
            const divider = document.createElement("div");
            divider.className = "divider";
            return divider;
        };
    
        const createNotesTextArea = () => {
            const notes = document.createElement("textarea");
            notes.placeholder = "notes ...";
            notes.className = "notes";
            return notes;
        };
    
        const createCard = todo => {
            setTodo(todo);
            const card = document.createElement("article");
            let isCollapsed = true;
            const toggleCollapse = () => isCollapsed = !isCollapsed;
            const setCardClassName = () => card.className = `todo-card ${todo.priorityString} ${isCollapsed ? "collapsed" : ""}`;
    
            function managerHandler(event) {
                const target = event.target.closest("button");
                if (target === priorityToggle) {
                    todo.togglePriority();
                    priorityToggle.textContent = todo.getPriorityString();
                    setCardClassName();
                }
                if (target === deleteButton) deleteTodo(card);
                if (target === expandMinimize) expandMinimize(card);
            }
    
            setCardClassName();
            card.append(
                createHeader(),
                createManager(managerHandler), 
                createDatesContainer(),
                createChecklist(),
                createDivider(),
                createNotesTextArea()
            );
            return card;
        };
        return { createCard };
    }
}