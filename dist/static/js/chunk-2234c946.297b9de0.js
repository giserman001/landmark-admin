(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2234c946"],{"0c01":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bgfff out_wrap"},[a("div",{staticClass:"flex_between1"},[a("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[a("el-form-item",{attrs:{label:"用户"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.company_name,callback:function(t){e.$set(e.form,"company_name",t)},expression:"form.company_name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增用户")])],1),a("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.page},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"action",fn:function(t){var l=t.row;return[a("a",{staticClass:"active_color",on:{click:function(t){return e.edit(l)}}},[e._v("编辑")]),a("a",{staticClass:"del ml20",on:{click:function(t){return e.del(l)}}},[e._v("删除")])]}}])}),a("el-dialog",{attrs:{title:1==e.mode?"新建员工":"编辑员工",visible:e.dialogVisible,width:"400px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.groupOne,rules:e.rules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"用户姓名：",prop:"name"}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工姓名",clearable:""},model:{value:e.groupOne.name,callback:function(t){e.$set(e.groupOne,"name",t)},expression:"groupOne.name"}})],1),a("el-form-item",{attrs:{label:"手机号：",prop:"phone"}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工手机号",maxlength:"11",clearable:"",disabled:2==e.mode},model:{value:e.groupOne.phone,callback:function(t){e.$set(e.groupOne,"phone",t)},expression:"groupOne.phone"}})],1),a("el-form-item",{attrs:{label:"权限角色：",prop:"role_id"}},[a("el-select",{staticClass:"w100",attrs:{placeholder:"请选择权限角色",clearable:"",filterable:""},model:{value:e.groupOne.role_id,callback:function(t){e.$set(e.groupOne,"role_id",t)},expression:"groupOne.role_id"}},e._l(e.optionArr,(function(e){return a("el-option",{key:e.role_id,attrs:{label:e.role_name,value:e.role_id}})})),1)],1),1==e.mode?a("el-form-item",{attrs:{label:"默认登录密码："}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"默认登录密码",disabled:"",value:"111111"}})],1):e._e()],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},o=[],n=a("8c93"),r=a("b313"),i={name:"List",components:{ZfTable:n["a"]},data:function(){var e=function(e,t,a){""!==t&&void 0!==t?/^1[3456789]\d{9}$/.test(t)?a():a(new Error("请输入正确的手机号")):a(new Error("请输入手机号"))};return{mode:1,groupOne:{name:"",phone:"",role_id:""},dialogVisible:!1,rules:{name:[{required:!0,message:"请输入员工姓名",trigger:"change"}],phone:[{required:!0,validator:e,trigger:"change"}],role_id:[{required:!0,message:"请选择权限角色",trigger:"change"}]},optionArr:[],form:{company_name:""},column:r["b"],tableList:[{name:"左千",phone:"181568312978",role:"超级管理员",create_time:"2021-06-04"},{name:"刘亚",phone:"181568312978",role:"普通管理员",create_time:"2021-06-04"}],pages:{page:1,pageSize:10,total:0}}},mounted:function(){},methods:{query:function(){},handlePageChange:function(e){e.pageNum,e.pageSize;var t=e.sorter;t.prop,t.order;console.log("aa")},edit:function(e){this.dialogVisible=!0},del:function(e){},add:function(){this.dialogVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){e&&(t.dialogVisible=!1,console.log("验证通过"))}))}}},s=i,c=a("4ac2"),u=Object(c["a"])(s,l,o,!1,null,null,null);t["default"]=u.exports},"166a":function(e,t,a){},"8c93":function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",e._g(e._b({directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],key:e.tid,ref:"XmTable",class:{"zf-table":!0,"xm-table-border":e.bordered,"is-flex":e.showSummary},attrs:{data:e.tableData,"max-height":e.mHeight,stripe:e.stripe,"default-sort":e.defaultSort,"header-cell-class-name":e.headerCellClassName,"row-class-name":e.setRowClassName,"show-summary":e.showSummary,"summary-method":e.getSummaries},on:{"sort-change":e.handleSortChange,"row-click":e.handleRowClick,"header-dragend":e.handleHeaderDragend}},"el-table",e.$attrs,!1),e.$listeners),[e._l(e._columns,(function(t){return[t.children&&Array.isArray(t.children)?[a("el-table-column",{key:t.prop,attrs:{label:t.label,align:t.align||"left","class-name":t.className||null}},[a("template",{slot:"header"},[[e._v(e._s(t.label||t.prop))]],2),e._l(t.children,(function(l){return[l.type?a("el-table-column",{key:l.prop,attrs:{type:l.type,label:l.label,width:l.width,"min-width":l.minWidth||100,align:l.align||"left",fixed:l.fixed,"class-name":l.className||null,selectable:t.selectable||null}}):a("el-table-column",{key:l.prop,attrs:{prop:l.prop,label:l.label,width:l.width,"min-width":l.minWidth||100,align:l.align||"left",sortable:l.sortable,"show-overflow-tooltip":t.tooltip,fixed:l.fixed,"class-name":l.className||null},scopedSlots:e._u([{key:"header",fn:function(t){var o=t.row;return[e._t(l.prop+"-header",[a("el-tooltip",{attrs:{effect:"dark",placement:"top",disabled:!l.tips}},[a("div",{staticStyle:{"max-width":"200px"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(l.tips))]),a("span",[e._v(e._s(l.label||l.prop))])])],{row:o})]}},{key:"default",fn:function(o){var n=o.row,r=o.$index;return[e._t(l.prop,[l.formatter?a("div",{domProps:{innerHTML:e._s(l.formatter(n[l.prop],n,r))}}):a("div",{class:e.getCellClassObject(l.ellipsis),attrs:{title:t.ellipsis?n[l.prop]:""}},[e._v(e._s(n[l.prop]))])],{row:n,$index:r})]}}],null,!0)})]}))],2)]:[t.type?["expand"===t.type?a("el-table-column",{key:t.prop,attrs:{type:t.type,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",fixed:t.fixed,"class-name":t.className||null,selectable:t.selectable||null},scopedSlots:e._u([{key:"default",fn:function(a){var l=a.row,o=a.$index;return[e._t(t.prop,null,{row:l,$index:o})]}}],null,!0)}):a("el-table-column",{key:t.prop,attrs:{type:t.type,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",fixed:t.fixed,"class-name":t.className||null,selectable:t.selectable||null}})]:[a("el-table-column",{key:t.prop,attrs:{prop:t.prop,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",sortable:t.sortable,"show-overflow-tooltip":t.tooltip,fixed:t.fixed,tips:t.tips,"class-name":t.className||null},scopedSlots:e._u([{key:"header",fn:function(l){var o=l.row;return[e._t(t.prop+"-header",[a("el-tooltip",{attrs:{effect:"dark",placement:"top",disabled:!t.tips}},[a("div",{staticStyle:{"max-width":"150px"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(t.tips))]),a("span",[e._v(e._s(t.label||t.prop))])])],{row:o})]}},{key:"default",fn:function(a){var l=a.row,o=a.$index;return[e._t(t.prop,[t.formatter?void 0:[e._v(e._s(l[t.prop]))]],{row:l,$index:o})]}}],null,!0)})]]]}))],2),e.hasShowPaging?a("el-pagination",{staticClass:"xm-table-pagination",attrs:{background:"",total:+e.total,layout:e.pagerLayout,"page-size":e.pageSize,"page-sizes":e.pageSizes,"current-page":e.curPage},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"prev-click":e.handlePageChange,"next-change":e.handlePageChange}}):e._e()],1)},o=[],n=a("e7e7"),r=(a("513c"),a("dbb3"),a("08ba"),a("b130"),a("90aa"),a("b4fb"),{name:"XmTable",props:{columns:{type:Array,default:function(){return[]}},dataSource:{type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1},maxHeight:{type:Number,default:0},bordered:{type:Boolean,default:!1},stripe:{type:Boolean,default:!1},pagination:{type:[Boolean,String],default:!0,validator:function(e){return-1!==["always",!0,!1].indexOf(e)}},pagerLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"},total:{type:[Number,String],default:0},pageSize:{type:Number,default:30},pageNum:{type:Number,default:1},pageSizes:{type:Array,default:function(){return[10,30,50,80,100]}},defaultSort:{type:Object,default:function(){return{}}},highlightRow:{type:[Boolean,String],default:!1,validator:function(e){return-1!==["single",!0,!1].indexOf(e)}},highlightRowClassName:{type:String,default:"xm-row-select"},rowClassName:{type:Function,default:function(){return null}},headerCellClassName:{type:String,default:"xm-header-bg"},autoScrollTop:{type:[Boolean,String],default:!0,validator:function(e){return-1!==["change",!0,!1].indexOf(e)}},showSummary:{type:Boolean,default:!1},renderSummary:{type:Object,default:function(){return{}}},selections:{type:Array,default:function(){return[]}},selectionType:{type:String,default:"id"}},data:function(){var e=this.defaultSort,t=e.prop,a=void 0===t?"":t,l=e.order,o=void 0===l?"":l;return{tid:0,curPage:1,sortBy:a,sortOrder:o,tableData:[],summaryData:{},tableSelectIndex:[]}},computed:{_columns:function(){return this.columns.filter((function(e){return!e.hidden}))},hasShowPaging:function(){return"always"===this.pagination||this.pagination&&this.dataSource.length>0},mHeight:function(){var e=this.hasShowPaging,t=this.maxHeight,a=e?t-46:t;return 0!==t?a:"auto"}},watch:{dataSource:{deep:!0,immediate:!0,handler:function(e){this.generateData(e),this.tableSelectIndex=[],this.setRowSelection(),!0===this.autoScrollTop&&this.moveToTop()}},pageNum:function(e){this.curPage=e},columns:function(e,t){JSON.stringify(e)!==JSON.stringify(t)&&this.resetXmTable()}},methods:{generateData:function(e){var t=Object(n["a"])(e);this.showSummary&&e.length>1&&(this.summaryData=t.shift()||{}),this.tableData=t},getSummaries:function(e){var t=e.columns,a=[],l=this.summaryData;return t.forEach((function(e,t){a[t]=void 0===l[e.property]||null===l[e.property]?"-":l[e.property]})),a},handleRowClick:function(e,t,a,l){if(this.highlightRow){var o=e.__index__;"single"===this.highlightRow?this.tableSelectIndex.includes(o)?this.tableSelectIndex=[]:this.$set(this.tableSelectIndex,0,o):this.tableSelectIndex.includes(o)?this.tableSelectIndex=this.tableSelectIndex.filter((function(e){return e!==o})):this.tableSelectIndex.push(o)}},setRowClassName:function(e){var t=e.row,a=e.rowIndex;t.__index__=a;var l=this.rowClassName({row:t,rowIndex:a});return this.tableSelectIndex.includes(a)?"".concat(this.highlightRowClassName," ").concat(l):l},handlePageChange:function(e){var t=this.pageSize,a=this.sortBy,l=this.sortOrder;"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:e,pageSize:t,prop:a,order:l,sorter:{prop:a,order:l}})},handleSizeChange:function(e){var t=this.sortBy,a=this.sortOrder;"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:1,pageSize:e,prop:t,order:a,sorter:{prop:t,order:a}})},handleSortChange:function(e){var t=e.prop,a=e.order;this.sortBy=t,this.sortOrder=a,"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:1,pageSize:this.pageSize,prop:t,order:a,sorter:{prop:t,order:a}})},setRowSelection:function(){var e=this,t=this.selectionType,a=this.selections,l=this.tableData;a&&a.length>0&&this.$nextTick((function(){var o=e.$refs.XmTable;o.clearSelection(),l.forEach((function(e){a.includes(e[t])&&o.toggleRowSelection(e,!0)}))}))},moveToTop:function(){this.maxHeight?this.$refs&&this.$refs.XmTable&&this.$refs.XmTable.bodyWrapper&&(this.$refs.XmTable.bodyWrapper.scrollTop=0):this.move(0)},move:function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e},resetXmTable:function(){this.tid++},getCellClassObject:function(e){return e?{"multiple-line-txt-cut":"multiple"===e,"txt-cut":!0===e}:null},handleHeaderDragend:function(e,t,a,l){this.$emit("header-dragend",{newWidth:e,oldWidth:t,column:a,event:l})}}}),i=r,s=(a("a3eb"),a("4ac2")),c=Object(s["a"])(i,l,o,!1,null,"9bd17d5e",null);t["a"]=c.exports},a3eb:function(e,t,a){"use strict";a("166a")},b313:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return o}));var l=[{prop:"name",label:"姓名"},{prop:"phone",label:"手机号"},{prop:"role",label:"权限角色"},{prop:"create_time",label:"创建时间"},{prop:"action",width:"120px",label:"操作"}],o=[{prop:"role",label:"角色名称"},{prop:"des",label:"描述"},{prop:"action",width:"180px",label:"操作"}]}}]);
//# sourceMappingURL=chunk-2234c946.297b9de0.js.map