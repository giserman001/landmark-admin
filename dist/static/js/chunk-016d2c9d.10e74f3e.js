(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-016d2c9d"],{"0c01":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bgfff out_wrap"},[r("div",{staticClass:"flex_between1"},[r("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),r("el-form-item",{attrs:{label:"手机号"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1),r("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增用户")])],1),r("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.pageNum},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"action",fn:function(t){var a=t.row;return[r("a",{staticClass:"active_color",on:{click:function(t){return e.edit(a)}}},[e._v("编辑")]),r("a",{staticClass:"del ml20",on:{click:function(t){return e.del(a)}}},[e._v("删除")])]}}])}),r("el-dialog",{attrs:{title:1==e.mode?"新建员工":"编辑员工",visible:e.dialogVisible,center:"",width:"400px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.groupOne,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"用户姓名：",prop:"userName"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工姓名",clearable:""},model:{value:e.groupOne.userName,callback:function(t){e.$set(e.groupOne,"userName",t)},expression:"groupOne.userName"}})],1),r("el-form-item",{attrs:{label:"手机号：",prop:"mobile"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工手机号",maxlength:"11",clearable:""},model:{value:e.groupOne.mobile,callback:function(t){e.$set(e.groupOne,"mobile",t)},expression:"groupOne.mobile"}})],1),r("el-form-item",{attrs:{label:"权限角色：",prop:"roleId"}},[r("el-select",{staticClass:"w100",attrs:{placeholder:"请选择权限角色",clearable:"",filterable:""},model:{value:e.groupOne.roleId,callback:function(t){e.$set(e.groupOne,"roleId",t)},expression:"groupOne.roleId"}},e._l(e.optionArr,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),1===e.mode?r("el-form-item",{attrs:{label:"登录密码：",prop:"password"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"登录密码"},model:{value:e.groupOne.password,callback:function(t){e.$set(e.groupOne,"password",t)},expression:"groupOne.password"}})],1):e._e()],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},n=[],o=r("15f8"),l=r("cd6d"),i=(r("6a61"),r("8c93")),s=r("b313"),u=r("2934"),c={name:"List",components:{ZfTable:i["a"]},data:function(){var e=function(e,t,r){""!==t&&void 0!==t?/^1[3456789]\d{9}$/.test(t)?r():r(new Error("请输入正确的手机号")):r(new Error("请输入手机号"))};return{mode:1,groupOne:{userName:"",mobile:"",roleId:"",password:"",userId:""},dialogVisible:!1,rules:{userName:[{required:!0,message:"请输入员工姓名",trigger:"change"}],mobile:[{required:!0,validator:e,trigger:"change"}],roleId:[{required:!0,message:"请选择权限角色",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]},optionArr:[],form:{userName:"",mobile:""},column:s["b"],tableList:[],pages:{pageNum:1,pageSize:10,total:0}}},mounted:function(){var e=this;this.query(),Object(u["i"])({pageNum:1,pageSize:999999}).then((function(t){e.optionArr=t.data.roleList.rows}))},methods:{query:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["j"])(Object(o["a"])(Object(o["a"])({},e.form),e.pages));case 2:r=t.sent,0===r.code&&(e.pages.total=r.data.userList.total,e.tableList=r.data.userList.rows);case 4:case"end":return t.stop()}}),t)})))()},handlePageChange:function(e){var t=e.pageNum,r=e.pageSize,a=e.sorter;a.prop,a.order;this.pages.pageNum=t,this.pages.pageSize=r,this.query()},edit:function(e){this.mode=2,this.groupOne.userId=e.userId,this.groupOne.userName=e.username,this.groupOne.mobile=e.mobile,this.groupOne.roleId=e.role,this.dialogVisible=!0},del:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(l["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["c"])({userId:e.userId});case 2:a=r.sent,0===a.code&&(t.$message.success("删除用户成功!"),t.query());case 4:case"end":return r.stop()}}),r)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},add:function(){this.mode=1,this.groupOne.userId="",this.groupOne.userName="",this.groupOne.mobile="",this.groupOne.roleId="",this.groupOne.password="",this.dialogVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(r){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}if(1!==t.mode){e.next=8;break}return e.next=4,Object(u["n"])(t.groupOne);case 4:a=e.sent,0===a.code&&(t.dialogVisible=!1,t.$message.success("新增用户成功!"),t.query()),e.next=13;break;case 8:return delete t.groupOne.password,e.next=11,Object(u["p"])(t.groupOne);case 11:n=e.sent,0===n.code&&(t.dialogVisible=!1,t.$message.success("编辑用户成功!"),t.query());case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},d=c,p=r("4ac2"),m=Object(p["a"])(d,a,n,!1,null,null,null);t["default"]=m.exports},"166a":function(e,t,r){},2934:function(e,t,r){"use strict";r.d(t,"k",(function(){return n})),r.d(t,"j",(function(){return o})),r.d(t,"i",(function(){return l})),r.d(t,"n",(function(){return i})),r.d(t,"p",(function(){return s})),r.d(t,"c",(function(){return u})),r.d(t,"m",(function(){return c})),r.d(t,"o",(function(){return d})),r.d(t,"b",(function(){return p})),r.d(t,"d",(function(){return m})),r.d(t,"g",(function(){return h})),r.d(t,"r",(function(){return f})),r.d(t,"h",(function(){return g})),r.d(t,"l",(function(){return b})),r.d(t,"q",(function(){return w})),r.d(t,"a",(function(){return y})),r.d(t,"f",(function(){return v})),r.d(t,"e",(function(){return x}));var a=r("b775");function n(e){return Object(a["a"])({url:"/file/saveFile",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/user/getUserList",method:"get",params:e})}function l(e){return Object(a["a"])({url:"/role/getRoleList",method:"get",params:e})}function i(e){return Object(a["a"])({url:"/user/saveUser",method:"get",params:e})}function s(e){return Object(a["a"])({url:"/user/updateUserById",method:"get",params:e})}function u(e){return Object(a["a"])({url:"/user/deteleUserById",method:"get",params:e})}function c(e){return Object(a["a"])({url:"/role/saveRole",method:"get",params:e})}function d(e){return Object(a["a"])({url:"/role/updateRoleById",method:"get",params:e})}function p(e){return Object(a["a"])({url:"/user/deteleRoleById",method:"get",params:e})}function m(e){return Object(a["a"])({url:"/role/getAllPage",method:"get",params:e})}function h(e){return Object(a["a"])({url:"/role/getPageByRoleId",method:"get",params:e})}function f(e){return Object(a["a"])({url:"/role/updateRolePageForRoleId",method:"get",params:e})}function g(e){return Object(a["a"])({url:"/project/getProjectList",method:"get",params:e})}function b(e){return Object(a["a"])({url:"/project/saveProject",method:"get",params:e})}function w(e){return Object(a["a"])({url:"/project/updateProject",method:"get",params:e})}function y(e){return Object(a["a"])({url:"/project/deteleProjectById",method:"get",params:e})}function v(e){return Object(a["a"])({url:"/owner/getOwnerIdAndName",method:"get",params:e})}function x(e){return Object(a["a"])({url:"/execute/getExecuteIdAndName",method:"get",params:e})}},"8c93":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-table",e._g(e._b({directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],key:e.tid,ref:"XmTable",class:{"zf-table":!0,"xm-table-border":e.bordered,"is-flex":e.showSummary},attrs:{data:e.tableData,"max-height":e.mHeight,stripe:e.stripe,"default-sort":e.defaultSort,"header-cell-class-name":e.headerCellClassName,"row-class-name":e.setRowClassName,"show-summary":e.showSummary,"summary-method":e.getSummaries},on:{"sort-change":e.handleSortChange,"row-click":e.handleRowClick,"header-dragend":e.handleHeaderDragend}},"el-table",e.$attrs,!1),e.$listeners),[e._l(e._columns,(function(t){return[t.children&&Array.isArray(t.children)?[r("el-table-column",{key:t.prop,attrs:{label:t.label,align:t.align||"left","class-name":t.className||null}},[r("template",{slot:"header"},[[e._v(e._s(t.label||t.prop))]],2),e._l(t.children,(function(a){return[a.type?r("el-table-column",{key:a.prop,attrs:{type:a.type,label:a.label,width:a.width,"min-width":a.minWidth||100,align:a.align||"left",fixed:a.fixed,"class-name":a.className||null,selectable:t.selectable||null}}):r("el-table-column",{key:a.prop,attrs:{prop:a.prop,label:a.label,width:a.width,"min-width":a.minWidth||100,align:a.align||"left",sortable:a.sortable,"show-overflow-tooltip":t.tooltip,fixed:a.fixed,"class-name":a.className||null},scopedSlots:e._u([{key:"header",fn:function(t){var n=t.row;return[e._t(a.prop+"-header",[r("el-tooltip",{attrs:{effect:"dark",placement:"top",disabled:!a.tips}},[r("div",{staticStyle:{"max-width":"200px"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(a.tips))]),r("span",[e._v(e._s(a.label||a.prop))])])],{row:n})]}},{key:"default",fn:function(n){var o=n.row,l=n.$index;return[e._t(a.prop,[a.formatter?r("div",{domProps:{innerHTML:e._s(a.formatter(o[a.prop],o,l))}}):r("div",{class:e.getCellClassObject(a.ellipsis),attrs:{title:t.ellipsis?o[a.prop]:""}},[e._v(e._s(o[a.prop]))])],{row:o,$index:l})]}}],null,!0)})]}))],2)]:[t.type?["expand"===t.type?r("el-table-column",{key:t.prop,attrs:{type:t.type,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",fixed:t.fixed,"class-name":t.className||null,selectable:t.selectable||null},scopedSlots:e._u([{key:"default",fn:function(r){var a=r.row,n=r.$index;return[e._t(t.prop,null,{row:a,$index:n})]}}],null,!0)}):r("el-table-column",{key:t.prop,attrs:{type:t.type,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",fixed:t.fixed,"class-name":t.className||null,selectable:t.selectable||null}})]:[r("el-table-column",{key:t.prop,attrs:{prop:t.prop,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",sortable:t.sortable,"show-overflow-tooltip":t.tooltip,fixed:t.fixed,tips:t.tips,"class-name":t.className||null},scopedSlots:e._u([{key:"header",fn:function(a){var n=a.row;return[e._t(t.prop+"-header",[r("el-tooltip",{attrs:{effect:"dark",placement:"top",disabled:!t.tips}},[r("div",{staticStyle:{"max-width":"150px"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(t.tips))]),r("span",[e._v(e._s(t.label||t.prop))])])],{row:n})]}},{key:"default",fn:function(r){var a=r.row,n=r.$index;return[e._t(t.prop,[t.formatter?void 0:[e._v(e._s(a[t.prop]))]],{row:a,$index:n})]}}],null,!0)})]]]}))],2),e.hasShowPaging?r("el-pagination",{staticClass:"xm-table-pagination",attrs:{background:"",total:+e.total,layout:e.pagerLayout,"page-size":e.pageSize,"page-sizes":e.pageSizes,"current-page":e.curPage},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"prev-click":e.handlePageChange,"next-change":e.handlePageChange}}):e._e()],1)},n=[],o=r("1bde"),l=(r("513c"),r("dbb3"),r("08ba"),r("b130"),r("90aa"),r("b4fb"),{name:"XmTable",props:{columns:{type:Array,default:function(){return[]}},dataSource:{type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1},maxHeight:{type:Number,default:0},bordered:{type:Boolean,default:!1},stripe:{type:Boolean,default:!1},pagination:{type:[Boolean,String],default:!0,validator:function(e){return-1!==["always",!0,!1].indexOf(e)}},pagerLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"},total:{type:[Number,String],default:0},pageSize:{type:Number,default:30},pageNum:{type:Number,default:1},pageSizes:{type:Array,default:function(){return[10,30,50,80,100]}},defaultSort:{type:Object,default:function(){return{}}},highlightRow:{type:[Boolean,String],default:!1,validator:function(e){return-1!==["single",!0,!1].indexOf(e)}},highlightRowClassName:{type:String,default:"xm-row-select"},rowClassName:{type:Function,default:function(){return null}},headerCellClassName:{type:String,default:"xm-header-bg"},autoScrollTop:{type:[Boolean,String],default:!0,validator:function(e){return-1!==["change",!0,!1].indexOf(e)}},showSummary:{type:Boolean,default:!1},renderSummary:{type:Object,default:function(){return{}}},selections:{type:Array,default:function(){return[]}},selectionType:{type:String,default:"id"}},data:function(){var e=this.defaultSort,t=e.prop,r=void 0===t?"":t,a=e.order,n=void 0===a?"":a;return{tid:0,curPage:1,sortBy:r,sortOrder:n,tableData:[],summaryData:{},tableSelectIndex:[]}},computed:{_columns:function(){return this.columns.filter((function(e){return!e.hidden}))},hasShowPaging:function(){return"always"===this.pagination||this.pagination&&this.dataSource.length>0},mHeight:function(){var e=this.hasShowPaging,t=this.maxHeight,r=e?t-46:t;return 0!==t?r:"auto"}},watch:{dataSource:{deep:!0,immediate:!0,handler:function(e){this.generateData(e),this.tableSelectIndex=[],this.setRowSelection(),!0===this.autoScrollTop&&this.moveToTop()}},pageNum:function(e){this.curPage=e},columns:function(e,t){JSON.stringify(e)!==JSON.stringify(t)&&this.resetXmTable()}},methods:{generateData:function(e){var t=Object(o["a"])(e);this.showSummary&&e.length>1&&(this.summaryData=t.shift()||{}),this.tableData=t},getSummaries:function(e){var t=e.columns,r=[],a=this.summaryData;return t.forEach((function(e,t){r[t]=void 0===a[e.property]||null===a[e.property]?"-":a[e.property]})),r},handleRowClick:function(e,t,r,a){if(this.highlightRow){var n=e.__index__;"single"===this.highlightRow?this.tableSelectIndex.includes(n)?this.tableSelectIndex=[]:this.$set(this.tableSelectIndex,0,n):this.tableSelectIndex.includes(n)?this.tableSelectIndex=this.tableSelectIndex.filter((function(e){return e!==n})):this.tableSelectIndex.push(n)}},setRowClassName:function(e){var t=e.row,r=e.rowIndex;t.__index__=r;var a=this.rowClassName({row:t,rowIndex:r});return this.tableSelectIndex.includes(r)?"".concat(this.highlightRowClassName," ").concat(a):a},handlePageChange:function(e){var t=this.pageSize,r=this.sortBy,a=this.sortOrder;"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:e,pageSize:t,prop:r,order:a,sorter:{prop:r,order:a}})},handleSizeChange:function(e){var t=this.sortBy,r=this.sortOrder;"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:1,pageSize:e,prop:t,order:r,sorter:{prop:t,order:r}})},handleSortChange:function(e){var t=e.prop,r=e.order;this.sortBy=t,this.sortOrder=r,"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:1,pageSize:this.pageSize,prop:t,order:r,sorter:{prop:t,order:r}})},setRowSelection:function(){var e=this,t=this.selectionType,r=this.selections,a=this.tableData;r&&r.length>0&&this.$nextTick((function(){var n=e.$refs.XmTable;n.clearSelection(),a.forEach((function(e){r.includes(e[t])&&n.toggleRowSelection(e,!0)}))}))},moveToTop:function(){this.maxHeight?this.$refs&&this.$refs.XmTable&&this.$refs.XmTable.bodyWrapper&&(this.$refs.XmTable.bodyWrapper.scrollTop=0):this.move(0)},move:function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e},resetXmTable:function(){this.tid++},getCellClassObject:function(e){return e?{"multiple-line-txt-cut":"multiple"===e,"txt-cut":!0===e}:null},handleHeaderDragend:function(e,t,r,a){this.$emit("header-dragend",{newWidth:e,oldWidth:t,column:r,event:a})}}}),i=l,s=(r("a3eb"),r("4ac2")),u=Object(s["a"])(i,a,n,!1,null,"9bd17d5e",null);t["a"]=u.exports},a3eb:function(e,t,r){"use strict";r("166a")},b313:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return n}));var a=[{prop:"username",label:"用户姓名"},{prop:"mobile",label:"手机号"},{prop:"roleName",label:"权限角色"},{prop:"createTime",label:"创建时间"},{prop:"action",width:"120px",label:"操作"}],n=[{prop:"name",label:"角色名称"},{prop:"remark",label:"描述"},{prop:"action",width:"180px",label:"操作"}]}}]);
//# sourceMappingURL=chunk-016d2c9d.10e74f3e.js.map