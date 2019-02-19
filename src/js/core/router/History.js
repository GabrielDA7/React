import {instances} from "./Instance";

export const historyPush = (path) => {
    history.pushState({}, null, path);
    instances.forEach(instance => instance.forceUpdate());
};

export const historyReplace = (path) => {
    history.replaceState({}, null, path);
    instances.forEach(instance => instance.forceUpdate());
};