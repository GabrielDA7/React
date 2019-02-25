import Component from "../core/Component.js";
import React from "../core/React.js";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.value < 4) {
            return true;
        } else {
            return false;
        }
    }

    onPlusClick() {
        this.setState({value: this.state.value + 1});
    }

    onMinusClick() {
        this.setState({value: this.state.value - 1});
    }

    render() {
        return React.createElement('div', {class: "card"}, [
            React.createElement('div', {class: "card-body"}, [
                React.createElement('h5', {class: "card-title"}, ["Counter"]),
                React.createElement('h6', {class: "card-subtitle mb-2 text-muted"}, ["Card subtitle"]),
                React.createElement('div', {}, [
                    React.createElement('div', {class: "row"}, [
                        React.createElement('span', {class: "mx-auto display-4"}, [`${this.state.value}`])
                    ]),
                    React.createElement('div', {class: "row mx-auto mb-2"}, [
                        React.createElement('button', {onClick: this.onPlusClick.bind(this), class: "btn btn-dark btn-lg btn-block"}, ['+']),
                        React.createElement('button', {onClick: this.onMinusClick.bind(this), class: "btn btn-dark btn-lg btn-block"}, ['-']),
                    ])
                ]),
                React.createElement('p', {class: "card-text"}, ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at lacinia ipsum. Sed blandit enim at vehicula porta. Praesent pretium ligula ut rutrum blandit. Etiam at aliquam justo."]),
                //React.createElement('h2', {}, [`${this.props.name}`]),
            ])
        ]);
    }
}


export default Counter;