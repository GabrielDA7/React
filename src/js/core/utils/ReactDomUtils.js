import {refreshApp} from "../utils/RouterUtils.js";

export let mainVirtualElement = null;
export let mainVirtualElementContainer = null;

export const setMainVirtualElement = (virtualElement, container) => {
    mainVirtualElement = virtualElement;
    mainVirtualElementContainer = container;
};

export const addEventPopStateListener= () => {
    window.addEventListener("popstate", function () {
        refreshApp();
    })
};
