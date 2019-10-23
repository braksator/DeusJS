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
            a: (component, element, containerElement) => diffDom(
                mapDom(element, component), 
                mapDom(containerElement), 
                containerElement
            ),
            sp: './scr/', 
            cp: './cmp/', 

            Cmp: class {

                constructor() {
                    this.state = {}; 
                    this.c = [];
                }
                
                set(state) {
                    ObjAssign(this.state, state);
                    render(this);
                }
                
                use(componentName, props, component) {
                    component = this.c.find(cmp => componentName == cmp.n && deepEqual(props, cmp.p));
                    component = component && component.c;
                    
                    if (!component) {			
                        component = new (deusInstance.r[componentName] || typeof componentName != 'string' && componentName || require(deusInstance.cp + componentName))();
                        
                        component.props = props;
                        component.p = this;
                        component.n = componentName;
                        component.i = Math.random() + Date.now();

                        !component.load || component.load();
                        this.c.push(component);
                    }
                    
                    render(component);
                    return `<c- i=${component.i}>`;
                }
            }
        });
    }
    
    static i() {
        return this.j = this.j || new this();
    }
    
    go(componentName, props, containerElement = doc.body, component) {
		component = new (this.r[componentName] || typeof componentName != 'string' && componentName || require(this.sp + componentName))();
        component.props = props;
		!component.load || component.load();
        history.pushState('', component.title, componentName);
		this.h.push({s: componentName, p: props, c: component, e: containerElement});        
		render(component, containerElement);
    }

    back(numSteps) {
        this.h.pop();
        history.go(numSteps || 1 * -1);
    }
    
    on(eventName, callback) {
        (this.e[eventName] || (this.e[eventName] = [])).push(callback);
    }

    once(eventName, callback) {
        this.on(eventName, x => {this.off(eventName, callback); callback(x)});
    }

    emit(eventName, data) {
        this.e[eventName].forEach(callback => callback(data));
    }

    off(eventName, callback) {
        this.e[eventName] = this.e[eventName].filter(x => !deepEqual(x, callback));
        this.e[eventName].length || delete this.e[eventName];
    }

	set(state) {
		ObjAssign(this.state, state);
	}
};

let mapDom = (element, component, isSVG, node) => [...element.children].map(child => {
    node = {
        c: child.children && child.children.length ? null : child.textContent,
        a: child.nodeType != 1 ? [] : [...child.attributes].map(attribute => ({n: attribute.name, v: attribute.value})),
        t: child.nodeType == 3 ? 'text' : (child.nodeType == 8 ? 'comment' : child.tagName.toLowerCase()),
        e: child,
        d: component
    };
    node.s = isSVG || node.t == 'svg';
    node.k = mapDom(child, 0, node.s);
    return node;
}),

addAttributes = (element, attributes, styleMap) => {
    attributes.forEach(attribute => 
        attribute.n == 'class' ? (element.className = attribute.v) : attribute.n == 'style' ? (
            styleMap = attribute.v.split(';').reduce((arr, style) => {
                ~style.trim().indexOf(':') && arr.push(style.split(':'));
                return arr;
            }, []).forEach(style => element.style[style[0]] = style[1]),
            [...element.style].filter(style => !styleMap.find(
                newStyle => newStyle[0] == style && newStyle[1] == element.style[style]
            )).forEach(style => element.style[style] = '')
        ) : element.setAttribute(attribute.n, attribute.v || !0)
    );
},

createElement = (node, element) => {
    if (node.t == 'c-')
        return node.d.c.find(cmp => cmp.i == node.a.find(i => i.n == 'i').v).e;

    node.t == 'text' && (element = doc.createTextNode(node.c))
        || node.t == 'comment' && doc.createComment(node.c)
        || node.s && doc.createElementNS('http://www.w3.org/2000/svg', node.t)
        || (element = doc.createElement(node.t));

    addAttributes(element, node.a);

    node.k.length && node.k.forEach(childNode => element.appendChild(createElement(childNode)))
        || node.t != 'text' && (element.textContent = node.c);

    return element;
},

diffDom = (newMap, containerMap, containerElement, temp) => {
    for (temp = containerMap.length; temp > newMap.length; temp--)
        containerElement.removeChild(containerMap[temp].e);

    newMap.forEach((newNode, index, containerNode) => 
        !(containerNode = containerMap[index]) ? containerElement.appendChild(createElement(newNode)) : newNode.t != containerNode.t ? containerElement.replaceChild(createElement(newNode), containerNode.e) : (
            addAttributes(containerNode.e, newNode.a.filter(domAttribute => {
                temp = find(containerNode.a, newAttribute => (domAttribute.n == newAttribute.n));
                return !temp || temp.v != domAttribute.v;
            })),
    
            containerNode.a.filter(attribute => (!newNode.a.find(newAttribute => (attribute.n == newAttribute.n)))).forEach(a => {
                a.n == 'class' && (containerNode.e.className = '')
                    || a.n == 'style' && [...containerNode.e.style].forEach(s => containerNode.e.style[s] = '')
                    || containerNode.e.removeAttribute(a.n);
            }),
    
            newNode.c != containerNode.c && (containerNode.e.textContent = newNode.c),
            !!(containerNode.k.length ^ newNode.k.length) ? diffDom(newNode.k, containerNode.k, containerNode.e) : containerNode.k.length ? (containerNode.e.innerHTML = '') : (
                temp = doc.createDocumentFragment(),
                diffDom(newNode.k, containerNode.k, temp),
                containerElement.appendChild(temp)
            )
        )
    );
},

render = (component, containerElement, element) => {
    element = domParser.parseFromString(component.html(), 'text/html').body.firstChild;
    component.c.forEach(child => child.r = 1);
    deusInstance.a(component, element, containerElement || doc.createDocumentFragment());
    component.e = element;
	component.r = 0;
    !component.post || component.post();
    component.c = component.c.filter(child => child.r && (!child.unload || child.unload() || 1));
},

deepEqual = (a, b, temp) => (
	a === b || typeof a == "function" && b && a.toString() == b.toString()
        || a && b && typeof a == "object" && a.constructor == b.constructor
        && (temp = ObjKeys(b)) && temp.length == ObjKeys(a).length
        && !temp.find(v => !deepEqual(a[v], b[v]))
),

domParser = new DOMParser(), 
doc = document, 
ObjAssign = Object.assign,
ObjKeys = Object.keys,
deusInstance = DeusJS.i();

module.exports = deusInstance;