import Reconciler from "../Reconciler.js";
import {mainVirtualElement, mainVirtualElementContainer} from "./ReactDomUtils.js";
import ReactDom from "../ReactDom.js";
import React from "../React.js";

export const refreshApp = () => {
    Reconciler.unmountNode(mainVirtualElementContainer);
    ReactDom.render(React.createElement(mainVirtualElement.type, mainVirtualElement.props, mainVirtualElement.children), mainVirtualElementContainer);
}
