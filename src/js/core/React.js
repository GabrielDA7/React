const React = {
    createElement: (type, attributes = {}, children = []) => {

        // return virtual children element array
        const childElements = children.map(child => (
            typeof child === 'string' ?
                React.createElement('text', { textContent: child }) :
                child
        ));

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