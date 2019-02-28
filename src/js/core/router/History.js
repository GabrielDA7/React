import {refreshApp} from "../utils/RouterUtils.js"

export const historyPush = (path) => {
    history.pushState({}, null, path);
    refreshApp()
};

export const historyReplace = (path) => {
    history.replaceState({}, null, path);
    refreshApp()
};
