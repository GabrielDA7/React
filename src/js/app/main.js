import ReactDom from '../core/ReactDom.js';
import React from '../core/React.js';

function render(text, container) {
    ReactDom.render(
        React.createElement('div', {}, [

            React.createElement('h1', {}, [
                'First MVR App'
            ]),

            React.createElement('p', {}, [
                text,
                React.createElement('span', {}, [
                    ' World'
                ])
            ]),

            React.createElement('button', {
                onClick: () => {
                    const newText = text === 'Hello' ? 'Goodbye' : 'Hello';
                    render(newText, container);
                }
            }, [
                'click me'
            ])
        ]),
        container
    );
}

window.FirstReactApp = (container) => {
    render('Hello', container);
};

FirstReactApp(document.getElementById("root"));