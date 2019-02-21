import Component from "../core/Component.js";
import React from "../core/React.js";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('h1', {}, ['Hello home']);
    }
}

export default Home;