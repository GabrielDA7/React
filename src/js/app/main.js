import ReactDom from '../core/ReactDom.js';
import {React, Component} from '../core/React.js';

class Message extends Component {
    render() {
        return (
            React.createElement('div', {}, [
                React.createElement('p', {}, [
                    this.props.text,
                    React.createElement('span', {}, [
                        ' World'
                    ])
                ]),
                React.createElement('button', {
                    onClick: this.props.onButtonClick
                }, [
                    'click me'
                ])
            ])
        );
    }
}

ReactDom.render(
    React.createElement(Message),
    document.getElementById("root")
);