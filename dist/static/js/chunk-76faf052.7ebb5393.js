(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76faf052"],{"166a":function(e,t,a){},"8c93":function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",e._g(e._b({directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],key:e.tid,ref:"XmTable",class:{"zf-table":!0,"xm-table-border":e.bordered,"is-flex":e.showSummary},attrs:{data:e.tableData,"max-height":e.mHeight,stripe:e.stripe,"default-sort":e.defaultSort,"header-cell-class-name":e.headerCellClassName,"row-class-name":e.setRowClassName,"show-summary":e.showSummary,"summary-method":e.getSummaries},on:{"sort-change":e.handleSortChange,"row-click":e.handleRowClick,"header-dragend":e.handleHeaderDragend}},"el-table",e.$attrs,!1),e.$listeners),[e._l(e._columns,(function(t){return[t.children&&Array.isArray(t.children)?[a("el-table-column",{key:t.prop,attrs:{label:t.label,align:t.align||"left","class-name":t.className||null}},[a("template",{slot:"header"},[[e._v(e._s(t.label||t.prop))]],2),e._l(t.children,(function(l){return[l.type?a("el-table-column",{key:l.prop,attrs:{type:l.type,label:l.label,width:l.width,"min-width":l.minWidth||100,align:l.align||"left",fixed:l.fixed,"class-name":l.className||null,selectable:t.selectable||null}}):a("el-table-column",{key:l.prop,attrs:{prop:l.prop,label:l.label,width:l.width,"min-width":l.minWidth||100,align:l.align||"left",sortable:l.sortable,"show-overflow-tooltip":t.tooltip,fixed:l.fixed,"class-name":l.className||null},scopedSlots:e._u([{key:"header",fn:function(t){var o=t.row;return[e._t(l.prop+"-header",[a("el-tooltip",{attrs:{effect:"dark",placement:"top",disabled:!l.tips}},[a("div",{staticStyle:{"max-width":"200px"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(l.tips))]),a("span",[e._v(e._s(l.label||l.prop))])])],{row:o})]}},{key:"default",fn:function(o){var i=o.row,n=o.$index;return[e._t(l.prop,[l.formatter?a("div",{domProps:{innerHTML:e._s(l.formatter(i[l.prop],i,n))}}):a("div",{class:e.getCellClassObject(l.ellipsis),attrs:{title:t.ellipsis?i[l.prop]:""}},[e._v(e._s(i[l.prop]))])],{row:i,$index:n})]}}],null,!0)})]}))],2)]:[t.type?["expand"===t.type?a("el-table-column",{key:t.prop,attrs:{type:t.type,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",fixed:t.fixed,"class-name":t.className||null,selectable:t.selectable||null},scopedSlots:e._u([{key:"default",fn:function(a){var l=a.row,o=a.$index;return[e._t(t.prop,null,{row:l,$index:o})]}}],null,!0)}):a("el-table-column",{key:t.prop,attrs:{type:t.type,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",fixed:t.fixed,"class-name":t.className||null,selectable:t.selectable||null}})]:[a("el-table-column",{key:t.prop,attrs:{prop:t.prop,label:t.label,width:t.width,"min-width":t.minWidth||100,align:t.align||"left",sortable:t.sortable,"show-overflow-tooltip":t.tooltip,fixed:t.fixed,tips:t.tips,"class-name":t.className||null},scopedSlots:e._u([{key:"header",fn:function(l){var o=l.row;return[e._t(t.prop+"-header",[a("el-tooltip",{attrs:{effect:"dark",placement:"top",disabled:!t.tips}},[a("div",{staticStyle:{"max-width":"150px"},attrs:{slot:"content"},slot:"content"},[e._v(e._s(t.tips))]),a("span",[e._v(e._s(t.label||t.prop))])])],{row:o})]}},{key:"default",fn:function(a){var l=a.row,o=a.$index;return[e._t(t.prop,[t.formatter?void 0:[e._v(e._s(l[t.prop]))]],{row:l,$index:o})]}}],null,!0)})]]]}))],2),e.hasShowPaging?a("el-pagination",{staticClass:"xm-table-pagination",attrs:{background:"",total:+e.total,layout:e.pagerLayout,"page-size":e.pageSize,"page-sizes":e.pageSizes,"current-page":e.curPage},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange,"prev-click":e.handlePageChange,"next-change":e.handlePageChange}}):e._e()],1)},o=[],i=a("1bde"),n=(a("513c"),a("dbb3"),a("08ba"),a("b130"),a("90aa"),a("b4fb"),{name:"XmTable",props:{columns:{type:Array,default:function(){return[]}},dataSource:{type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1},maxHeight:{type:Number,default:0},bordered:{type:Boolean,default:!1},stripe:{type:Boolean,default:!1},pagination:{type:[Boolean,String],default:!0,validator:function(e){return-1!==["always",!0,!1].indexOf(e)}},pagerLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"},total:{type:[Number,String],default:0},pageSize:{type:Number,default:30},pageNum:{type:Number,default:1},pageSizes:{type:Array,default:function(){return[10,30,50,80,100]}},defaultSort:{type:Object,default:function(){return{}}},highlightRow:{type:[Boolean,String],default:!1,validator:function(e){return-1!==["single",!0,!1].indexOf(e)}},highlightRowClassName:{type:String,default:"xm-row-select"},rowClassName:{type:Function,default:function(){return null}},headerCellClassName:{type:String,default:"xm-header-bg"},autoScrollTop:{type:[Boolean,String],default:!0,validator:function(e){return-1!==["change",!0,!1].indexOf(e)}},showSummary:{type:Boolean,default:!1},renderSummary:{type:Object,default:function(){return{}}},selections:{type:Array,default:function(){return[]}},selectionType:{type:String,default:"id"}},data:function(){var e=this.defaultSort,t=e.prop,a=void 0===t?"":t,l=e.order,o=void 0===l?"":l;return{tid:0,curPage:1,sortBy:a,sortOrder:o,tableData:[],summaryData:{},tableSelectIndex:[]}},computed:{_columns:function(){return this.columns.filter((function(e){return!e.hidden}))},hasShowPaging:function(){return"always"===this.pagination||this.pagination&&this.dataSource.length>0},mHeight:function(){var e=this.hasShowPaging,t=this.maxHeight,a=e?t-46:t;return 0!==t?a:"auto"}},watch:{dataSource:{deep:!0,immediate:!0,handler:function(e){this.generateData(e),this.tableSelectIndex=[],this.setRowSelection(),!0===this.autoScrollTop&&this.moveToTop()}},pageNum:function(e){this.curPage=e},columns:function(e,t){JSON.stringify(e)!==JSON.stringify(t)&&this.resetXmTable()}},methods:{generateData:function(e){var t=Object(i["a"])(e);this.showSummary&&e.length>1&&(this.summaryData=t.shift()||{}),this.tableData=t},getSummaries:function(e){var t=e.columns,a=[],l=this.summaryData;return t.forEach((function(e,t){a[t]=void 0===l[e.property]||null===l[e.property]?"-":l[e.property]})),a},handleRowClick:function(e,t,a,l){if(this.highlightRow){var o=e.__index__;"single"===this.highlightRow?this.tableSelectIndex.includes(o)?this.tableSelectIndex=[]:this.$set(this.tableSelectIndex,0,o):this.tableSelectIndex.includes(o)?this.tableSelectIndex=this.tableSelectIndex.filter((function(e){return e!==o})):this.tableSelectIndex.push(o)}},setRowClassName:function(e){var t=e.row,a=e.rowIndex;t.__index__=a;var l=this.rowClassName({row:t,rowIndex:a});return this.tableSelectIndex.includes(a)?"".concat(this.highlightRowClassName," ").concat(l):l},handlePageChange:function(e){var t=this.pageSize,a=this.sortBy,l=this.sortOrder;"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:e,pageSize:t,prop:a,order:l,sorter:{prop:a,order:l}})},handleSizeChange:function(e){var t=this.sortBy,a=this.sortOrder;"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:1,pageSize:e,prop:t,order:a,sorter:{prop:t,order:a}})},handleSortChange:function(e){var t=e.prop,a=e.order;this.sortBy=t,this.sortOrder=a,"change"===this.autoScrollTop&&this.moveToTop(),this.$emit("change",{pageNum:1,pageSize:this.pageSize,prop:t,order:a,sorter:{prop:t,order:a}})},setRowSelection:function(){var e=this,t=this.selectionType,a=this.selections,l=this.tableData;a&&a.length>0&&this.$nextTick((function(){var o=e.$refs.XmTable;o.clearSelection(),l.forEach((function(e){a.includes(e[t])&&o.toggleRowSelection(e,!0)}))}))},moveToTop:function(){this.maxHeight?this.$refs&&this.$refs.XmTable&&this.$refs.XmTable.bodyWrapper&&(this.$refs.XmTable.bodyWrapper.scrollTop=0):this.move(0)},move:function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e},resetXmTable:function(){this.tid++},getCellClassObject:function(e){return e?{"multiple-line-txt-cut":"multiple"===e,"txt-cut":!0===e}:null},handleHeaderDragend:function(e,t,a,l){this.$emit("header-dragend",{newWidth:e,oldWidth:t,column:a,event:l})}}}),r=n,s=(a("a3eb"),a("4ac2")),c=Object(s["a"])(r,l,o,!1,null,"9bd17d5e",null);t["a"]=c.exports},a3eb:function(e,t,a){"use strict";a("166a")},b313:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return o}));var l=[{prop:"name",label:"姓名"},{prop:"phone",label:"手机号"},{prop:"role",label:"权限角色"},{prop:"create_time",label:"创建时间"},{prop:"action",width:"120px",label:"操作"}],o=[{prop:"role",label:"角色名称"},{prop:"des",label:"描述"},{prop:"action",width:"180px",label:"操作"}]},d6c6:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bgfff out_wrap"},[a("div",{staticClass:"flex_between1"},[a("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[a("el-form-item",{attrs:{label:"角色名称"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增角色")])],1),a("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.page},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"action",fn:function(t){var l=t.row;return[a("a",{staticClass:"active_color",on:{click:function(t){return e.edit(l)}}},[e._v("编辑")]),a("a",{staticClass:"active_color ml20",on:{click:function(t){return e.auth(l)}}},[e._v("权限配置")]),a("a",{staticClass:"del ml20",on:{click:function(t){return e.del(l)}}},[e._v("删除")])]}}])}),a("el-dialog",{attrs:{title:1==e.mode?"新增角色":"编辑角色",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.roleOne,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"角色名称：",prop:"role_name"}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"请输入角色名称",clearable:""},model:{value:e.roleOne.role_name,callback:function(t){e.$set(e.roleOne,"role_name",t)},expression:"roleOne.role_name"}})],1),a("el-form-item",{attrs:{label:"描述："}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入角色描述",resize:"vertical"},model:{value:e.roleOne.describe,callback:function(t){e.$set(e.roleOne,"describe",t)},expression:"roleOne.describe"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"权限配置",visible:e.authVisible},on:{"update:visible":function(t){e.authVisible=t}}},[a("el-tree",{attrs:{data:e.data,"show-checkbox":"","node-key":"id","default-expanded-keys":["02","03"],"default-checked-keys":["0301","0302"],props:e.defaultProps}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.authVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.authForm}},[e._v("确定")])],1)],1)],1)},o=[],i=a("8c93"),n=a("b313"),r={name:"List",components:{ZfTable:i["a"]},data:function(){return{mode:1,dialogFormVisible:!1,roleOne:{role_name:"",describe:""},rules:{role_name:[{required:!0,message:"请输入角色名称",trigger:"change"}]},form:{company_name:""},column:n["a"],tableList:[{role:"超级管理员",des:"拥有所有菜单权限"},{role:"普通管理员",des:"只有部分菜单权限"}],pages:{page:1,pageSize:10,total:0},authVisible:!1,data:[{id:"0101",label:"项目信息"},{id:"02",label:"工作汇报",children:[{id:"0201",label:"日报"},{id:"0202",label:"周报"},{id:"0203",label:"月报"},{id:"0204",label:"季报"},{id:"0205",label:"年报"}]},{id:"03",label:"管理员",children:[{id:"0302",label:"用户"},{id:"0301",label:"角色"}]}],defaultProps:{children:"children",label:"label"}}},mounted:function(){},methods:{query:function(){},handlePageChange:function(e){e.pageNum,e.pageSize;var t=e.sorter;t.prop,t.order;console.log("aa")},edit:function(e){this.mode=2,this.dialogFormVisible=!0},del:function(e){},add:function(){this.mode=1,this.dialogFormVisible=!0},auth:function(){this.authVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){e&&(t.dialogFormVisible=!1)}))},authForm:function(){}}},s=r,c=a("4ac2"),d=Object(c["a"])(s,l,o,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-76faf052.7ebb5393.js.map