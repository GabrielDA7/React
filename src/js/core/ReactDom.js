import Reconciler from "./Reconciler.js";
import {setMainVirtualElement} from "./utils/ReactDomUtils.js";

const ReactDom = {
    render: (element, container) => {
        setMainVirtualElement(element, container);
        Reconciler.diff(element, container, container.firstChild);
    }
};

export default ReactDom;