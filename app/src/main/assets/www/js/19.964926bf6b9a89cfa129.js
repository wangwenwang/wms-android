webpackJsonp([19],{"4OUp":function(t,e,a){"use strict";(function(t){e.a={name:"TakeDelivery",data:function(){return{input_ReceiptNum:"",input_CustomerNum:"",input_CommodityCode:"",input_CustomerCode:"",input_CommodityName:"",input_toBeReceived:"",input_AmountReceived:"",input_num:"",input_unit:"",input_StateOfGoods:"",Lottable03OnRFReceiptMandatory:"",Lottable04OnRFReceiptMandatory:"",Lottable05OnRFReceiptMandatory:"",Lottable06OnRFReceiptMandatory:"",Lottable07OnRFReceiptMandatory:"",Lottable08OnRFReceiptMandatory:"",Lottable01OnRFReceiptMandatory:"",Lottable09OnRFReceiptMandatory:"",Lottable10OnRFReceiptMandatory:"",input_PalleNumber:"",input_LibraryCode:"STAGE",warningInfo:"",tipsHide:!1,msg:"",roterPath:"",inputFocus:"",StateOfGoodsData:[]}},mounted:function(){var e=this;function a(t){e.$refs[t]?"Lottable04OnRFReceiptMandatory"!=t&&"Lottable05OnRFReceiptMandatory"!=t||(e[t]=e[t].substring(0,10)):e[t]=""}this.$refs.input_num.focus(),window.QRScanAjax=this.QRScanAjax,t("input").attr("maxlength","50"),a("Lottable01OnRFReceiptMandatory"),a("Lottable03OnRFReceiptMandatory"),a("Lottable04OnRFReceiptMandatory"),a("Lottable05OnRFReceiptMandatory"),a("Lottable06OnRFReceiptMandatory"),a("Lottable07OnRFReceiptMandatory"),a("Lottable08OnRFReceiptMandatory"),a("Lottable09OnRFReceiptMandatory"),a("Lottable10OnRFReceiptMandatory"),t("input[requireds]").each(function(a){parseInt(e.SummaryData[t("input[requireds]").eq(a).attr("requireds")])&&(t(this).val()||t("input[requireds]").eq(a).css("border-color","red"))})},created:function(){var e=this;if(e.$store.state.Receipt_SubmitData.length){var a=e.$store.state.Receipt_SubmitData;e.input_ReceiptNum=a[0].receiptkey,e.input_CustomerNum=a[0].externalreceiptkey2,e.input_CustomerCode=a[0].storerkey}if(e.$store.state.RFReceiveSkuData.length){var n=e.$store.state.RFReceiveSkuData[0];e.input_CommodityName=n.Descr,e.input_AmountReceived=n.qtyReceived,e.input_toBeReceived=n.qtyRemain,e.input_CommodityCode=n.Sku,e.input_unit=n.Susr2,this.SummaryData=n,this.SummaryData.input_num=1}if(e.$store.state.Receipt_PrevBatchProp.length){var o=e.$store.state.Receipt_PrevBatchProp;e.Lottable01OnRFReceiptMandatory=o[0].Lottable01,e.input_StateOfGoods=o[0].Lottable02,e.Lottable03OnRFReceiptMandatory=o[0].Lottable03,e.Lottable04OnRFReceiptMandatory=o[0].Lottable04,e.Lottable05OnRFReceiptMandatory=o[0].Lottable05,e.Lottable06OnRFReceiptMandatory=o[0].Lottable06,e.Lottable07OnRFReceiptMandatory=o[0].Lottable07,e.Lottable08OnRFReceiptMandatory=o[0].Lottable08,e.Lottable09OnRFReceiptMandatory=o[0].Lottable09,e.Lottable10OnRFReceiptMandatory=o[0].Lottable10}if(e.$store.state.StateOfGoodsData.length){e.StateOfGoodsData=e.$store.state.StateOfGoodsData,console.log(e.input_StateOfGoods);for(var i=0;i<e.StateOfGoodsData.length;i++)if(e.input_StateOfGoods==e.StateOfGoodsData[i].Code){console.log(e.input_StateOfGoods),console.log(e.StateOfGoodsData[i].Code),setInterval(function(){t("select>option").eq(i).attr("selected","selected").siblings().removeAttr("selected")},20);break}}else{var r=this.HOST+"GoodsStatus.do";e.httpRequest(r,{Code:"",Descr:""},function(a){e.StateOfGoodsData=a.data.data,console.log(e.input_StateOfGoods),e.$store.state.StateOfGoodsData=a.data.data;for(var n=0;n<e.StateOfGoodsData.length;n++)if(e.input_StateOfGoods==e.StateOfGoodsData[n].Code){setInterval(function(){t("select>option").eq(n).attr("selected","selected").siblings().removeAttr("selected")},20);break}})}},methods:{QRScanAjax:function(t){var e=this.$store.state.ScanQRCodeInputName;this[e]=t,"input_PalleNumber"==e?this.getSelect("input_LibraryCode"):"input_LibraryCode"==e&&this.submit()},ToReceipt:function(){this.$store.state.Receipt_PrevBatchProp=[],this.$router.push({name:"ScanCommodityCode",query:{input_CommodityCode:this.input_CommodityCode}})},onblur:function(e,a){e&&t("input[requireds]").each(function(e){t("input[requireds]").eq(e).attr("requireds")==a&&(t("input[requireds]").eq(e).val()?t("input[requireds]").eq(e).css("border-color","#bbb"):t("input[requireds]").eq(e).css("border-color","red"))})},nextFocus:function(e){var a,n=this,o=!0;t("input[requireds]").each(function(i){if(console.log(i),parseInt(n.SummaryData[t("input[requireds]").eq(i).attr("requireds")])&&(t(this).val()||t("input[requireds]").eq(i).css("border-color","red")),e==t("input[requireds]").eq(i).attr("requireds")&&(a=i+1),parseInt(n.SummaryData[t("input[requireds]").eq(a).attr("requireds")]))return n.$refs[t("input[requireds]").eq(a).attr("copyRef")].focus(),void(o=!1);a+=1}),o&&n.$refs.input_PalleNumber.focus()},submit:function(){var e=this,a=!1;if(t("input[requireds]").each(function(n){parseInt(e.SummaryData[t("input[requireds]").eq(n).attr("requireds")])&&(t(this).val()||(t("input[requireds]").eq(n).css("border-color","red"),a=!0))}),a){var n=!1;return t("input[requireds]").each(function(a){if(!n)return"rgb(255, 0, 0)"==t("input[requireds]").eq(a).css("border-color")?(e.inputFocus=t("input[requireds]").eq(a).attr("requireds"),void(n=!0)):void 0}),e.tipsShow("input_LibraryCode"),void(e.msg="请填写必填项")}if(e.$refs.input_StateOfGoods)for(var o=0;o<e.StateOfGoodsData.length;o++)e.$refs.input_StateOfGoods.value==e.StateOfGoodsData[o].Descr&&(e.input_StateOfGoods=e.StateOfGoodsData[o].Code);else e.input_StateOfGoods=e.StateOfGoodsData[0].Code;if(e.Lottable04OnRFReceiptMandatory){e.Lottable04OnRFReceiptMandatory=e.ValidationTimeFormat(e.Lottable04OnRFReceiptMandatory,"Lottable04OnRFReceiptMandatory");var i=(new Date).getFullYear(),r=(new Date).getMonth(),u=(new Date).getDate(),c=e.Lottable04OnRFReceiptMandatory;if(parseInt(c.substring(0,4))>parseInt(i))return e.tipsShow("input_LibraryCode"),e.msg="生产日期不能大于当前日期",void(e.inputFocus="Lottable04OnRFReceiptMandatory");if(parseInt(c.substring(0,4))==parseInt(i)&&parseInt(c.substring(5,7))>parseInt(r)+1)return e.tipsShow("input_LibraryCode"),e.msg="生产日期不能大于当前日期",void(e.inputFocus="Lottable04OnRFReceiptMandatory");if(parseInt(c.substring(0,4))==parseInt(i)&&parseInt(c.substring(5,7))==parseInt(r)+1&&parseInt(c.substring(8,10))>parseInt(u))return e.tipsShow("input_LibraryCode"),e.msg="生产日期不能大于当前日期",void(e.inputFocus="Lottable04OnRFReceiptMandatory");if(!e.Lottable04OnRFReceiptMandatory)return void e.getFocus("Lottable04OnRFReceiptMandatory")}if(!e.Lottable05OnRFReceiptMandatory||(e.Lottable05OnRFReceiptMandatory=e.ValidationTimeFormat(e.Lottable05OnRFReceiptMandatory,"Lottable05OnRFReceiptMandatory"),e.Lottable05OnRFReceiptMandatory))if(!e.Lottable09OnRFReceiptMandatory||(e.Lottable09OnRFReceiptMandatory=e.ValidationTimeFormat(e.Lottable09OnRFReceiptMandatory,"Lottable09OnRFReceiptMandatory"),e.Lottable09OnRFReceiptMandatory)){var p=this.HOST+"RFReceive.do",s={ReceiptKey:this.input_ReceiptNum,StorerKey:this.input_CustomerCode,Sku:this.input_CommodityCode,Qty:this.input_num,Lottable03:this.Lottable03OnRFReceiptMandatory,Lottable02:this.input_StateOfGoods,Lottable04:this.Lottable04OnRFReceiptMandatory,Lottable05:this.Lottable05OnRFReceiptMandatory,Lottable06:this.Lottable06OnRFReceiptMandatory,Lottable07:this.Lottable07OnRFReceiptMandatory,Lottable08:this.Lottable08OnRFReceiptMandatory,Lottable09:this.Lottable09OnRFReceiptMandatory,Lottable10:this.Lottable10OnRFReceiptMandatory,Lottable01:this.Lottable01OnRFReceiptMandatory,PID:this.input_PalleNumber,Loc:this.input_LibraryCode};this.httpRequest(p,s,function(t){e.$store.state.Receipt_PrevBatchProp=[],e.$router.push({name:"ScanCommodityCode",query:{}})})}else e.getFocus("Lottable09OnRFReceiptMandatory");else e.getFocus("Lottable05OnRFReceiptMandatory")},ValidationTimeFormat:function(t,e){var a=(new Date).getFullYear()+"";return 4!=t.length&&6!=t.length&&8!=t.length&&10!=t.length?(this.tipsShow("input_LibraryCode"),this.msg="请填写正确的日期格式 ; 例如20180524 , 或2018-05-24",void(this.inputFocus=e)):10==t.length?"-"==t[4]&&"-"==t[7]?t:(this.tipsShow("input_LibraryCode"),this.msg="请填写正确的日期格式 ; 例如20180524 , 或2018-05-24",void(this.inputFocus=e)):4==t.length?a+"-"+t.substring(0,2)+"-"+t.substring(2,4):6==t.length?a.substring(0,2)+t.substring(0,2)+"-"+t.substring(2,4)+"-"+t.substring(4,6):8==t.length?t.substring(0,4)+"-"+t.substring(4,6)+"-"+t.substring(6,8):void 0}}}}).call(e,a("7t+N"))},MIet:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("4OUp"),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"TakeDelivery"},[a("header",[a("i",{staticClass:"iconfont icon-xiangzuo1",on:{click:t.ToReceipt}}),a("span",[t._v("收货")]),a("i",{staticClass:"iconfont icon-saoma",on:{click:t.scan}})]),t._v(" "),a("div",{staticClass:"container"},[a("div",[a("div",[a("span",[t._v("收货单号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_ReceiptNum,expression:"input_ReceiptNum"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_ReceiptNum},on:{input:function(e){e.target.composing||(t.input_ReceiptNum=e.target.value)}}})]),t._v(" "),a("div",[a("span",[t._v("客户单号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_CustomerNum,expression:"input_CustomerNum"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_CustomerNum},on:{input:function(e){e.target.composing||(t.input_CustomerNum=e.target.value)}}})])]),t._v(" "),a("div",[a("div",[a("span",[t._v("商品代码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_CommodityCode,expression:"input_CommodityCode"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_CommodityCode},on:{input:function(e){e.target.composing||(t.input_CommodityCode=e.target.value)}}})]),t._v(" "),a("div",[a("span",[t._v("客户代码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_CustomerCode,expression:"input_CustomerCode"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_CustomerCode},on:{input:function(e){e.target.composing||(t.input_CustomerCode=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"goodsName"},[a("span",[t._v("商品名称")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input_CommodityName,expression:"input_CommodityName"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_CommodityName},on:{input:function(e){e.target.composing||(t.input_CommodityName=e.target.value)}}})]),t._v(" "),a("div",[a("div",[a("span",[t._v("待收数量")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_toBeReceived,expression:"input_toBeReceived"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_toBeReceived},on:{input:function(e){e.target.composing||(t.input_toBeReceived=e.target.value)}}})]),t._v(" "),a("div",[a("span",[t._v("已收数量")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_AmountReceived,expression:"input_AmountReceived"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_AmountReceived},on:{input:function(e){e.target.composing||(t.input_AmountReceived=e.target.value)}}})])]),t._v(" "),a("div",[a("div",[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_num,expression:"input_num"}],ref:"input_num",attrs:{type:"number",requireds:"input_num",placeholder:"必填"},domProps:{value:t.input_num},on:{change:function(e){t.toUppercase("input_num")},blur:function(e){t.onblur(!0,"input_num")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("input_num")},focus:function(e){t.g_focus("input_num")},input:function(e){e.target.composing||(t.input_num=e.target.value)}}}),t._v(" "),t.input_num?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("input_num")}}}):t._e()]),t._v(" "),a("div",[a("span",[t._v("单位")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_unit,expression:"input_unit"}],staticClass:"readonly_input",attrs:{readonly:""},domProps:{value:t.input_unit},on:{input:function(e){e.target.composing||(t.input_unit=e.target.value)}}})])]),t._v(" "),parseInt(t.SummaryData.ShowLottable02OnRFReceipt)?a("div",{staticClass:"select"},[a("span",[t._v("货物状态")]),t._v(" "),a("select",{ref:"input_StateOfGoods",attrs:{value:""}},t._l(t.StateOfGoodsData,function(e,n){return a("option",{key:n,attrs:{id:n}},[t._v(t._s(e.Descr))])}))]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable03OnRFReceipt)?a("div",[a("span",[t._v("生产批号"),parseInt(t.SummaryData.Lottable03OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable03OnRFReceiptMandatory,expression:"Lottable03OnRFReceiptMandatory"}],ref:"Lottable03OnRFReceiptMandatory",staticStyle:{"text-transform":"none"},attrs:{copyRef:"Lottable03OnRFReceiptMandatory",requireds:"Lottable03OnRFReceiptMandatory"},domProps:{value:t.Lottable03OnRFReceiptMandatory},on:{blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable03OnRFReceiptMandatory),"Lottable03OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable03OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable03OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable03OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable03OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable03OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable04OnRFReceipt)?a("div",[a("span",[t._v("生产日期"),parseInt(t.SummaryData.Lottable04OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable04OnRFReceiptMandatory,expression:"Lottable04OnRFReceiptMandatory"}],ref:"Lottable04OnRFReceiptMandatory",attrs:{copyRef:"Lottable04OnRFReceiptMandatory",requireds:"Lottable04OnRFReceiptMandatory"},domProps:{value:t.Lottable04OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable04OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable04OnRFReceiptMandatory),"Lottable04OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable04OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable04OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable04OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable04OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable04OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable05OnRFReceipt)?a("div",[a("span",[t._v("到期日期"),parseInt(t.SummaryData.Lottable05OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable05OnRFReceiptMandatory,expression:"Lottable05OnRFReceiptMandatory"}],ref:"Lottable05OnRFReceiptMandatory",attrs:{copyRef:"Lottable05OnRFReceiptMandatory",requireds:"Lottable05OnRFReceiptMandatory"},domProps:{value:t.Lottable05OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable05OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable05OnRFReceiptMandatory),"Lottable05OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable05OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable05OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable05OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable05OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable05OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable06OnRFReceipt)?a("div",[a("span",[t._v("批属性06"),parseInt(t.SummaryData.Lottable06OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable06OnRFReceiptMandatory,expression:"Lottable06OnRFReceiptMandatory"}],ref:"Lottable06OnRFReceiptMandatory",attrs:{copyRef:"Lottable06OnRFReceiptMandatory",requireds:"Lottable06OnRFReceiptMandatory"},domProps:{value:t.Lottable06OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable06OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable06OnRFReceiptMandatory),"Lottable06OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable06OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable06OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable06OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable06OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable06OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable07OnRFReceipt)?a("div",[a("span",[t._v("批属性07"),parseInt(t.SummaryData.Lottable07OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable07OnRFReceiptMandatory,expression:"Lottable07OnRFReceiptMandatory"}],ref:"Lottable07OnRFReceiptMandatory",attrs:{copyRef:"Lottable07OnRFReceiptMandatory",requireds:"Lottable07OnRFReceiptMandatory"},domProps:{value:t.Lottable07OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable07OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable07OnRFReceiptMandatory),"Lottable07OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable07OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable07OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable07OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable07OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable07OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable08OnRFReceipt)?a("div",[a("span",[t._v("批属性08"),parseInt(t.SummaryData.Lottable08OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable08OnRFReceiptMandatory,expression:"Lottable08OnRFReceiptMandatory"}],ref:"Lottable08OnRFReceiptMandatory",attrs:{copyRef:"Lottable08OnRFReceiptMandatory",requireds:"Lottable08OnRFReceiptMandatory"},domProps:{value:t.Lottable08OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable08OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable08OnRFReceiptMandatory),"Lottable08OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable08OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable08OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable08OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable08OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable08OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable01OnRFReceipt)?a("div",[a("span",[t._v("批属性01"),parseInt(t.SummaryData.Lottable01OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable01OnRFReceiptMandatory,expression:"Lottable01OnRFReceiptMandatory"}],ref:"Lottable01OnRFReceiptMandatory",attrs:{copyRef:"Lottable01OnRFReceiptMandatory",requireds:"Lottable01OnRFReceiptMandatory"},domProps:{value:t.Lottable01OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable01OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable01OnRFReceiptMandatory),"Lottable01OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable01OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable01OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable01OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable01OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable01OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable09OnRFReceipt)?a("div",[a("span",[t._v("收货日期"),parseInt(t.SummaryData.Lottable09OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable09OnRFReceiptMandatory,expression:"Lottable09OnRFReceiptMandatory"}],ref:"Lottable09OnRFReceiptMandatory",attrs:{copyRef:"Lottable09OnRFReceiptMandatory",requireds:"Lottable09OnRFReceiptMandatory"},domProps:{value:t.Lottable09OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable09OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable09OnRFReceiptMandatory),"Lottable09OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable09OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable09OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable09OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable09OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable09OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),parseInt(t.SummaryData.ShowLottable10OnRFReceipt)?a("div",[a("span",[t._v("批属性10"),parseInt(t.SummaryData.Lottable10OnRFReceiptMandatory)?a("b",[t._v("*")]):t._e()]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Lottable10OnRFReceiptMandatory,expression:"Lottable10OnRFReceiptMandatory"}],ref:"Lottable10OnRFReceiptMandatory",attrs:{copyRef:"Lottable10OnRFReceiptMandatory",requireds:"Lottable10OnRFReceiptMandatory"},domProps:{value:t.Lottable10OnRFReceiptMandatory},on:{change:function(e){t.toUppercase("Lottable10OnRFReceiptMandatory")},blur:function(e){t.onblur(parseInt(t.SummaryData.Lottable10OnRFReceiptMandatory),"Lottable10OnRFReceiptMandatory")},focus:function(e){t.g_focus("Lottable10OnRFReceiptMandatory")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.nextFocus("Lottable10OnRFReceiptMandatory")},input:function(e){e.target.composing||(t.Lottable10OnRFReceiptMandatory=e.target.value)}}}),t._v(" "),t.Lottable10OnRFReceiptMandatory?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("Lottable10OnRFReceiptMandatory")}}}):t._e()]):t._e(),t._v(" "),a("div",[a("span",[t._v("托盘号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_PalleNumber,expression:"input_PalleNumber"}],ref:"input_PalleNumber",attrs:{copyRef:"input_PalleNumber"},domProps:{value:t.input_PalleNumber},on:{change:function(e){t.toUppercase("input_PalleNumber")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.getSelect("input_LibraryCode")},focus:function(e){t.g_focus("input_PalleNumber")},input:function(e){e.target.composing||(t.input_PalleNumber=e.target.value)}}}),t._v(" "),t.input_PalleNumber?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("input_PalleNumber")}}}):t._e()]),t._v(" "),a("div",[a("span",[t._v("库位代码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input_LibraryCode,expression:"input_LibraryCode"}],ref:"input_LibraryCode",domProps:{value:t.input_LibraryCode},on:{change:function(e){t.toUppercase("input_LibraryCode")},keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null},focus:function(e){t.g_focus("input_LibraryCode")},input:function(e){e.target.composing||(t.input_LibraryCode=e.target.value)}}}),t._v(" "),t.input_LibraryCode?a("i",{staticClass:"iconfont icon-cuowu",on:{click:function(e){t.clearInput("input_LibraryCode")}}}):t._e()]),t._v(" "),a("p",{staticClass:"positionFixed"},[a("span",{staticClass:"g_singleBtn",on:{click:t.submit}},[t._v("确定")])]),t._v(" "),a("div",{staticClass:"kong"})]),t._v(" "),t.tipsHide?a("div",{staticClass:"g_tips",on:{touchmove:function(t){t.preventDefault()}}},[a("div",[a("span",[t._v("错误信息")]),t._v(" "),a("span",[t._v(t._s(t.msg))]),t._v(" "),a("p",{on:{click:function(e){t.tipsHideen(t.inputFocus)}}},[t._v("确定")])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("数    量"),e("b",[this._v("*")])])}]};var i=function(t){a("vixN")},r=a("VU/8")(n.a,o,!1,i,"data-v-e8fb9806",null);e.default=r.exports},vixN:function(t,e){}});
//# sourceMappingURL=19.964926bf6b9a89cfa129.js.map