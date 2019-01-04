webpackJsonp([6],{"+Jy3":function(e,t,o){"use strict";(function(e){t.a={name:"InventoryQuery",data:function(){return{LibraryCode:"",CommodityCode:"",descr:"",CustomerCode:"",PalletNum:"",ReceiptNum:"",SystemBatch:"",listData:{},tipsHide:!1,inputFocus:"",msg:""}},mounted:function(){this.$refs.LibraryCode.focus(),window.QRScanAjax=this.QRScanAjax,e("input").attr("maxlength","50")},created:function(){console.log(this.$store.state.inventoryCondition);var e=this.$store.state.inventoryCondition;this.LibraryCode=e.LibraryCode,this.CommodityCode=e.CommodityCode,this.descr=e.descr,this.CustomerCode=e.CustomerCode,this.PalletNum=e.PalletNum,this.ReceiptNum=e.ReceiptNum,this.SystemBatch=e.SystemBatch},methods:{QRScanAjax:function(e){this[this.$store.state.ScanQRCodeInputName]=e,this.sendParams()},sendParams:function(e){var t=this;if(!(this.LibraryCode||this.CommodityCode||this.descr||this.CustomerCode||this.PalletNum||this.ReceiptNum||this.SystemBatch))return t.tipsShow(e),t.inputFocus=e,void(t.msg="请至少填写一个信息");var o=this.HOST+"RFInvQuery.do",n={Loc:this.LibraryCode,Sku:this.CommodityCode,Descr:this.descr,StorerKey:this.CustomerCode,PID:this.PalletNum,Lottable10:this.ReceiptNum,Lot:this.SystemBatch};this.httpRequest(o,n,function(o){o.data.data.length?(t.$store.state.inventoryCondition={LibraryCode:t.LibraryCode,CommodityCode:t.CommodityCode,descr:t.descr,CustomerCode:t.CustomerCode,PalletNum:t.PalletNum,ReceiptNum:t.ReceiptNum,SystemBatch:t.SystemBatch},t.$store.state.InventoryQuery=!0,t.$store.state.RFInvMove=!1,t.$store.state.QueryListData=o.data.data,t.$router.push({name:"InventoryDetails",query:{}})):(t.tipsShow(e),t.inputFocus=e,t.msg="未查询到数据")},e)},toIndex:function(){this.$router.push({name:"Index"})}}}}).call(t,o("7t+N"))},"Z+1L":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("+Jy3"),i={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"InventoryQuery"},[o("header",[o("i",{staticClass:"iconfont icon-xiangzuo1",on:{click:e.toIndex}}),o("span",[e._v("库存查询")]),o("i",{staticClass:"iconfont icon-saoma",on:{click:e.scan}})]),e._v(" "),o("div",{staticClass:"container"},[o("div",[o("span",[e._v("库位代码")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.LibraryCode,expression:"LibraryCode"}],ref:"LibraryCode",attrs:{placeholder:"请输入内容"},domProps:{value:e.LibraryCode},on:{change:function(t){e.toUppercase("LibraryCode")},focus:function(t){e.g_focus("LibraryCode")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("LibraryCode")},input:function(t){t.target.composing||(e.LibraryCode=t.target.value)}}}),e._v(" "),e.LibraryCode?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("LibraryCode")}}}):e._e()]),e._v(" "),o("div",[o("span",[e._v("商品代码")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.CommodityCode,expression:"CommodityCode"}],ref:"CommodityCode",attrs:{placeholder:"请输入内容"},domProps:{value:e.CommodityCode},on:{change:function(t){e.toUppercase("CommodityCode")},focus:function(t){e.g_focus("CommodityCode")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("CommodityCode")},input:function(t){t.target.composing||(e.CommodityCode=t.target.value)}}}),e._v(" "),e.CommodityCode?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("CommodityCode")}}}):e._e()]),e._v(" "),o("div",[o("span",[e._v("商品名称")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.descr,expression:"descr"}],ref:"descr",staticStyle:{"text-transform":"none"},attrs:{placeholder:"请输入内容"},domProps:{value:e.descr},on:{focus:function(t){e.g_focus("descr")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("descr")},input:function(t){t.target.composing||(e.descr=t.target.value)}}}),e._v(" "),e.descr?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("descr")}}}):e._e()]),e._v(" "),o("div",[o("span",[e._v("客户代码")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.CustomerCode,expression:"CustomerCode"}],ref:"CustomerCode",attrs:{placeholder:"请输入内容"},domProps:{value:e.CustomerCode},on:{change:function(t){e.toUppercase("CustomerCode")},focus:function(t){e.g_focus("CustomerCode")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("CustomerCode")},input:function(t){t.target.composing||(e.CustomerCode=t.target.value)}}}),e._v(" "),e.CustomerCode?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("CustomerCode")}}}):e._e()]),e._v(" "),o("div",[o("span",[e._v("托盘编号")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.PalletNum,expression:"PalletNum"}],ref:"PalletNum",attrs:{placeholder:"请输入内容"},domProps:{value:e.PalletNum},on:{change:function(t){e.toUppercase("PalletNum")},focus:function(t){e.g_focus("PalletNum")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("PalletNum")},input:function(t){t.target.composing||(e.PalletNum=t.target.value)}}}),e._v(" "),e.PalletNum?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("PalletNum")}}}):e._e()]),e._v(" "),o("div",[o("span",[e._v("收货单号")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.ReceiptNum,expression:"ReceiptNum"}],ref:"ReceiptNum",attrs:{placeholder:"请输入内容"},domProps:{value:e.ReceiptNum},on:{change:function(t){e.toUppercase("ReceiptNum")},focus:function(t){e.g_focus("ReceiptNum")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("ReceiptNum")},input:function(t){t.target.composing||(e.ReceiptNum=t.target.value)}}}),e._v(" "),e.ReceiptNum?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("ReceiptNum")}}}):e._e()]),e._v(" "),o("div",[o("span",[e._v("系统批次")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.SystemBatch,expression:"SystemBatch"}],ref:"SystemBatch",attrs:{placeholder:"请输入内容"},domProps:{value:e.SystemBatch},on:{change:function(t){e.toUppercase("SystemBatch")},focus:function(t){e.g_focus("SystemBatch")},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.sendParams("SystemBatch")},input:function(t){t.target.composing||(e.SystemBatch=t.target.value)}}}),e._v(" "),e.SystemBatch?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(t){e.clearInput("SystemBatch")}}}):e._e()]),e._v(" "),o("span",{staticClass:"g_singleBtn",on:{click:function(t){e.sendParams("LibraryCode")}}},[e._v("查询")])]),e._v(" "),e.tipsHide?o("div",{staticClass:"g_tips",on:{touchmove:function(e){e.preventDefault()}}},[o("div",[o("span",[e._v("错误信息")]),e._v(" "),o("span",[e._v(e._s(e.msg))]),e._v(" "),o("p",{on:{click:function(t){e.tipsHideen(e.inputFocus)}}},[e._v("确定")])])]):e._e()])},staticRenderFns:[]};var s=function(e){o("yM+U")},a=o("VU/8")(n.a,i,!1,s,"data-v-32206098",null);t.default=a.exports},"yM+U":function(e,t){}});
//# sourceMappingURL=6.6db870038380911956ed.js.map