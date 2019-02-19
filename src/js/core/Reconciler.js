const Reconciler = {
    diff: (virtualElement, container, oldDomElement, parentComponent) => {
        const oldVirtualElement = oldDomElement && oldDomElement._virtualElement;
        const oldComponent = oldVirtualElement && oldVirtualElement.component;
        if (typeof virtualElement.type === 'function') {
            Reconciler.diffComponent(virtualElement, container, oldComponent, oldDomElement, parentComponent);
        } else if (oldVirtualElement && oldVirtualElement.type === virtualElement.type) {
            if (oldVirtualElement.type === 'text') {
                Reconciler.updateTextNode(oldDomElement, virtualElement, oldVirtualElement);
            } else {
                Reconciler.updateDomElement(oldDomElement, virtualElement, oldVirtualElement);
            }
            // save the virtualElement on the domElement
            // so that we can retrieve it next time
            oldDomElement._virtualElement = virtualElement;
            virtualElement.children.forEach((childElement, i) => {
                Reconciler.diff(childElement, oldDomElement, oldDomElement.childNodes[i]);
            });
            // remove extra children
            const oldChildren = oldDomElement.childNodes;
            if (oldChildren.length > virtualElement.children.length) {
                for (let i = oldChildren.length - 1; i >= virtualElement.children.length; i -= 1) {
                    oldChildren[i].remove();
                }
            }
        } else {
            Reconciler.mountElement(virtualElement, container, oldDomElement);
        }
    },

    mountElement: (element, container, oldDomNode, parentComponent) => {
        if (typeof element.type === 'function') {
            Reconciler.mountComponent(element, container, oldDomNode, parentComponent);
        } else {
            Reconciler.mountSimpleNode(element, container, oldDomNode);
        }
    },

    mountComponent: (virtualElement, container, oldDomElement, parentComponent) => {
        const component = new virtualElement.type(virtualElement.props);
        component.setStateCallback(Reconciler.handleComponentStateChange);
        const nextElement = component.render();
        if (parentComponent) {
            const root = parentComponent.getRoot();
            nextElement.component = root;
            parentComponent.setChild(component);
        } else {
            nextElement.component = component;
        }
        if (typeof nextElement.type === 'function') {
            Reconciler.mountComponent(nextElement, container, oldDomElement, component);
        } else {
            Reconciler.diff(nextElement, container, oldDomElement);
        }
    },

    mountSimpleNode: (virtualElement, container, oldDomElement) => {
        let newDomElement;
        const nextSibling = oldDomElement && oldDomElement.nextSibling;
        if (virtualElement.type === 'text') {
            newDomElement = document.createTextNode(virtualElement.props.textContent);
        } else {
            newDomElement = document.createElement(virtualElement.type);
            // set dom-node attributes
            Reconciler.updateDomElement(newDomElement, virtualElement);
        }
        // save the element on the domElement
        // so that we can retrieve it next time
        newDomElement._virtualElement = virtualElement;
        // remove the old node from the dom if one exists
        if (oldDomElement) {
            oldDomElement.remove();
        }
        // add the newly created node to the dom
        if (nextSibling) {
            container.insertBefore(newDomElement, nextSibling);
        } else {
            container.appendChild(newDomElement);
        }

        // add reference to domElement into Component
        let component = virtualElement.component;
        while (component) {
            component.setDomElement(newDomElement);
            component = component.getChild();
        }

        // recursively call mountElement with all child elements
        virtualElement.children.forEach((childElement) => {
            Reconciler.mountElement(childElement, newDomElement);
        });
    },

    updateTextNode: (domElement, newVirtualElement, oldVirtualElement) => {
        if (newVirtualElement.props.textContent !== oldVirtualElement.props.textContent) {
            domElement.textContent = newVirtualElement.props.textContent;
        }
        // save a reference to the virtual element into the domElement
        // so that we can retrieve it the next time
        domElement._virtualElement = newVirtualElement;
    },

    updateDomElement: (domElement, newVirtualElement, oldVirtualElement = {}) => {
        const newProps = newVirtualElement.props;
        const oldProps = oldVirtualElement.props || {};
        Object.keys(newProps).forEach((propName) => {
            const newProp = newProps[propName];
            const oldProp = oldProps[propName];
            if (newProp !== oldProp) {
                if (propName.slice(0, 2) === 'on') {
                    // prop is an event handler
                    const eventName = propName.toLowerCase().slice(2);
                    domElement.addEventListener(eventName, newProp, false);
                    if (oldProp) {
                        domElement.removeEventListener(eventName, oldProp, false);
                    }
                } else if (propName === 'value' || propName === 'checked') {
                    // this are special attributes that cannot be set
                    // using setAttribute
                    domElement[propName] = newProp;
                } else if (propName !== 'children') { // ignore the 'children' prop
                    domElement.setAttribute(propName, newProps[propName]);
                }
            }
        });
        // remove oldProps
        Object.keys(oldProps).forEach((propName) => {
            const newProp = newProps[propName];
            const oldProp = oldProps[propName];
            if (!newProp) {
                if (propName.slice(0, 2) === 'on') {
                    // prop is an event handler
                    domElement.removeEventListener(propName, oldProp, false);
                } else if (propName !== 'children') { // ignore the 'children' prop
                    domElement.removeAttribute(propName);
                }
            }
        });
    },

    diffComponent: (newVirtualElement, container, oldComponent, domElement, parentComponent) => {
        if (oldComponent && newVirtualElement.type === oldComponent.constructor) {
            // update component
            oldComponent.updateProps(newVirtualElement.props);
            const nextElement = oldComponent.render();
            nextElement.component = parentComponent || oldComponent;
            const childComponent = oldComponent.getChild();
            if (childComponent) {
                Reconciler.diffComponent(
                    nextElement,
                    childComponent,
                    container,
                    domElement,
                    oldComponent
                );
            } else {
                Reconciler.diff(nextElement, container, domElement, oldComponent);
            }
        } else {
            Reconciler.mountElement(newVirtualElement, container, domElement, parentComponent);
        }
    },

    handleComponentStateChange: (component, nextState) => {
        const prevState = component.state;
        if (component.shouldComponentUpdate(component.props, nextState)) {
            component.componentWillUpdate(component.props, nextState);
            component.updateState(nextState);

            const nextElement = component.render();
            nextElement.component = component.getRoot();
            const domElement = component.getDomElement();
            const container = domElement.parentNode;
            const childComponent = component.getChild();

            if (childComponent) {
                Reconciler.diffComponent(nextElement, childComponent, container, domElement, component);
            } else {
                Reconciler.diff(nextElement, container, domElement, component);
            }

            // finally we call componentDidUpdate
            component.componentDidUpdate(component.props, prevState);
        }
    }

};

export default Reconciler;