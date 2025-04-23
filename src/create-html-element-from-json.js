function addAttributes(element, attr = {}) {
    for (let [name, value] of Object.entries(attr)) {
        element[name] = value;
    }
}

function addContent(element, content) {
    if (content) element.textContent = content;
}

function addChildren(element, children) {
    for (const child of children) {
        element.appendChild(createHTMLElementFromJSON(child));
    }
}

function createHTMLElementFromJSON(elementStructure) {
    const element = document.createElement(elementStructure.tag)
    addAttributes(element, elementStructure.attributes);
    addContent(element, elementStructure.content);

    if (!elementStructure.children) return element;
    addChildren(element, elementStructure.children);

    return element;
}

export default createHTMLElementFromJSON;