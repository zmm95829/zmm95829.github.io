import{_ as I,h as S,l as c,a2 as H,o as l,c as y,z as s,r as B,A as O,I as V,a3 as p,a4 as m,a0 as j,n as u,G as w,B as A,T,a5 as k,t as U,K as v,a6 as F,a7 as N,a8 as z,a9 as G,aa as J,ab as K,ac as q,ad as Q,ae as W,af as X,d as Y,u as Z,p as $,k as ee,ag as oe,ah as te,ai as ne,aj as ae}from"./chunks/framework.e7976ef2.js";import{t as se}from"./chunks/theme.70dab707.js";const P=Object.assign({"../../../htmlJsCss/components/AutoTocScroll.vue":()=>k(()=>import("./chunks/AutoTocScroll.d2bdc642.js"),["assets/chunks/AutoTocScroll.d2bdc642.js","assets/chunks/framework.e7976ef2.js"])}),f=new Map,de={props:{codeStr:String,htmlStr:String,description:String,codePath:String,language:{default:"vue",type:String}},setup(o,e){const{codePath:n,codeStr:t,htmlStr:h,description:_}=o,{slots:a}=e,C=S(!1),x=c(()=>!!(a!=null&&a.default)),g=c(()=>decodeURIComponent(t??"")),D=c(()=>decodeURIComponent(h??"")),L=c(()=>decodeURIComponent(_??"")),M=n&&P[n]?H(P[n]):null,i=S(!1);return{hover:C,codePath:n,hasSlot:x,demoSlot:M,isExpanded:i,decodedCodeStr:g,decodedHtmlStr:D,decodedDesc:L,onCopy:async b=>{try{navigator.clipboard.writeText(g.value);const d=b.target;d.classList.add("demo-show-copied"),clearTimeout(f.get(d));const R=setTimeout(()=>{d.classList.remove("demo-show-copied"),d.blur(),f.delete(d)},2e3);f.set(d,R)}catch{console.log("复制代码失败")}},onClickControl:()=>{i.value=!i.value,C.value=i.value}}}},re={class:"demo-slot"},ie=["innerHTML"],ce={class:"demo-show"},le=["innerHTML"],pe=["innerHTML"];function me(o,e,n,t,h,_){return l(),y("div",{class:u(["demo",t.hover&&"demo-hover"]),onMouseenter:e[2]||(e[2]=a=>t.hover=!0),onMouseleave:e[3]||(e[3]=a=>t.hover=!1)},[s("div",re,[t.hasSlot?B(o.$slots,"default",{key:0},void 0,!0):t.codePath?(l(),O(V(t.demoSlot),{key:1})):(l(),y("div",{key:2,innerHTML:t.decodedCodeStr},null,8,ie))]),p(s("div",ce,[p(s("div",{class:"demo-show_desc",innerHTML:t.decodedDesc},null,8,le),[[m,t.decodedDesc]]),s("div",{class:"demo-show-copy",onClick:e[0]||(e[0]=j((...a)=>t.onCopy&&t.onCopy(...a),["stop"]))}),s("div",{class:u(["demo-show-code","language-"+n.language]),innerHTML:t.decodedHtmlStr},null,10,pe)],512),[[m,t.isExpanded]]),s("div",{class:"demo-control",onClick:e[1]||(e[1]=(...a)=>t.onClickControl&&t.onClickControl(...a))},[w(T,{name:"arrow-slide"},{default:A(()=>[s("i",{class:u(["demo-control-icon",t.isExpanded?"demo-control-icon_up":"demo-control-icon_down"])},null,2)]),_:1}),w(T,{name:"text-slide"},{default:A(()=>[p(s("span",{class:"demo-control-tip"},U(t.isExpanded?"隐藏代码":"显示代码"),513),[[m,t.hover]])]),_:1})])],34)}const ue=I(de,[["render",me],["__scopeId","data-v-4ea7f0b4"]]),fe={...se,enhanceApp({app:o}){o.component("demo",ue)}};function E(o){if(o.extends){const e=E(o.extends);return{...e,...o,async enhanceApp(n){e.enhanceApp&&await e.enhanceApp(n),o.enhanceApp&&await o.enhanceApp(n)}}}return o}const r=E(fe),ve=Y({name:"VitePressApp",setup(){const{site:o}=Z();return $(()=>{ee(()=>{document.documentElement.lang=o.value.lang,document.documentElement.dir=o.value.dir})}),oe(),te(),ne(),r.setup&&r.setup(),()=>ae(r.Layout)}});async function he(){const o=Ce(),e=_e();e.provide(N,o);const n=z(o.route);return e.provide(G,n),e.component("Content",J),e.component("ClientOnly",K),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get(){return n.frontmatter.value}},$params:{get(){return n.page.value.params}}}),r.enhanceApp&&await r.enhanceApp({app:e,router:o,siteData:q}),{app:e,router:o,data:n}}function _e(){return Q(ve)}function Ce(){let o=v,e;return W(n=>{let t=X(n);return o&&(e=t),(o||e===t)&&(t=t.replace(/\.js$/,".lean.js")),v&&(o=!1),k(()=>import(t),[])},r.NotFound)}v&&he().then(({app:o,router:e,data:n})=>{e.go().then(()=>{F(e.route,n.site),o.mount("#app")})});export{he as createApp};