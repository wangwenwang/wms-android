webpackJsonp([24],{"2VbF":function(t,e,o){"use strict";(function(t){e.a={name:"",data:function(){return{tipsHide:!1,msg:"",CommodityCode:"",CustomerCode:"",CommodityName:"",StandardWeight:"",StandardVolume:"",LengthWidthHeight:""}},created:function(){this.CommodityCode=this.$route.query.sku,this.CustomerCode=this.$route.query.storerkey,this.CommodityName=this.$route.query.descr,this.StandardWeight=this.$route.query.stdcube,this.StandardVolume=this.$route.query.stdgrosswgt,this.LengthWidthHeight=this.$route.query.susr10},mounted:function(){this.$refs.StandardWeight.select(),window.QRScanAjax=this.QRScanAjax,t("input").attr("maxlength","50")},methods:{goPrev:function(){this.$router.push({name:"ScanCommodityCode",query:{input_CommodityCode:this.CommodityCode}})},QRScanAjax:function(t){var e=this.$store.state.ScanQRCodeInputName;this[e]=t,"StandardWeight"==e?this.getSelect("StandardVolume"):"StandardVolume"==e?this.getSelect("input_LibraryCode"):"LengthWidthHeight"==e&&this.submit()},submit:function(){var t=this;if(!this.StandardWeight)return t.msg="请填写标准重量",t.inputFocus="StandardWeight",void t.tipsShow("StandardWeight");if(!this.StandardVolume)return t.msg="请填写标准体积",t.inputFocus="StandardVolume",void t.tipsShow("StandardVolume");if(!this.LengthWidthHeight)return t.msg="请填写长*宽*高",t.inputFocus="LengthWidthHeight",void t.tipsShow("LengthWidthHeight");var e=t.HOST+"RFReceiveSkuInfo.do",o={storerkey:t.CustomerCode,whseid:t.$store.state.WarehouseCode,sku:t.CommodityCode,stdgrosswgt:t.StandardVolume,stdcube:t.StandardWeight,susr10:t.LengthWidthHeight};t.httpRequest(e,o,function(e){if("1"==e.data.data){var o=t.HOST+"RFReceiptSkuLottable.do",i={ReceiptKey:t.$store.state.Receipt_SubmitData[0].receiptkey,UserID:t.$store.state.UserID,Sku:t.CommodityCode};t.httpRequest(o,i,function(e){e.data.data.length?t.$store.state.Receipt_PrevBatchProp=e.data.data:t.$store.state.Receipt_PrevBatchProp=[];var o=t.HOST+"RFReceiveSku.do",i={ReceiptKey:t.$store.state.Receipt_SubmitData[0].receiptkey,StorerKey:t.$store.state.Receipt_SubmitData[0].storerkey,Sku:t.CommodityCode};t.httpRequest(o,i,function(e){console.log(e.data.data),e.data.data.length?(t.$store.state.RFReceiveSkuData=e.data.data,t.$router.push({name:"TakeDelivery",query:{Sku:t.CommodityCode}})):(t.tipsShow(),t.inputFocus="CommodityCode",t.msg="商品在收货单中不存在")},"CommodityCode")})}else t.tipsShow(),t.inputFocus="StandardWeight",t.msg="保存失败，请重新提交"},"StandardWeight")}}}}).call(e,o("7t+N"))},JSvW:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("2VbF"),a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"CommodityInfoEntry"},[o("header",[o("i",{staticClass:"iconfont icon-xiangzuo1",on:{click:t.goPrev}}),o("span",[t._v("商品信息录入")]),o("i",{staticClass:"iconfont icon-saoma",on:{click:t.scan}})]),t._v(" "),o("div",{staticClass:"container"},[o("div",[o("div",[o("span",[t._v("商品代码")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.CommodityCode,expression:"CommodityCode"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.CommodityCode},on:{input:function(e){e.target.composing||(t.CommodityCode=e.target.value)}}})]),t._v(" "),o("div",[o("span",[t._v("客户代码")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.CustomerCode,expression:"CustomerCode"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.CustomerCode},on:{input:function(e){e.target.composing||(t.CustomerCode=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"goodsName"},[o("span",[t._v("商品名称")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.CommodityName,expression:"CommodityName"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.CommodityName},on:{input:function(e){e.target.composing||(t.CommodityName=e.target.value)}}})]),t._v(" "),o("div",[o("span",[t._v("标准重量")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.StandardWeight,expression:"StandardWeight"}],ref:"StandardWeight",domProps:{value:t.StandardWeight},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.getFocus("StandardVolume")},focus:function(e){t.g_focus("StandardWeight")},input:function(e){e.target.composing||(t.StandardWeight=e.target.value)}}}),t._v(" "),o("span",[t._v("g")]),t._v(" "),t.StandardWeight?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("StandardWeight")}}}):t._e()]),t._v(" "),o("div",[o("span",[t._v("标准体积")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.StandardVolume,expression:"StandardVolume"}],ref:"StandardVolume",domProps:{value:t.StandardVolume},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.getFocus("LengthWidthHeight")},focus:function(e){t.g_focus("StandardVolume")},input:function(e){e.target.composing||(t.StandardVolume=e.target.value)}}}),t._v(" "),o("span",[t._v("cm³")]),t._v(" "),t.StandardVolume?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("StandardVolume")}}}):t._e()]),t._v(" "),o("div",[o("span",[t._v("长*宽*高")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.LengthWidthHeight,expression:"LengthWidthHeight"}],ref:"LengthWidthHeight",domProps:{value:t.LengthWidthHeight},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null},focus:function(e){t.g_focus("LengthWidthHeight")},input:function(e){e.target.composing||(t.LengthWidthHeight=e.target.value)}}}),t._v(" "),o("span",[t._v("cm")]),t._v(" "),t.LengthWidthHeight?o("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("LengthWidthHeight")}}}):t._e()]),t._v(" "),o("p",{staticClass:"positionFixed"},[o("span",{staticClass:"g_singleBtn",on:{click:t.submit}},[t._v("确定")])])]),t._v(" "),t.tipsHide?o("div",{staticClass:"g_tips",on:{touchmove:function(t){t.preventDefault()}}},[o("div",[o("span",[t._v("错误信息")]),t._v(" "),o("span",[t._v(t._s(t.msg))]),t._v(" "),o("p",{on:{click:function(e){t.tipsHideen(t.inputFocus)}}},[t._v("确定")])])]):t._e()])},staticRenderFns:[]};var n=function(t){o("Yvxt")},s=o("VU/8")(i.a,a,!1,n,null,null);e.default=s.exports},Yvxt:function(t,e){}});
//# sourceMappingURL=24.30b4bf72186f8a54d271.js.map