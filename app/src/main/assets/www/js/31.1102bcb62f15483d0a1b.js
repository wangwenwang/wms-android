webpackJsonp([31],{UGL7:function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n("vgKQ"),c={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"RFInvMove"},[n("header",[n("i",{staticClass:"iconfont icon-xiangzuo1",on:{click:t.toIndex}}),n("span",[t._v("库存移动")]),n("i",{staticClass:"iconfont icon-saoma",on:{click:t.scan}})]),t._v(" "),n("div",{staticClass:"container"},[n("div",[n("span",[t._v("自库位")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.Loc,expression:"Loc"}],ref:"Loc",attrs:{placeholder:"请输入内容"},domProps:{value:t.Loc},on:{change:function(o){t.toUppercase("Loc")},keyup:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13,o.key,"Enter"))return null;t.getFocus("ToLoc")},focus:function(o){t.g_focus("Loc")},input:function(o){o.target.composing||(t.Loc=o.target.value)}}}),t._v(" "),t.Loc?n("i",{staticClass:"iconfont icon-cuowu",on:{click:function(o){t.clearInput("Loc")}}}):t._e()]),t._v(" "),n("div",[n("span",[t._v("自托盘号")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.PID,expression:"PID"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.PID},on:{change:function(o){t.toUppercase("PID")},keyup:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13,o.key,"Enter"))return null;t.getFocus("ToLoc")},focus:function(o){t.g_focus("PID")},blur:function(o){t.g_blur()},input:function(o){o.target.composing||(t.PID=o.target.value)}}}),t._v(" "),t.PID?n("i",{staticClass:"iconfont icon-cuowu",on:{click:function(o){t.clearInput("PID")}}}):t._e()]),t._v(" "),n("div",[n("span",[t._v("商品代码")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.Sku,expression:"Sku"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.Sku},on:{change:function(o){t.toUppercase("Sku")},keyup:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13,o.key,"Enter"))return null;t.getFocus("ToLoc")},focus:function(o){t.g_focus("Sku")},input:function(o){o.target.composing||(t.Sku=o.target.value)}}}),t._v(" "),t.Sku?n("i",{staticClass:"iconfont icon-cuowu",on:{click:function(o){t.clearInput("Sku")}}}):t._e()]),t._v(" "),n("div",[n("span",[t._v("至库位")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.ToLoc,expression:"ToLoc"}],ref:"ToLoc",attrs:{placeholder:"请输入内容"},domProps:{value:t.ToLoc},on:{change:function(o){t.toUppercase("ToLoc")},keyup:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13,o.key,"Enter"))return null;t.getFocus("Qty")},focus:function(o){t.g_focus("ToLoc")},input:function(o){o.target.composing||(t.ToLoc=o.target.value)}}}),t._v(" "),t.ToLoc?n("i",{staticClass:"iconfont icon-cuowu",on:{click:function(o){t.clearInput("ToLoc")}}}):t._e()]),t._v(" "),n("div",[n("span",[t._v("至托盘号")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.ToPID,expression:"ToPID"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.ToPID},on:{change:function(o){t.toUppercase("ToPID")},keyup:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13,o.key,"Enter"))return null;t.getFocus("Qty")},focus:function(o){t.g_focus("ToPID")},input:function(o){o.target.composing||(t.ToPID=o.target.value)}}}),t._v(" "),t.ToPID?n("i",{staticClass:"iconfont icon-cuowu",on:{click:function(o){t.clearInput("ToPID")}}}):t._e()]),t._v(" "),n("div",[n("span",[t._v("移动数量")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.Qty,expression:"Qty"}],ref:"Qty",attrs:{type:"number",placeholder:"请输入内容"},domProps:{value:t.Qty},on:{focus:function(o){t.getSelect("Qty")},change:function(o){t.toUppercase("Qty")},keyup:function(o){return"button"in o||!t._k(o.keyCode,"enter",13,o.key,"Enter")?t.MoveInventory(o):null},input:function(o){o.target.composing||(t.Qty=o.target.value)}}}),t._v(" "),t.Qty?n("i",{staticClass:"iconfont icon-cuowu",on:{click:function(o){t.clearInput("Qty")}}}):t._e()]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"g_doubleBtn"},[n("div",{on:{click:t.MoveInventory}},[t._v("执行移动")]),t._v(" "),n("div",{on:{click:t.viewInventory}},[t._v("查看库存")])])]),t._v(" "),t.tipsHide?n("div",{staticClass:"g_tips",on:{touchmove:function(t){t.preventDefault()}}},[n("div",[n("span",[t._v("错误信息")]),t._v(" "),n("span",[t._v(t._s(t.msg))]),t._v(" "),n("p",{on:{ref:t.inputFocus,click:function(o){t.tipsHideen(t.inputFocus)}}},[t._v("确定")])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"prompt"},[o("span",[this._v("0 - 表示全部可用数量")])])}]};var i=function(t){n("mvru")},s=n("VU/8")(e.a,c,!1,i,"data-v-04c387c0",null);o.default=s.exports},mvru:function(t,o){},vgKQ:function(t,o,n){"use strict";(function(t){o.a={name:"InventoryQuery",data:function(){return{Loc:"",PID:"",Sku:"",ToLoc:"",ToPID:"",Qty:"0",listData:{},tipsHide:!1,msg:"",inputFocus:""}},created:function(){if(this.$store.state.RFInvMoveCondition){var t=this.$store.state.RFInvMoveCondition;this.Loc=t.Loc,this.PID=t.PID,this.Sku=t.Sku,this.ToLoc=t.ToLoc,this.ToPID=t.ToPID,this.Qty=t.Qty}},mounted:function(){this.$refs.Loc.focus(),window.QRScanAjax=this.QRScanAjax,t("input").attr("maxlength","50")},methods:{QRScanAjax:function(t){var o=this.$store.state.ScanQRCodeInputName;this[o]=t,"Loc"==o||"PID"==o||"Sku"==o?this.$refs.ToLoc.focus():"ToLoc"==o||"ToPID"==o?this.$refs.Qty.focus():"Qty"==o&&this.MoveInventory()},clearData:function(){this.Loc="",this.PID="",this.Sku="",this.ToLoc="",this.ToPID="",this.Qty=""},focus:function(t){event.currentTarget.select()},MoveInventory:function(){var t=this;if(this.Loc&&this.ToLoc)if(this.Qty<0)t.msg="移动数量必须大于或等于0",t.tipsShow("Qty"),t.inputFocus="Qty";else{var o=this.HOST+"RFInvMove.do",n={Loc:this.Loc,Sku:this.Sku,PID:this.PID,ToLoc:this.ToLoc,ToPID:this.ToPID,Qty:this.Qty};this.httpRequest(o,n,function(o){t.clearData()},"Loc")}else t.msg="自库位、至库位不能为空",t.tipsShow("Loc"),t.inputFocus="Loc"},viewInventory:function(){var t=this,o=this.HOST+"RFInvQuery.do",n={Loc:this.Loc,Sku:this.Sku,PID:this.PID};this.httpRequest(o,n,function(o){t.$store.state.RFInvMoveCondition={Loc:t.Loc,PID:t.PID,Sku:t.Sku,ToLoc:t.ToLoc,ToPID:t.ToPID,Qty:t.Qty},t.$store.state.InventoryQuery=!1,t.$store.state.RFInvMove=!0,t.$router.push({name:"InventoryDetails",query:{}}),t.$store.state.QueryListData=o.data.data},"Loc")},toIndex:function(){this.$router.push({name:"Index"})}}}}).call(o,n("7t+N"))}});
//# sourceMappingURL=31.1102bcb62f15483d0a1b.js.map