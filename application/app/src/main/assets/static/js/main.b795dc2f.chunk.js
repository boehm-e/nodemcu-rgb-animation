(this["webpackJsonpreact-integration-examples"]=this["webpackJsonpreact-integration-examples"]||[]).push([[0],{83:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var c=n(18),r=n(10),o=n.n(r),a=n(0),i=n.n(a),s=n(17),l=n.n(s),d=n(42),b=n(13),j=n(35),u=n(41),f=n(5),m="settings:SET_DARK_MODE",p="settings:SET_READING_HELP_ACTIVE";function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=t.type,c=t.payload;switch(n){case m:return Object(f.a)(Object(f.a)({},e),{},{darkMode:c});case p:return Object(f.a)(Object(f.a)({},e),{},{readingHelpActive:c});default:return e}}var x,O,g,v,w,y,k,N,C,S={darkMode:!1,readingHelpActive:!0},A=n(43),J=n(20),R=n(2),E=n(6),M=n(9),D=n(7),z=n(8),U=n.n(z),F=n(4),L=n.n(F),T=D.a.div(x||(x=Object(E.a)(["\n    width: calc(100% - 4rem);\n    margin: 2rem;\n    padding: 2rem;\n    box-sizing: border-box;\n    background: white;\n    border-radius: 1rem;\n    box-shadow: 10px 9px 17px 8px #0000003d;\n"]))),_=D.a.h2(O||(O=Object(E.a)(['\n    font-family: "Ubuntu";\n    font-weight: 500;\n    font-size: 2rem;\n    text-align: center;\n    margin-bottom: 0;\n    color: #673ab7;    \n']))),P=D.a.h2(g||(g=Object(E.a)(['\n    font-family: "Ubuntu";\n    font-weight: 500;\n    font-size: 1.5rem;\n    margin-top: 0; \n    padding-top: 0;\n    margin-bottom: 3rem;\n    \n']))),q=D.a.div(v||(v=Object(E.a)(["\n    height: 100%;\n    gap: 2rem;\n    padding: 0 2rem;\n    display: flex;\n    position: relative;\n    overflow: auto;\n    white-space: nowrap;\n"]))),I=D.a.div(w||(w=Object(E.a)(['\n    width: 5rem ;\n    min-width: 5rem ;\n    height: 8rem;\n    position: relative;\n    display: flex;\n    flex-flow: column;\n\n    &:before {\n        content: "";\n        width: 5rem ;\n        min-width: 5rem ;\n        height: 5rem;\n        border-radius: 50%;\n        background: #f7fbfe;\n        border: 2px solid #d8d8da;\n        display: inline-block;\n        position: relative;\n            \n        ',"\n        ",'\n\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n    }\n    \n    & .title {\n        /* position: absolute; */\n        /* bottom: -2.5rem; */\n        width: 100%;\n        text-align: center;\n        font-family: "Ubuntu";\n        font-weight: 500;\n        font-size: 1.5rem;\n    }\n'])),(function(e){return e.background&&'background-image: url("'.concat(e.background,'");')}),(function(e){return e.color&&"background-color: ".concat(e.color,";")})),X=n(39),H=n.n(X),B=n(1),W=D.a.div(y||(y=Object(E.a)(['\n    /* display: flex; */\n    /* width: 100vw; */\n    display: flex;\n    flex-flow: column;\n    justify-content: center;\n    align-items: center;\n    margin-top: 2rem;\n    /* display: grid; */\n    & .row {\n        display: block;\n        /* width: 100%; */\n    }\n\n    & .part {\n        width: calc((25vw - 2rem));        \n        height: calc((25vw - 2rem));        \n        display: block;\n        /* outline: 2px solid black; */\n        position: relative;\n        float: left;\n        display: flex;\n        justify-content: center;\n    } \n    & .topRight:after {\n        content: "";\n        width: calc((25vw - 2rem) - 1em - 2px);\n        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);\n        display: block;\n        position: absolute;\n        float: left;\n        border-top-right-radius: calc(100vw / 8);\n        border: var(--color) 1em solid;\n        background-clip: content-box;\n        border-bottom: none;\n        border-left: 0;\n        top: calc(50% - 0.5rem);\n        left: 0;\n    } \n    & .bottomRight:after {\n        content: "";\n        width: calc((25vw - 2rem) - 1em - 2px);\n        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);\n        display: block;\n        position: absolute;\n        float: left;\n        border-bottom-right-radius: calc(100vw / 8);\n        border: var(--color) 1em solid;\n        background-clip: content-box;\n        border-left: none;\n        border-top: none;\n        top: 1px;\n        left: 0;\n    } \n    & .bottomLeft:after {\n        content: "";\n        width: calc((25vw - 2rem) - 1em - 2px);\n        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);\n        display: block;\n        position: absolute;\n        float: left;\n        border-bottom-left-radius: calc(100vw / 8);\n        border: var(--color) 1em solid;\n        background-clip: content-box;\n        border-right: none;\n        border-top: none;\n        left: 0;\n        top: 1px;\n    } \n    \n    & .topLeft:after {\n        content: "";\n        width: calc((25vw - 2rem) - 1em - 2px);\n        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);\n        display: block;\n        position: absolute;\n        float: left;\n        border-top-left-radius: calc(100vw / 8);\n        border: var(--color) 1em solid;\n        background-clip: content-box;\n        border-bottom: none;\n        border-right: none;\n        bottom: calc(-50% + 0.5em);\n        left: 0;\n        bottom: 1px;\n    }\n    & .normal:after{\n        content: "";\n        top: 0;\n        left: 0;\n        width: calc(100% - 2px);\n        height: 1rem;\n        background-color: var(--color);\n        margin-top: calc(50% - 0.5rem);\n        position: absolute;\n    }\n']))),Y=D.a.input.attrs({type:"checkbox"})(k||(k=Object(E.a)(["\n"]))),G=D.a.button(N||(N=Object(E.a)(['\n    font-family: "Ubuntu";\n    background: white;\n    border: 1px solid black;\n    padding: 0.5rem 1rem ;\n    width: 100%;\n    margin-top: 1rem;\n']))),K=D.a.div(C||(C=Object(E.a)(['\n    font-family: "Ubuntu";\n\n\n    & .colorProfile {\n        display: flex;\n        justify-content: space-around;\n        padding: 1rem 0;\n        border-bottom: 1px solid black;\n        align-items: center;\n\n        & .name {\n            width: 50%;\n        }\n\n        & button {\n            font-family: "Ubuntu";\n            background: white;\n            border: 1px solid black;\n            padding: 0.5rem 1rem ;\n        }\n    }\n\n']))),Q=function(){var e=Object(a.useState)(!1),t=Object(R.a)(e,2),n=(t[0],t[1],Object(a.useState)([{selected:!1,color:"#ff00ff"},{selected:!1,color:"#C0C0C0"},{selected:!1,color:"#808080"},{selected:!1,color:"#D9E3F0"},{selected:!1,color:"#F47373"},{selected:!1,color:"#697689"},{selected:!1,color:"#37D67A"},{selected:!1,color:"#2CCCE4"},{selected:!1,color:"#555555"},{selected:!1,color:"#dce775"},{selected:!1,color:"#ff8a65"},{selected:!1,color:"#ba68c8"},{selected:!1,color:"#ba68c8"},{selected:!1,color:"#ba68c8"},{selected:!1,color:"#ba68c8"},{selected:!1,color:"#ba68c8"}])),c=Object(R.a)(n,2),r=c[0],o=c[1],s=i.a.memo((function(e){var t=e.idx,n=e.className,c=function(e){return r[e].selected}(t),a={"--color":r[t].color};return Object(B.jsx)("span",{"data-id":t,onClick:function(){!function(e,t){var n=Object(J.a)(r);n[e].selected=t,console.log(n),o(n)}(t,!c)},style:a,className:"part ".concat(c&&"selected"," ").concat(n),children:Object(B.jsx)(Y,{readOnly:!0,"data-id":t,checked:c})},t)})),l=Object(a.useState)("#aabbcc"),d=Object(R.a)(l,2),b=d[0],j=d[1],u=H()("colorProfiles","[]"),m=Object(R.a)(u,2),p=m[0],h=m[1],x=function(e){var t=e.map((function(e){return U()(e.color).rgbNumber()}));L.a.post("http://192.168.1.136/setColors",JSON.stringify(t))};Object(a.useEffect)((function(){var e=r.map((function(e){return e.selected?Object(f.a)(Object(f.a)({},e),{},{color:b}):e}));o(e),x(e)}),[b,p]);return Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)(T,{children:[Object(B.jsx)(P,{children:"Contr\xf4ler par parties"}),Object(B.jsxs)(W,{children:[Object(B.jsxs)("div",{className:"row",children:[Object(B.jsx)(s,{idx:0,className:"normal"}),Object(B.jsx)(s,{idx:1,className:"normal"}),Object(B.jsx)(s,{idx:2,className:"normal"}),Object(B.jsx)(s,{idx:3,className:"topRight"})]}),Object(B.jsxs)("div",{className:"row",children:[Object(B.jsx)(s,{idx:7,className:"topLeft"}),Object(B.jsx)(s,{idx:6,className:"normal"}),Object(B.jsx)(s,{idx:5,className:"normal"}),Object(B.jsx)(s,{idx:4,className:"bottomRight"})]}),Object(B.jsxs)("div",{className:"row",children:[Object(B.jsx)(s,{idx:8,className:"bottomLeft"}),Object(B.jsx)(s,{idx:9,className:"normal"}),Object(B.jsx)(s,{idx:10,className:"normal"}),Object(B.jsx)(s,{idx:11,className:"topRight"})]}),Object(B.jsxs)("div",{className:"row",children:[Object(B.jsx)(s,{idx:15,className:"normal"}),Object(B.jsx)(s,{idx:14,className:"normal"}),Object(B.jsx)(s,{idx:13,className:"normal"}),Object(B.jsx)(s,{idx:12,className:"bottomRight"})]})]}),Object(B.jsx)(M.a,{color:b,onChange:j}),Object(B.jsx)(G,{onClick:function(){var e=prompt("Nom du profil");h(JSON.stringify([].concat(Object(J.a)(JSON.parse(p)),[{id:p.length+1,name:e,data:r}])))},children:"Sauvegarder"}),Object(B.jsx)(K,{children:JSON.parse(p).map((function(e){return Object(B.jsxs)("div",{className:"colorProfile",children:[Object(B.jsx)("div",{className:"name",children:e.name}),Object(B.jsx)("button",{onClick:function(){o(e.data),x(e.data)},className:"restore",children:"Appliquer"}),Object(B.jsx)("div",{onClick:function(){return t=e.id,void h(JSON.stringify(Object(J.a)(JSON.parse(p).filter((function(e){return e.id!=t})))));var t},className:"delete",children:"X"})]})}))})]})})},V=function(){var e=Object(a.useState)(0),t=Object(R.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){L.a.post("http://192.168.1.136/setColor",JSON.stringify({id:parseInt(n),color:16711680}))}),[n]),Object(B.jsxs)(T,{children:[Object(B.jsx)(P,{children:"Debug"}),Object(B.jsx)("input",{type:"number",value:n,onChange:function(e){var t;return c(null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.value)}})]})},Z=function(){var e=Object(a.useState)("#ff0000"),t=Object(R.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)("#0000ff"),o=Object(R.a)(r,2),i=o[0],s=o[1],l=function(e){L.a.post("http://192.168.1.136/setAnimation",JSON.stringify({name:e}))};return Object(a.useEffect)((function(){L.a.post("http://192.168.1.136/setAnimationColors",JSON.stringify({color1:U()(n).rgbNumber(),color2:U()(i).rgbNumber()}))}),[n,i]),Object(B.jsxs)(T,{style:{padding:"2rem 0"},children:[Object(B.jsx)(P,{style:{paddingLeft:"2rem"},children:"Animations"}),Object(B.jsxs)(q,{children:[Object(B.jsx)(I,{onClick:function(){return l("reverse")},color:"#fceba1",background:"https://i.ibb.co/X2sYRMn/arrows-reverse-transfer-switch-line-icon.jpg",children:Object(B.jsx)("span",{className:"title",children:"Reverse"})}),Object(B.jsx)(I,{onClick:function(){return l("scanner")},color:"#fceba1",background:"https://hackster.imgix.net/uploads/attachments/357764/giphy_P5EUwFmXQS.gif?auto=compress&gifq=35&w=600&h=450&fit=min",children:Object(B.jsx)("span",{className:"title",children:"Scanner"})}),Object(B.jsx)(I,{onClick:function(){return l("fade")},color:"#fceba1",background:"https://thumbs.gfycat.com/IdenticalDigitalAndeancat-size_restricted.gif",children:Object(B.jsx)("span",{className:"title",children:"Fade"})}),Object(B.jsx)(I,{onClick:function(){return l("rainbow")},color:"#fceba1",background:"http://static.skaip.org/img/emoticons/180x180/f6fcff/rainbow.gif",children:Object(B.jsx)("span",{className:"title",children:"Rainbow"})}),Object(B.jsx)(I,{onClick:function(){return l("twinkle")},background:"https://art.pixilart.com/2d841d2d492b932.gif",children:Object(B.jsx)("span",{className:"title",children:"twinkle"})}),Object(B.jsx)(I,{onClick:function(){return l("theater")},background:"https://i.pinimg.com/originals/1c/18/de/1c18de56bb18a86cbecbd8da93fce410.gif",children:Object(B.jsx)("span",{className:"title",children:"Theater"})}),Object(B.jsx)(I,{onClick:function(){return l("wipe")},background:"https://art.pixilart.com/b631903b2d6208c.gif",children:Object(B.jsx)("span",{className:"title",children:"Wipe"})}),Object(B.jsx)(I,{onClick:function(){return l("off")},color:"#000000",children:Object(B.jsx)("span",{className:"title",children:"Off"})})]}),Object(B.jsxs)("div",{style:{width:"100%",display:"flex",gap:"1rem",padding:"1rem",boxSizing:"border-box"},children:[Object(B.jsx)("div",{style:{width:"50%"},children:Object(B.jsx)(M.a,{color:n,onChange:c})}),Object(B.jsx)("div",{style:{width:"50%"},children:Object(B.jsx)(M.a,{color:i,onChange:s})})]})]})},$=function(){var e=Object(a.useState)("#ff0000"),t=Object(R.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)("#0000ff"),o=Object(R.a)(r,2),i=o[0],s=o[1];return Object(a.useEffect)((function(){L.a.post("http://192.168.1.136/setAnimationColors",JSON.stringify({color1:U()(n).rgbNumber(),color2:U()(i).rgbNumber()}))}),[n,i]),Object(B.jsxs)(T,{style:{padding:"2rem 0"},children:[Object(B.jsx)(P,{style:{paddingLeft:"2rem"},children:"Jeux"}),Object(B.jsx)(q,{children:Object(B.jsx)(I,{onClick:function(){return e="game",void L.a.post("http://192.168.1.136/setAnimation",JSON.stringify({name:e}));var e},color:"#fceba1",background:"https://i.ibb.co/X2sYRMn/arrows-reverse-transfer-switch-line-icon.jpg",children:Object(B.jsx)("span",{className:"title",children:"Jeu 1"})})}),Object(B.jsxs)("div",{style:{width:"100%",display:"flex",gap:"1rem",padding:"1rem",boxSizing:"border-box"},children:[Object(B.jsx)("div",{style:{width:"50%"},children:Object(B.jsx)(M.a,{color:n,onChange:c})}),Object(B.jsx)("div",{style:{width:"50%"},children:Object(B.jsx)(M.a,{color:i,onChange:s})})]})]})},ee=n(40),te=n.n(ee),ne=-1,ce=function(){var e=Object(a.useState)(null),t=Object(R.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(-1),s=Object(R.a)(i,2),l=s[0],d=s[1],b=Object(a.useState)(-1),j=Object(R.a)(b,2),u=j[0],f=j[1],m=function(e){L.a.post("http://192.168.1.136/setMusic",JSON.stringify({volume:e}))},p=function(){var e=Object(c.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then((function(e){r(e);var t=new AudioContext,n=t.createAnalyser(),c=t.createMediaStreamSource(e),o=t.createScriptProcessor(2048,1,1);n.smoothingTimeConstant=.8,n.fftSize=1024,c.connect(n),n.connect(o),o.connect(t.destination),o.onaudioprocess=function(){var e=new Uint8Array(n.frequencyBinCount);n.getByteFrequencyData(e);var t,c,r=e.reduce((function(e,t){return e+t}),0)/e.length,o=Math.round(r),a=Math.floor((o-(t=0))*(10-(c=-1))/(40-t)+c);d(o),f(a),a!=ne&&a>0&&(ne=a,m(a))}})).catch((function(e){console.error(e)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(B.jsx)(T,{children:Object(B.jsxs)(P,{style:{display:"flex",justifyContent:"space-between",margin:"0"},children:["Musique",Object(B.jsx)("br",{}),l,Object(B.jsx)("br",{}),u,Object(B.jsx)(te.a,{onChange:function(){n?(n.getTracks().forEach((function(e){return e.stop()})),r(null)):p()},checked:!!n})]})})},re=function(){Object(A.a)();return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(_,{children:"Chambre d'\xc9line"}),Object(B.jsx)(ce,{}),Object(B.jsx)(Q,{}),Object(B.jsx)(V,{}),Object(B.jsx)(Z,{}),Object(B.jsx)($,{})]})},oe=(n(83),function(){var e=Object(c.a)(o.a.mark((function e(){var t,n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(b.combineReducers)({settingsReducer:h}),n=Object(j.composeWithDevTools)(Object(b.applyMiddleware)(u.a)),c=Object(b.createStore)(t,{settingsReducer:S},n),l.a.render(Object(B.jsx)(d.a,{store:c,children:Object(B.jsx)(re,{})}),document.body);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());oe()}},[[84,1,2]]]);
//# sourceMappingURL=main.b795dc2f.chunk.js.map