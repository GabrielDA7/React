export const React = {
    createElement: (type, attributes = {}, children = []) => {

        // return virtual children element array
        const childElements = children.map(child => (
            typeof child === 'string' ? React.createElement('text', { textContent: child }) : child
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

export class Component {
    constructor(props) {
        this.props = props;
    }

    updateProps(newProps) {
        this.props = newProps;
    }

    setChild(component) {
        this._child = component;
    }

    getChild() {
        return this._child;
    }

    getRoot() {
        let component = this;
        let res;
        while (component) {
            res = component;
            component = component._parentComponent;
        }
        return res;
    }

    render() {}
}
