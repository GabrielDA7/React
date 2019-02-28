import PropTypesUtils from "./utils/PropTypesUtils.js";
import Route from "./router/Route.js";
import {mainVirtualElementContainer} from "./utils/ReactDomUtils.js";

const Reconciler = {
    diff: (virtualElement, container, oldDomElement, parentComponent) => {
        const oldVirtualElement = oldDomElement && oldDomElement._virtualElement;
        const oldComponent = oldVirtualElement && oldVirtualElement.component;

        // Si component
        if (PropTypesUtils.isFunction(virtualElement.type)) {
            Reconciler.diffComponent(virtualElement, oldComponent, container, oldDomElement, parentComponent);
        } else if (oldVirtualElement && oldVirtualElement.type === virtualElement.type && oldComponent === virtualElement.component) {
            // Si dom element ou text element
            if (oldVirtualElement.type === 'text') {
                Reconciler.updateTextNode(oldDomElement, virtualElement, oldVirtualElement);
            } else {
                Reconciler.updateDomElement(oldDomElement, virtualElement, oldVirtualElement);
            }

            // sauvegarde le virtuel element
            oldDomElement._virtualElement = virtualElement;
            // Compare les enfants
            virtualElement.children.forEach((childElement, i) => {
                Reconciler.diff(childElement, oldDomElement, oldDomElement.childNodes[i]);
            });

            // Supprime les enfants en trop
            const oldChildren = oldDomElement.childNodes;
            if (oldChildren.length > virtualElement.children.length) {

                for (let i = oldChildren.length - 1; i >= virtualElement.children.length; i -= 1) {
                    oldChildren[i].remove();
                }
            }
        } else {
            // Monter dom element ou text element pour la premiere fois
            Reconciler.mountSimpleNode(virtualElement, container, oldDomElement, parentComponent);
        }
    },

    diffComponent: (newVirtualElement, oldComponent, container, domElement, parentComponent) => {
        if (oldComponent && newVirtualElement.type === oldComponent.constructor) {
            // Si le nouveau component est equivalent à l'ancien

            //cycle de vie
            oldComponent.componentWillReceiveProps(newVirtualElement.props);

            if (oldComponent.shouldComponentUpdate(newVirtualElement.props)) {

                const prevProps = oldComponent.props;

                //cycle de vie
                oldComponent.componentWillUpdate(newVirtualElement.props, oldComponent.state);

                // maj prop component
                oldComponent.updateProps(newVirtualElement.props);

                const nextElement = oldComponent.render();

                nextElement.component = parentComponent || oldComponent;

                const childComponent = oldComponent.getChild();

                // si enfant on boucle jusqu'a tombé sur un composant sans enfant
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

                // cycle vie
                oldComponent.componentDidUpdate(prevProps);
            }
        } else {
            // si différent de l'ancien component on unmount
            let component = oldComponent;
            while (component) {
                component.componentWillUnmount();
                component._didUnmount = true;
                component.setDomElement(null);
                component = component.getChild();
            }
            // et on monte le nouveau
            Reconciler.mountElement(newVirtualElement, container, domElement, parentComponent);
        }
    },

    unmountNode: (domElement, parentComponent) => {
        const virtualElement = domElement._virtualElement;
        if (!virtualElement) {
            if(domElement === mainVirtualElementContainer) {
                while (domElement.firstChild) {
                    domElement.removeChild(domElement.firstChild);
                }
            } else {
                // si pas de vituel element on remove
                domElement.remove();
            }
            return;
        }


        if (!parentComponent) {
            let component = virtualElement.component;
            while (component && !component._didUnmount) {
                component.componentWillUnmount();
                component.setDomElement(undefined);
                component = component.getChild();
            }
        }

        while (domElement.childNodes.length > 0) {
            Reconciler.unmountNode(domElement.firstChild);
        }


        Object.keys(virtualElement.props).forEach((propName) => {
            if (propName.slice(0, 2) === 'on') {
                const event = propName.toLowerCase().slice(2);
                const handler = virtualElement.props[propName];
                domElement.removeEventListener(event, handler);
            }
        });

        domElement.remove();
    },

    updateTextNode: (domElement, newVirtualElement, oldVirtualElement) => {
        if (newVirtualElement.props.textContent !== oldVirtualElement.props.textContent) {
            domElement.textContent = newVirtualElement.props.textContent;
        }

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
                    const eventName = propName.toLowerCase().slice(2);
                    domElement.addEventListener(eventName, newProp, false);
                    if (oldProp) {
                        domElement.removeEventListener(eventName, oldProp, false);
                    }
                } else if (propName === 'value' || propName === 'checked') {
                    domElement[propName] = newProp;
                } else if (propName !== 'children') { // ignore the 'children' prop
                    domElement.setAttribute(propName, newProps[propName]);
                }
            }
        });

        Object.keys(oldProps).forEach((propName) => {
            const newProp = newProps[propName];
            const oldProp = oldProps[propName];

            if (!newProp) {
                if (propName.slice(0, 2) === 'on') {
                    domElement.removeEventListener(propName, oldProp, false);
                } else if (propName !== 'children') { // ignore the 'children' prop
                    domElement.removeAttribute(propName);
                }
            }
        });
    },

    mountComponent: (virtualElement, container, oldDomElement, parentComponent) => {
        const component = new virtualElement.type(virtualElement.props);
        component.setStateCallback(Reconciler.handleComponentStateChange);

        // render le component
        const nextElement = component.render();

        if (parentComponent) {
            // affecte parent et enfant
            const root = parentComponent.getRoot();
            nextElement.component = root;
            parentComponent.setChild(component);
        } else {
            // sauvegarde le component
            nextElement.component = component;
        }

        // cycle de vie
        component.componentWillMount();

        // si render return un component on boucle
        if (typeof nextElement.type === 'function') {
            if(nextElement.component instanceof Route) {
                if(nextElement.props.match.isExact) {
                    Reconciler.mountComponent(nextElement, container, oldDomElement, component, parentComponent);
                }
            } else {
                Reconciler.mountComponent(nextElement, container, oldDomElement, component, parentComponent);
            }
        } else {
            // si render return un dom ou text element
            Reconciler.mountElement(nextElement, container, oldDomElement, parentComponent);
        }

        // cycle de vie
        component.componentDidMount();
    },

    handleComponentStateChange(component, nextState) {
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
                Reconciler.diffComponent(
                    nextElement,
                    childComponent,
                    container,
                    domElement,
                    component
                );
            } else {
                Reconciler.diff(nextElement, container, domElement, component);
            }


            component.componentDidUpdate(component.props, prevState);
        }
    },

    mountSimpleNode: (virtualElement, container, oldDomElement, parentComponent) => {
        let newDomElement;
        const nextSibling = oldDomElement && oldDomElement.nextSibling;

        if (virtualElement.type === 'text') {
            newDomElement = document.createTextNode(virtualElement.props.textContent);
        } else {
            newDomElement = document.createElement(virtualElement.type);
            // set dom-node attributes
            Reconciler.updateDomElement(newDomElement, virtualElement);
        }

        // sauvegarder le virtualElement au niveau du dom element
        newDomElement._virtualElement = virtualElement;

        // remove the old node from the dom if one exists
        if (oldDomElement) {
            Reconciler.unmountNode(oldDomElement, parentComponent);
        }

        // add the newly created node to the dom

        if (nextSibling) {
            container.insertBefore(newDomElement, nextSibling);
        } else {
            container.appendChild(newDomElement);
        }

        // recursively call mountElement with all child virtualElements
        virtualElement.children.forEach((childElement) => {
            Reconciler.mountElement(childElement, newDomElement);
        });


        // add reference to domElement into component
        let component = virtualElement.component;
        while (component) {
            component.setDomElement(newDomElement);
            component = component.getChild();
        }
    },

    mountElement: (virtualElement, container, oldDomElement, parentComponent) => {
        if (PropTypesUtils.isFunction(virtualElement.type)) {
            // monte component
            Reconciler.mountComponent(virtualElement, container, oldDomElement, parentComponent);
        } else {
            // mon dom ou text element
            Reconciler.mountSimpleNode(virtualElement, container, oldDomElement, parentComponent);
        }
    }
};

export default Reconciler;