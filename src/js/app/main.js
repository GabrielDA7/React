import ReactDom from '../core/ReactDom.js';
import React from '../core/React.js';
import Component from '../core/Component.js';

let my = function(props) {
    return React.createElement('div', {}, [
        React.createElement(Counter, {name: `${props.name}`}, [])
    ])
};


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {name: 'Gab'}
    }

    handleMouseClick() {
        alert('oui');
    }

    render() {
        return (
            React.createElement('div', {class: "test"}, [
                React.createElement(Counter, {name: `${this.state.name}`}, []),
                React.createElement(Counter, {name: `${this.state.name}`}, []),
                //React.createElement(my, {name: `${this.state.name}`}, [])
            ])
        );
    }
}

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
        return React.createElement('div', {class: "test", id: "testz"}, [
            React.createElement('p', {}, [`${this.props.name}`]),
            React.createElement('div', {}, ['Compteur']),
            React.createElement('div', {}, [`${this.state.value}`]),
            React.createElement('button', {onClick: this.onPlusClick.bind(this)}, ['+']),
            React.createElement('button', {onClick: this.onMinusClick.bind(this)}, ['-']),
        ]);
    }
}

Message.propTypes = {
    name: {type: "array", required: true},
    text: {type: "text", required: true}
};

ReactDom.render(React.createElement(Message, {text: 'coucou', name: 'Gab'}, []), document.getElementById("root"));
