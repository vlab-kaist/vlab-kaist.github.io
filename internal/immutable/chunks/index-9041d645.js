function E(){}const ht=t=>t;function U(t,e){for(const n in e)t[n]=e[n];return t}function W(t){return t()}function M(){return Object.create(null)}function y(t){t.forEach(W)}function V(t){return typeof t=="function"}function pt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let b;function yt(t,e){return b||(b=document.createElement("a")),b.href=e,t===b.href}function X(t){return Object.keys(t).length===0}function Y(t,...e){if(t==null)return E;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function gt(t,e,n){t.$$.on_destroy.push(Y(e,n))}function bt(t,e,n,i){if(t){const r=B(t,e,n,i);return t[0](r)}}function B(t,e,n,i){return t[1]&&i?U(n.ctx.slice(),t[1](i(e))):n.ctx}function xt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],o=Math.max(e.dirty.length,r.length);for(let l=0;l<o;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function wt(t,e,n,i,r,u){if(r){const o=B(e,n,i,u);t.p(o,r)}}function vt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function $t(t,e,n){return t.set(n),e}const D=typeof window<"u";let Et=D?()=>window.performance.now():()=>Date.now(),O=D?t=>requestAnimationFrame(t):E;const _=new Set;function F(t){_.forEach(e=>{e.c(t)||(_.delete(e),e.f())}),_.size!==0&&O(F)}function At(t){let e;return _.size===0&&O(F),{promise:new Promise(n=>{_.add(e={c:t,f:n})}),abort(){_.delete(e)}}}let A=!1;function Z(){A=!0}function tt(){A=!1}function et(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function nt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let c=0;c<e.length;c++){const f=e[c];f.claim_order!==void 0&&s.push(f)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const c=e[s].claim_order,f=(r>0&&e[n[r]].claim_order<=c?r+1:et(1,r,g=>e[n[g]].claim_order,c))-1;i[s]=n[f]+1;const a=f+1;n[a]=s,r=Math.max(a,r)}const u=[],o=[];let l=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(u.push(e[s-1]);l>=s;l--)o.push(e[l]);l--}for(;l>=0;l--)o.push(e[l]);u.reverse(),o.sort((s,c)=>s.claim_order-c.claim_order);for(let s=0,c=0;s<o.length;s++){for(;c<u.length&&o[s].claim_order>=u[c].claim_order;)c++;const f=c<u.length?u[c]:null;t.insertBefore(o[s],f)}}function it(t,e){t.appendChild(e)}function rt(t,e){if(A){for(nt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function St(t,e,n){A&&!n?rt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function I(t){t.parentNode.removeChild(t)}function H(t){return document.createElement(t)}function ot(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function Nt(){return k(" ")}function jt(){return k("")}function L(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function st(t){return Array.from(t.childNodes)}function ct(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function G(t,e,n,i,r=!1){ct(t);const u=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const l=t[o];if(e(l)){const s=n(l);return s===void 0?t.splice(o,1):t[o]=s,r||(t.claim_info.last_index=o),l}}for(let o=t.claim_info.last_index-1;o>=0;o--){const l=t[o];if(e(l)){const s=n(l);return s===void 0?t.splice(o,1):t[o]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function J(t,e,n,i){return G(t,r=>r.nodeName===e,r=>{const u=[];for(let o=0;o<r.attributes.length;o++){const l=r.attributes[o];n[l.name]||u.push(l.name)}u.forEach(o=>r.removeAttribute(o))},()=>i(e))}function zt(t,e,n){return J(t,e,n,H)}function Ct(t,e,n){return J(t,e,n,ot)}function lt(t,e){return G(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>k(e),!0)}function qt(t){return lt(t," ")}function Mt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Lt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let x;function ut(){if(x===void 0){x=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{x=!0}}return x}function Pt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=H("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=ut();let u;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",u=L(window,"message",o=>{o.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{u=L(i.contentWindow,"resize",e)}),it(t,i),()=>{(r||u&&i.contentWindow)&&u(),I(i)}}function Tt(t,e,n){t.classList[n?"add":"remove"](e)}function Wt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let p;function h(t){p=t}function z(){if(!p)throw new Error("Function called outside component initialization");return p}function Bt(t){z().$$.on_mount.push(t)}function Dt(t){z().$$.after_update.push(t)}function Ot(t){z().$$.on_destroy.push(t)}const m=[],P=[],v=[],T=[],K=Promise.resolve();let N=!1;function Q(){N||(N=!0,K.then(R))}function Ft(){return Q(),K}function j(t){v.push(t)}const S=new Set;let w=0;function R(){const t=p;do{for(;w<m.length;){const e=m[w];w++,h(e),at(e.$$)}for(h(null),m.length=0,w=0;P.length;)P.pop()();for(let e=0;e<v.length;e+=1){const n=v[e];S.has(n)||(S.add(n),n())}v.length=0}while(m.length);for(;T.length;)T.pop()();N=!1,S.clear(),h(t)}function at(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const $=new Set;let d;function It(){d={r:0,c:[],p:d}}function Ht(){d.r||y(d.c),d=d.p}function ft(t,e){t&&t.i&&($.delete(t),t.i(e))}function Gt(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Jt(t){t&&t.c()}function Kt(t,e){t&&t.l(e)}function dt(t,e,n,i){const{fragment:r,on_mount:u,on_destroy:o,after_update:l}=t.$$;r&&r.m(e,n),i||j(()=>{const s=u.map(W).filter(V);o?o.push(...s):y(s),t.$$.on_mount=[]}),l.forEach(j)}function _t(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function mt(t,e){t.$$.dirty[0]===-1&&(m.push(t),Q(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Qt(t,e,n,i,r,u,o,l=[-1]){const s=p;h(t);const c=t.$$={fragment:null,ctx:null,props:u,update:E,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:M(),dirty:l,skip_bound:!1,root:e.target||s.$$.root};o&&o(c.root);let f=!1;if(c.ctx=n?n(t,e.props||{},(a,g,...C)=>{const q=C.length?C[0]:g;return c.ctx&&r(c.ctx[a],c.ctx[a]=q)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](q),f&&mt(t,a)),g}):[],c.update(),f=!0,y(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){Z();const a=st(e.target);c.fragment&&c.fragment.l(a),a.forEach(I)}else c.fragment&&c.fragment.c();e.intro&&ft(t.$$.fragment),dt(t,e.target,e.anchor,e.customElement),tt(),R()}h(s)}class Rt{$destroy(){_t(this,1),this.$destroy=E}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!X(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{E as A,ot as B,Ct as C,rt as D,Tt as E,L as F,gt as G,y as H,j as I,Ot as J,P as K,bt as L,Wt as M,wt as N,vt as O,xt as P,Pt as Q,U as R,Rt as S,Et as T,At as U,ht as V,$t as W,yt as X,Nt as a,St as b,qt as c,Ht as d,jt as e,ft as f,It as g,I as h,Qt as i,Dt as j,H as k,zt as l,st as m,kt as n,Bt as o,Lt as p,k as q,lt as r,pt as s,Gt as t,Mt as u,Jt as v,Kt as w,dt as x,_t as y,Ft as z};