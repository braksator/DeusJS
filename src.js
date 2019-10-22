/**
 * DeusJS.
 */
class DeusJS {
	constructor() {
		ObjAssign(this, {c: {}, e: {}, state: {}, h: [], sp: './scr/', cp: './cmp/', Cmp: class {

			constructor() {
				this.state = {}; 
				this.c = [];
            }
            
			set(state) {
				ObjAssign(this.state, state);
				render(this);
            }
            
			use(componentName, props, component) {
				component = this.c.find(y => (componentName == y.n && deepEquals(props, y.p)));
                component = component && component.c;
                
				if (!component) {			
					component = new (require(DeusJS.i().cp + componentName))();
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
    
    go(componentName, props, container = doc.body, attachCallback, component) {
		component = new (require(this.sp + componentName))();
		component.props = props;
		!component.load || component.load();
		this.c[componentName] = component;
        history.pushState('', component.title, componentName);
		this.h.push({s: componentName, p: props, c: container});
		console.log("this.stack is:", this.h);
		render(component);
		attachCallback && attachCallback(component) || (container.innerHTML = ' ', container.append(component.l));
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
        this.e[eventName] = this.e[eventName].filter(x => !deepEquals(x, callback));
        this.e[eventName].length || delete this.e[eventName];
    }

	set(state) {
		ObjAssign(this.state, state);
	}
};

let mapDOM = (element, isSVG, details) => (arrProto.map.call(element.childNodes, (node => {
    details = {
        c: node.childNodes && node.childNodes.length ? null : node.textContent,
        a: node.nodeType != 1 ? [] : arrProto.map.call(node.attributes, attribute => ({a: attribute.n, v: attribute.v})),
        t: node.nodeType == 3 ? 'text' : (node.nodeType == 8 ? 'comment' : node.tagName.toLowerCase()),
        n: node
    };
    details.s = isSVG || details.t == 'svg';
    details.k = mapDOM(node, details.s);
    return details;
}))),

addAttributes = (element, attributes, styleMap, remove, styleArray) => {
    attributes.forEach(attribute => {
        if (attribute.a == 'class')
            element.className = attribute.v;

        else if (attribute.a == 'style') {
            styleMap = attribute.v.split(';').reduce((arr, style) => {
                if (~style.trim().indexOf(':')) {
                    styleArray = style.split(':');
                    arr.push({
                        name: styleArray[0] ? styleArray[0].trim() : '',
                        value: styleArray[1] ? styleArray[1].trim() : ''
                    });
                }
                return arr;
            }, []);

            remove = arrProto.filter.call(
                element.style, style => (
                    !styleMap.find(
                        newStyle => (newStyle.name == style && newStyle.value == element.style[style])
                    )
                )
            );

            remove.forEach(s => element.style[s] = '');
            styleMap.forEach(s => element.style[s.name] = s.value);
        } 
        else
            element.setAttribute(attribute.a, attribute.v || !0);
    });
},

createElement = (element, node) => {
    element.t == 'text' && (node = doc.createTextNode(element.c))
        || element.t == 'comment' && (doc.createComment(element.c))
        || element.s && (doc.createElementNS('http://www.w3.org/2000/svg', element.t))
        || (node = doc.createElement(element.t));

    addAttributes(node, element.a);

    element.k.length && element.k.forEach(childElement => node.appendChild(createElement(childElement)))
        || element.t != 'text' && (node.textContent = element.c);

    return node;
},

diffDOM = (newMap, domMap, element, temp) => {
    console.log("d func");
    for (temp = domMap.length; temp > newMap.length; temp--)
        //y[g].n.parentNode.removeChild(y[g].n);
        element.removeChild(domMap[temp].n);

    newMap.forEach((node, index, details) => {
        details = domMap[index];
        console.log("eaching nodes:", node, index);

        if (!details)
            return element.appendChild(createElement(node));
        if (node.t != details.t)
            return element.replaceChild(createElement(node), details.n);
        addAttributes(details.n, node.a.filter(a => {
            temp = find(details.a, f => (a.a == f.a));
            return !temp || temp.value != a.value;
        }));

        details.a.filter(attribute => (!node.a.find(newAttribute => (attribute.a == newAttribute.a)))).forEach(a => {
            a.a == 'class' && (details.n.className = '')
                || a.a == 'style' && arrProto.slice.call(details.n.style).forEach(s => details.n.style[s] = '')
                || details.n.removeAttribute(a.a);
        });

        console.log("n.c.", node.c, "j.c.", details.c, "j node:" , details.n, 'typeof j.n', typeof details.n, details.n.constructor);
        node.c != details.c && (details.n.textContent = node.c);

        if (/*j.k.length &&*/ !node.k.length)
            details.n.innerHTML = '';
            
        else if (!details.k.length/* && n.k.length*/) {
            temp = doc.createDocumentFragment();
            diffDOM(node.k, details.k, temp);
            element.appendChild(temp);
        }
        else 
            diffDOM(node.k, details.k, details.n);

    });
},

render = (component, element) => {
	component.c.forEach(child => child.r = 0);
    element = domParser.parseFromString(component.html(), 'text/html').body.firstChild;
    //h = n.childNodes.length && div : h.firstChild;

    component.l && diffDOM(mapDOM(element), mapDOM(component.l), component.l.parentNode);
    component.l = element;
	component.r = 1;
	!component.post || component.post();
	component.c = component.c.filter(child => child.r && (!child.unload || child.unload() || 1));
},

deepEquals = (a, b, temp) => (
	a === b || typeof a == "function" && b && a.toString() == b.toString()
        || a && b && typeof a == "object" && a.constructor == b.constructor
        && (temp = ObjKeys(b)) && temp.length == ObjKeys(a).length
        && !temp.find(v => !deepEquals(a[v], b[v]))
),

domParser = new DOMParser(), 
doc = document, 
arrProto = Array.prototype,
ObjAssign = Object.assign,
ObjKeys = Object.keys;

module.exports = {Deus: DeusJS.i()};