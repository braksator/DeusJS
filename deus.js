r=(t,e,s)=>{s=(t,e,n)=>A.map.call(t.childNodes,t=>((n={c:t.childNodes&&t.childNodes.length?null:t.textContent,a:1!=t.nodeType?[]:A.map.call(t.attributes,t=>({a:t.n,v:t.v})),t:3==t.nodeType?"text":8==t.nodeType?"comment":t.tagName.toLowerCase(),n:t}).s=e||"svg"==n.t,n.k=s(t,n.s),n)),t.c.forEach(t=>t.r=0),e=P.parseFromString(t.html(),"text/html").body.firstChild,d=(t,e,s,n,o,c)=>{for(console.log("d func"),n=e.length;n>t.length;n--)s.removeChild(e[n].n);o=(t,e,s,n,o)=>{e.forEach(e=>{"class"==e.a?t.className=e.v:"style"==e.a?(s=e.v.split(";").reduce((t,e)=>(~e.trim().indexOf(":")&&(o=e.split(":"),t.push({name:o[0]?o[0].trim():"",value:o[1]?o[1].trim():""})),t),[]),A.filter.call(t.style,e=>!s.find(s=>s.name==e&&s.value==t.style[e])).forEach(e=>t.style[e]=""),s.forEach(e=>t.style[e.name]=e.value)):t.setAttribute(e.a,e.v||!0)})},c=(t,e)=>("text"==t.t&&(e=D.createTextNode(t.c))||"comment"==t.t&&D.createComment(t.c)||t.s&&D.createElementNS("http://www.w3.org/2000/svg",t.t)||(e=D.createElement(t.t)),o(e,t.a),t.k.length&&t.k.forEach(t=>e.appendChild(n(t)))||"text"!=t.t&&(e.textContent=t.c),e),t.forEach((t,a,l)=>(l=e[a],console.log("eaching nodes:",t,a),l?t.t!=l.t?s.replaceChild(c(t),l.n):(o(l.n,t.a.filter(t=>!(n=find(l.a,e=>t.a==e.a))||n.value!=t.value)),l.a.filter(e=>!t.a.find(t=>e.a==t.a)).forEach(t=>{"class"==t.a&&(l.n.className="")||"style"==t.a&&A.slice.call(l.n.style).forEach(t=>l.n.style[t]="")||l.n.removeAttribute(t.a)}),console.log("n.c.",t.c,"j.c.",l.c,"j node:",l.n,"typeof j.n",typeof l.n,l.n.constructor),t.c!=l.c&&(l.n.textContent=t.c),void(t.k.length?l.k.length?d(t.k,l.k,l.n):(n=D.createDocumentFragment(),d(t.k,l.k,n),s.appendChild(n)):l.n.innerHTML="")):s.appendChild(c(t))))},t.l&&d(s(e),s(t.l),t.l.parentNode),t.l=e,t.r=1,!t.post||t.post(),t.c=t.c.filter(t=>t.r&&(!t.unload||t.unload()||1))},q=(t,e,s)=>t===e||"function"==typeof t&&e&&t.toString()==e.toString()||t&&e&&"object"==typeof t&&t.constructor==e.constructor&&(s=Object.keys(e))&&s.length==Object.keys(t).length&&!s.find(s=>!q(t[s],e[s]));class t{constructor(){O(this,{c:{},e:{},state:{},h:[],sp:"./scr/",cp:"./cmp/",Cmp:class{constructor(){this.state={},this.c=[]}set(t){O(this.state,t),render(this)}use(e,s,n){return(n=(n=this.c.find(t=>e==t.n&&q(s,t.p)))&&n.c)||((n=new(require(t.i().cp+e))).props=s,n.p=this,!n.load||n.load(),this.c.push({n:e,p:s,c:n})),render(n),n.l.innerHTML}}})}static i(){return this.j=this.j||new this}go(t,e,s=D.body,n,o){(o=new(require(this.sp+t))).props=e,!o.load||o.load(),this.c[t]=o,history.pushState("",o.title,t),this.h.push({s:t,p:e,c:s}),console.log("this.stack is:",this.h),render(o),n&&n(o)||(s.innerHTML=" ",s.append(o.l))}back(t,e){this.h.pop(),history.go(t||-1)}on(t,e){(this.e[t]||(this.e[t]=[])).push(e)}once(t,e){this.on(t,s=>{this.off(t,e),e(s)})}emit(t,e){this.e[t].forEach(t=>t(e))}off(t,e){this.e[t]=this.e[t].filter(t=>!q(t,e)),this.e[t].length||delete this.e[t]}set(t){O(this.state,t)}}P=new DOMParser,D=document,A=Array.prototype,O=Object.assign,module.exports={Deus:t.i()};