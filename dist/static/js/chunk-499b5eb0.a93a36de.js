(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-499b5eb0"],{"0c01":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bgfff out_wrap"},[r("div",{staticClass:"flex_between1"},[r("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),r("el-form-item",{attrs:{label:"手机号"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1),r("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增用户")])],1),r("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.pageNum},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"action",fn:function(t){var a=t.row;return[r("a",{staticClass:"active_color",on:{click:function(t){return e.edit(a)}}},[e._v("编辑")]),r("a",{staticClass:"del ml20",on:{click:function(t){return e.del(a)}}},[e._v("删除")])]}}])}),r("el-dialog",{attrs:{title:1==e.mode?"新建员工":"编辑员工",visible:e.dialogVisible,center:"",width:"400px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.groupOne,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"用户姓名：",prop:"userName"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工姓名",clearable:""},model:{value:e.groupOne.userName,callback:function(t){e.$set(e.groupOne,"userName",t)},expression:"groupOne.userName"}})],1),r("el-form-item",{attrs:{label:"手机号：",prop:"mobile"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工手机号",maxlength:"11",clearable:""},model:{value:e.groupOne.mobile,callback:function(t){e.$set(e.groupOne,"mobile",t)},expression:"groupOne.mobile"}})],1),r("el-form-item",{attrs:{label:"权限角色：",prop:"roleId"}},[r("el-select",{staticClass:"w100",attrs:{placeholder:"请选择权限角色",clearable:"",filterable:""},model:{value:e.groupOne.roleId,callback:function(t){e.$set(e.groupOne,"roleId",t)},expression:"groupOne.roleId"}},e._l(e.optionArr,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),1===e.mode?r("el-form-item",{attrs:{label:"登录密码：",prop:"password"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"登录密码"},model:{value:e.groupOne.password,callback:function(t){e.$set(e.groupOne,"password",t)},expression:"groupOne.password"}})],1):e._e()],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},o=[],s=r("15f8"),n=r("cd6d"),i=(r("6a61"),r("8c93")),l=r("b313"),u=r("2934"),c={name:"List",components:{ZfTable:i["a"]},data:function(){var e=function(e,t,r){""!==t&&void 0!==t?/^1[3456789]\d{9}$/.test(t)?r():r(new Error("请输入正确的手机号")):r(new Error("请输入手机号"))};return{mode:1,groupOne:{userName:"",mobile:"",roleId:"",password:"",userId:""},dialogVisible:!1,rules:{userName:[{required:!0,message:"请输入员工姓名",trigger:"change"},{min:2,max:15,message:"用户名长度在2到15个字符",trigger:"blur"}],mobile:[{required:!0,validator:e,trigger:"change"}],roleId:[{required:!0,message:"请选择权限角色",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{min:2,max:15,message:"密码长度在2到15个字符",trigger:"blur"}]},optionArr:[],form:{userName:"",mobile:""},column:l["b"],tableList:[],pages:{pageNum:1,pageSize:10,total:0}}},mounted:function(){var e=this;this.query(),Object(u["G"])({pageNum:1,pageSize:999999}).then((function(t){e.optionArr=t.data.roleList.rows}))},methods:{query:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["I"])(Object(s["a"])(Object(s["a"])({},e.form),e.pages));case 2:r=t.sent,0===r.code&&(e.pages.total=r.data.userList.total,e.tableList=r.data.userList.rows);case 4:case"end":return t.stop()}}),t)})))()},handlePageChange:function(e){var t=e.pageNum,r=e.pageSize,a=e.sorter;a.prop,a.order;this.pages.pageNum=t,this.pages.pageSize=r,this.query()},edit:function(e){this.mode=2,this.groupOne.userId=e.userId,this.groupOne.userName=e.username,this.groupOne.mobile=e.mobile,this.groupOne.roleId=e.role,this.dialogVisible=!0},del:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["k"])({userId:e.userId});case 2:a=r.sent,0===a.code&&(t.$message.success("删除用户成功!"),t.query());case 4:case"end":return r.stop()}}),r)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},add:function(){this.mode=1,this.groupOne.userId="",this.groupOne.userName="",this.groupOne.mobile="",this.groupOne.roleId="",this.groupOne.password="",this.dialogVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}if(1!==t.mode){e.next=8;break}return e.next=4,Object(u["X"])(t.groupOne);case 4:a=e.sent,0===a.code&&(t.dialogVisible=!1,t.$message.success("新增用户成功!"),t.query()),e.next=13;break;case 8:return delete t.groupOne.password,e.next=11,Object(u["cb"])(t.groupOne);case 11:o=e.sent,0===o.code&&(t.dialogVisible=!1,t.$message.success("编辑用户成功!"),t.query());case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},p=c,m=r("4ac2"),d=Object(m["a"])(p,a,o,!1,null,null,null);t["default"]=d.exports},b313:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return o}));var a=[{prop:"username",label:"用户姓名"},{prop:"mobile",label:"手机号"},{prop:"roleName",label:"权限角色"},{prop:"createTime",label:"创建时间"},{prop:"action",width:"120px",label:"操作"}],o=[{prop:"name",label:"角色名称"},{prop:"remark",label:"描述"},{prop:"action",width:"180px",label:"操作"}]}}]);
//# sourceMappingURL=chunk-499b5eb0.a93a36de.js.map