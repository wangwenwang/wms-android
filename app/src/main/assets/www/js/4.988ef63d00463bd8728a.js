webpackJsonp([4],{Cf6U:function(t,n){},EJet:function(t,n,c){"use strict";(function(t){n.a={name:"Putaway",data:function(){return{PID:"",Loc:"STAGE",tipsHide:!1,msg:"",inputFocus:""}},mounted:function(){this.$refs.PID.focus(),window.QRScanAjax=this.QRScanAjax,t("input").attr("maxlength","50")},methods:{QRScanAjax:function(t){var n=this.$store.state.ScanQRCodeInputName;this[n]=t,"PID"==n?this.confirmOnclick():"Loc"==n&&this.confirmOnclick()},confirmOnclick:function(){var t=this;if(""==this.PID)this.msg="托盘号不能为空",t.tipsShow("PID"),t.inputFocus="PID";else if(""==this.Loc)this.msg="库位代码不能为空",t.tipsShow("Loc"),t.inputFocus="Loc";else{var n=this.HOST+"RFPutawayQuery.do",c={Loc:this.Loc,PID:this.PID};this.httpRequest(n,c,function(n){t.$router.push({name:"PutawayDetails",query:{listData:n.data}})},"PID")}},toIndex:function(){this.$router.push({name:"Index"})}}}}).call(n,c("7t+N"))},jo2S:function(t,n,c){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=c("EJet"),o={render:function(){var t=this,n=t.$createElement,c=t._self._c||n;return c("div",{staticClass:"Putaway"},[c("header",[c("i",{staticClass:"iconfont icon-xiangzuo1",on:{click:t.toIndex}}),c("span",[t._v("上架")]),c("i",{staticClass:"iconfont icon-saoma",on:{click:t.scan}})]),t._v(" "),c("div",{staticClass:"container"},[c("div",[c("span",[t._v("托盘编号")]),t._v(" "),c("input",{directives:[{name:"model",rawName:"v-model",value:t.PID,expression:"PID"}],ref:"PID",attrs:{placeholder:"请输入内容"},domProps:{value:t.PID},on:{change:function(n){t.toUppercase("PID")},keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.confirmOnclick(n):null},focus:function(n){t.g_focus("PID")},blur:function(n){t.g_blur()},input:function(n){n.target.composing||(t.PID=n.target.value)}}}),t._v(" "),t.PID?c("i",{staticClass:"iconfont icon-cuowu",on:{click:function(n){t.clearInput("PID")}}}):t._e()]),t._v(" "),c("div",[c("span",[t._v("库位代码")]),t._v(" "),c("input",{directives:[{name:"model",rawName:"v-model",value:t.Loc,expression:"Loc"}],ref:"Loc",attrs:{placeholder:"请输入内容"},domProps:{value:t.Loc},on:{change:function(n){t.toUppercase("Loc")},keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.confirmOnclick(n):null},focus:function(n){t.g_focus("Loc")},blur:function(n){t.g_blur()},input:function(n){n.target.composing||(t.Loc=n.target.value)}}}),t._v(" "),t.Loc?c("i",{staticClass:"iconfont icon-cuowu",on:{click:function(n){t.clearInput("Loc")}}}):t._e()]),t._v(" "),c("span",{staticClass:"g_singleBtn",on:{click:t.confirmOnclick}},[t._v("确认")])]),t._v(" "),t.tipsHide?c("div",{staticClass:"g_tips",on:{touchmove:function(t){t.preventDefault()}}},[c("div",[c("span",[t._v("错误信息")]),t._v(" "),c("span",[t._v(t._s(t.msg))]),t._v(" "),c("p",{on:{ref:t.inputFocus,click:function(n){t.tipsHideen(t.inputFocus)}}},[t._v("确定")])])]):t._e()])},staticRenderFns:[]};var e=function(t){c("Cf6U")},s=c("VU/8")(i.a,o,!1,e,"data-v-ce91b2ce",null);n.default=s.exports}});
//# sourceMappingURL=4.988ef63d00463bd8728a.js.map