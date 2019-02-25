import React from '../React.js';
import Component from '../Component.js';
import matchPath from './Match.js';

class Route extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { path, component } = this.props;
        const match = matchPath(location.pathname, { path });

        if (!match) {
            return null;
        }

        if (component) {
            return React.createElement(component, { match })
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