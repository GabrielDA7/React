import ReactDom from '../core/ReactDom.js';
import React from '../core/React.js';
import Component from '../core/Component.js';
import Link from '../core/router/Link.js';
import Route from '../core/router/Route.js';
import About from './About.js';
import Home from './Home.js';
import TestComponent from './TestComponent.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {appName: "React", currentPage: "home"};
    }

    render() {
        return React.createElement('nav', {currentPage: `${this.state.currentPage}`}, [
            React.createElement('ul', {}, [
                React.createElement('li', {}, [
                    React.createElement(Link, {to: "/", replace: true}, ["Home"])
                ]),
                React.createElement('li', {}, [
                    React.createElement(Link, {to: "/about", replace: true}, ["About"])
                ]),
            ]),
            React.createElement(Route, {component: Home, path: "/"}, []),
            React.createElement(Route, {component: About, path: "/about"}, [])
        ]);
    }
}

ReactDom.render(React.createElement(Main, {text: 'coucou', name: 'Gab'}, []), document.getElementById("root"));
