import PropTypesUtils from './utils/PropTypesUtils.js';
import './utils/StringUtils.js';

const PropTypes = {
    propTypesChecker: (props, propTypes) => {
        for(let index in propTypes) {
            PropTypes.checkTypeConstraints(props, index ,propTypes[index]);
        }
    },

    instanceOf: (element) => {

    },

    arrayOf: (propsTypesArray) => {

    },

    checkTypeConstraints: (props, propName, propType) => {
        if(propName in props) {
            PropTypes.checkType(props, propName, propType);
        } else {
            if("required" in propType) {
               if(propType.required) {
                   throw new Error(`La propriété ${propName} est requise`);
               }
            }
        }
    },

    checkType(props, propName, propType) {
        let funcName = "is" + propType.type.capitalize();
        if(!PropTypesUtils[funcName](props[propName])) {
            throw new Error(`La propriété ${propName} n'est pas du type ${propType.type}`);
        }
    }
};

export default PropTypes;