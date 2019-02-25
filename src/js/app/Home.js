import Component from "../core/Component.js";
import React from "../core/React.js";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div', {class: "container"}, [
            React.createElement('div', {class: "row mt-5"}, [
                React.createElement('div', {class: "jumbotron"}, [
                    React.createElement('h1', {class: "display-4"}, ["Hello, world !"]),
                    React.createElement('p', {class: "lead"}, ["This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."]),
                    React.createElement('hr', {class: "my-4"}),
                    React.createElement('p', {}, ["It uses utility classes for typography and spacing to space content out within the larger container."]),
                ])
            ]),
            React.createElement('div', {class: "row"}, [
                React.createElement('h2', {}, ["My React Framework"])
            ]),
            React.createElement('div', {class: "row"}, [
                React.createElement('div', {class: "col-6"}, [
                    React.createElement('p', {}, [" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed sapien ut ante vestibulum gravida. Curabitur malesuada ligula ornare, gravida tellus ut, gravida felis. Aenean eget eros congue, consectetur nisl et, accumsan est. Aenean tristique urna tortor. Nam sodales tristique ante, ut mollis dui faucibus id. Quisque et magna vitae urna egestas porta vitae a elit. Mauris sit amet gravida justo. Curabitur tempus, dui luctus facilisis pharetra, ligula dui viverra dui, in facilisis quam enim non mi. In urna dolor, auctor at lacus quis, viverra bibendum mauris.\n" +
                    "\n" +
                    "Praesent vulputate eros a urna congue lobortis. Vestibulum sed ornare nulla, sed scelerisque nisl. Mauris hendrerit feugiat imperdiet. Nunc sed lorem quis ipsum aliquet luctus. Vivamus mattis massa eget ante commodo, sit amet rhoncus mauris suscipit. Mauris iaculis justo sem, et vulputate felis porttitor a. In mi leo, consequat nec risus vulputate, accumsan ornare massa. Aliquam in nisi libero. Aliquam eget lectus sapien. Fusce posuere est a urna lacinia tempus. Ut euismod est ac risus rutrum, quis sagittis risus placerat. Donec in sodales leo, in faucibus ipsum. Aenean id massa eu sem volutpat sodales id vitae tellus. Nullam nec libero nec urna tempor blandit. Suspendisse auctor, ipsum ac iaculis consectetur, lorem ipsum volutpat magna, vitae pulvinar nunc mi eget felis. "])
                ]),
                React.createElement('div', {class: "col-6"}, [
                    React.createElement('p', {}, [" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed sapien ut ante vestibulum gravida. Curabitur malesuada ligula ornare, gravida tellus ut, gravida felis. Aenean eget eros congue, consectetur nisl et, accumsan est. Aenean tristique urna tortor. Nam sodales tristique ante, ut mollis dui faucibus id. Quisque et magna vitae urna egestas porta vitae a elit. Mauris sit amet gravida justo. Curabitur tempus, dui luctus facilisis pharetra, ligula dui viverra dui, in facilisis quam enim non mi. In urna dolor, auctor at lacus quis, viverra bibendum mauris.\n" +
                    "\n" +
                    "Praesent vulputate eros a urna congue lobortis. Vestibulum sed ornare nulla, sed scelerisque nisl. Mauris hendrerit feugiat imperdiet. Nunc sed lorem quis ipsum aliquet luctus. Vivamus mattis massa eget ante commodo, sit amet rhoncus mauris suscipit. Mauris iaculis justo sem, et vulputate felis porttitor a. In mi leo, consequat nec risus vulputate, accumsan ornare massa. Aliquam in nisi libero. Aliquam eget lectus sapien. Fusce posuere est a urna lacinia tempus. Ut euismod est ac risus rutrum, quis sagittis risus placerat. Donec in sodales leo, in faucibus ipsum. Aenean id massa eu sem volutpat sodales id vitae tellus. Nullam nec libero nec urna tempor blandit. Suspendisse auctor, ipsum ac iaculis consectetur, lorem ipsum volutpat magna, vitae pulvinar nunc mi eget felis. "])
                ]),
            ]),
        ]);
    }
}

export default Home;