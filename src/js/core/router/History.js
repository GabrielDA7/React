import {instances} from "./Instance.js";

export const historyPush = (path) => {
    history.pushState({}, null, path);
    //document.getElementById("root").dispatchEvent(new Event('historyUpdated'));
    //instances.forEach(instance => instance.forceUpdate());
};

export const historyReplace = (path) => {
    history.replaceState({}, null, path);
    //document.getElementById("root").dispatchEvent(new Event('historyUpdated'));
    //instances.forEach(instance => instance.forceUpdate());
};