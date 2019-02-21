import React from '../React.js';
import Component from '../Component.js';
import matchPath from './Match.js';
import {register, unregister} from "./Instance.js";

class Route extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
         addEventListener("popstate", this.handlePop);
         register(this);
    }

    componentWillUnmount() {
         unregister(this);
         removeEventListener("historyUpdated", this.handlePop);
    }

    handlePop() {
        console.log('hdanle');
        this.forceUpdate();
    }

    render () {
        const { path, exact, component } = this.props;
        const match = matchPath(location.pathname, { path, exact });

        if (!match) {
            return null;
        }

        if (component) {
            return React.createElement(component, { match }, []);
        }

        return null;
    }
}

Route.propTypes = {
    exact: {type: "bool"},
    path: {type: "string"},
    component: {type: "function"},
};

export default Route;