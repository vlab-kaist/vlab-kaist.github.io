function N(){}function J(t,e){for(const n in e)t[n]=e[n];return t}function B(t){return t()}function M(){return Object.create(null)}function p(t){t.forEach(B)}function K(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let g;function dt(t,e){return g||(g=document.createElement("a")),g.href=e,t===g.href}function Q(t){return Object.keys(t).length===0}function R(t,...e){if(t==null)return N;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(R(e,n))}function ht(t,e,n,i){if(t){const r=O(t,e,n,i);return t[0](r)}}function O(t,e,n,i){return t[1]&&i?J(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(e.dirty.length,r.length);for(let l=0;l<c;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function pt(t,e,n,i,r,u){if(r){const c=O(e,n,i,u);t.p(c,r)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let $=!1;function U(){$=!0}function V(){$=!1}function X(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Y(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let s=0;s<e.length;s++){const f=e[s];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const s=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=s?r+1:X(1,r,y=>e[n[y]].claim_order,s))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const u=[],c=[];let l=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(u.push(e[o-1]);l>=o;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);u.reverse(),c.sort((o,s)=>o.claim_order-s.claim_order);for(let o=0,s=0;o<c.length;o++){for(;s<u.length&&c[o].claim_order>=u[s].claim_order;)s++;const f=s<u.length?u[s]:null;t.insertBefore(c[o],f)}}function Z(t,e){t.appendChild(e)}function tt(t,e){if($){for(Y(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){$&&!n?tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function P(t){t.parentNode.removeChild(t)}function T(t){return document.createElement(t)}function et(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function bt(){return j(" ")}function xt(){return j("")}function q(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function wt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function nt(t){return Array.from(t.childNodes)}function it(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function W(t,e,n,i,r=!1){it(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const o=n(l);return o===void 0?t.splice(c,1):t[c]=o,r||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const o=n(l);return o===void 0?t.splice(c,1):t[c]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function I(t,e,n,i){return W(t,r=>r.nodeName===e,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const l=r.attributes[c];n[l.name]||u.push(l.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(e))}function vt(t,e,n){return I(t,e,n,T)}function $t(t,e,n){return I(t,e,n,et)}function rt(t,e){return W(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>j(e),!0)}function Et(t){return rt(t," ")}function At(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function St(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let b;function ct(){if(b===void 0){b=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{b=!0}}return b}function Nt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=T("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=ct();let u;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",u=q(window,"message",c=>{c.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{u=q(i.contentWindow,"resize",e)}),Z(t,i),()=>{(r||u&&i.contentWindow)&&u(),P(i)}}function jt(t,e,n){t.classList[n?"add":"remove"](e)}function Ct(t,e=document.body){return Array.from(e.querySelectorAll(t))}let m;function h(t){m=t}function D(){if(!m)throw new Error("Function called outside component initialization");return m}function kt(t){D().$$.on_mount.push(t)}function Mt(t){D().$$.after_update.push(t)}const _=[],z=[],w=[],L=[],F=Promise.resolve();let A=!1;function H(){A||(A=!0,F.then(G))}function qt(){return H(),F}function S(t){w.push(t)}const E=new Set;let x=0;function G(){const t=m;do{for(;x<_.length;){const e=_[x];x++,h(e),ot(e.$$)}for(h(null),_.length=0,x=0;z.length;)z.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];E.has(n)||(E.add(n),n())}w.length=0}while(_.length);for(;L.length;)L.pop()();A=!1,E.clear(),h(t)}function ot(t){if(t.fragment!==null){t.update(),p(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const v=new Set;let d;function zt(){d={r:0,c:[],p:d}}function Lt(){d.r||p(d.c),d=d.p}function st(t,e){t&&t.i&&(v.delete(t),t.i(e))}function Bt(t,e,n,i){if(t&&t.o){if(v.has(t))return;v.add(t),d.c.push(()=>{v.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Ot(t){t&&t.c()}function Pt(t,e){t&&t.l(e)}function lt(t,e,n,i){const{fragment:r,on_mount:u,on_destroy:c,after_update:l}=t.$$;r&&r.m(e,n),i||S(()=>{const o=u.map(B).filter(K);c?c.push(...o):p(o),t.$$.on_mount=[]}),l.forEach(S)}function ut(t,e){const n=t.$$;n.fragment!==null&&(p(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(_.push(t),H(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Tt(t,e,n,i,r,u,c,l=[-1]){const o=m;h(t);const s=t.$$={fragment:null,ctx:null,props:u,update:N,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:M(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};c&&c(s.root);let f=!1;if(s.ctx=n?n(t,e.props||{},(a,y,...C)=>{const k=C.length?C[0]:y;return s.ctx&&r(s.ctx[a],s.ctx[a]=k)&&(!s.skip_bound&&s.bound[a]&&s.bound[a](k),f&&at(t,a)),y}):[],s.update(),f=!0,p(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){U();const a=nt(e.target);s.fragment&&s.fragment.l(a),a.forEach(P)}else s.fragment&&s.fragment.c();e.intro&&st(t.$$.fragment),lt(t,e.target,e.anchor,e.customElement),V(),G()}h(o)}class Wt{$destroy(){ut(this,1),this.$destroy=N}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!Q(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{N as A,ht as B,pt as C,yt as D,mt as E,tt as F,_t as G,et as H,$t as I,jt as J,S as K,Nt as L,q as M,z as N,Ct as O,dt as P,Wt as S,bt as a,gt as b,Et as c,Lt as d,xt as e,st as f,zt as g,P as h,Tt as i,Mt as j,T as k,vt as l,nt as m,wt as n,kt as o,St as p,j as q,rt as r,ft as s,Bt as t,At as u,Ot as v,Pt as w,lt as x,ut as y,qt as z};