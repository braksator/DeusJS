/**
 * DeusJS
 */

class DeusJS {
	constructor() {
		ObjAssign(this, {c: {}, e: {}, state: {}, h: [], r: {}, sp: './scr/', cp: './cmp/', Cmp: class {

			constructor() {
				this.state = {}; 
				this.c = [];
            }
            
			set(state) {
				ObjAssign(this.state, state);
				render(this);
            }
            
			use(componentName, props, component) {
				component = this.c.find(y => componentName == y.n && deepEqual(props, y.p));
                component = component && component.c;
                
				if (!component) {			
					component = new (deusInstance.r[componentName] || require(deusInstance.cp + componentName))();
					component.props = props;
					component.p = this;
					!component.load || component.load();
					this.c.push({n: componentName, p: props, c: component});
                }
                
				render(component);
				return component.l.innerHTML;
            }
            
		}});
    }
    
    static i() {
        return this.j = this.j || new this();
    }
    
    go(componentName, props, element = doc.body, attachCallback, component) {
		component = new (this.r[componentName] || require(this.sp + componentName))();
		component.props = props;
		!component.load || component.load();
        history.pushState('', component.title, componentName);
		this.h.push({s: componentName, p: props, c: component, e: element});        
		render(component);
		attachCallback && attachCallback(component) || (element.innerHTML = ' ', element.append(component.l));
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

let mapDom = (element, isSVG, domItem) => [...element.children].map(child => {
    domItem = {
        c: child.children && child.children.length ? null : child.textContent,
        a: child.nodeType != 1 ? [] : [...child.attributes].map(attribute => ({n: attribute.name, v: attribute.value})),
        t: child.nodeType == 3 ? 'text' : (child.nodeType == 8 ? 'comment' : child.tagName.toLowerCase()),
        e: child
    };
    domItem.s = isSVG || domItem.t == 'svg';
    domItem.k = mapDom(child, domItem.s);
    return domItem;
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

createElement = (domItem, element) => {
    domItem.t == 'text' && (element = doc.createTextNode(domItem.c))
        || domItem.t == 'comment' && doc.createComment(domItem.c)
        || domItem.s && doc.createElementNS('http://www.w3.org/2000/svg', domItem.t)
        || (element = doc.createElement(domItem.t));

    addAttributes(element, domItem.a);

    domItem.k.length && domItem.k.forEach(childItem => element.appendChild(createElement(childItem)))
        || domItem.t != 'text' && (element.textContent = domItem.c);

    return element;
},

diffDom = (newMap, domMap, element, temp) => {
    console.log("d func");
    for (temp = domMap.length; temp > newMap.length; temp--)
        element.removeChild(domMap[temp].e);

    newMap.forEach((newItem, index, domItem) => 
        !(domItem = domMap[index]) ? element.appendChild(createElement(newItem)) : newItem.t != domItem.t ? element.replaceChild(createElement(newItem), domItem.e) : (
            addAttributes(domItem.e, newItem.a.filter(domAttribute => {
                temp = find(domItem.a, newAttribute => (domAttribute.n == newAttribute.n));
                return !temp || temp.v != domAttribute.v;
            })),
    
            domItem.a.filter(attribute => (!newItem.a.find(newAttribute => (attribute.n == newAttribute.n)))).forEach(a => {
                a.n == 'class' && (domItem.e.className = '')
                    || a.n == 'style' && [...domItem.e.style].forEach(s => domItem.e.style[s] = '')
                    || domItem.e.removeAttribute(a.n);
            }),
    
            console.log("newItem", newItem, "domItem.", domItem),
            newItem.c != domItem.c && (domItem.e.textContent = newItem.c),

            !!(domItem.k.length ^ newItem.k.length) ? diffDom(newItem.k, domItem.k, domItem.e) : domItem.k.length ? (domItem.e.innerHTML = '') : (
                temp = doc.createDocumentFragment(),
                diffDom(newItem.k, domItem.k, temp),
                element.appendChild(temp)
            )
        )
    );
},

render = (component, element) => {
	component.c.forEach(child => child.r = 1);
    element = domParser.parseFromString(component.html(), 'text/html').body.firstChild;
    component.l && diffDom(mapDom(element), mapDom(component.l), component.l.parentNode);
    component.l = element;
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