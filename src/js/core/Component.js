export class Component {
    constructor(props) {
        this.props = props || {};
        this.propTypes = {};
        this.state = {};
        this.onStateChange = () => {};
        this._domElement = null;
    }

    setState(newState) {
        const prevState = this.state;
        const nextState = Object.assign({}, prevState || {}, newState);
        this.onStateChange(this, nextState);
    }

    setStateCallback(cb) {
        this.onStateChange = cb;
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps() {}

    shouldComponentUpdate() { return true; }

    componentWillUpdate() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    setChild(component) {
        this._child = component;
        component._parentComponent = this;
    }

    getDomElement() {
        return this._domElement;
    }

    setDomElement(domElement) {
        this._domElement = domElement;
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

    updateProps(newProps) {
        this.props = newProps;
    }

    updateState(newState) {
        this.state = newState;
    }

    render() {}
}

export default Component;