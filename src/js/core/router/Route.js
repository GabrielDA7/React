import React from '../React.js';
import matchPath from './Match.js';
import {register, unregister} from "./Instance.js";

class Route extends Component {

    componentWillUpdate() {
        addEventListener("popstate", this.handlePop);
        register(this);
    }

    componentWillUnmount() {
        unregister(this);
        removeEventListener("popstate", this.handlePop)
    }

    handlePop = () => {
        this.forceUpdate()
    }

    render () {
        const { path, exact, component } = this.props;

        const match = matchPath(location.pathname, { path, exact });

        if (!match) {
            // Do nothing because the current
            // location doesn't match the path prop.
            return null
        }

        if (component) {
            // The component prop takes precedent over the
            // render method. If the current location matches
            // the path prop, create a new element passing in
            // match as the prop.
            return React.createElement(component, { match }, []);
        }


        return null
    }
}

Route.propTypes = {
    exact: {type: "bool"},
    path: {type: "string"},
    component: {type: "function"},

}