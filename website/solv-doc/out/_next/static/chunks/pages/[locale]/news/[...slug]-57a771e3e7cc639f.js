(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[633],{8762:function(e,t,r){let a=r(2983),n=a.forwardRef(function({title:e,titleId:t,...r},n){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:n,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}))});e.exports=n},56:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[locale]/news/[...slug]",function(){return r(6229)}])},5023:function(e,t,r){"use strict";r.d(t,{Z:function(){return x}});var a=r(7458),n=r(4978),l=r.n(n),o=r(2983),s=r(8338),i=r(5357),c=r(2290),u=r(3040),d=r(4517),p=r(3394);function f(e){let{toc:t,activeItemIds:r}=e,{t:n}=(0,p.$G)();return(0,a.jsx)(a.Fragment,{children:t.length>0&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"p-4",children:(0,a.jsx)("p",{className:"text-base font-semibold tracking-tight",children:n("common:toc")})}),(0,a.jsx)("div",{className:"max-w-80 border-l p-4",children:(0,a.jsx)("nav",{className:"space-y-1","aria-label":"Sidebar",children:t.map(e=>(0,a.jsx)("a",{href:"#".concat(e.id),className:(0,d.Z)(r.includes(e.id)?"bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50":"text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-gray-50","block px-3 py-2 text-sm font-medium ml-".concat(e.depth>2?3:0)),"aria-current":r.includes(e.id)?"location":void 0,children:(0,a.jsx)("span",{className:"break-words",children:e.value})},"Toc".concat(e.id)))})})]})})}let v=new u.Z;function x(e){let{rawMarkdownBody:t}=e,[r,n]=(0,o.useState)([]),[u,d]=(0,o.useState)([]),[p,x]=(0,o.useState)([]);(0,o.useEffect)(()=>{x(function(e){let t=function(e){v.reset();let t=[],r=(0,s.j)().parse(e);return(0,i.Vn)(r,"heading",e=>{let r=e.children[0].value,a=v.slug(r||(0,c.B)(e)),n=e.depth;t.push({value:r,id:a,depth:n})}),t}(e);return function(e){e.reverse();let t=e.map((t,r)=>{let a=e.length-1;if(r===a)return t;let n=t.depth;for(let l=r+1;l<=a&&2!==n;l++){let r=e[l];n>r.depth&&(t.parents?t.parents.push(r):t.parents=[r],n=r.depth)}return t});return t.reverse()}(t)}(t))},[t]),(0,o.useEffect)(()=>{d(g(p))},[p]);let m=(0,o.useCallback)(()=>{let e=u.find((e,t)=>{let r=u[t+1],a=window.scrollY,n=a+128;return r?n>=e.offsetTop&&n<r.offsetTop:n>=e.offsetTop}),t=e?e.parents?[e.id,...e.parents.map(e=>e.id)]:[e.id]:[];n(t)},[u]);return(0,o.useEffect)(()=>{let e=l()(m,100);return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[m]),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"sticky top-32",children:(0,a.jsx)(f,{toc:p,activeItemIds:r})})})}let g=e=>e.map(e=>{let{_value:t,id:r,parents:a}=e,n=document.getElementById(r);return n?{id:r,offsetTop:n.offsetTop,parents:a}:null}).filter(e=>e)},1428:function(e,t,r){"use strict";r.d(t,{Z:function(){return N}});var a=r(7458),n=r(2983),l=r(8110),o=r(566),s=r(8762),i=r(6776),c=r(3394),u=r(3213),d=r(4685),p=r(3661),f=r(4024),v=r(133),x=r(2440),g=r(2834),m=r(5960);function h(){let{t:e,i18n:t}=(0,c.$G)();(0,n.useMemo)(()=>"ja"===t.language,[t]);let[r,h]=(0,n.useState)(0),[y,b]=(0,n.useState)(!1),j=(0,n.useCallback)(()=>{h(window.scrollY),window.scrollY>104&&r>window.scrollY?b(!0):b(!1)},[h,b,r]);return(0,n.useEffect)(()=>(window.addEventListener("scroll",j),()=>{window.removeEventListener("scroll",j)}),[j]),(0,a.jsxs)(a.Fragment,{children:[y&&(0,a.jsx)("div",{className:"h-24  bg-opacity-80  dark:bg-opacity-80"}),(0,a.jsx)("header",{className:y?"fixed top-0 z-10 h-24 w-full bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80":"relative z-10 h-24 w-full  ",children:(0,a.jsx)(l.J,{className:y?"fixed top-0 h-24 w-full  bg-opacity-80  dark:bg-opacity-80":"relative h-24 w-full  ",children:t=>{let{close:r}=t;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between p-6 xl:justify-start xl:space-x-10",children:[(0,a.jsx)("div",{className:"flex justify-start xl:w-0 xl:flex-1",children:(0,a.jsx)(f.Z,{className:"h-8 w-auto sm:h-10"})}),(0,a.jsx)("div",{className:"-my-2 -mr-2 xl:hidden",children:(0,a.jsxs)(l.J.Button,{className:"inline-flex items-center justify-center  p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500  dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200",children:[(0,a.jsx)("span",{className:"sr-only",children:e("common:openMenu")}),(0,a.jsx)(s,{className:"h-6 w-6","aria-hidden":"true"})]})}),(0,a.jsxs)(l.J.Group,{as:"nav",className:"hidden space-x-10 xl:flex",children:[v.$Z.map(t=>(0,a.jsx)(p.Z,{href:t.href,className:"text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-200",children:e(t.name)},"".concat(t.name," DefaultHeader.defaultMainNav"))),(0,a.jsx)("a",{href:m.Z.discordInvitationLink,target:"_blank",rel:"noreferrer",className:"text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-200",children:e("common:navs.defaultMainNav.contact")})]}),(0,a.jsxs)("div",{className:"hidden items-center justify-end gap-3 xl:flex xl:w-0 xl:flex-1",children:[(0,a.jsx)(u.Z,{}),(0,a.jsx)(d.Z,{}),(0,a.jsx)("a",{href:"".concat(m.Z.githubRepo),className:"group text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-200","aria-label":"GitHub",target:"_blank",rel:"noreferrer",children:(0,a.jsx)(x.G,{icon:g.zhw,size:"sm","aria-label":"GitHub icon",className:"ml-2 mt-1.5 h-5 w-5"})}),(0,a.jsx)("a",{href:"".concat(m.Z.discordInvitationLink),className:"group text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-200","aria-label":"Discord Server Invitation",target:"_blank",rel:"noreferrer",children:(0,a.jsx)(x.G,{icon:g.omb,size:"sm","aria-label":"Discord icon",className:"ml-2 mt-1.5 h-5 w-5"})})]})]}),(0,a.jsx)(o.u,{as:n.Fragment,enter:"duration-200 ease-out",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"duration-100 ease-in",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsx)(l.J.Panel,{focus:!0,className:"absolute inset-x-0 top-0 origin-top-right transform bg-white p-2 transition dark:bg-gray-900 xl:hidden",children:(0,a.jsxs)("div",{className:" shadow-lg ring-1 ring-black ring-opacity-5 ",children:[(0,a.jsx)("div",{className:"px-5 pt-5",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("div",{children:(0,a.jsx)(f.Z,{className:"h-8 w-auto sm:h-10",onClick:()=>r()})}),(0,a.jsx)("div",{className:"-mr-2",children:(0,a.jsxs)(l.J.Button,{className:"inline-flex items-center justify-center  p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500  dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200",children:[(0,a.jsx)("span",{className:"sr-only",children:e("common:closeMenu")}),(0,a.jsx)(i,{className:"h-6 w-6","aria-hidden":"true"})]})})]})}),(0,a.jsx)("div",{className:"px-5 py-8",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-8",children:[v.$Z.map(t=>(0,a.jsx)(p.Z,{href:t.href,className:"block w-full text-base font-medium text-gray-700 hover:text-gray-900 active:text-gray-800 dark:text-gray-50 dark:hover:text-gray-200",onClick:()=>r(),children:e(t.name)},"".concat(t.name," DefaultHeader.defaultMainNav.mobile"))),(0,a.jsx)("a",{href:m.Z.discordInvitationLink,className:"block w-full text-base font-medium text-gray-700 hover:text-gray-900 active:text-gray-800 dark:text-gray-50 dark:hover:text-gray-200",onClick:()=>r(),target:"_blank",rel:"noreferrer",children:e("common:navs.defaultMainNav.contact")}),(0,a.jsxs)("div",{className:"flex flex-1 items-center justify-end gap-3",children:[(0,a.jsx)(u.Z,{}),(0,a.jsx)(d.Z,{}),(0,a.jsx)("a",{href:"".concat(m.Z.discordInvitationLink),className:"group text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-200","aria-label":"Discord Server Invitation",target:"_blank",rel:"noreferrer",children:(0,a.jsx)(x.G,{icon:g.omb,size:"sm","aria-label":"Discord icon",className:"ml-2 mt-1.5 h-5 w-5"})})]})]})})]})})})]})}})})]})}var y=r(6371),b=r(2966);let j="defaultMainContent";function N(e){let{children:t}=e,r=(0,b.useRouter)(),l=(0,n.useCallback)(()=>{let e=document.getElementById(j);e&&e.scrollIntoView({block:"start"})},[]);return(0,n.useEffect)(()=>{(async()=>{await new Promise(e=>setTimeout(e,100)),r.asPath.includes("#")||l()})()},[r.asPath,l]),(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"relative h-full w-full bg-white dark:bg-gray-900",children:[(0,a.jsx)(h,{}),(0,a.jsx)("div",{id:j,className:"min-h-screen",children:t}),(0,a.jsx)(y.Z,{})]})})}},6229:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return f},default:function(){return v}});var a=r(7458),n=r(1428),l=r(7280),o=r(5023),s=r(5563),i=r.n(s);function c(e){let{article:t,articleHtml:r}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(l.Z,{children:(0,a.jsxs)("div",{className:"flex justify-center py-12 lg:grid lg:grid-cols-8 lg:gap-12",children:[(0,a.jsxs)("div",{className:"lg:col-span-5",children:[(0,a.jsx)("h1",{className:"text-4xl font-extrabold tracking-tighter",children:t.title}),(0,a.jsx)("p",{className:"mt-1 text-gray-600 dark:text-gray-200",children:t.date}),(0,a.jsxs)("div",{className:"prose break-all dark:prose-invert lg:prose-lg",children:[(0,a.jsx)("div",{className:"py-8",children:(0,a.jsx)(i(),{src:t.thumbnail,alt:t.title,width:"16",height:"9",className:"aspect-video w-full bg-gray-100 object-cover group-hover:opacity-80",unoptimized:!0})}),(0,a.jsx)("div",{className:"py-8 lg:hidden",children:(0,a.jsx)(o.Z,{rawMarkdownBody:t.content})}),(0,a.jsx)("div",{className:"prose break-all dark:prose-invert lg:prose-lg",dangerouslySetInnerHTML:{__html:r}})]})]}),(0,a.jsx)("div",{className:"relative hidden pt-24 lg:col-span-3 lg:block",children:(0,a.jsx)(o.Z,{rawMarkdownBody:t.content})})]})})})}var u=r(3394),d=r(3661);function p(e){let{articles:t,urls:r}=e,{t:n}=(0,u.$G)();return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"py-24 sm:py-32",children:(0,a.jsxs)("div",{className:"mx-auto max-w-7xl px-6 lg:px-8",children:[(0,a.jsx)("div",{className:"mx-auto max-w-2xl text-center",children:(0,a.jsx)("h1",{className:"text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl",children:"News"})}),(0,a.jsx)("div",{className:"mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3",children:t.map((e,t)=>(0,a.jsx)("article",{className:"group flex flex-col items-start justify-between hover:cursor-pointer",children:(0,a.jsxs)(d.Z,{href:r[t],children:[(0,a.jsx)("div",{className:"relative w-full",children:(0,a.jsx)(i(),{src:e.thumbnail,alt:e.title,width:"16",height:"9",className:"aspect-video w-full bg-gray-50 object-cover group-hover:opacity-80 dark:bg-gray-800",unoptimized:!0})}),(0,a.jsxs)("div",{className:"max-w-xl",children:[(0,a.jsxs)("div",{className:"mt-8 flex items-center gap-x-4 text-xs",children:[(0,a.jsx)("time",{dateTime:e.date,className:"text-gray-500 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-500",children:e.date}),(0,a.jsx)("span",{className:"relative bg-gray-600 py-1.5 px-3 font-medium text-white group-hover:bg-gray-400 dark:bg-gray-400  dark:text-gray-50 dark:group-hover:bg-gray-700",children:e.category})]}),(0,a.jsx)("div",{className:"relative",children:(0,a.jsx)("h3",{className:"mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-50 dark:group-hover:text-gray-300",children:(0,a.jsxs)("a",{href:r[t+3],children:[(0,a.jsx)("span",{className:"absolute inset-0"}),e.title]})})})]})]})},"NewsIndex Article".concat(e.title)))})]})})})}var f=!0;function v(e){let{article:t,articleHtml:r,urls:n,articles:l}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c,{article:t,articleHtml:r}),(0,a.jsx)(p,{urls:n,articles:l})]})}v.getLayout=function(e){return(0,a.jsx)(n.Z,{children:e})}},8110:function(e,t,r){"use strict";r.d(t,{J:function(){return z}});var a,n,l=r(2983),o=r(896),s=r(4395),i=r(5112),c=r(5426),u=r(2671),d=r(4777),p=r(5255),f=r(9582),v=r(7633),x=r(3620),g=r(4593),m=r(1933),h=r(9756),y=r(9549),b=r(4177),j=r(6905),N=r(2507),k=r(5449),w=((a=w||{})[a.Open=0]="Open",a[a.Closed=1]="Closed",a),P=((n=P||{})[n.TogglePopover=0]="TogglePopover",n[n.ClosePopover=1]="ClosePopover",n[n.SetButton=2]="SetButton",n[n.SetButtonId=3]="SetButtonId",n[n.SetPanel=4]="SetPanel",n[n.SetPanelId=5]="SetPanelId",n);let E={0:e=>({...e,popoverState:(0,o.E)(e.popoverState,{0:1,1:0})}),1:e=>1===e.popoverState?e:{...e,popoverState:1},2:(e,t)=>e.button===t.button?e:{...e,button:t.button},3:(e,t)=>e.buttonId===t.buttonId?e:{...e,buttonId:t.buttonId},4:(e,t)=>e.panel===t.panel?e:{...e,panel:t.panel},5:(e,t)=>e.panelId===t.panelId?e:{...e,panelId:t.panelId}},S=(0,l.createContext)(null);function I(e){let t=(0,l.useContext)(S);if(null===t){let t=Error(`<${e} /> is missing a parent <Popover /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,I),t}return t}S.displayName="PopoverContext";let T=(0,l.createContext)(null);function M(e){let t=(0,l.useContext)(T);if(null===t){let t=Error(`<${e} /> is missing a parent <Popover /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,M),t}return t}T.displayName="PopoverAPIContext";let O=(0,l.createContext)(null);function F(){return(0,l.useContext)(O)}O.displayName="PopoverGroupContext";let Z=(0,l.createContext)(null);function C(e,t){return(0,o.E)(t.type,E,e,t)}Z.displayName="PopoverPanelContext";let B=s.AN.RenderStrategy|s.AN.Static,_=s.AN.RenderStrategy|s.AN.Static,z=Object.assign((0,s.yV)(function(e,t){var r;let a=(0,l.useRef)(null),n=(0,i.T)(t,(0,i.h)(e=>{a.current=e})),c=(0,l.useRef)([]),u=(0,l.useReducer)(C,{popoverState:1,buttons:c,button:null,buttonId:null,panel:null,panelId:null,beforePanelSentinel:(0,l.createRef)(),afterPanelSentinel:(0,l.createRef)()}),[{popoverState:d,button:v,buttonId:g,panel:y,panelId:j,beforePanelSentinel:k,afterPanelSentinel:w},P]=u,E=(0,m.i)(null!=(r=a.current)?r:v),I=(0,l.useMemo)(()=>{if(!v||!y)return!1;for(let e of document.querySelectorAll("body > *"))if(Number(null==e?void 0:e.contains(v))^Number(null==e?void 0:e.contains(y)))return!0;let e=(0,p.GO)(),t=e.indexOf(v),r=(t+e.length-1)%e.length,a=(t+1)%e.length,n=e[r],l=e[a];return!y.contains(n)&&!y.contains(l)},[v,y]),M=(0,N.E)(g),O=(0,N.E)(j),B=(0,l.useMemo)(()=>({buttonId:M,panelId:O,close:()=>P({type:1})}),[M,O,P]),_=F(),z=null==_?void 0:_.registerPopover,G=(0,b.z)(()=>{var e;return null!=(e=null==_?void 0:_.isFocusWithinPopoverGroup())?e:(null==E?void 0:E.activeElement)&&((null==v?void 0:v.contains(E.activeElement))||(null==y?void 0:y.contains(E.activeElement)))});(0,l.useEffect)(()=>null==z?void 0:z(B),[z,B]),(0,h.O)(null==E?void 0:E.defaultView,"focus",e=>{var t,r,a,n;0===d&&(G()||v&&y&&e.target!==window&&(null!=(r=null==(t=k.current)?void 0:t.contains)&&r.call(t,e.target)||null!=(n=null==(a=w.current)?void 0:a.contains)&&n.call(a,e.target)||P({type:1})))},!0),(0,x.O)([v,y],(e,t)=>{P({type:1}),(0,p.sP)(t,p.tJ.Loose)||(e.preventDefault(),null==v||v.focus())},0===d);let R=(0,b.z)(e=>{P({type:1});let t=e?e instanceof HTMLElement?e:"current"in e&&e.current instanceof HTMLElement?e.current:v:v;null==t||t.focus()}),D=(0,l.useMemo)(()=>({close:R,isPortalled:I}),[R,I]),A=(0,l.useMemo)(()=>({open:0===d,close:R}),[d,R]);return l.createElement(Z.Provider,{value:null},l.createElement(S.Provider,{value:u},l.createElement(T.Provider,{value:D},l.createElement(f.up,{value:(0,o.E)(d,{0:f.ZM.Open,1:f.ZM.Closed})},(0,s.sY)({ourProps:{ref:n},theirProps:e,slot:A,defaultTag:"div",name:"Popover"})))))}),{Button:(0,s.yV)(function(e,t){let r=(0,c.M)(),{id:a=`headlessui-popover-button-${r}`,...n}=e,[f,x]=I("Popover.Button"),{isPortalled:g}=M("Popover.Button"),h=(0,l.useRef)(null),N=`headlessui-focus-sentinel-${(0,c.M)()}`,k=F(),w=null==k?void 0:k.closeOthers,P=null!==(0,l.useContext)(Z);(0,l.useEffect)(()=>{if(!P)return x({type:3,buttonId:a}),()=>{x({type:3,buttonId:null})}},[P,a,x]);let[E]=(0,l.useState)(()=>Symbol()),S=(0,i.T)(h,t,P?null:e=>{if(e)f.buttons.current.push(E);else{let e=f.buttons.current.indexOf(E);-1!==e&&f.buttons.current.splice(e,1)}f.buttons.current.length>1&&console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."),e&&x({type:2,button:e})}),T=(0,i.T)(h,t),O=(0,m.i)(h),C=(0,b.z)(e=>{var t,r,a;if(P){if(1===f.popoverState)return;switch(e.key){case u.R.Space:case u.R.Enter:e.preventDefault(),null==(r=(t=e.target).click)||r.call(t),x({type:1}),null==(a=f.button)||a.focus()}}else switch(e.key){case u.R.Space:case u.R.Enter:e.preventDefault(),e.stopPropagation(),1===f.popoverState&&(null==w||w(f.buttonId)),x({type:0});break;case u.R.Escape:if(0!==f.popoverState)return null==w?void 0:w(f.buttonId);if(!h.current||null!=O&&O.activeElement&&!h.current.contains(O.activeElement))return;e.preventDefault(),e.stopPropagation(),x({type:1})}}),B=(0,b.z)(e=>{P||e.key===u.R.Space&&e.preventDefault()}),_=(0,b.z)(t=>{var r,a;(0,d.P)(t.currentTarget)||e.disabled||(P?(x({type:1}),null==(r=f.button)||r.focus()):(t.preventDefault(),t.stopPropagation(),1===f.popoverState&&(null==w||w(f.buttonId)),x({type:0}),null==(a=f.button)||a.focus()))}),z=(0,b.z)(e=>{e.preventDefault(),e.stopPropagation()}),G=0===f.popoverState,R=(0,l.useMemo)(()=>({open:G}),[G]),D=(0,v.f)(e,h),A=P?{ref:T,type:D,onKeyDown:C,onClick:_}:{ref:S,id:f.buttonId,type:D,"aria-expanded":e.disabled?void 0:0===f.popoverState,"aria-controls":f.panel?f.panelId:void 0,onKeyDown:C,onKeyUp:B,onClick:_,onMouseDown:z},L=(0,j.l)(),$=(0,b.z)(()=>{let e=f.panel;e&&(0,o.E)(L.current,{[j.N.Forwards]:()=>(0,p.jA)(e,p.TO.First),[j.N.Backwards]:()=>(0,p.jA)(e,p.TO.Last)})===p.fE.Error&&(0,p.jA)((0,p.GO)().filter(e=>"true"!==e.dataset.headlessuiFocusGuard),(0,o.E)(L.current,{[j.N.Forwards]:p.TO.Next,[j.N.Backwards]:p.TO.Previous}),{relativeTo:f.button})});return l.createElement(l.Fragment,null,(0,s.sY)({ourProps:A,theirProps:n,slot:R,defaultTag:"button",name:"Popover.Button"}),G&&!P&&g&&l.createElement(y._,{id:N,features:y.A.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:$}))}),Overlay:(0,s.yV)(function(e,t){let r=(0,c.M)(),{id:a=`headlessui-popover-overlay-${r}`,...n}=e,[{popoverState:o},u]=I("Popover.Overlay"),p=(0,i.T)(t),v=(0,f.oJ)(),x=null!==v?(v&f.ZM.Open)===f.ZM.Open:0===o,g=(0,b.z)(e=>{if((0,d.P)(e.currentTarget))return e.preventDefault();u({type:1})}),m=(0,l.useMemo)(()=>({open:0===o}),[o]);return(0,s.sY)({ourProps:{ref:p,id:a,"aria-hidden":!0,onClick:g},theirProps:n,slot:m,defaultTag:"div",features:B,visible:x,name:"Popover.Overlay"})}),Panel:(0,s.yV)(function(e,t){let r=(0,c.M)(),{id:a=`headlessui-popover-panel-${r}`,focus:n=!1,...d}=e,[v,x]=I("Popover.Panel"),{close:g,isPortalled:h}=M("Popover.Panel"),N=`headlessui-focus-sentinel-before-${(0,c.M)()}`,w=`headlessui-focus-sentinel-after-${(0,c.M)()}`,P=(0,l.useRef)(null),E=(0,i.T)(P,t,e=>{x({type:4,panel:e})}),S=(0,m.i)(P);(0,k.e)(()=>(x({type:5,panelId:a}),()=>{x({type:5,panelId:null})}),[a,x]);let T=(0,f.oJ)(),O=null!==T?(T&f.ZM.Open)===f.ZM.Open:0===v.popoverState,F=(0,b.z)(e=>{var t;if(e.key===u.R.Escape){if(0!==v.popoverState||!P.current||null!=S&&S.activeElement&&!P.current.contains(S.activeElement))return;e.preventDefault(),e.stopPropagation(),x({type:1}),null==(t=v.button)||t.focus()}});(0,l.useEffect)(()=>{var t;e.static||1===v.popoverState&&(null==(t=e.unmount)||t)&&x({type:4,panel:null})},[v.popoverState,e.unmount,e.static,x]),(0,l.useEffect)(()=>{if(!n||0!==v.popoverState||!P.current)return;let e=null==S?void 0:S.activeElement;P.current.contains(e)||(0,p.jA)(P.current,p.TO.First)},[n,P,v.popoverState]);let C=(0,l.useMemo)(()=>({open:0===v.popoverState,close:g}),[v,g]),B={ref:E,id:a,onKeyDown:F,onBlur:n&&0===v.popoverState?e=>{var t,r,a,n,l;let o=e.relatedTarget;o&&P.current&&(null!=(t=P.current)&&t.contains(o)||(x({type:1}),(null!=(a=null==(r=v.beforePanelSentinel.current)?void 0:r.contains)&&a.call(r,o)||null!=(l=null==(n=v.afterPanelSentinel.current)?void 0:n.contains)&&l.call(n,o))&&o.focus({preventScroll:!0})))}:void 0,tabIndex:-1},z=(0,j.l)(),G=(0,b.z)(()=>{let e=P.current;e&&(0,o.E)(z.current,{[j.N.Forwards]:()=>{var t;(0,p.jA)(e,p.TO.First)===p.fE.Error&&(null==(t=v.afterPanelSentinel.current)||t.focus())},[j.N.Backwards]:()=>{var e;null==(e=v.button)||e.focus({preventScroll:!0})}})}),R=(0,b.z)(()=>{let e=P.current;e&&(0,o.E)(z.current,{[j.N.Forwards]:()=>{var e;if(!v.button)return;let t=(0,p.GO)(),r=t.indexOf(v.button),a=t.slice(0,r+1),n=[...t.slice(r+1),...a];for(let t of n.slice())if("true"===t.dataset.headlessuiFocusGuard||null!=(e=v.panel)&&e.contains(t)){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}(0,p.jA)(n,p.TO.First,{sorted:!1})},[j.N.Backwards]:()=>{var t;(0,p.jA)(e,p.TO.Previous)===p.fE.Error&&(null==(t=v.button)||t.focus())}})});return l.createElement(Z.Provider,{value:a},O&&h&&l.createElement(y._,{id:N,ref:v.beforePanelSentinel,features:y.A.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:G}),(0,s.sY)({ourProps:B,theirProps:d,slot:C,defaultTag:"div",features:_,visible:O,name:"Popover.Panel"}),O&&h&&l.createElement(y._,{id:w,ref:v.afterPanelSentinel,features:y.A.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:R}))}),Group:(0,s.yV)(function(e,t){let r=(0,l.useRef)(null),a=(0,i.T)(r,t),[n,o]=(0,l.useState)([]),c=(0,b.z)(e=>{o(t=>{let r=t.indexOf(e);if(-1!==r){let e=t.slice();return e.splice(r,1),e}return t})}),u=(0,b.z)(e=>(o(t=>[...t,e]),()=>c(e))),d=(0,b.z)(()=>{var e;let t=(0,g.r)(r);if(!t)return!1;let a=t.activeElement;return!!(null!=(e=r.current)&&e.contains(a))||n.some(e=>{var r,n;return(null==(r=t.getElementById(e.buttonId.current))?void 0:r.contains(a))||(null==(n=t.getElementById(e.panelId.current))?void 0:n.contains(a))})}),p=(0,b.z)(e=>{for(let t of n)t.buttonId.current!==e&&t.close()}),f=(0,l.useMemo)(()=>({registerPopover:u,unregisterPopover:c,isFocusWithinPopoverGroup:d,closeOthers:p}),[u,c,d,p]),v=(0,l.useMemo)(()=>({}),[]);return l.createElement(O.Provider,{value:f},(0,s.sY)({ourProps:{ref:a},theirProps:e,slot:v,defaultTag:"div",name:"Popover.Group"}))})})}},function(e){e.O(0,[915,634,979,102,774,888,179],function(){return e(e.s=56)}),_N_E=e.O()}]);