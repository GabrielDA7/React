import Component from "../core/Component.js";
import React from "../core/React.js";

class About extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('h1', {}, ["hello world"]);
    }
}

export default About;