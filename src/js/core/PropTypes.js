import PropTypesUtils from './utils/PropTypesUtils.js';
import './utils/StringUtils.js';

const PropTypes = {
    propTypesChecker: (props, propTypes) => {
        for(let index in propTypes) {
             if(PropTypesUtils.isArray(propTypes[index])) {
                PropTypes.checkArrayTypeConstraints(props, index ,propTypes[index])
             } else if(PropTypesUtils.isObject(propTypes[index])) {
                 PropTypes.checkTypeConstraints(props, index ,propTypes[index]);
             } else {
                PropTypes.checkInstance(props, index, propTypes[index]);
            }
        }
    },

    instanceOf: (element) => {
       return element;
    },

    arrayOf: (propsTypesArray) => {
        return propsTypesArray;
    },

    checkArrayTypeConstraints: (props, propName, propTypes) => {
        let result = false;
        let typeTested = [];
        for(let index in propTypes) {
            try {
                PropTypes.checkTypeConstraints(props, propName, propTypes[index]);
                result = result || true;
            } catch(error) {
                result = result || false;
            }
            typeTested.push(propTypes[index].type);
        }

        if(!result) {
            throw new Error(`La propriété ${propName} donnée ne correspond à aucun de ces types : ${typeTested.join(',')}`);
        }
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
    },

    checkInstance(prop, propName, propInstance) {
        console.log(prop)
        if(!(prop[propName] instanceof propInstance)) {
            throw new Error(`La propriété ${propName} n'est pas du type ${propInstance.name}`);
        }
    }
};

export default PropTypes;