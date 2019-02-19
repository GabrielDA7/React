import PropTypesUtils from './PropTypesUtils.js';

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
            console.log("exist");
        } else {

        }
    },
};

export default PropTypes;