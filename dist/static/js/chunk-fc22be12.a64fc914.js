(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc22be12"],{5765:function(e,t,l){"use strict";l.d(t,"a",(function(){return a})),l.d(t,"d",(function(){return o})),l.d(t,"b",(function(){return i})),l.d(t,"c",(function(){return s})),l.d(t,"e",(function(){return n}));var a=[{prop:"id",label:"ID"},{prop:"project",label:"项目"},{prop:"time",label:"时间"},{prop:"report",label:"日报"},{prop:"feedback",label:"反馈兰"},{prop:"idea",label:"评估意见栏"},{prop:"action",width:"120px",label:"操作"}],o=[{prop:"id",label:"ID"},{prop:"project",label:"项目"},{prop:"time",label:"时间"},{prop:"report",label:"周报"},{prop:"feedback",label:"反馈兰"},{prop:"idea",label:"评估意见栏"},{prop:"action",width:"120px",label:"操作"}],i=[{prop:"id",label:"ID"},{prop:"project",label:"项目"},{prop:"time",label:"时间"},{prop:"report",label:"月报"},{prop:"idea",label:"评估意见栏"},{prop:"action",width:"120px",label:"操作"}],s=[{prop:"id",label:"ID"},{prop:"time",label:"时间"},{prop:"report",label:"季报"},{prop:"idea",label:"评估意见栏"},{prop:"action",width:"120px",label:"操作"}],n=[{prop:"id",label:"ID"},{prop:"time",label:"时间"},{prop:"report",label:"年报"},{prop:"idea",label:"评估意见栏"},{prop:"action",width:"120px",label:"操作"}]},c61a:function(e,t,l){"use strict";l("f81f")},caaa:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"bgfff out_wrap"},[l("div",{staticClass:"flex_between1"},[l("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[l("el-form-item",{attrs:{label:"时间"}},[l("el-date-picker",{attrs:{type:"daterange","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期",editable:!1,"value-format":"yyyy-MM-dd"},on:{change:e.query},model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1)],1),l("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增")])],1),l("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.page},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"action",fn:function(t){var a=t.row;return[l("a",{staticClass:"active_color",on:{click:function(t){return e.edit(a)}}},[e._v("编辑")]),l("a",{staticClass:"del ml20",on:{click:function(t){return e.del(a)}}},[e._v("删除")])]}}])},[l("template",{slot:"report"},[l("a",{staticClass:"active_color"},[e._v("下载")])]),l("template",{slot:"feedback"},[l("a",{staticClass:"active_color",on:{click:function(t){e.feedVisible=!0,e.isFeed=!1}}},[e._v("查看")]),l("a",{staticClass:"active_color ml20",on:{click:function(t){e.feedVisible=!0,e.isFeed=!0}}},[e._v("编辑")])]),l("template",{slot:"idea"},[l("a",{staticClass:"active_color",on:{click:function(t){e.upVisible=!0,e.isSubmit=!1}}},[e._v("查看")]),l("a",{staticClass:"active_color ml20",on:{click:function(t){e.upVisible=!0,e.isSubmit=!0}}},[e._v("编辑")])])],2),l("el-dialog",{attrs:{title:(1===e.mode?"新增":"编辑")+"日报",visible:e.addVisible,width:"350px",center:""},on:{"update:visible":function(t){e.addVisible=t}}},[l("el-form",{attrs:{model:e.addForm,"label-suffix":":"}},[l("el-form-item",{attrs:{label:"时间"}},[l("el-date-picker",{attrs:{editable:!1,clearable:"",type:"date",placeholder:"请选择日期"},model:{value:e.addForm.time,callback:function(t){e.$set(e.addForm,"time",t)},expression:"addForm.time"}})],1),l("el-form-item",{attrs:{label:"项目"}},[l("el-select",{staticClass:"inputWith",attrs:{placeholder:"请选择"},model:{value:e.addForm.time,callback:function(t){e.$set(e.addForm,"time",t)},expression:"addForm.time"}},[l("el-option",{attrs:{label:"项目一",value:"shanghai"}}),l("el-option",{attrs:{label:"项目二",value:"beijing"}})],1)],1),l("el-form-item",{attrs:{label:"日报上传"}},[l("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,"auto-upload":!1}},[l("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),l("div",{staticClass:"el-upload__tip",staticStyle:{"line-height":"20px"},attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传dwg/jpg/png文件，且不超过20M")])],1)],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addVisible=!1}}},[e._v("确 定")])],1)],1),l("el-dialog",{attrs:{visible:e.upVisible,width:"450px",center:""},on:{"update:visible":function(t){e.upVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.commentForm,"label-width":"145px","label-suffix":":"}},[l("el-form-item",{attrs:{label:"评估小组成员意见"}},[e.isSubmit?l("el-input",{model:{value:e.commentForm.sunName,callback:function(t){e.$set(e.commentForm,"sunName",t)},expression:"commentForm.sunName"}}):l("span",[e._v("会撒娇就撒娇")])],1),l("el-form-item",{attrs:{label:"评估组长意见"}},[e.isSubmit?l("el-input",{model:{value:e.commentForm.sunName,callback:function(t){e.$set(e.commentForm,"sunName",t)},expression:"commentForm.sunName"}}):l("span",[e._v("会撒娇就撒娇")])],1),l("el-form-item",{attrs:{label:"评估专家意见"}},[e.isSubmit?l("el-input",{model:{value:e.commentForm.sunName,callback:function(t){e.$set(e.commentForm,"sunName",t)},expression:"commentForm.sunName"}}):l("span",[e._v("会撒娇就撒娇")])],1),l("el-form-item",{attrs:{label:"评估项目组综合意见"}},[e.isSubmit?l("el-input",{model:{value:e.commentForm.sunName,callback:function(t){e.$set(e.commentForm,"sunName",t)},expression:"commentForm.sunName"}}):l("span",[e._v("会撒娇就撒娇")])],1)],1),e.isSubmit?l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.upVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.upVisible=!1}}},[e._v("确 定")])],1):e._e()],1),l("el-dialog",{attrs:{visible:e.feedVisible,width:"450px",center:""},on:{"update:visible":function(t){e.feedVisible=t}}},[l("div",{staticClass:"bold mb10"},[e._v("日报反馈内容:")]),e.isFeed?l("el-input",{attrs:{type:"textarea",rows:6,placeholder:"请输入内容"},model:{value:e.feed,callback:function(t){e.feed=t},expression:"feed"}}):l("div",[e._v("日报反馈内容日报反馈内容日报反馈内容日报反馈内容日报反馈内容")]),e.isFeed?l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.feedVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.feedVisible=!1}}},[e._v("确 定")])],1):e._e()],1)],1)},o=[],i=l("8c93"),s=l("5765"),n={name:"List",components:{ZfTable:i["a"]},data:function(){return{form:{time:""},column:s["a"],tableList:[{id:1,project:"承德避暑山庄",time:"2021-06-04"},{id:1,project:"承德避暑山庄",time:"2021-06-04"},{id:1,project:"承德避暑山庄",time:"2021-06-04"}],pages:{page:1,pageSize:10,total:0},addVisible:!1,mode:1,addForm:{},fileList:[{name:"food.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{name:"food2.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}],commentForm:{},upVisible:!1,isSubmit:!1,feedVisible:!1,feed:"",isFeed:!1}},mounted:function(){},methods:{query:function(){},handlePageChange:function(e){e.pageNum,e.pageSize;var t=e.sorter;t.prop,t.order;console.log("aa")},edit:function(e){this.mode=2,this.addVisible=!0},del:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message({type:"success",message:"删除成功!"})})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},add:function(){this.mode=1,this.addVisible=!0},submitUpload:function(){this.$refs.upload.submit()},handleRemove:function(e,t){console.log(e,t)},handlePreview:function(e){console.log(e)}}},r=n,c=(l("c61a"),l("4ac2")),p=Object(c["a"])(r,a,o,!1,null,null,null);t["default"]=p.exports},f81f:function(e,t,l){}}]);
//# sourceMappingURL=chunk-fc22be12.a64fc914.js.map