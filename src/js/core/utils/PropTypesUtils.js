const PropTypesUtils = {
    // Returns true if a value is a string
    isString:  (value) => {
        return typeof value === 'string' || value instanceof String;
    },

    // Returns true if a value is an array
    isArray: (value) => {
        return value && typeof value === 'object' && value.constructor === Array;
    },

    // Returns true if a value is really a number
    isNumber: (value) => {
        return typeof value === 'number' && isFinite(value);
    },

    // Returns true if a value is a function
    isFunction: (value) => {
        return typeof value === 'function';
    },

    // Returns true if a value is an object
    isObject: (value) => {
        return value && typeof value === 'object';
    },

    // Returns true if a value is null
    isNull: (value) => {
        return value === null;
    },

    // Returns true if a value is undefined
    isUndefined: (value) => {
        return typeof value === 'undefined';
    },

    // Returns true if a value is a boolean
    isBoolean: (value) => {
        return typeof value === 'boolean';
    },

    // Returns true if value is an error object
    isError: (value) => {
        return value instanceof Error && typeof value.message !== 'undefined';
    },

    // Returns true if value is a date object
    isDate: (value) => {
        return value instanceof Date;
    },

    // Returns true if a Symbol
    isSymbol: (value) => {
        return typeof value === 'symbol';
    },

    isClass: (value) => {
        const isCtorClass = value.constructor
            && value.constructor.toString().substring(0, 5) === 'class'
        if(value.prototype === undefined) {
            return isCtorClass
        }
        const isPrototypeCtorClass = value.prototype.constructor
            && value.prototype.constructor.toString
            && value.prototype.constructor.toString().substring(0, 5) === 'class'
        return isCtorClass || isPrototypeCtorClass
    }



};

export default PropTypesUtils;


