class t{constructor(){a(this,{c:{},e:{},state:{},h:[],r:{},a:(t,s,n)=>i(e(s,t),e(n),n),sp:"./scr/",cp:"./cmp/",Cmp:class{constructor(){this.state={},this.c=[]}set(t){a(this.state,t),r(this)}use(t,e,s){return(s=(s=this.c.find(s=>t==s.n&&o(e,s.p)))&&s.c)||((s=new(p.r[t]||"string"!=typeof t&&t||require(p.cp+t))).props=e,s.p=this,s.n=t,s.i=Math.random()+Date.now(),!s.load||s.load(),this.c.push(s)),r(s),`<c- i=${s.i}>`}}})}static i(){return this.j=this.j||new this}go(t,e,s=h.body,n){(n=new(this.r[t]||"string"!=typeof t&&t||require(this.sp+t))).props=e,!n.load||n.load(),history.pushState("",n.title,t),this.h.push({s:t,p:e,c:n,e:s}),r(n,s)}back(t){this.h.pop(),history.go(t||-1)}on(t,e){(this.e[t]||(this.e[t]=[])).push(e)}once(t,e){this.on(t,s=>{this.off(t,e),e(s)})}emit(t,e){this.e[t].forEach(t=>t(e))}off(t,e){this.e[t]=this.e[t].filter(t=>!o(t,e)),this.e[t].length||delete this.e[t]}set(t){a(this.state,t)}}let e=(t,s,n,i)=>[...t.children].map(t=>((i={c:t.children&&t.children.length?null:t.textContent,a:1!=t.nodeType?[]:[...t.attributes].map(t=>({n:t.name,v:t.value})),t:3==t.nodeType?"text":8==t.nodeType?"comment":t.tagName.toLowerCase(),e:t,d:s}).s=n||"svg"==i.t,i.k=e(t,0,i.s),i)),s=(t,e,s)=>{e.forEach(e=>"class"==e.n?t.className=e.v:"style"==e.n?(s=e.v.split(";").reduce((t,e)=>(~e.trim().indexOf(":")&&t.push(e.split(":")),t),[]).forEach(e=>t.style[e[0]]=e[1]),[...t.style].filter(e=>!s.find(s=>s[0]==e&&s[1]==t.style[e])).forEach(e=>t.style[e]="")):t.setAttribute(e.n,e.v||!0))},n=(t,e)=>"c-"==t.t?t.d.c.find(e=>e.i==t.a.find(t=>"i"==t.n).v).l:("text"==t.t&&(e=h.createTextNode(t.c))||"comment"==t.t&&h.createComment(t.c)||t.s&&h.createElementNS("http://www.w3.org/2000/svg",t.t)||(e=h.createElement(t.t)),s(e,t.a),t.k.length&&t.k.forEach(t=>e.appendChild(n(t)))||"text"!=t.t&&(e.textContent=t.c),e),i=(t,e,r,o)=>{for(o=e.length;o>t.length;o--)r.removeChild(e[o].e);t.forEach((t,c,a)=>(a=e[c])?t.t!=a.t?r.replaceChild(n(t),a.e):(s(a.e,t.a.filter(t=>!(o=find(a.a,e=>t.n==e.n))||o.v!=t.v)),a.a.filter(e=>!t.a.find(t=>e.n==t.n)).forEach(t=>{"class"==t.n&&(a.e.className="")||"style"==t.n&&[...a.e.style].forEach(t=>a.e.style[t]="")||a.e.removeAttribute(t.n)}),t.c!=a.c&&(a.e.textContent=t.c),a.k.length^t.k.length?i(t.k,a.k,a.e):a.k.length?a.e.innerHTML="":(o=h.createDocumentFragment(),i(t.k,a.k,o),r.appendChild(o))):r.appendChild(n(t)))},r=(t,e,s)=>{s=c.parseFromString(t.html(),"text/html").body.firstChild,t.c.forEach(t=>t.r=1),p.a(t,s,e||h.createDocumentFragment()),t.l=s,t.r=0,!t.post||t.post(),t.c=t.c.filter(t=>t.r&&(!t.unload||t.unload()||1))},o=(t,e,s)=>t===e||"function"==typeof t&&e&&t.toString()==e.toString()||t&&e&&"object"==typeof t&&t.constructor==e.constructor&&(s=l(e))&&s.length==l(t).length&&!s.find(s=>!o(t[s],e[s])),c=new DOMParser,h=document,a=Object.assign,l=Object.keys,p=t.i();module.exports=p;