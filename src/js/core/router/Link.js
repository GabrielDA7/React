import React from '../React.js';
import { historyReplace, historyPush } from "./History.js";

class Link extends Component {

    handleClick = (event) => {
        const { replace, to } = this.props;
        event.preventDefault();

        replace ? historyReplace(to) : historyPush(to);
    };

    render() {
        const { to, children} = this.props;

        return (
            React.createElement('a', {href: `${to}`}, [children])
        )
    }
}

