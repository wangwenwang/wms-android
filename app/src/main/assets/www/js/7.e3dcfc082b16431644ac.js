webpackJsonp([7],{KO9e:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r("klvT"),n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"CheckOrder_detail"},[r("header",[r("i",{staticClass:"iconfont icon-xiangzuo1",on:{click:t.toReceipt}}),r("span",[t._v("按单复核-查看明细")])]),t._v(" "),r("div",{staticClass:"container"},[r("table",{attrs:{cellspacing:"0"}},[r("thead",[r("tr",[r("td",[t._v("序号")]),t._v(" "),r("td",{on:{click:function(e){t.SortArr("CheckOrder_detailData","Sku","SortCondition1",e)}}},[t._v("商品代码")]),t._v(" "),r("td",{on:{click:function(e){t.SortArr("CheckOrder_detailData","Qty","SortCondition2",e)}}},[t._v("数量")]),t._v(" "),r("td",{on:{click:function(e){t.SortArr("CheckOrder_detailData","CheckedQty","SortCondition3",e)}}},[t._v("已复核数")]),t._v(" "),r("td",{on:{click:function(e){t.SortArr("CheckOrder_detailData","Descr","SortCondition4",e)}}},[t._v("商品名称")]),t._v(" "),r("td",{on:{click:function(e){t.SortArr("CheckOrder_detailData","Susr2","SortCondition5",e)}}},[t._v("单位")]),t._v(" "),r("td",{on:{click:function(e){t.SortArr("CheckOrder_detailData","PreCheckQty","SortCondition6",e)}}},[t._v("待复核数")])])]),t._v(" "),r("tbody",t._l(t.CheckOrder_detailData,function(e,i){return r("tr",{key:i,attrs:{id:i},on:{click:function(t){}}},[r("td",[t._v(t._s(i+1))]),t._v(" "),r("td",[t._v(t._s(e.Sku))]),t._v(" "),r("td",[t._v(t._s(e.Qty))]),t._v(" "),r("td",[t._v(t._s(e.CheckedQty))]),t._v(" "),r("td",[t._v(t._s(e.Descr))]),t._v(" "),r("td",[t._v(t._s(e.Susr2))]),t._v(" "),r("td",[t._v(t._s(e.PreCheckQty))])])}))]),t._v(" "),r("div",{staticClass:"kong"})])])},staticRenderFns:[]};var o=function(t){r("sGFt")},d=r("VU/8")(i.a,n,!1,o,"data-v-2e1e787e",null);e.default=d.exports},klvT:function(t,e,r){"use strict";(function(t){e.a={name:"CheckOrder_detail",data:function(){return{CheckOrder_detailData:[],OrderKey:"",SortCondition1:!0,SortCondition2:!1,SortCondition3:!1,SortCondition4:!1,SortCondition5:!1,SortCondition6:!1}},mounted:function(){t("thead").find("td").append('<i class="iconfont"></i>')},created:function(){if(this.$route.query.OrderKey&&(this.OrderKey=this.$route.query.OrderKey),console.log(this.$store.state.CheckOrder_detailData),this.$store.state.CheckOrder_detailData.length){var t=this.$store.state.CheckOrder_detailData;this.CheckOrder_detailData=t}},methods:{toReceipt:function(){this.$router.push({name:"CheckOrder",query:{OrderKey:this.OrderKey}})}}}}).call(e,r("7t+N"))},sGFt:function(t,e){}});
//# sourceMappingURL=7.e3dcfc082b16431644ac.js.map