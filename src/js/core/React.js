import PropTypes from './PropTypes.js';
import ReactUtils from './ReactUtils.js';

const React = function() {
    this.createElement = (type, attributes = {}, children = []) => {

        if(typeof type === "function") {
            console.log('props', type.propTypes);
            PropTypes.propTypesChecker(attributes, type.propTypes);
        }

        const childElements = ReactUtils.flatten(children).map(child => (
            typeof child === 'string' ? this.createElement('text', {textContent: child}) : child
        )).filter(child => child);

        return {
            type,
            children: childElements,
            props: Object.assign(
                { children: childElements },
                attributes
            )
        };
    };
};

const react = new React();
export default react;
