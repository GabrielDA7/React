import React from '../React.js';
import { historyReplace, historyPush } from "./History.js";
import Component from "../Component.js";

class Link extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(event) {
        const { replace, to } = this.props;
        event.preventDefault();
        replace ? historyReplace(to) : historyPush(to);
    }

    render() {
        const { to, children } = this.props;

        return React.createElement('a', {href: `${to}`, onClick: this.handleClick.bind(this)}, children);
    }
}

export default Link;