
function CheckListItem({text="", status=false, json=null}) {
    const state = {};
    init();

    const updateText = text => state.text = text;
    const updateStatus = status => state.status = status;

    const getText = () => state.text;
    const getStatus = () => state.status;

    const getId = () => state.id;

    const toJSON = () => state;

    function init() {
        if (json) state = Object.assign(state, JSON.parse(json));
        else state = {text, status, id : crypto.randomUUID()};
    }

    return {getText, getStatus, updateStatus, updateText, createJSON};
}

export default CheckListItem;