(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61609ab6"],{"3c18":function(e,t,o){},bb0f:function(e,t,o){"use strict";o("3c18")},ee0d:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"bgfff out_wrap"},[o("div",{staticClass:"flex_between1"},[o("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[o("el-form-item",{attrs:{label:"名称"}},[o("el-input",{attrs:{placeholder:"请输入"},on:{change:e.query},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),o("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增")])],1),o("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.pageNum},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"ebookName",fn:function(t){var r=t.row;return[o("a",{staticClass:"active_color",on:{click:function(t){return e.downLoad(r.ebookName,r.ebook)}}},[e._v(e._s(r.ebookName||"-"))])]}},{key:"budgetName",fn:function(t){var r=t.row;return[o("a",{staticClass:"active_color",on:{click:function(t){return e.downLoad(r.budgetName,r.budget)}}},[e._v(e._s(r.budgetName||"-"))])]}},{key:"recordName",fn:function(t){var r=t.row;return[o("a",{staticClass:"active_color",on:{click:function(t){return e.downLoad(r.recordName,r.record)}}},[e._v(e._s(r.recordName||"-"))])]}},{key:"singleArchitectureInfo",fn:function(t){var r=t.row;return[o("svg-icon",{attrs:{"icon-class":"share","class-name":"svg-class"},on:{click:function(t){return e.goDetail(r)}}})]}},{key:"action",fn:function(t){var r=t.row;return[o("a",{staticClass:"active_color",on:{click:function(t){return e.edit(r)}}},[e._v("编辑")]),o("a",{staticClass:"del ml20",on:{click:function(t){return e.del(r)}}},[e._v("删除")])]}}])}),o("el-dialog",{attrs:{title:(1===e.mode?"新增":"编辑")+"项目信息",visible:e.formVisible,width:"700px",center:""},on:{"update:visible":function(t){e.formVisible=t}}},[o("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-suffix":":","label-position":"right","label-width":"120px",rules:e.rules}},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"名称",prop:"name"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"子项构成",prop:"sonName"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.sonName,callback:function(t){e.$set(e.addForm,"sonName",t)},expression:"addForm.sonName"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"总建筑面积",prop:"architectureArea"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.architectureArea,callback:function(t){e.$set(e.addForm,"architectureArea",t)},expression:"addForm.architectureArea"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"占地总面积",prop:"area"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.area,callback:function(t){e.$set(e.addForm,"area",t)},expression:"addForm.area"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"业主单位",prop:"ownerId"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addForm.ownerId,callback:function(t){e.$set(e.addForm,"ownerId",t)},expression:"addForm.ownerId"}},e._l(e.ownerArr,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"项目实施单位",prop:"projectExecuteCom"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addForm.projectExecuteCom,callback:function(t){e.$set(e.addForm,"projectExecuteCom",t)},expression:"addForm.projectExecuteCom"}},e._l(e.projectExecuteComArr,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"批准总经费",prop:"expenditure"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.expenditure,callback:function(t){e.$set(e.addForm,"expenditure",t)},expression:"addForm.expenditure"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"方案制编单位",prop:"projectCompileCom"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.projectCompileCom,callback:function(t){e.$set(e.addForm,"projectCompileCom",t)},expression:"addForm.projectCompileCom"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"方案文本",prop:"ebook"}},[o("upload",{attrs:{type:[".doc",".docx",".pdf"],multiple:!1},model:{value:e.addForm.ebook,callback:function(t){e.$set(e.addForm,"ebook",t)},expression:"addForm.ebook"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"方案预算",prop:"budget"}},[o("upload",{attrs:{type:[".xlsx","xls",".pdf"],multiple:!1},model:{value:e.addForm.budget,callback:function(t){e.$set(e.addForm,"budget",t)},expression:"addForm.budget"}})],1)],1)],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"国宝单位档案",prop:"record"}},[o("upload",{attrs:{type:[".doc",".docx",".pdf"],multiple:!1},model:{value:e.addForm.record,callback:function(t){e.$set(e.addForm,"record",t)},expression:"addForm.record"}})],1)],1),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"说明"}},[o("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:e.addForm.introduction,callback:function(t){e.$set(e.addForm,"introduction",t)},expression:"addForm.introduction"}})],1)],1)],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.formVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("addForm")}}},[e._v("确 定")])],1)],1)],1)},a=[],n=o("15f8"),d=o("cd6d"),c=(o("053b"),o("b4fb"),o("6a61"),o("8c93")),i=o("9dac"),l=[{prop:"id",label:"ID"},{prop:"name",label:"名称",tooltip:!0},{prop:"area",label:"占地面积"},{prop:"architectureArea",label:"总建筑面积"},{prop:"expenditure",label:"批准总经费(¥)"},{prop:"projectCompileCom",label:"方案编制单位"},{prop:"ownerName",label:"业主单位"},{prop:"introduction",label:"说明",tooltip:!0},{prop:"ebookName",label:"方案文本"},{prop:"budgetName",label:"方案预算"},{prop:"recordName",label:"国宝单位档案"},{prop:"singleArchitectureInfo",label:"项目详细信息"},{prop:"action",width:"120px",fixed:"right",label:"操作"}],s=o("2934"),m={name:"List",components:{ZfTable:c["a"],upload:i["a"]},data:function(){return{form:{name:""},column:l,tableList:[],pages:{pageNum:1,pageSize:10,total:0},formVisible:!1,mode:1,addForm:{id:"",name:"",sonName:"",architectureArea:"",area:"",ownerId:"",projectExecuteCom:"",expenditure:"",projectCompileCom:"",ebook:[],budget:[],record:[],introduction:""},rules:{name:[{required:!0,message:"请输入项目名字",trigger:"blur"}]},ownerArr:[],projectExecuteComArr:[]}},mounted:function(){var e=this;this.query(),Object(s["g"])().then((function(t){e.ownerArr=t.data.ownerIdAndName})),Object(s["e"])().then((function(t){e.projectExecuteComArr=t.data.executeIdAndName}))},methods:{query:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["i"])(Object(n["a"])(Object(n["a"])({},e.form),e.pages));case 2:o=t.sent,0===o.code&&(e.pages.total=o.data.projectList.total,e.tableList=o.data.projectList.rows);case 4:case"end":return t.stop()}}),t)})))()},handlePageChange:function(e){var t=e.pageNum,o=e.pageSize,r=e.sorter;r.prop,r.order;this.pages.pageNum=t,this.pages.pageSize=o,this.query()},handleSubmit:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(o){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!o){e.next=12;break}if(1!==t.mode){e.next=8;break}return e.next=4,Object(s["n"])(Object(n["a"])(Object(n["a"])({},t.addForm),{},{ebook:t.addForm.ebook.length&&t.addForm.ebook[0].id||"",budget:t.addForm.budget.length&&t.addForm.budget[0].id||"",record:t.addForm.record.length&&t.addForm.record[0].id||""}));case 4:r=e.sent,0===r.code&&(t.formVisible=!1,t.$message.success("新增项目成功!"),t.query()),e.next=12;break;case 8:return e.next=10,Object(s["t"])(Object(n["a"])(Object(n["a"])({},t.addForm),{},{ebook:t.addForm.ebook.length&&t.addForm.ebook[0].id||"",budget:t.addForm.budget.length&&t.addForm.budget[0].id||"",record:t.addForm.record.length&&t.addForm.record[0].id||""}));case 10:a=e.sent,0===a.code&&(t.formVisible=!1,t.$message.success("编辑项目成功!"),t.query());case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},edit:function(e){this.formVisible=!0,this.mode=2,this.addForm.name=e.name,this.addForm.sonName=e.sonName,this.addForm.architectureArea=e.architectureArea,this.addForm.area=e.area,this.addForm.ownerId=e.ownerId,this.addForm.projectExecuteCom=e.projectExecuteCom,this.addForm.expenditure=e.expenditure,this.addForm.projectCompileCom=e.projectCompileCom,this.addForm.ebook=e.ebookName&&e.ebook?[{name:e.ebookName,id:e.ebook}]:[],this.addForm.budget=e.budgetName&&e.budget?[{name:e.budgetName,id:e.budget}]:[],this.addForm.record=e.recordName&&e.record?[{name:e.recordName,id:e.record}]:[],this.addForm.introduction=e.introduction,this.addForm.id=e.id},del:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(d["a"])(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,Object(s["a"])({projectId:e.id});case 2:r=o.sent,0===r.code&&(t.$message.success("删除项目成功!"),t.query());case 4:case"end":return o.stop()}}),o)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},add:function(){this.formVisible=!0,this.mode=1,this.addForm.name="",this.addForm.sonName="",this.addForm.architectureArea="",this.addForm.area="",this.addForm.ownerId="",this.addForm.projectExecuteCom="",this.addForm.expenditure="",this.addForm.projectCompileCom="",this.addForm.ebook=[],this.addForm.budget=[],this.addForm.record=[],this.addForm.introduction="",this.addForm.id=""},goDetail:function(e){this.$router.push("/projectInformation/project-detail?id=".concat(e.id))},downLoad:function(e,t){var o=this;e&&t&&this.$confirm("即将下载 <span style='color:#3a8ee6;'>".concat(e,"</span>, 是否继续?"),"提示",{dangerouslyUseHTMLString:!0,confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(d["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=document.createElement("a"),r.href="".concat("http://116.62.245.76:80/wwbh","/file/download?id=").concat(t),document.body.appendChild(r),r.click(),document.body.removeChild(r),o.formVisible=!1;case 6:case"end":return e.stop()}}),e)})))).catch((function(){o.$message({type:"info",message:"已取消下载"})}))}}},u=m,p=(o("bb0f"),o("4ac2")),b=Object(p["a"])(u,r,a,!1,null,null,null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-61609ab6.c7501f51.js.map