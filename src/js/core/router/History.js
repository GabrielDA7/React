import ReactDom from "../ReactDom.js";
import React from "../React.js";
import {mainVirtualElement, mainVirtualElementContainer} from "../utils/ReactDomUtils.js";
import Reconciler from "../Reconciler.js";

export const historyPush = (path) => {
    history.pushState({}, null, path);
    Reconciler.unmountNode(mainVirtualElementContainer);
    ReactDom.render(React.createElement(mainVirtualElement.type, mainVirtualElement.props, mainVirtualElement.children), mainVirtualElementContainer);
};

export const historyReplace = (path) => {
    history.replaceState({}, null, path);
    Reconciler.unmountNode(mainVirtualElementContainer);
    ReactDom.render(React.createElement(mainVirtualElement.type, mainVirtualElement.props, mainVirtualElement.children), mainVirtualElementContainer);
};
