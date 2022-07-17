(function(t){function e(e){for(var i,r,s=e[0],c=e[1],u=e[2],l=0,d=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);m&&m(e);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(i=!1)}i&&(a.splice(e--,1),t=c(c.s=n[0]))}return t}var i={},r={app:0},o={app:0},a=[];function s(t){return c.p+"js/"+({about:"about",cart:"cart",checkout:"checkout",info:"info",member:"member",player:"player",product:"product"}[t]||t)+"."+{about:"9c825f10",cart:"ee6d057c",checkout:"34dec686",info:"312451e8",member:"df8cb57e",player:"9071c92a",product:"6aba7c63"}[t]+".js"}function c(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={about:1,cart:1,checkout:1,member:1,player:1,product:1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var i="css/"+({about:"about",cart:"cart",checkout:"checkout",info:"info",member:"member",player:"player",product:"product"}[t]||t)+"."+{about:"f003f7a9",cart:"a7d7826e",checkout:"3941c678",info:"31d6cfe0",member:"414111bb",player:"3708661f",product:"8d53699a"}[t]+".css",o=c.p+i,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var u=a[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===i||l===o))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===i||l===o)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var i=e&&e.target&&e.target.src||o,a=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=i,delete r[t],m.parentNode.removeChild(m),n(a)},m.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){r[t]=0})));var i=o[t];if(0!==i)if(i)e.push(i[2]);else{var a=new Promise((function(e,n){i=o[t]=[e,n]}));e.push(i[2]=a);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(t);var d=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(m);var n=o[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",d.name="ChunkLoadError",d.type=i,d.request=r,n[1](d)}o[t]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=i,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)c.d(n,i,function(e){return t[e]}.bind(null,i));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/Vue_e-commerce/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var m=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0418":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{class:{"position-relative":t.isInBackEndPage}},[i("nav",{staticClass:"flex-content"},[i("input",{attrs:{id:"menu-control",type:"checkbox"}}),t._m(0),i("ul",{staticClass:"nav-links flex-content"},[i("router-link",{attrs:{to:"/"}},[i("h1",{staticClass:"logo"},[i("img",{attrs:{src:n("b640"),alt:"logo"}})])]),t._l(t.links,(function(e){return i("li",{key:e.name,staticClass:"nav-link"},[i("router-link",{attrs:{to:{name:e.route,params:{position:e.position}}}},[t._v(t._s(e.name)+" ")])],1)}))],2),i("ul",{staticClass:"members flex-content"},[t.isLogin?t._e():i("li",{staticClass:"member user"},[i("router-link",{attrs:{to:{name:"Login"},title:"登入"}},[i("i",{staticClass:"fas fa-user"})])],1),t.isLogin?i("li",{staticClass:"pay-now member"},[i("router-link",{attrs:{to:{name:"Bill"},title:"立即付款"}},[i("i",{staticClass:"fas fa-money-check-alt"})])],1):t._e(),t.isShowCartIcon?i("li",{staticClass:"cart member",on:{mouseenter:t.showCartItems,mouseleave:t.disShowCartItems,click:function(e){return t.go("Cart")}}},[i("a",{attrs:{href:"javascript:;",title:"購物車"}},[i("i",{staticClass:"fas fa-shopping-cart"}),t.isLogin?i("span",[t._v(t._s(t.cartItemsCount))]):i("span",[t._v("0")])]),i("transition",{attrs:{name:"enlarge"}},[t.isShowCartItem?i("div",{staticClass:"cart-items-preview flex-content"},[t.cartItemsInCart.length>0&&t.isLogin?[i("ul",{staticClass:"cart-items"},[i("h3",{staticClass:"cart-items-title"},[t._v("最近加入的商品")]),t._l(t.cartItemsInCart,(function(e){return i("li",{key:e.id,staticClass:"cart-item flex-content",on:{click:function(n){return n.stopPropagation(),t.goToProductDeatail("ProductDetail",e.id)}}},[i("div",{staticClass:"cart-img",style:{backgroundImage:"url(\n                        https://i.imgur.com/"+e.imgSrc+")"}}),i("div",{staticClass:"cart-name"},[t._v(t._s(e.name))]),i("span",{staticClass:"cart-price"},[t._v(" $ "+t._s(e.price))])])}))],2),i("span",{staticClass:"check-cart",on:{click:function(e){return e.stopPropagation(),t.go("Cart")}}},[t._v("查看購物車")])]:i("p",{staticClass:"no-cart-item flex-content"},[i("span",[t._v(" 您的購物車尚無商品 ")]),i("span",{staticClass:"buy-now",on:{click:function(e){return e.stopPropagation(),t.go("Product")}}},[t._v("立即選購")])])],2):t._e()])],1):t._e(),!t.isInLoginPage&&t.isLogin?i("li",{staticClass:"member user"},[i("router-link",{attrs:{to:{name:"Login"},title:"登出"}},[i("i",{staticClass:"fas fa-sign-out-alt",on:{click:t.logout}})])],1):t._e()])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{attrs:{for:"menu-control"}},[n("span",{staticClass:"hamburger-menu"})])}],o=(n("4de4"),n("d81d"),n("b0c0"),n("1473")),a={name:"Header",data:function(){return{links:[{name:"關於我們",route:"About",position:""},{name:"全部球技",route:"Product",position:""},{name:"後衛球員",route:"Player",position:"guard"},{name:"前鋒球員",route:"Player",position:"foward"},{name:"中鋒球員",route:"Player",position:"center"},{name:"後臺管理",route:"BackEndHome",position:""}],isShowCartItem:!1,windowTop:0}},methods:{showCartItems:function(){console.log(this.$store.getters.windowWidth),this.$store.getters.windowWidth<768||(this.isShowCartItem=!0)},disShowCartItems:function(){this.isShowCartItem=!1},logout:function(){console.log("logout"),Object(o["b"])("login","false",-1)},go:function(t){this.isInProductPage&&"Product"===t||this.$router.push({name:t}).catch((function(){}))},goToProductDeatail:function(t,e){this.isInProductDetailPage||this.$router.push({name:t,params:{id:e}})}},computed:{cartItemsCount:function(){return this.$store.state.products.filter((function(t){return t.count>0})).length},cartItemsInCart:function(){return this.$store.getters.cartItems.filter((function(t){return t.count>0})).map((function(t){return t.sum=t.count*t.price,t}))},isInLoginPage:function(){return"Login"===this.$route.name},isInBackEndPage:function(){return"BackEndProduct"===this.$route.name},isShowCartIcon:function(){return"Cart"!==this.$route.name&&"Checkout"!==this.$route.name&&"Login"!==this.$route.name&&"CreateOrder"!==this.$route.name},isLogin:function(){return"true"===Object(o["a"])("login")},isInProductPage:function(){return"Product"===this.$route.name},isInProductDetailPage:function(){return"ProductDetail"===this.$route.name}},mounted:function(){},created:function(){}},s=a,c=(n("7481"),n("2877")),u=Object(c["a"])(s,i,r,!1,null,"29536af2",null);e["a"]=u.exports},1134:function(t,e,n){t.exports=n.p+"img/center.081dfe1a.jpeg"},1473:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return r}));n("ac1f"),n("1276"),n("99af");function i(t){for(var e=t+"=",n=decodeURIComponent(document.cookie),i=n.split(";"),r=0;r<i.length;r++){var o=i[r];while(" "==o.charAt(0))o=o.substr(1);if(0==o.indexOf(e))return o.substr(e.length,o.length)}return""}function r(t,e,n){console.log("setCookie");var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3);var r="expires="+i.toUTCString();document.cookie="".concat(t,"=").concat(e,";").concat(r,";secure=true;path=/")}},"2b56":function(t,e,n){},"3ee9":function(t,e,n){"use strict";n("4795")},"41e0":function(t,e,n){t.exports=n.p+"img/banner-home-3.128711db.webp"},4243:function(t,e,n){t.exports=n.p+"img/fadeaway.3394350f.jpg"},4795:function(t,e,n){},"551f":function(t,e,n){t.exports=n.p+"img/logoshot.376c3f31.jpg"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view",{class:{"back-end-container":!0}})],1)},o=[],a=n("5530"),s=n("2f62"),c={methods:Object(a["a"])(Object(a["a"])({getProductData:function(){this.$store.dispatch("getProductData")}},Object(s["b"])(["setWindowWidth"])),{},{initialize:function(){this.detectWindowWidth()},detectWindowWidth:function(){this.setWindowWidth(window.innerWidth)}}),created:function(){this.getProductData(),this.initialize(),window.addEventListener("resize",this.detectWindowWidth)},destroyed:function(){window.removeEventListener("resize",this.detectWindowWidth)}},u=c,l=(n("5c0b"),n("2877")),d=Object(l["a"])(u,r,o,!1,null,null,null),m=d.exports,p=(n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("8c4f")),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header"),n("Slider",{attrs:{currentSlide:t.currentSlide,positive:t.positive,slides:t.slides},on:{swapSlide:t.swapSlide}}),n("Main"),n("Footer")],1)},h=[],g=n("0418"),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"slide-container"},[n("transition-group",{staticClass:"slides",attrs:{name:t.positive?"slide":"slide-invert",tag:"ul",mode:"out-in",appear:""}},[t._l(t.slides,(function(e,i){return n("li",{directives:[{name:"show",rawName:"v-show",value:t.currentSlide===i,expression:"currentSlide === index"}],key:e.name,staticClass:"slide flex-content",style:{backgroundImage:"url("+e.imgSrc+")"}},[n("div",{staticClass:"hot-sell flex-content"},[n("h2",{staticClass:"hot-sell-title"},[t._v(" 熱賣商品 "),n("small",[t._v("【熱銷】"+t._s(e.name))])]),n("router-link",{staticClass:"buy-now btn-primary",attrs:{to:{name:"ProductDetail",params:{id:e.id}}}},[t._v("馬上買 buy now")])],1)])})),n("ul",{key:"slide-control",staticClass:"slide-controls flex-content"},t._l(t.slides,(function(e,i){return n("li",{key:e.name,staticClass:"slide-control",class:{controlActive:e.isActive},on:{click:function(e){return t.swapSlide(i)}}})})),0)],2),n("div",{staticClass:"left",on:{click:function(e){return t.$emit("swapSlide",t.currentSlide-1)}}},[n("i",{staticClass:"fas fa-chevron-left"})]),n("div",{staticClass:"right",on:{click:function(e){return t.$emit("swapSlide",t.currentSlide+1)}}},[n("i",{staticClass:"fas fa-chevron-right"})])],1)},b=[],S=(n("a9e3"),{props:{currentSlide:Number,positive:Boolean,slides:Array}}),C=S,_=(n("836a"),Object(l["a"])(C,v,b,!1,null,"df87b7c4",null)),w=_.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),n("section",{staticClass:"new-product-list bg-dark"},[n("h2",[t._v("新品上市")]),n("ul",{staticClass:"new-products"},t._l(t.newProducts,(function(e){return n("li",{key:e.name,staticClass:"new-product"},[n("router-link",{attrs:{to:{name:"ProductDetail",params:{id:e.id}}}},[n("img",{attrs:{src:"https://i.imgur.com/"+e.imgSrc,alt:e.name}}),n("div",{staticClass:"player-cover flex-content"},[n("h3",[t._v(t._s(e.name))])])])],1)})),0)]),n("section",{staticClass:"about bg-dark"},[n("h3",[t._v("想知道喜歡的名星住哪嗎 ?")]),t._m(0),n("router-link",{staticClass:"btn-about btn-primary",attrs:{to:"/about"}},[t._v("about us")])],1),n("section",{staticClass:"player-group bg-dark"},[n("div",{staticClass:"card-wrap flex-content"},t._l(t.groups,(function(e){return n("router-link",{key:e.title,staticClass:"card flex-content",attrs:{to:{name:e.route,params:{position:e.position}}}},[n("img",{attrs:{src:e.imgSrc,alt:e.name}}),n("div",{staticClass:"card-content"},[n("p",[t._v(t._s(e.title))]),n("div",{staticClass:"border-line"}),n("p",{staticClass:"titleEng"},[t._v(t._s(e.titleEng))]),n("router-link",{staticClass:"btn-primary more",attrs:{to:{name:e.route,params:{position:e.position}}}},[t._v("more")])],1),n("div",{staticClass:"card-cover"})])})),1)]),n("section",{staticClass:"interview bg-dark"},[n("div",{staticClass:"flex-content container"},[n("h3",[t._v("採訪記事")]),n("ul",{staticClass:"cards flex-content"},t._l(t.interviews,(function(e){return n("li",{key:e.content,staticClass:"card"},[n("div",{staticClass:"interview-img",style:{backgroundImage:"url("+e.imgSrc+") "}}),n("h4",{staticClass:"interview-title"},[t._v(t._s(e.title))]),n("p",{staticClass:"interview-content"},[t._v(t._s(e.content))])])})),0),t._m(1)])]),n("section",{staticClass:"hot-sell bg-dark"},[n("h2",[t._v("熱門暢銷商品")]),n("div",{staticClass:"hot-sell-products flex-content"},t._l(t.hotSells,(function(e){return n("router-link",{key:e.name,staticClass:"hot-sell-product",attrs:{to:{name:e.route,params:{id:e.id}}}},[n("div",{staticClass:"hot-sell-img",style:{backgroundImage:"url(https://i.imgur.com/"+e.imgSrc+")"}}),n("h3",[t._v("【熱銷】"+t._s(e.name))]),n("span",[t._v("特價 "+t._s(e.onSalePrice)+" "),n("del",[t._v("原價 "+t._s(e.price))])])])})),1)])],1)},k=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v(" SKILL有你想要的東西 "),n("br"),t._v(" 我們擁有所有球星的個人絕活 "),n("br"),t._v(" 只要你出錢，我們就賣給你 ")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"cards fadeaway"},[i("img",{attrs:{src:n("4243"),alt:"fadeaway"}}),i("div",{staticClass:"txt"},[i("h4",{staticClass:"interview-title"},[t._v("FadeAway")]),i("p",{staticClass:"interview-content"},[t._v("無法封蓋?! 太扯了吧!")])])])}],L=(n("4de4"),{data:function(){return{groups:[{title:"後衛球員",imgSrc:n("c33c"),titleEng:"Guard",position:"guard",route:"Player"},{title:"前鋒球員",imgSrc:n("d486"),titleEng:"Foward",position:"foward",route:"Player"},{title:"中鋒球員",imgSrc:n("1134"),titleEng:"Center",position:"center",route:"Player"}],interviews:[{title:"CrossOver",content:"Chris Paul: 甚麼?! 竟然有帥到掉渣的過人!",imgSrc:n("9baf")},{title:"SkyHook",content:"魔獸: 天勾這時不學更待何時?",imgSrc:n("aafd")},{title:"LogoShot",content:"字母哥: 好想擁有LogoShot的能力啊!!!",imgSrc:n("551f")},{title:"NoLookingPass",content:"Steve Nash: 想要風靡萬千少女嗎? 趕快來學吧",imgSrc:n("84185")}]}},computed:{hotSells:function(){return this.$store.state.products.filter((function(t){return t.isHotSell}))},newProducts:function(){return this.$store.state.products.filter((function(t){return t.isNew}))},isLoading:function(){return this.$store.state.isLoading}}}),I=L,P=(n("3ee9"),Object(l["a"])(I,y,k,!1,null,"616a3a7a",null)),x=P.exports,O=n("fd2d"),E=n("c65e"),A=n.n(E),T=n("67cc"),j=n.n(T),$=n("41e0"),D=n.n($),N={name:"Home",components:{Header:g["a"],Slider:w,Main:x,Footer:O["a"]},data:function(){return{currentSlide:0,positive:!0,slides:[{id:7,name:"Kobe Brant",imgSrc:A.a,isActive:!0},{id:13,name:"Kevin Durant",imgSrc:j.a,isActive:!1},{id:11,name:"Lebron James",imgSrc:D.a,isActive:!1}]}},computed:{totalSlide:function(){return this.slides.length}},methods:{swapSlide:function(t){console.log(t),this.slides[this.currentSlide].isActive=!this.slides[this.currentSlide].isActive,this.positive=t>this.currentSlide,this.currentSlide=(t+this.totalSlide)%this.totalSlide,this.slides[this.currentSlide].isActive=!this.slides[this.currentSlide].isActive},autoSwap:function(){var t=this;window.setInterval((function(){t.slides[t.currentSlide].isActive=!t.slides[t.currentSlide].isActive,t.currentSlide++,t.currentSlide>t.totalSlide-1&&(t.currentSlide=0),t.currentSlide<0&&(t.currentSlide=t.totalSlide-1),t.slides[t.currentSlide].isActive=!t.slides[t.currentSlide].isActive}),7500)}},mounted:function(){this.autoSwap()}},K=N,W=Object(l["a"])(K,f,h,!1,null,"6c1eb38e",null),B=W.exports,U=n("1473");i["a"].use(p["a"]);var M=[{path:"/",name:"Home",component:B,meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"/product",name:"Product",component:function(){return n.e("product").then(n.bind(null,"5132"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"/product/:id",name:"ProductDetail",component:function(){return n.e("product").then(n.bind(null,"e1ed"))},meta:{title:"SKILL | 你想的到的球技都在這裡"},props:!0},{path:"/player/:position",name:"Player",component:function(){return n.e("player").then(n.bind(null,"bf5c"))},meta:{title:"SKILL | 你想的到的球技都在這裡"},props:!0},{path:"/all-product",redirect:"/product"},{path:"/backend",name:"BackEndHome",component:function(){return n.e("member").then(n.bind(null,"575a"))},meta:{title:"SKILL | 你想的到的球技都在這裡",requireAuth:!0},children:[{path:"product",name:"BackEndProduct",component:function(){return n.e("member").then(n.bind(null,"e4b4"))},meta:{title:"SKILL | 你想的到的球技都在這裡",requireAuth:!0}},{path:"edit/:editId",name:"BackEndProductEdit",component:function(){return n.e("member").then(n.bind(null,"b690"))},meta:{title:"SKILL | 你想的到的球技都在這裡"},props:!0},{path:"create",name:"BackEndProductCreate",component:function(){return n.e("member").then(n.bind(null,"6977"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"order",name:"BackEndOrder",component:function(){return n.e("member").then(n.bind(null,"cee7"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"order/:orderId",name:"BackEndOrderDetail",component:function(){return n.e("member").then(n.bind(null,"75ac"))},props:!0,meta:{title:"SKILL | 你想的到的球技都在這裡"}}]},{path:"/login",name:"Login",component:function(){return n.e("member").then(n.bind(null,"a55b"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"/cart",name:"Cart",component:function(){return n.e("cart").then(n.bind(null,"b789"))},meta:{title:"SKILL | 你想的到的球技都在這裡",requireAuth:!0}},{path:"/bill",name:"Bill",component:function(){return n.e("cart").then(n.bind(null,"c05d"))},meta:{title:"SKILL | 你想的到的球技都在這裡",requireAuth:!0}},{path:"/checkout",name:"Checkout",component:function(){return n.e("checkout").then(n.bind(null,"0c72"))},meta:{title:"SKILL | 你想的到的球技都在這裡"},children:[{path:"createorder",name:"CreateOrder",component:function(){return n.e("member").then(n.bind(null,"de10"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}},{path:"finishorder",name:"FinishOrder",component:function(){return n.e("member").then(n.bind(null,"b137"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}}]},{path:"/:catchAll(.*)",name:"NotFound",component:function(){return n.e("info").then(n.bind(null,"9703"))},meta:{title:"SKILL | 你想的到的球技都在這裡"}}],H=new p["a"]({mode:"hash",base:"/Vue_e-commerce",routes:M,scrollBehavior:function(t,e,n){return{x:0,y:0}}});H.beforeEach((function(t,e,n){t.meta.title&&(document.title=t.meta.title);var i="true"===Object(U["a"])("login");t.meta.requireAuth?i?n():"Login"==e.name?alert("請登入！"):n({name:"Login"}):n()}));var q=p["a"].prototype.push;p["a"].prototype.push=function(t,e,n){return e||n?q.call(this,t,e,n):q.call(this,t).catch((function(t){return t}))};var F=H,J=(n("d81d"),n("bc3a")),R=n.n(J);i["a"].use(s["a"]);var V="https://api.jsonbin.io/v3/b/615b3544aa02be1d4453fd5a/latest",z="$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam",G={headers:{"X-Master-Key":z,"Content-Type":"application/json"}},X=new s["a"].Store({state:{products:[],isLoading:!1,windowWidth:0},mutations:{LOADING_STATUS:function(t,e){t.isLoading=e},GET_PRODUCT_DATA:function(t,e){t.products=e},ADD_TO_CART:function(t,e){var n=e.countShow,i=e.id;console.log(n,i),t.products.map((function(t){t.id===i&&(t.count+=n)})),sessionStorage.setItem("cartItems",JSON.stringify(t.products))},PLUS_COUNT:function(t,e){var n=e.id;t.products.map((function(t){t.id===n&&++t.count})),console.log("+",t.products[n].count),sessionStorage.setItem("cartItems",JSON.stringify(t.products))},MINUS_COUNT:function(t,e){var n=e.id;t.products.map((function(t){1!=t.count&&t.id===n&&--t.count})),sessionStorage.setItem("cartItems",JSON.stringify(t.products))},REMOVE_CART_ITEM:function(t,e){var n=e.ids,i=e.isSystem;if(console.log(i),i)t.products.map((function(t){n.map((function(e){t.id===e&&(t.count=0)}))})),sessionStorage.setItem("cartItems",JSON.stringify(t.products));else{if(!confirm("確定要移除嗎?"))return;t.products.map((function(t){n.map((function(e){t.id===e&&(t.count=0)}))})),sessionStorage.setItem("cartItems",JSON.stringify(t.products))}},setWindowWidth:function(t,e){t.windowWidth=e}},actions:{getProductData:function(t){var e=t.commit;e("LOADING_STATUS",!0),R.a.get(V,G).then((function(t){console.log("Store: ",t.data.record),e("GET_PRODUCT_DATA",t.data.record),e("LOADING_STATUS",!1)})).catch((function(t){return console.log(t)}))},addToCart:function(t,e){var n=t.commit,i=e.countShow,r=e.id;n("ADD_TO_CART",{countShow:i,id:r})},plusCount:function(t,e){var n=t.commit,i=e.id;n("PLUS_COUNT",{id:i})},minusCount:function(t,e){var n=t.commit,i=e.id;n("MINUS_COUNT",{id:i})},removeCartItem:function(t,e){var n=t.commit,i=e.ids;n("REMOVE_CART_ITEM",{ids:i})}},getters:{cartItems:function(t){return sessionStorage.getItem("cartItems")&&(t.products=JSON.parse(sessionStorage.getItem("cartItems"))),t.products.filter((function(t){return t.count>0}))},windowWidth:function(t){return t.windowWidth}}}),Y=n("025a"),Z=n("9062"),Q=n.n(Z);n("e40d");i["a"].component("Loading",Q.a),i["a"].use(Y["a"],{defaultTimeout:3e3,defaultProgressBar:!1,defaultProgressBarValue:0,defaultType:"success",defaultPosition:"toast-top-right",defaultCloseOnHover:!1,defaultStyle:{"background-color":"#333",color:"#fff",padding:"20px 15px 20px 50px","margin-bottom":"25px"}}),i["a"].config.productionTip=!1,new i["a"]({store:X,router:F,render:function(t){return t(m)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"67cc":function(t,e,n){t.exports=n.p+"img/banner-home-2.64ad6d28.jpg"},7481:function(t,e,n){"use strict";n("e756")},"836a":function(t,e,n){"use strict";n("c764")},84185:function(t,e,n){t.exports=n.p+"img/nolookingpass.76c23010.jpg"},"9baf":function(t,e,n){t.exports=n.p+"img/crossover.68443081.jpg"},"9c0c":function(t,e,n){},aafd:function(t,e,n){t.exports=n.p+"img/skyhook.7869cfa8.jpg"},b640:function(t,e,n){t.exports=n.p+"img/logo.e8874439.jpg"},c33c:function(t,e,n){t.exports=n.p+"img/guard.3f9080a3.jpg"},c65e:function(t,e,n){t.exports=n.p+"img/banner-home-1.a2f29f35.jpg"},c764:function(t,e,n){},d486:function(t,e,n){t.exports=n.p+"img/foward.32e531d2.jpg"},e756:function(t,e,n){},e955:function(t,e,n){"use strict";n("2b56")},fd2d:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",[i("div",{staticClass:"container flex-content"},[i("router-link",{attrs:{to:"/"}},[i("img",{attrs:{src:n("b640"),alt:"logo"}})]),i("br"),t._m(0)],1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"txt flex-content"},[n("span",{staticClass:"copyright"},[t._v("© 2021")]),n("span",{staticClass:"follow"},[t._v("FOLLOW US")]),n("i",{staticClass:"fab fa-facebook-f"}),n("i",{staticClass:"fab fa-instagram"}),n("i",{staticClass:"fab fa-twitter"}),n("i",{staticClass:"fas fa-envelope"})])}],o={},a=o,s=(n("e955"),n("2877")),c=Object(s["a"])(a,i,r,!1,null,"37bf8112",null);e["a"]=c.exports}});
//# sourceMappingURL=app.5a5c7bb4.js.map