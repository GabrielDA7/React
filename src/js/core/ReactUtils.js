const ReactUtils = {
    flatten: (arr) => {
        return arr.reduce((flat, toFlatten) =>
                flat.concat(Array.isArray(toFlatten) ?
                    ReactUtils.flatten(toFlatten) :
                    toFlatten
                )
            , []);
    }
};

export default ReactUtils;