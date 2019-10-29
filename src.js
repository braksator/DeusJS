
/**
 * DeusJS
 */

class DeusJS {
    constructor() {
        ObjAssign(this, {
            c: {}, 
            e: {}, 
            state: {}, 
            h: [], 
            r: {}, 
            Cmp: class {
                constructor(t = this) {
                    t.state = {};
                    t.c = [];
                    t.use = (cmp, props, component, t = this) => (
                        (component = t.c.find(cmp => cmp == cmp.n && deepEqual(props, cmp.p))) ? 
                            component = component.c : t.c.push(component = loadComponent(cmp, props, t)),
                        `<c- i=${component.i}>`
                    );
                }

                set(state, t = this) {
                    ObjAssign(t.state, state);
                    render(t, t.e);
                }
                
                $(query, event, func) {
                    this.e.querySelectorAll(query).forEach(element => element.addEventListener(event, func));
                }
            }
        });
    }
    
    go(cmp, props, method, containerElement = doc.body, component) {
        component = loadComponent(cmp, props);
        history.pushState(props, component.title, component.n);
        deusInstance.h.push(component);    
        render(component, containerElement, method);
    }

    back(step = -1, step2 = step) {
        while (step++) 
            deusInstance.h.pop();

        history.go(step2);
    }
    
    on(eventName, callback) {
        (deusInstance.e[eventName] || (deusInstance.e[eventName] = [])).push(callback);
    }

    once(eventName, callback) {
        deusInstance.on(eventName, x => {deusInstance.off(eventName, callback); callback(x)});
    }

    emit(eventName, data) {
        deusInstance.e[eventName].forEach(callback => callback(data));
    }

    off(eventName, callback) {
        deusInstance.e[eventName] = deusInstance.e[eventName].filter(x => !deepEqual(x, callback));
        deusInstance.e[eventName].length || delete deusInstance.e[eventName];
    }

	set(state) {
		ObjAssign(deusInstance.state, state);
	}
};

let mapDom = (element, component, isSvg, node) => [...element.children].map(child => (
    node = {
        c: child.children && child.children.length ? null : child.textContent,
        a: child.nodeType != 1 ? [] : [...child.attributes].map(attribute => ({n: attribute.name, v: attribute.value})),
        t: child.nodeType == 3 ? 'text' : (child.nodeType == 8 ? 'comment' : child.tagName.toLowerCase()),
        e: child,
        d: component
    },
    node.s = isSvg || node.t == 'svg',
    node.k = mapDom(child, component, node.s),
    node
)),

addAttributes = (element, attributes, styleMap) => {
    attributes.forEach(attribute => 
        attribute.n == 'class' ? (element.className = attribute.v) : attribute.n == 'style' ? (

            styleMap = attribute.v.split(';').reduce((arr, style) => (
                ~style.trim().indexOf(':') && arr.push(style.split(':')),
                arr
            ), []),
            styleMap.forEach(style => element.style[style[0]] = style[1]),

            [...element.style].filter(style => !styleMap.find(
                newStyle => newStyle[0] == style && newStyle[1] == element.style[style]
            )).forEach(style => element.style[style] = '')

        ) : attribute.n.substring(0, 2) == "on" ? element.addEventListener(attribute.n.substring(2).toLowerCase(), attribute.v) : 
        element.setAttribute(attribute.n, attribute.v || !0)
    );
},

createElement = (node, parentElement, element, temp) => (
    node.t == 'c-' ? render(node.d.c.find(cmp => cmp.i == node.a[0].v), parentElement) && 0 : (
        node.t == 'text' && (element = doc.createTextNode(node.c))
            || node.t == 'comment' && doc.createComment(node.c)
            || node.s && doc.createElementNS('http://www.w3.org/2000/svg', node.t)
            || (element = doc.createElement(node.t)),

        addAttributes(element, node.a),

        node.k.length ? node.k.forEach((childNode) => (temp = createElement(childNode, element)) && element.append(temp)) : 
            node.t != 'text' && (element.textContent = node.c),

        element
    )
),

diffDom = (component, newMap, containerMap, containerElement, method, temp) => {
    for (temp = containerMap.length - 1; temp >= newMap.length; temp--)
        containerElement.removeChild(containerMap[temp].e);

    newMap.forEach((newNode, index, containerNode) => {
        !(containerNode = containerMap[index]) || method ? (temp = createElement(newNode, containerElement)) && containerElement.append(temp) && 
            method &&
            containerNode.e.setAttribute('class', element.getAttribute('class') + ' rm') && 
            setTimeout(x => containerElement.removeChild(containerNode.e), method) : 
            newNode.t != containerNode.t ? (temp = createElement(newNode, containerElement)) && containerElement.replaceChild(temp, containerNode.e) : (
                addAttributes(containerNode.e, newNode.a.filter(domAttribute => (
                    temp = containerNode.a.find(newAttribute => (domAttribute.n == newAttribute.n)),
                    !temp || temp.v != domAttribute.v
                ))),
        
                containerNode.a.filter(attribute => (!newNode.a.find(newAttribute => (attribute.n == newAttribute.n)))).forEach(a => {
                    a.n == 'class' ? (containerNode.e.className = '') :
                        a.n == 'style' ? [...containerNode.e.style].forEach(s => containerNode.e.style[s] = '') :
                        containerNode.e.removeAttribute(a.n);
                }),

                newNode.c != containerNode.c && (containerNode.e.textContent = newNode.c),

                newNode.k.length ? (
                    !containerNode.k.length ? (
                        temp = document.createDocumentFragment(),
                        diffDom(component, newNode.k, containerNode.k, temp),
                        containerElement.appendChild(temp)
                    ) : diffDom(component, newNode.k, containerNode.k, containerNode.e)
                ) : containerNode.k.length && (containerNode.e.innerHTML = '')

            );
    });
},

render = (component, containerElement, method, element) => {
    element = domParser.parseFromString(component.html(), 'text/html').body;
    component.c.forEach(child => child.r = 1);

    method = method || component.m;
    typeof method == 'function' ? method(element, containerElement, component) : 
        diffDom(component, mapDom(element, component), mapDom(containerElement), containerElement, method);

    ObjAssign(component, {
        e: containerElement,
        r: 0,
        c: component.c.filter(child => child.r && (!child.unload || child.unload() || 1))
    });
    !component.post || component.post();
},

deepEqual = (a, b, temp) => (
    a === b || typeof a == "function" && b && a.toString() == b.toString()
        || a && b && typeof a == "object" && a.constructor == b.constructor
        && (temp = ObjKeys(b)) && temp.length == ObjKeys(a).length
        && !temp.find(v => !deepEqual(a[v], b[v]))
),

loadComponent = (cmp, props, parent, component) => (
    typeof cmp != 'string' ? (component = new (cmp)(), cmp = component.constructor.name) : 
        component = new (deusInstance.r[cmp])(),
    ObjAssign(component, {props: props, p: parent, n: cmp, i: Math.random() + '' + Date.now()}),
    !component.load || component.load(),
    component
),

domParser = new DOMParser(), 
doc = document, 
ObjAssign = Object.assign,
ObjKeys = Object.keys,
deusInstance = new DeusJS();