import PropTypes from './PropTypes.js';
import ReactUtils from './utils/ReactUtils.js';
import PropTypesUtils from "./utils/PropTypesUtils.js";

const React =  {
    createElement: (type, attributes = {}, children = []) => {
        if(PropTypesUtils.isFunction(type)) {
            PropTypes.propTypesChecker(attributes, type.propTypes);
        }

        const childElements = ReactUtils.flatten(children).map(child => (
            PropTypesUtils.isString(child) ? React.createElement('text', {textContent: child}) : child
        )).filter(child => child);

        return {
            type,
            children: childElements,
            props: Object.assign(
                { children: childElements },
                attributes
            )
        };
    }
};

export default React;
