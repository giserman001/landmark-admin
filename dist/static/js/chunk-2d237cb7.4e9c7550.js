(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d237cb7"],{fd47:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"out_wrap"},[a("div",{staticClass:"flex_between search mb22"},[a("div",{staticClass:"left"},[a("el-input",{staticClass:"w150",attrs:{type:"text",placeholder:"请输入员工姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.query(1)}},model:{value:e.queryControl.keyword,callback:function(t){e.$set(e.queryControl,"keyword",t)},expression:"queryControl.keyword"}}),a("el-input",{staticClass:"ml20",staticStyle:{width:"160px"},attrs:{type:"text",placeholder:"请输入员工手机号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.query(1)}},model:{value:e.queryControl.account,callback:function(t){e.$set(e.queryControl,"account",t)},expression:"queryControl.account"}}),a("el-button",{staticClass:"ml20",attrs:{type:"primary"},on:{click:function(t){return e.query(1)}}},[e._v("查询")])],1),a("div",{staticClass:"right"},[a("el-button",{attrs:{type:"primary"},on:{click:e.create}},[a("i",{staticClass:"el-icon-plus"}),e._v("新增员工")])],1)]),a("el-table",{staticClass:"w100",attrs:{data:e.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"nickname",label:"员工姓名","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"account",label:"手机号","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"create_user_name",label:"创建人","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{staticClass:"edit",on:{click:function(a){return e.edit(t.row)}}},[e._v("编辑")]),2==t.row.status?a("a",{staticClass:"edit",on:{click:function(a){return e.setStatus(t.row,1)}}},[e._v("启用")]):e._e(),1==t.row.status?a("a",{staticClass:"del",on:{click:function(a){return e.setStatus(t.row,2)}}},[e._v("禁用")]):e._e()]}}])})],1),e.tableData.length>0?a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":e.pageControl.pageNumber,"page-size":e.pageControl.pageSize,total:e.pageControl.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}}):e._e(),a("el-dialog",{attrs:{title:1==e.mode?"新建员工":"编辑员工",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.groupOne,rules:e.rules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"员工姓名：",prop:"nickname"}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工姓名",clearable:""},model:{value:e.groupOne.nickname,callback:function(t){e.$set(e.groupOne,"nickname",t)},expression:"groupOne.nickname"}})],1),a("el-form-item",{attrs:{label:"手机号：",prop:"account"}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工手机号",maxlength:"11",clearable:"",disabled:2==e.mode},model:{value:e.groupOne.account,callback:function(t){e.$set(e.groupOne,"account",t)},expression:"groupOne.account"}})],1),1==e.mode?a("el-form-item",{attrs:{label:"默认登录密码："}},[a("el-input",{staticClass:"w100",attrs:{placeholder:"默认登录密码",disabled:"",value:"111111"}})],1):e._e()],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确定")])],1)],1)],1)},n=[],o=a("f206"),i=a("f374"),l=(a("6a61"),a("52c1")),s={data:function(){var e=function(e,t,a){""!==t&&void 0!==t?/^1[3456789]\d{9}$/.test(t)?a():a(new Error("请输入正确的手机号")):a(new Error("请输入手机号"))};return{mode:1,dialogFormVisible:!1,groupOne:{},rules:{nickname:[{required:!0,message:"请输入员工姓名",trigger:"change"}],account:[{required:!0,validator:e,trigger:"change"}],role_id:[{required:!0,message:"请选择权限角色",trigger:"change"}]}}},computed:Object(i["a"])({},Object(l["c"])("accountInfo",["tableData","queryControl","pageControl"])),created:function(){this.query(this.pageControl.pageNumber)},methods:Object(i["a"])(Object(i["a"])({},Object(l["b"])("accountInfo",["operatorListFn","operatorStatusFn","editOperatorFn","addOperatorFn"])),{},{query:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pageControl.pageNumber=e,a.next=3,t.operatorListFn({keyword:t.queryControl.keyword,account:t.queryControl.account,page:e,pageSize:t.pageControl.pageSize});case 3:case"end":return a.stop()}}),a)})))()},create:function(){var e=this;this.mode=1,this.groupOne={},this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.ruleForm.clearValidate(["nickname","account","role_id"])}))},edit:function(e){var t=this;this.mode=2,this.groupOne=Object(i["a"])({},e),this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.ruleForm.clearValidate(["nickname","account","role_id"])}))},setStatus:function(e,t){var a=this;2===t?this.$confirm("禁用后该账号将无法登录（数据将保留），确认禁用此账号？","禁用提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.operatorStatusFn({account_id:e.id,status:t}).then((function(e){e&&(a.$message({type:"success",message:"禁用成功"}),a.query(a.pageControl.pageNumber))}))})).catch((function(){})):this.operatorStatusFn({account_id:e.id,status:t}).then((function(e){e&&(a.$message({type:"success",message:"启用成功"}),a.query(a.pageControl.pageNumber))}))},handleCurrentChange:function(e){this.query(e)},handleSizeChange:function(e){this.pageControl.pageSize=e,this.query(1)},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=12;break}if(1!==t.mode){e.next=8;break}return e.next=4,t.addOperatorFn({account:t.groupOne.account,nickname:t.groupOne.nickname,role:t.groupOne.role_id});case 4:r=e.sent,200===r.code&&(t.dialogFormVisible=!1,t.$message({type:"success",message:"新增成功"}),t.query(t.pageControl.pageNumber)),e.next=12;break;case 8:return e.next=10,t.editOperatorFn({id:t.groupOne.id,account:t.groupOne.account,nickname:t.groupOne.nickname,role:t.groupOne.role_id});case 10:n=e.sent,200===n.code&&(t.dialogFormVisible=!1,t.$message({type:"success",message:"编辑成功"}),t.query(t.pageControl.pageNumber));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},roleManage:function(){this.$router.push("/role")}})},c=s,u=a("5d22"),p=Object(u["a"])(c,r,n,!1,null,"3f0ea10a",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d237cb7.4e9c7550.js.map