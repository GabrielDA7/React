import ReactDom from '../core/ReactDom.js';
import React from '../core/React.js';
import Component from '../core/Component.js';
import Link from '../core/router/Link.js';
import Route from '../core/router/Route.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {appName: "React", currentPage: "home"};
    }

    render() {
        React.createElement('nav', {currentPage: `${this.state.currentPage}`}, [
            React.createElement(Link, {to: "/"}, ["Home"])
        ]);
    }
}

ReactDom.render(React.createElement(Message, {text: 'coucou', name: 'Gab'}, []), document.getElementById("root"));
