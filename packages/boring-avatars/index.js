!function(e,t){if("object"===typeof exports&&"object"===typeof module)module.exports=t(require("react"));else if("function"===typeof define&&define.amd)define(["react"],t);else{var r="object"===typeof exports?t(require("react")):t(e.react);for(var l in r)("object"===typeof exports?exports:e)[l]=r[l]}}(this,(function(e){return function(e){var t={};function r(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,l){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(r.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(l,a,function(t){return e[t]}.bind(null,a));return l},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){e.exports=r(2)},function(e,t,r){"use strict";function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){if(null==e)return{};var r,l,a=function(e,t){if(null==e)return{};var r,l,a={},i=Object.keys(e);for(l=0;l<i.length;l++)r=i[l],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(l=0;l<i.length;l++)r=i[l],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}r.r(t);var i=r(0),n=r.n(i),c=function(e){var t=Array.from(e),r=0;return t.forEach((function(e){return r+=e.charCodeAt(0)})),r},o=function(e,t){return Math.floor(e/Math.pow(10,t)%10)},h=function(e,t){return!(o(e,t)%2)},s=function(e,t,r){var l=e%t;return r&&o(e,r)%2===0?-l:l},f=function(e,t,r){return t[e%r]},m=function(e){return"#"===e.slice(0,1)&&(e=e.slice(1)),(299*parseInt(e.substr(0,2),16)+587*parseInt(e.substr(2,2),16)+114*parseInt(e.substr(4,2),16))/1e3>=128?"black":"white"},u=4,d=80;var g=function(e){var t=function(e,t){var r=c(e),l=t&&t.length;return Array.from({length:u},(function(e,a){return{color:f(r+a,t,l),translateX:s(r*(a+1),d/2-(a+17),1),translateY:s(r*(a+1),d/2-(a+17),2),rotate:s(r*(a+1),360),isSquare:h(r,2)}}))}(e.name,e.colors);return i.createElement("svg",{viewBox:"0 0 "+d+" "+d,fill:"none",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size},i.createElement("mask",{id:"mask__bauhaus",maskUnits:"userSpaceOnUse",x:0,y:0,width:d,height:d},i.createElement("rect",{width:d,height:d,rx:e.square?void 0:2*d,fill:"white"})),i.createElement("g",{mask:"url(#mask__bauhaus)"},i.createElement("rect",{width:d,height:d,fill:t[0].color}),i.createElement("rect",{x:(d-60)/2,y:(d-20)/2,width:d,height:t[1].isSquare?d:d/8,fill:t[1].color,transform:"translate("+t[1].translateX+" "+t[1].translateY+") rotate("+t[1].rotate+" "+d/2+" "+d/2+")"}),i.createElement("circle",{cx:d/2,cy:d/2,fill:t[2].color,r:d/5,transform:"translate("+t[2].translateX+" "+t[2].translateY+")"}),i.createElement("line",{x1:0,y1:d/2,x2:d,y2:d/2,strokeWidth:2,stroke:t[3].color,transform:"translate("+t[3].translateX+" "+t[3].translateY+") rotate("+t[3].rotate+" "+d/2+" "+d/2+")"})))},w=5;var p=function(e){var t=function(e,t){var r=c(t),l=e&&e.length,a=Array.from({length:w},(function(t,a){return f(r+(a+1),e,l)})),i=[];return i[0]=a[0],i[1]=a[1],i[2]=a[1],i[3]=a[2],i[4]=a[2],i[5]=a[3],i[6]=a[3],i[7]=a[0],i[8]=a[4],i}(e.colors,e.name);return n.a.createElement("svg",{viewBox:"0 0 90 90",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size},n.a.createElement("mask",{id:"mask__ring",maskUnits:"userSpaceOnUse",x:0,y:0,width:90,height:90},n.a.createElement("rect",{width:90,height:90,rx:e.square?void 0:180,fill:"white"})),n.a.createElement("g",{mask:"url(#mask__ring)"},n.a.createElement("path",{d:"M0 0h90v45H0z",fill:t[0]}),n.a.createElement("path",{d:"M0 45h90v45H0z",fill:t[1]}),n.a.createElement("path",{d:"M83 45a38 38 0 00-76 0h76z",fill:t[2]}),n.a.createElement("path",{d:"M83 45a38 38 0 01-76 0h76z",fill:t[3]}),n.a.createElement("path",{d:"M77 45a32 32 0 10-64 0h64z",fill:t[4]}),n.a.createElement("path",{d:"M77 45a32 32 0 11-64 0h64z",fill:t[5]}),n.a.createElement("path",{d:"M71 45a26 26 0 00-52 0h52z",fill:t[6]}),n.a.createElement("path",{d:"M71 45a26 26 0 01-52 0h52z",fill:t[7]}),n.a.createElement("circle",{cx:45,cy:45,r:23,fill:t[8]})))},E=64;var y=function(e){var t=function(e,t){var r=c(e),l=t&&t.length;return Array.from({length:E},(function(e,a){return{color:f(r%(a+13),t,l)}}))}(e.name,e.colors);return i.createElement("svg",{viewBox:"0 0 80 80",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size},i.createElement("mask",{id:"mask0","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:0,y:0,width:80,height:80},i.createElement("rect",{width:80,height:80,rx:e.square?void 0:160,fill:"white"})),i.createElement("g",{mask:"url(#mask0)"},i.createElement("rect",{width:10,height:10,fill:t[0].color}),i.createElement("rect",{x:20,width:10,height:10,fill:t[1].color}),i.createElement("rect",{x:40,width:10,height:10,fill:t[2].color}),i.createElement("rect",{x:60,width:10,height:10,fill:t[3].color}),i.createElement("rect",{x:10,width:10,height:10,fill:t[4].color}),i.createElement("rect",{x:30,width:10,height:10,fill:t[5].color}),i.createElement("rect",{x:50,width:10,height:10,fill:t[6].color}),i.createElement("rect",{x:70,width:10,height:10,fill:t[7].color}),i.createElement("rect",{y:10,width:10,height:10,fill:t[8].color}),i.createElement("rect",{y:20,width:10,height:10,fill:t[9].color}),i.createElement("rect",{y:30,width:10,height:10,fill:t[10].color}),i.createElement("rect",{y:40,width:10,height:10,fill:t[11].color}),i.createElement("rect",{y:50,width:10,height:10,fill:t[12].color}),i.createElement("rect",{y:60,width:10,height:10,fill:t[13].color}),i.createElement("rect",{y:70,width:10,height:10,fill:t[14].color}),i.createElement("rect",{x:20,y:10,width:10,height:10,fill:t[15].color}),i.createElement("rect",{x:20,y:20,width:10,height:10,fill:t[16].color}),i.createElement("rect",{x:20,y:30,width:10,height:10,fill:t[17].color}),i.createElement("rect",{x:20,y:40,width:10,height:10,fill:t[18].color}),i.createElement("rect",{x:20,y:50,width:10,height:10,fill:t[19].color}),i.createElement("rect",{x:20,y:60,width:10,height:10,fill:t[20].color}),i.createElement("rect",{x:20,y:70,width:10,height:10,fill:t[21].color}),i.createElement("rect",{x:40,y:10,width:10,height:10,fill:t[22].color}),i.createElement("rect",{x:40,y:20,width:10,height:10,fill:t[23].color}),i.createElement("rect",{x:40,y:30,width:10,height:10,fill:t[24].color}),i.createElement("rect",{x:40,y:40,width:10,height:10,fill:t[25].color}),i.createElement("rect",{x:40,y:50,width:10,height:10,fill:t[26].color}),i.createElement("rect",{x:40,y:60,width:10,height:10,fill:t[27].color}),i.createElement("rect",{x:40,y:70,width:10,height:10,fill:t[28].color}),i.createElement("rect",{x:60,y:10,width:10,height:10,fill:t[29].color}),i.createElement("rect",{x:60,y:20,width:10,height:10,fill:t[30].color}),i.createElement("rect",{x:60,y:30,width:10,height:10,fill:t[31].color}),i.createElement("rect",{x:60,y:40,width:10,height:10,fill:t[32].color}),i.createElement("rect",{x:60,y:50,width:10,height:10,fill:t[33].color}),i.createElement("rect",{x:60,y:60,width:10,height:10,fill:t[34].color}),i.createElement("rect",{x:60,y:70,width:10,height:10,fill:t[35].color}),i.createElement("rect",{x:10,y:10,width:10,height:10,fill:t[36].color}),i.createElement("rect",{x:10,y:20,width:10,height:10,fill:t[37].color}),i.createElement("rect",{x:10,y:30,width:10,height:10,fill:t[38].color}),i.createElement("rect",{x:10,y:40,width:10,height:10,fill:t[39].color}),i.createElement("rect",{x:10,y:50,width:10,height:10,fill:t[40].color}),i.createElement("rect",{x:10,y:60,width:10,height:10,fill:t[41].color}),i.createElement("rect",{x:10,y:70,width:10,height:10,fill:t[42].color}),i.createElement("rect",{x:30,y:10,width:10,height:10,fill:t[43].color}),i.createElement("rect",{x:30,y:20,width:10,height:10,fill:t[44].color}),i.createElement("rect",{x:30,y:30,width:10,height:10,fill:t[45].color}),i.createElement("rect",{x:30,y:40,width:10,height:10,fill:t[46].color}),i.createElement("rect",{x:30,y:50,width:10,height:10,fill:t[47].color}),i.createElement("rect",{x:30,y:60,width:10,height:10,fill:t[48].color}),i.createElement("rect",{x:30,y:70,width:10,height:10,fill:t[49].color}),i.createElement("rect",{x:50,y:10,width:10,height:10,fill:t[50].color}),i.createElement("rect",{x:50,y:20,width:10,height:10,fill:t[51].color}),i.createElement("rect",{x:50,y:30,width:10,height:10,fill:t[52].color}),i.createElement("rect",{x:50,y:40,width:10,height:10,fill:t[53].color}),i.createElement("rect",{x:50,y:50,width:10,height:10,fill:t[54].color}),i.createElement("rect",{x:50,y:60,width:10,height:10,fill:t[55].color}),i.createElement("rect",{x:50,y:70,width:10,height:10,fill:t[56].color}),i.createElement("rect",{x:70,y:10,width:10,height:10,fill:t[57].color}),i.createElement("rect",{x:70,y:20,width:10,height:10,fill:t[58].color}),i.createElement("rect",{x:70,y:30,width:10,height:10,fill:t[59].color}),i.createElement("rect",{x:70,y:40,width:10,height:10,fill:t[60].color}),i.createElement("rect",{x:70,y:50,width:10,height:10,fill:t[61].color}),i.createElement("rect",{x:70,y:60,width:10,height:10,fill:t[62].color}),i.createElement("rect",{x:70,y:70,width:10,height:10,fill:t[63].color})))},x=36;var v=function(e){var t=function(e,t){var r=c(e),l=t&&t.length,a=f(r,t,l),i=s(r,10,1),n=i<5?i+x/9:i,o=s(r,10,2),u=o<5?o+x/9:o;return{wrapperColor:a,faceColor:m(a),backgroundColor:f(r+13,t,l),wrapperTranslateX:n,wrapperTranslateY:u,wrapperRotate:s(r,360),wrapperScale:1+s(r,x/12)/10,isMouthOpen:!0,isCircle:h(r,1),eyeSpread:s(r,5),mouthSpread:s(r,3),faceRotate:s(r,10,3),faceTranslateX:n>x/6?n/2:s(r,8,1),faceTranslateY:u>x/6?u/2:s(r,7,2)}}(e.name,e.colors);return i.createElement("svg",{viewBox:"0 0 "+x+" "+x,fill:"none",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size},i.createElement("mask",{id:"mask__beam",maskUnits:"userSpaceOnUse",x:0,y:0,width:x,height:x},i.createElement("rect",{width:x,height:x,rx:e.square?void 0:2*x,fill:"white"})),i.createElement("g",{mask:"url(#mask__beam)"},i.createElement("rect",{width:x,height:x,fill:t.backgroundColor}),i.createElement("rect",{x:"0",y:"0",width:x,height:x,transform:"translate("+t.wrapperTranslateX+" "+t.wrapperTranslateY+") rotate("+t.wrapperRotate+" "+x/2+" "+x/2+") scale("+t.wrapperScale+")",fill:t.wrapperColor,rx:t.isCircle?x:x/6}),i.createElement("g",{transform:"translate("+t.faceTranslateX+" "+t.faceTranslateY+") rotate("+t.faceRotate+" "+x/2+" "+x/2+")"},t.isMouthOpen?i.createElement("path",{d:"M18 "+(19+t.mouthSpread)+"l ".concat(t.faceTranslateX<0?"-":"","2,4 h").concat(t.faceTranslateX<0?"":"-","2"),stroke:t.faceColor,fill:"none",strokeLinecap:"round"}):i.createElement("path",{d:"M13,"+(19+t.mouthSpread)+"6",fill:t.faceColor}),i.createElement("rect",{x:14-t.eyeSpread,y:14,width:4,height:4,rx:2,stroke:"none",fill:t.faceColor}),i.createElement("rect",{x:20+t.eyeSpread,y:14,width:4,height:4,rx:2,stroke:"none",fill:t.faceColor}))))},b=4;var _=function(e){var t=function(e,t){var r=c(e),l=t&&t.length;return Array.from({length:b},(function(e,a){return{color:f(r+a,t,l)}}))}(e.name,e.colors),r=e.name.replace(/\s/g,"");return i.createElement("svg",{viewBox:"0 0 80 80",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size},i.createElement("mask",{id:"mask__sunset",maskUnits:"userSpaceOnUse",x:0,y:0,width:80,height:80},i.createElement("rect",{width:80,height:80,rx:e.square?void 0:160,fill:"white"})),i.createElement("g",{mask:"url(#mask__sunset)"},i.createElement("path",{fill:"url(#gradient_paint0_linear_"+r+")",d:"M0 0h80v40H0z"}),i.createElement("path",{fill:"url(#gradient_paint1_linear_"+r+")",d:"M0 40h80v40H0z"})),i.createElement("defs",null,i.createElement("linearGradient",{id:"gradient_paint0_linear_"+r,x1:40,y1:0,x2:40,y2:40,gradientUnits:"userSpaceOnUse"},i.createElement("stop",{stopColor:t[0].color}),i.createElement("stop",{offset:1,stopColor:t[1].color})),i.createElement("linearGradient",{id:"gradient_paint1_linear_"+r,x1:40,y1:40,x2:40,y2:80,gradientUnits:"userSpaceOnUse"},i.createElement("stop",{stopColor:t[2].color}),i.createElement("stop",{offset:1,stopColor:t[3].color}))))},k=3,O=80;var S=function(e){var t=function(e,t){var r=c(e),l=t&&t.length;return Array.from({length:k},(function(e,a){return{color:f(r+a,t,l),translateX:s(r*(a+1),O/10,1),translateY:s(r*(a+1),O/10,2),scale:1.2+s(r*(a+1),O/20)/10,rotate:s(r*(a+1),360,1)}}))}(e.name,e.colors);return i.createElement("svg",{viewBox:"0 0 "+O+" "+O,fill:"none",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size},i.createElement("mask",{id:"mask__marble",maskUnits:"userSpaceOnUse",x:0,y:0,width:O,height:O},i.createElement("rect",{width:O,height:O,rx:e.square?void 0:2*O,fill:"white"})),i.createElement("g",{mask:"url(#mask__marble)"},i.createElement("rect",{width:O,height:O,rx:"2",fill:t[0].color}),i.createElement("path",{filter:"url(#prefix__filter0_f)",d:"M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z",fill:t[1].color,transform:"translate("+t[1].translateX+" "+t[1].translateY+") rotate("+t[1].rotate+" "+O/2+" "+O/2+") scale("+t[2].scale+")"}),i.createElement("path",{filter:"url(#prefix__filter0_f)",style:{mixBlendMode:"overlay"},d:"M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z",fill:t[2].color,transform:"translate("+t[2].translateX+" "+t[2].translateY+") rotate("+t[2].rotate+" "+O/2+" "+O/2+") scale("+t[2].scale+")"})),i.createElement("defs",null,i.createElement("filter",{id:"prefix__filter0_f",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB"},i.createElement("feFlood",{floodOpacity:0,result:"BackgroundImageFix"}),i.createElement("feBlend",{in:"SourceGraphic",in2:"BackgroundImageFix",result:"shape"}),i.createElement("feGaussianBlur",{stdDeviation:7,result:"effect1_foregroundBlur"}))))};function z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}var j=["pixel","bauhaus","ring","beam","sunset","marble"],M={geometric:"beam",abstract:"bauhaus"},C=function(e){var t=e.variant,r=void 0===t?"marble":t,i=e.colors,c=void 0===i?["#92A1C6","#146A7C","#F0AB3D","#C271B4","#C20D90"]:i,o=e.name,h=void 0===o?"Clara Barton":o,s=e.square,f=void 0!==s&&s,m=e.size,u=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?z(r,!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({colors:c,name:h,size:void 0===m?40:m,square:f},a(e,["variant","colors","name","square","size"]));return{pixel:n.a.createElement(y,u),bauhaus:n.a.createElement(g,u),ring:n.a.createElement(p,u),beam:n.a.createElement(v,u),sunset:n.a.createElement(_,u),marble:n.a.createElement(S,u)}[Object.keys(M).includes(r)?M[r]:j.includes(r)?r:"marble"]};t.default=C}])}));
//# sourceMappingURL=index.js.map