(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09c96f55"],{"0c01":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bgfff out_wrap"},[r("div",{staticClass:"flex_between1"},[r("el-form",{attrs:{inline:!0,model:e.form,size:"small","label-suffix":":"}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),r("el-form-item",{attrs:{label:"手机号"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1),r("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增用户")])],1),r("zf-table",{attrs:{columns:e.column,"data-source":e.tableList,total:e.pages.total,"page-size":e.pages.pageSize,"page-num":e.pages.pageNum},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.row;return[r("a",{staticClass:"active_color",on:{click:function(t){return e.edit(n)}}},[e._v("编辑")]),r("a",{staticClass:"del ml20",on:{click:function(t){return e.del(n)}}},[e._v("删除")])]}}])}),r("el-dialog",{attrs:{title:1==e.mode?"新建员工":"编辑员工",visible:e.dialogVisible,center:"",width:"400px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.groupOne,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"用户姓名：",prop:"userName"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工姓名",clearable:""},model:{value:e.groupOne.userName,callback:function(t){e.$set(e.groupOne,"userName",t)},expression:"groupOne.userName"}})],1),r("el-form-item",{attrs:{label:"手机号：",prop:"mobile"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"请输入员工手机号",maxlength:"11",clearable:""},model:{value:e.groupOne.mobile,callback:function(t){e.$set(e.groupOne,"mobile",t)},expression:"groupOne.mobile"}})],1),r("el-form-item",{attrs:{label:"权限角色：",prop:"roleId"}},[r("el-select",{staticClass:"w100",attrs:{placeholder:"请选择权限角色",clearable:"",filterable:""},model:{value:e.groupOne.roleId,callback:function(t){e.$set(e.groupOne,"roleId",t)},expression:"groupOne.roleId"}},e._l(e.optionArr,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),1===e.mode?r("el-form-item",{attrs:{label:"登录密码：",prop:"password"}},[r("el-input",{staticClass:"w100",attrs:{placeholder:"登录密码"},model:{value:e.groupOne.password,callback:function(t){e.$set(e.groupOne,"password",t)},expression:"groupOne.password"}})],1):e._e()],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},o=[],u=r("15f8"),a=r("cd6d"),c=(r("6a61"),r("8c93")),i=r("b313"),s=r("2934"),l={name:"List",components:{ZfTable:c["a"]},data:function(){var e=function(e,t,r){""!==t&&void 0!==t?/^1[3456789]\d{9}$/.test(t)?r():r(new Error("请输入正确的手机号")):r(new Error("请输入手机号"))};return{mode:1,groupOne:{userName:"",mobile:"",roleId:"",password:"",userId:""},dialogVisible:!1,rules:{userName:[{required:!0,message:"请输入员工姓名",trigger:"change"}],mobile:[{required:!0,validator:e,trigger:"change"}],roleId:[{required:!0,message:"请选择权限角色",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]},optionArr:[],form:{userName:"",mobile:""},column:i["b"],tableList:[],pages:{pageNum:1,pageSize:10,total:0}}},mounted:function(){var e=this;this.query(),Object(s["G"])({pageNum:1,pageSize:999999}).then((function(t){e.optionArr=t.data.roleList.rows}))},methods:{query:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["I"])(Object(u["a"])(Object(u["a"])({},e.form),e.pages));case 2:r=t.sent,0===r.code&&(e.pages.total=r.data.userList.total,e.tableList=r.data.userList.rows);case 4:case"end":return t.stop()}}),t)})))()},handlePageChange:function(e){var t=e.pageNum,r=e.pageSize,n=e.sorter;n.prop,n.order;this.pages.pageNum=t,this.pages.pageSize=r,this.query()},edit:function(e){this.mode=2,this.groupOne.userId=e.userId,this.groupOne.userName=e.username,this.groupOne.mobile=e.mobile,this.groupOne.roleId=e.role,this.dialogVisible=!0},del:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(s["k"])({userId:e.userId});case 2:n=r.sent,0===n.code&&(t.$message.success("删除用户成功!"),t.query());case 4:case"end":return r.stop()}}),r)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},add:function(){this.mode=1,this.groupOne.userId="",this.groupOne.userName="",this.groupOne.mobile="",this.groupOne.roleId="",this.groupOne.password="",this.dialogVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(r){var n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}if(1!==t.mode){e.next=8;break}return e.next=4,Object(s["X"])(t.groupOne);case 4:n=e.sent,0===n.code&&(t.dialogVisible=!1,t.$message.success("新增用户成功!"),t.query()),e.next=13;break;case 8:return delete t.groupOne.password,e.next=11,Object(s["cb"])(t.groupOne);case 11:o=e.sent,0===o.code&&(t.dialogVisible=!1,t.$message.success("编辑用户成功!"),t.query());case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},d=l,p=r("4ac2"),m=Object(p["a"])(d,n,o,!1,null,null,null);t["default"]=m.exports},2934:function(e,t,r){"use strict";r.d(t,"P",(function(){return o})),r.d(t,"I",(function(){return u})),r.d(t,"G",(function(){return a})),r.d(t,"X",(function(){return c})),r.d(t,"cb",(function(){return i})),r.d(t,"k",(function(){return s})),r.d(t,"V",(function(){return l})),r.d(t,"bb",(function(){return d})),r.d(t,"i",(function(){return p})),r.d(t,"n",(function(){return m})),r.d(t,"A",(function(){return f})),r.d(t,"lb",(function(){return g})),r.d(t,"C",(function(){return b})),r.d(t,"S",(function(){return h})),r.d(t,"ib",(function(){return O})),r.d(t,"f",(function(){return j})),r.d(t,"y",(function(){return R})),r.d(t,"s",(function(){return w})),r.d(t,"u",(function(){return y})),r.d(t,"E",(function(){return v})),r.d(t,"T",(function(){return I})),r.d(t,"jb",(function(){return k})),r.d(t,"g",(function(){return x})),r.d(t,"x",(function(){return B})),r.d(t,"r",(function(){return L})),r.d(t,"v",(function(){return N})),r.d(t,"ab",(function(){return q})),r.d(t,"B",(function(){return C})),r.d(t,"M",(function(){return P})),r.d(t,"db",(function(){return S})),r.d(t,"a",(function(){return A})),r.d(t,"o",(function(){return $})),r.d(t,"q",(function(){return _})),r.d(t,"N",(function(){return F})),r.d(t,"eb",(function(){return E})),r.d(t,"b",(function(){return T})),r.d(t,"K",(function(){return z})),r.d(t,"Y",(function(){return V})),r.d(t,"l",(function(){return U})),r.d(t,"nb",(function(){return D})),r.d(t,"ob",(function(){return W})),r.d(t,"J",(function(){return M})),r.d(t,"w",(function(){return Q})),r.d(t,"d",(function(){return Y})),r.d(t,"gb",(function(){return J})),r.d(t,"Q",(function(){return G})),r.d(t,"F",(function(){return X})),r.d(t,"h",(function(){return Z})),r.d(t,"kb",(function(){return H})),r.d(t,"U",(function(){return K})),r.d(t,"L",(function(){return ee})),r.d(t,"m",(function(){return te})),r.d(t,"pb",(function(){return re})),r.d(t,"Z",(function(){return ne})),r.d(t,"D",(function(){return oe})),r.d(t,"p",(function(){return ue})),r.d(t,"H",(function(){return ae})),r.d(t,"W",(function(){return ce})),r.d(t,"mb",(function(){return ie})),r.d(t,"j",(function(){return se})),r.d(t,"z",(function(){return le})),r.d(t,"e",(function(){return de})),r.d(t,"R",(function(){return pe})),r.d(t,"hb",(function(){return me})),r.d(t,"t",(function(){return fe})),r.d(t,"c",(function(){return ge})),r.d(t,"O",(function(){return be})),r.d(t,"fb",(function(){return he}));var n=r("b775");function o(e){return Object(n["a"])({url:"/file/saveFile",method:"post",data:e})}function u(e){return Object(n["a"])({url:"/user/getUserList",method:"get",params:e})}function a(e){return Object(n["a"])({url:"/role/getRoleList",method:"get",params:e})}function c(e){return Object(n["a"])({url:"/user/saveUser",method:"get",params:e})}function i(e){return Object(n["a"])({url:"/user/updateUserById",method:"get",params:e})}function s(e){return Object(n["a"])({url:"/user/deteleUserById",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/role/saveRole",method:"get",params:e})}function d(e){return Object(n["a"])({url:"/role/updateRoleById",method:"get",params:e})}function p(e){return Object(n["a"])({url:"/user/deteleRoleById",method:"get",params:e})}function m(e){return Object(n["a"])({url:"/role/getAllPage",method:"get",params:e})}function f(e){return Object(n["a"])({url:"/role/getPageByRoleId",method:"get",params:e})}function g(e){return Object(n["a"])({url:"/role/updateRolePageForRoleId",method:"get",params:e})}function b(e){return Object(n["a"])({url:"/project/getProjectList",method:"get",params:e})}function h(e){return Object(n["a"])({url:"/project/saveProject",method:"get",params:e})}function O(e){return Object(n["a"])({url:"/project/updateProject",method:"get",params:e})}function j(e){return Object(n["a"])({url:"/project/deteleProjectById",method:"get",params:e})}function R(e){return Object(n["a"])({url:"/owner/getOwnerIdAndName",method:"get",params:e})}function w(e){return Object(n["a"])({url:"/execute/getExecuteIdAndName",method:"get",params:e})}function y(e){return Object(n["a"])({url:"/file/getFilesByIds",method:"get",params:e})}function v(e){return Object(n["a"])({url:"/project/son/getProjectSonList",method:"get",params:e})}function I(e){return Object(n["a"])({url:"/project/son/saveProjectSon",method:"get",params:e})}function k(e){return Object(n["a"])({url:"/project/son/updateProjectSon",method:"get",params:e})}function x(e){return Object(n["a"])({url:"/project/son/deteleProjectSonById",method:"get",params:e})}function B(e){return Object(n["a"])({url:"/owner/getOwnerById",method:"get",params:e})}function L(e){return Object(n["a"])({url:"/execute/getExecuteById",method:"get",params:e})}function N(e){return Object(n["a"])({url:"staffInfo/getListByTypeAndComId",method:"get",params:e})}function q(e){return Object(n["a"])({url:"/staffInfo/getById",method:"get",params:e})}function C(e){return Object(n["a"])({url:"/project/architecture/getProjectArchitectureList",method:"get",params:e})}function P(e){return Object(n["a"])({url:"/project/architecture/saveArchitecture",method:"get",params:e})}function S(e){return Object(n["a"])({url:"/project/architecture/updateArchitecture",method:"get",params:e})}function A(e){return Object(n["a"])({url:"/project/architecture/deteleArchitectureById",method:"get",params:e})}function $(e){return Object(n["a"])({url:"/project/architecture/getById",method:"get",params:e})}function _(e){return Object(n["a"])({url:"/dayReport/getDayReportList",method:"get",params:e})}function F(e){return Object(n["a"])({url:"/dayReport/saveDayReport",method:"get",params:e})}function E(e){return Object(n["a"])({url:"/dayReport/updateDayReport",method:"get",params:e})}function T(e){return Object(n["a"])({url:"/dayReport/deteleDayReportById",method:"get",params:e})}function z(e){return Object(n["a"])({url:"/weekReport/getWeekReportList",method:"get",params:e})}function V(e){return Object(n["a"])({url:"/weekReport/saveWeekReport",method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function U(e){return Object(n["a"])({url:"/weekReport/deteleDayReportById",method:"get",params:e})}function D(e){return Object(n["a"])({url:"/weekReport/updateWeekReport",method:"get",params:e})}function W(e){return Object(n["a"])({url:"/weekReport/updateWeekReportRecord",method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function M(e){return Object(n["a"])({url:"/weekReport/getWeekReportRecordList",method:"get",params:e})}function Q(e){return Object(n["a"])({url:"/monthReport/getMonthReportList",method:"get",params:e})}function Y(e){return Object(n["a"])({url:"/monthReport/deteleMonthReportById",method:"get",params:e})}function J(e){return Object(n["a"])({url:"/monthReport/updateMonthReport",method:"get",params:e})}function G(e){return Object(n["a"])({url:"/monthReport/saveMonthReport",method:"get",params:e})}function X(e){return Object(n["a"])({url:"/quarterReport/getQuarterReportList",method:"get",params:e})}function Z(e){return Object(n["a"])({url:"/quarterReport/deteleQuarterReportById",method:"get",params:e})}function H(e){return Object(n["a"])({url:"/quarterReport/updateQuarterReport",method:"get",params:e})}function K(e){return Object(n["a"])({url:"/quarterReport/saveQuarterReport",method:"get",params:e})}function ee(e){return Object(n["a"])({url:"/yearReport/getYearReportList",method:"get",params:e})}function te(e){return Object(n["a"])({url:"/yearReport/deteleYearReportById",method:"get",params:e})}function re(e){return Object(n["a"])({url:"/yearReport/updateYearReport",method:"get",params:e})}function ne(e){return Object(n["a"])({url:"/yearReport/saveYearReport",method:"get",params:e})}function oe(e){return Object(n["a"])({url:"/weekReport/getProjectSonIdAndName",method:"get",params:e})}function ue(e){return Object(n["a"])({url:"/weekReport/getArchitectureIdAndName",method:"get",params:e})}function ae(e){return Object(n["a"])({url:"/staffInfo/getStaffInfoList",method:"get",params:e})}function ce(e){return Object(n["a"])({url:"/staffInfo/saveStaffInfo",method:"get",params:e})}function ie(e){return Object(n["a"])({url:"/staffInfo/updateStaffInfo",method:"get",params:e})}function se(e){return Object(n["a"])({url:"/staffInfo/deteleStaffInfoById",method:"get",params:e})}function le(e){return Object(n["a"])({url:"/owner/getOwnerList",method:"get",params:e})}function de(e){return Object(n["a"])({url:"/owner/deteleOwnerById",method:"get",params:e})}function pe(e){return Object(n["a"])({url:"/owner/saveOwner",method:"get",params:e})}function me(e){return Object(n["a"])({url:"/owner/updateOwner",method:"get",params:e})}function fe(e){return Object(n["a"])({url:"/execute/getExecuteList",method:"get",params:e})}function ge(e){return Object(n["a"])({url:"/execute/deteleExecuteById",method:"get",params:e})}function be(e){return Object(n["a"])({url:"/execute/saveExecute",method:"get",params:e})}function he(e){return Object(n["a"])({url:"/execute/updateExecute",method:"get",params:e})}},b313:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o}));var n=[{prop:"username",label:"用户姓名"},{prop:"mobile",label:"手机号"},{prop:"roleName",label:"权限角色"},{prop:"createTime",label:"创建时间"},{prop:"action",width:"120px",label:"操作"}],o=[{prop:"name",label:"角色名称"},{prop:"remark",label:"描述"},{prop:"action",width:"180px",label:"操作"}]}}]);
//# sourceMappingURL=chunk-09c96f55.a9bc7e35.js.map