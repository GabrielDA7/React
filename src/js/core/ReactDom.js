import Reconciler from "./Reconciler.js";

const ReactDom = {
    render: (element, container) => {
        Reconciler.diff(element, container, container.firstChild)
    }
}

export default ReactDom;