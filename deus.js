class t{constructor(){h(this,{c:{},e:{},state:{},h:[],sp:"./scr/",cp:"./cmp/",Cmp:class{constructor(){this.state={},this.c=[]}set(t){h(this.state,t),c(this)}use(e,s,n){return(n=(n=this.c.find(t=>e==t.n&&l(s,t.p)))&&n.c)||((n=new(require(t.i().cp+e))).props=s,n.p=this,!n.load||n.load(),this.c.push({n:e,p:s,c:n})),c(n),n.l.innerHTML}}})}static i(){return this.j=this.j||new this}go(t,e,s=i.body,n,o){(o=new(require(this.sp+t))).props=e,!o.load||o.load(),this.c[t]=o,history.pushState("",o.title,t),this.h.push({s:t,p:e,c:s}),console.log("this.stack is:",this.h),c(o),n&&n(o)||(s.innerHTML=" ",s.append(o.l))}back(t){this.h.pop(),history.go(t||-1)}on(t,e){(this.e[t]||(this.e[t]=[])).push(e)}once(t,e){this.on(t,s=>{this.off(t,e),e(s)})}emit(t,e){this.e[t].forEach(t=>t(e))}off(t,e){this.e[t]=this.e[t].filter(t=>!l(t,e)),this.e[t].length||delete this.e[t]}set(t){h(this.state,t)}}let e=(t,s,n)=>r.map.call(t.childNodes,t=>((n={c:t.childNodes&&t.childNodes.length?null:t.textContent,a:1!=t.nodeType?[]:r.map.call(t.attributes,t=>({a:t.n,v:t.v})),t:3==t.nodeType?"text":8==t.nodeType?"comment":t.tagName.toLowerCase(),n:t}).s=s||"svg"==n.t,n.k=e(t,n.s),n)),s=(t,e,s,n,o)=>{e.forEach(e=>{"class"==e.a?t.className=e.v:"style"==e.a?(s=e.v.split(";").reduce((t,e)=>(~e.trim().indexOf(":")&&(o=e.split(":"),t.push({name:o[0]?o[0].trim():"",value:o[1]?o[1].trim():""})),t),[]),r.filter.call(t.style,e=>!s.find(s=>s.name==e&&s.value==t.style[e])).forEach(e=>t.style[e]=""),s.forEach(e=>t.style[e.name]=e.value)):t.setAttribute(e.a,e.v||!0)})},n=(t,e)=>("text"==t.t&&(e=i.createTextNode(t.c))||"comment"==t.t&&i.createComment(t.c)||t.s&&i.createElementNS("http://www.w3.org/2000/svg",t.t)||(e=i.createElement(t.t)),s(e,t.a),t.k.length&&t.k.forEach(t=>e.appendChild(n(t)))||"text"!=t.t&&(e.textContent=t.c),e),o=(t,e,c,l)=>{for(console.log("d func"),l=e.length;l>t.length;l--)c.removeChild(e[l].n);t.forEach((t,a,h)=>(h=e[a],console.log("eaching nodes:",t,a),h?t.t!=h.t?c.replaceChild(n(t),h.n):(s(h.n,t.a.filter(t=>!(l=find(h.a,e=>t.a==e.a))||l.value!=t.value)),h.a.filter(e=>!t.a.find(t=>e.a==t.a)).forEach(t=>{"class"==t.a&&(h.n.className="")||"style"==t.a&&r.slice.call(h.n.style).forEach(t=>h.n.style[t]="")||h.n.removeAttribute(t.a)}),console.log("n.c.",t.c,"j.c.",h.c,"j node:",h.n,"typeof j.n",typeof h.n,h.n.constructor),t.c!=h.c&&(h.n.textContent=t.c),void(t.k.length?h.k.length?o(t.k,h.k,h.n):(l=i.createDocumentFragment(),o(t.k,h.k,l),c.appendChild(l)):h.n.innerHTML="")):c.appendChild(n(t))))},c=(t,s)=>{t.c.forEach(t=>t.r=0),s=a.parseFromString(t.html(),"text/html").body.firstChild,t.l&&o(e(s),e(t.l),t.l.parentNode),t.l=s,t.r=1,!t.post||t.post(),t.c=t.c.filter(t=>t.r&&(!t.unload||t.unload()||1))},l=(t,e,s)=>t===e||"function"==typeof t&&e&&t.toString()==e.toString()||t&&e&&"object"==typeof t&&t.constructor==e.constructor&&(s=p(e))&&s.length==p(t).length&&!s.find(s=>!l(t[s],e[s])),a=new DOMParser,i=document,r=Array.prototype,h=Object.assign,p=Object.keys;module.exports={Deus:t.i()};