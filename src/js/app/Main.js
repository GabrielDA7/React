import ReactDom from '../core/ReactDom.js';
import React from '../core/React.js';
import Component from '../core/Component.js';
import Link from '../core/router/Link.js';
import Route from '../core/router/Route.js';
import About from './About.js';
import Home from './Home.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {appName: "React"};
    }

    render() {
        return React.createElement('div', {id: "main"}, [
            React.createElement('nav', {}, [
                React.createElement('ul', {class: "nav justify-content-center navbar-dark bg-dark"}, [
                    React.createElement('li', {class: "nav-item"}, [
                        React.createElement(Link, {to: "/", replace: false, class: "nav-link text-white"}, ["Home"])
                    ]),
                    React.createElement('li',{class: "nav-item"}, [
                        React.createElement(Link, {to: "/about", replace: false, class: "nav-link text-white"}, ["About"]),
                    ]),
                ]),
            ]),
            React.createElement(Route, {component: Home, path: "/"}),
            React.createElement(Route, {component: About, path: "/about"})
        ]);
    }
}

ReactDom.render(React.createElement(Main, {}), document.getElementById("root"));