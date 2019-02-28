import React from '../React.js';
import Component from '../Component.js';
import matchPath from './Match.js';
import PropTypes from "../PropTypes.js";


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
    exact: {type: "boolean"},
    path: {type: "string"},
    component: PropTypes.arrayOf([
        {type: "bool"},
        {type: "function"},
        {type: "bool"}
    ])
};

export default Route;