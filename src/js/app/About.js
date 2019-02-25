import Component from "../core/Component.js";
import React from "../core/React.js";
import Counter from "./Counter.js";

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div', {class: 'container'}, [
            React.createElement('div', {class: 'row pt-5'}, [
                React.createElement('div', {class: 'col-12'}, [
                    React.createElement('h1', {}, ["About us"])
                ])
            ]),
            React.createElement('div', {class: 'row'}, [
                React.createElement('div', {class:'col-6'}, [
                    React.createElement('p', {}, ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at lacinia ipsum. Sed blandit enim at vehicula porta. Praesent pretium ligula ut rutrum blandit. Etiam at aliquam justo. Nam eleifend, mi sit amet tincidunt pretium, odio augue mollis ante, eget rutrum erat ipsum at lacus. Proin ac lacus iaculis, mattis justo nec, cursus lacus. Nunc mattis convallis molestie. Phasellus ornare suscipit tortor luctus vestibulum. Etiam dictum sed purus id gravida. Quisque tincidunt velit ut ante tristique, et fermentum lectus fermentum. Suspendisse consequat vitae felis nec fermentum. Nam mauris eros, gravida vitae nisi sit amet, semper porttitor sem. Duis et rutrum quam, non facilisis eros. In iaculis risus vel turpis tristique, eget feugiat lacus dignissim. "])
                ]),
                React.createElement('div', {class:'col-6'}, [
                    React.createElement(Counter, {}, [])
                ])
            ]),
        ]);
    }
}

export default About;