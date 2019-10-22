function r(c, l) {
	c.c.forEach(v => v.r = 0);
	l = P.parseFromString(c.html(), 'text/html').body.firstChild;
	c.l && d(m(l), m(c.l), c.l.parentElement);
	c.l = l;
	c.r = 1;
	!c.post || c.post();
	c.c = c.c.filter(v => v.r && (!v.unload || v.unload() || 1));
}

function m(l, s, x) {
	return A.map.call(l.childNodes, (n => {
		x = {
			c: n.childNodes && n.childNodes.length > 0 ? null : n.textContent,
			a: n.nodeType != 1 ? [] : A.map.call(n.attributes, a => ({a: a.n, v: a.v})),
			t: n.nodeType == 3 ? 'text' : (n.nodeType == 8 ? 'comment' : n.tagName.toLowerCase()),
			n: n
		};
		x.s = s || x.t == 'svg';
		x.k = m(n, x.s);
		return x;
	}));
}

function b(l, c, x, y, u) {
	c.forEach(a => {
		if (a.a == 'class')
			l.className = a.v;
        else if (a.a == 'style') {
			x = a.v.split(';').reduce((n, s) => {
				if (s.trim().indexOf(':') > 0) {
					u = s.split(':');
					n.push({
						name: u[0] ? u[0].trim() : '',
						value: u[1] ? u[1].trim() : ''
					});
				}
				return n;
			}, []);
			y = A.filter.call(l.style, s => (x.find(n => (n.name == s && n.value == l.style[s])) === U));
			y.forEach(s => l.style[s] = '');
			x.forEach(s => l.style[s.name] = s.value);
        } 
        else
			l.setAttribute(a.a, a.v || !0);
	});
}

function e(l, n) {
	l.t == 'text' && (n = D.createTextNode(l.c))
		|| l.t == 'comment' && (D.createComment(l.c))
		|| l.s && (D.createElementNS('http://www.w3.org/2000/svg', l.t))
		|| (n = D.createElement(l.t));
	b(n, l.a);
	l.k.length > 0 && l.k.forEach(k => n.appendChild(e(k)))
    	|| l.t != 'text' && (n.textContent = l.c);
	return n;
}

function d(x, y, l, g) {
	for (g = y.length; g > x.length; g--)
		y[g].n.parentNode.removeChild(y[g].n);
	x.forEach((n, i) => {
		if (!y[i])
			return l.appendChild(e(x[i]));
		if (x[i].t != y[i].t)
			return y[i].n.parentNode.replaceChild(e(x[i]), y[i].n);
		b(y[i].n, x[i].a.filter(a => {
			g = find(y[i].a, exi => (a.a == exi.a));
			return g === U || g.value != a.value;
		}));
		y[i].a.filter(a => (x[i].a.find(n => (a.a == n.a)) === U)).forEach(a => {
			a.a == 'class' && (y[i].n.className = '')
				|| a.a == 'style' && A.slice.call(y[i].n.style).forEach(s => y[i].n.style[s] = '')
				|| y[i].n.removeAttribute(a.a);
		});
		x[i].c != y[i].c && (y[i].n.textContent = x[i].c);
		if (y[i].k.length > 0 && n.k.length < 1)
			return y[i].n.innerHTML = '';
		if (y[i].k.length < 1 && n.k.length > 0) {
			g = D.createDocumentFragment();
			d(n.k, y[i].k, g);
			return l.appendChild(g);
		}
		n.k.length > 0 && d(n.k, y[i].k, y[i].n);		
	});
}

function q(x, y, z) {
	return x === y || typeof x == "function" && y && x.toString() == y.toString()
      || x && y && typeof x == "object" && x.constructor == y.constructor
      && (z = Object.keys(y)) && z.length == Object.keys(x).length
      && !z.find(v => !q(x[v], y[v]));
}

class I {
    static i() {
        return this.j = this.j || new this();
    }
}

class C extends I {
    sp = './scr/';
	cp = './cmp/';
}

class N extends I {
	c = {};
	s = [];
    go(s, p, c = D.body, f, k) {
        //if (!k) {
			k = new (require(Cfg.sp + s))();
			k.props = p;
			!k.load || k.load();
			this.c[s] = k;
        //}
        history.pushState('', k.title, s);
        this.s.push({s, p, c});
		console.log("this.stack is:", this.s);
		r(k);
		f && f(k) || (c.innerHTML = ' ', c.append(k.l));
    }
    back(n, u) { // num, u
        // @todo unload the current page, and remove it from screens and navStack too.
        if (u) {

            // ?
        }
        this.s.pop();
        history.go(n || 1 * -1);
    }
}

class Cmp {
	state = {};
	c = [];
    setState(state) {
		O.assign(this.state, state);
        r(this);
	}
	use(n, p, c) {
		c = this.c.find(y => (n == y.n && q(p, y.p)));
		c = c && c.c;
		if (!c) {			
			c = new (require(Cfg.cp + n))();
			c.props = p;
			c.p = this;
			!c.load || c.load();
			this.c.push({n, p, c});
		}
		r(c);
		return c.l.innerHTML;
	}
}

class S extends I {
	set(s) {
		O.assign(this, s);
	}
}

class E extends I {
    s = {};
    on(n, c) {
        (this.s[n] || (this.s[n] = [])).push(c);
    }
    once(n, c) {
        this.on(n, () => {this.off(n, c); c()});
    }
    emit(n, x) {
        this.s[n].forEach(c => c(x));
    }
    off(n, c) {
        this.s[n] = this.s[n].filter(x => !q(x, c));
        this.s[n].length || delete this.s[n];
    }
}

let P = new DOMParser(), U, D = document, A = Array.prototype, O = Object, Cfg = C.i();
module.exports = {Cmp, Nav: N.i(), Ev: E.i(), State: S.i(), Cfg};