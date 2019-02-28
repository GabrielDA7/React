import Reconciler from "./Reconciler.js";
import {setMainVirtualElement, addEventPopStateListener} from "./utils/ReactDomUtils.js";

const ReactDom = {
    render: (element, container) => {
        setMainVirtualElement(element, container);
        Reconciler.diff(element, container, container.firstChild);
        addEventPopStateListener();
    }
};

export default ReactDom;