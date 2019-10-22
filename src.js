r = (c, h, m) => {
    m = (o, p, q) => (A.map.call(o.childNodes, (n => {
        q = {
            c: n.childNodes && n.childNodes.length ? null : n.textContent,
            a: n.nodeType != 1 ? [] : A.map.call(n.attributes, a => ({a: a.n, v: a.v})),
            t: n.nodeType == 3 ? 'text' : (n.nodeType == 8 ? 'comment' : n.tagName.toLowerCase()),
            n: n
        };
        q.s = p || q.t == 'svg';
        q.k = m(n, q.s);
        return q;
    })));
	c.c.forEach(v => v.r = 0);
    h = P.parseFromString(c.html(), 'text/html').body.firstChild;
    d = (x, y, l, g, b, e) => {
        console.log("d func");
        for (g = y.length; g > x.length; g--)
            //y[g].n.parentNode.removeChild(y[g].n);
            l.removeChild(y[g].n);
        b = (o, p, q, f, u) => {
            p.forEach(a => {
                if (a.a == 'class')
                    o.className = a.v;
                else if (a.a == 'style') {
                    q = a.v.split(';').reduce((n, s) => {
                        if (~s.trim().indexOf(':')) {
                            u = s.split(':');
                            n.push({
                                name: u[0] ? u[0].trim() : '',
                                value: u[1] ? u[1].trim() : ''
                            });
                        }
                        return n;
                    }, []);
                    f = A.filter.call(o.style, s => (!q.find(n => (n.name == s && n.value == o.style[s]))));
                    f.forEach(s => o.style[s] = '');
                    q.forEach(s => o.style[s.name] = s.value);
                } 
                else
                    o.setAttribute(a.a, a.v || !0);
            });
        };
        e = (o, p) => {
            o.t == 'text' && (p = D.createTextNode(o.c))
                || o.t == 'comment' && (D.createComment(o.c))
                || o.s && (D.createElementNS('http://www.w3.org/2000/svg', o.t))
                || (p = D.createElement(o.t));
            b(p, o.a);
            o.k.length && o.k.forEach(k => p.appendChild(g(k)))
                || o.t != 'text' && (p.textContent = o.c);
            return p;
        };        
        x.forEach((n, i, j) => {
            j = y[i];
            console.log("eaching nodes:", n, i);
    
            if (!j)
                return l.appendChild(e(n));
            if (n.t != j.t)
                //return j.n.parentNode.replaceChild(g(n), j.n);
                return l.replaceChild(e(n), j.n);
            b(j.n, n.a.filter(a => {
                g = find(j.a, f => (a.a == f.a));
                return !g || g.value != a.value;
            }));
            j.a.filter(a => (!n.a.find(n => (a.a == n.a)))).forEach(a => {
                a.a == 'class' && (j.n.className = '')
                    || a.a == 'style' && A.slice.call(j.n.style).forEach(s => j.n.style[s] = '')
                    || j.n.removeAttribute(a.a);
            });
            console.log("n.c.", n.c, "j.c.", j.c, "j node:" , j.n, 'typeof j.n', typeof j.n, j.n.constructor);
            n.c != j.c && (j.n.textContent = n.c);
            if (/*j.k.length &&*/ !n.k.length)
                j.n.innerHTML = '';
            else if (!j.k.length/* && n.k.length*/) {
                g = D.createDocumentFragment();
                d(n.k, j.k, g);
                l.appendChild(g);
            }
            else 
                d(n.k, j.k, j.n);
        });
    };
    c.l && d(m(h), m(c.l), c.l.parentNode);
    c.l = h;
	c.r = 1;
	!c.post || c.post();
	c.c = c.c.filter(v => v.r && (!v.unload || v.unload() || 1));
};

q = (x, y, z) => {
	return x === y || typeof x == "function" && y && x.toString() == y.toString()
      || x && y && typeof x == "object" && x.constructor == y.constructor
      && (z = Object.keys(y)) && z.length == Object.keys(x).length
      && !z.find(v => !q(x[v], y[v]));
};

class X {
	constructor() {
		O(this, {c: {}, e: {}, state: {}, h: [], sp: './scr/', cp: './cmp/', Cmp: class {
			constructor() {
				this.state = {}; 
				this.c = [];
			}
			set(state) {
				O(this.state, state);
				r(this);
			}
			use(n, p, c) {
				c = this.c.find(y => (n == y.n && q(p, y.p)));
				c = c && c.c;
				if (!c) {			
					c = new (require(X.i().cp + n))();
					c.props = p;
					c.p = this;
					!c.load || c.load();
					this.c.push({n, p, c});
				}
				r(c);
				return c.l.innerHTML;
			}
		}});
	}
    static i() {
        return this.j = this.j || new this();
	}
    go(s, p, c = D.body, f, k) {
		k = new (require(this.sp + s))();
		k.props = p;
		!k.load || k.load();
		this.c[s] = k;
        history.pushState('', k.title, s);
		this.h.push({s, p, c});
		console.log("this.stack is:", this.h);
		r(k);
		f && f(k) || (c.innerHTML = ' ', c.append(k.l));
    }
    back(i, u) { // num, u
        // @todo unload the current page, and remove it from screens and navStack too.
        if (u) {

            // ?
        }
        this.h.pop();
        history.go(i || 1 * -1);
	}
    on(n, c) {
        (this.e[n] || (this.e[n] = [])).push(c);
    }
    once(n, c) {
        this.on(n, x => {this.off(n, c); c(x)});
    }
    emit(n, x) {
        this.e[n].forEach(c => c(x));
    }
    off(n, c) {
        this.e[n] = this.e[n].filter(x => !q(x, c));
        this.e[n].length || delete this.e[n];
    }
	set(s) {
		O(this.state, s);
	}
}

P = new DOMParser(), D = document, A = Array.prototype, O = Object.assign;
module.exports = {Deus: X.i()};

