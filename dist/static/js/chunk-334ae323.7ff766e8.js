(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-334ae323"],{"403f":function(e,t,a){"use strict";var o=a("6d7a"),i=a("d910"),r=a("90fb"),s=a("1e2c"),l=r("species");e.exports=function(e){var t=o(e),a=i.f;s&&t&&!t[l]&&a(t,l,{configurable:!0,get:function(){return this}})}},4194:function(e,t,a){"use strict";var o=a("1c8b"),i=a("5dfd").find,r=a("258f"),s=a("ff9c"),l="find",n=!0,c=s(l);l in[]&&Array(1)[l]((function(){n=!1})),o({target:"Array",proto:!0,forced:n||!c},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r(l)},"569a":function(e,t,a){"use strict";a("583e")},"583e":function(e,t,a){},"84c2":function(e,t,a){var o=a("1e2c"),i=a("d890"),r=a("e8d6"),s=a("7063"),l=a("d910").f,n=a("b338").f,c=a("8a1c"),d=a("99ad"),u=a("22ef"),p=a("1944"),m=a("efe2"),f=a("b702").set,b=a("403f"),h=a("90fb"),v=h("match"),F=i.RegExp,x=F.prototype,y=/a/g,g=/a/g,C=new F(y)!==y,k=u.UNSUPPORTED_Y,j=o&&r("RegExp",!C||k||m((function(){return g[v]=!1,F(y)!=y||F(g)==g||"/a/i"!=F(y,"i")})));if(j){var I=function(e,t){var a,o=this instanceof I,i=c(e),r=void 0===t;if(!o&&i&&e.constructor===I&&r)return e;C?i&&!r&&(e=e.source):e instanceof I&&(r&&(t=d.call(e)),e=e.source),k&&(a=!!t&&t.indexOf("y")>-1,a&&(t=t.replace(/y/g,"")));var l=s(C?new F(e,t):F(e,t),o?this:x,I);return k&&a&&f(l,{sticky:a}),l},w=function(e){e in I||l(I,e,{configurable:!0,get:function(){return F[e]},set:function(t){F[e]=t}})},P=n(F),_=0;while(P.length>_)w(P[_++]);x.constructor=I,I.prototype=x,p(i,"RegExp",I)}b("RegExp")},9302:function(e,t,a){"use strict";var o=a("1c8b"),i=a("692f"),r=a("da10"),s=a("d7e1"),l=[].join,n=i!=Object,c=s("join",",");o({target:"Array",proto:!0,forced:n||!c},{join:function(e){return l.call(r(this),void 0===e?",":e)}})},"9a3e":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bgfff out_wrap"},[a("el-form",{ref:"form",attrs:{model:e.addForm,"label-width":"115px","label-suffix":":"}},[a("div",{staticClass:"top-select"},[a("el-form-item",{attrs:{label:"项目","label-width":"50px"}},[a("el-select",{staticClass:"ml10",attrs:{placeholder:"请选择",filterable:"",disabled:!!e.$route.query.id},on:{change:e.changeProject},model:{value:e.addForm.projectId,callback:function(t){e.$set(e.addForm,"projectId",t)},expression:"addForm.projectId"}},e._l(e.optionArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"子项","label-width":"60px"}},[a("el-select",{staticClass:"ml10",attrs:{filterable:"",placeholder:"请选择"},on:{change:e.changeProjectSon},model:{value:e.addForm.projectSonId,callback:function(t){e.$set(e.addForm,"projectSonId",t)},expression:"addForm.projectSonId"}},e._l(e.sonProject,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"单体","label-width":"60px"}},[a("el-select",{staticClass:"ml10",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.addForm.architectureId,callback:function(t){e.$set(e.addForm,"architectureId",t)},expression:"addForm.architectureId"}},e._l(e.architectureArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("div",{staticClass:"ml20"},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")])],1)],1),a("div",{staticClass:"table-custom"},[a("div",{staticClass:"head flex"},[a("div",{staticClass:"th flex1"},[e._v("子项")]),a("div",{staticClass:"th flex1"},[e._v("单体")]),a("div",{staticClass:"th flex1"},[e._v("实施日期")]),a("div",{staticClass:"th flex1"},[e._v("巡查及其延伸工作")]),a("div",{staticClass:"th flex1"},[e._v("单体列表实施人员")]),a("div",{staticClass:"th flex1"},[e._v("详情")]),a("div",{staticClass:"th flex1"},[e._v("其他相关工作"),a("Tips",{attrs:{content:"填写除巡查检修外，本周开展的其他相关工作的内容及其成效。如测绘（说明对象）、档案整理（说明内容）、仪器设备维护（说明设备名称）、员工培训学习（说明人员和内容）、工作交流（说明人员和内容）等。"}})],1),a("div",{staticClass:"th flex1"},[e._v("操作")])]),a("div",{staticClass:"body"},[e.addForm.reportArray.length?e._l(e.addForm.reportArray,(function(t,o){return a("div",{key:t.key,staticClass:"tr flex"},[a("div",{staticClass:"td flex1"},[e._v(e._s(t.projectSonName))]),a("div",{staticClass:"td flex1"},[e._v(e._s(t.architectureName))]),a("div",{staticClass:"td flex1"},[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-date-picker",{staticStyle:{width:"140px"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:t.executeDate,callback:function(a){e.$set(t,"executeDate",a)},expression:"item.executeDate"}})],1)],1),a("div",{staticClass:"td flex1"},[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.patrol,callback:function(a){e.$set(t,"patrol",a)},expression:"item.patrol"}},[a("el-option",{attrs:{label:"常规巡查",value:"1"}}),a("el-option",{attrs:{label:"定期观测",value:"2"}}),a("el-option",{attrs:{label:"专业检修",value:"3"}}),a("el-option",{attrs:{label:"检修效果评估",value:"4"}})],1)],1)],1),a("div",{staticClass:"td flex1"},[a("el-select",{staticStyle:{width:"140px"},attrs:{multiple:"",placeholder:"选择实施人员","collapse-tags":"","value-key":"value",filterable:""},model:{value:t.executeBy,callback:function(a){e.$set(t,"executeBy",a)},expression:"item.executeBy"}},e._l(e.executeList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:""+e.id}})})),1)],1),a("div",{staticClass:"td flex1"},[a("a",{staticClass:"active_color",on:{click:function(a){return e.view(t,o)}}},[e._v("查看")])]),a("div",{staticClass:"td flex1"},[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-input",{staticStyle:{width:"120px"},attrs:{type:"textarea",placeholder:"请输入"},model:{value:t.other,callback:function(a){e.$set(t,"other",a)},expression:"item.other"}})],1)],1),a("div",{staticClass:"td flex1"},[a("a",{staticClass:"del",on:{click:function(a){return e.del(t,o)}}},[e._v("删除")])])])})):a("div",{staticClass:"no-data flex_center"},[e._v("暂无数据")])],2)]),a("div",{staticClass:"center mt20"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("提交")]),a("el-button",{on:{click:e.clear}},[e._v("清除")])],1)]),a("el-dialog",{attrs:{title:e.title[1],visible:e.detailVisible,width:"800px",center:""},on:{"update:visible":function(t){e.detailVisible=t},close:e.closeFn}},[a("el-form",{ref:"addForm",attrs:{model:e.detailForm,"label-suffix":":","label-position":"right","label-width":"120px"}},["1"===e.title[0]?a("div",[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"巡查工具"}},[a("el-input",{staticClass:"inputWith",model:{value:e.detailForm.patrolTool,callback:function(t){e.$set(e.detailForm,"patrolTool",t)},expression:"detailForm.patrolTool"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"根据方案内容填写，应包括此前巡查中提出的需要定期观测的部位的对比，此前专业检修的实施效果评估等。"}}),e._v("巡查内容 ")],1),a("el-input",{staticClass:"inputWith",model:{value:e.detailForm.patrolContent,callback:function(t){e.$set(e.detailForm,"patrolContent",t)},expression:"detailForm.patrolContent"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"档案留存"}},[a("upload",{attrs:{limit:5,type:[".png",".jpg",".jpeg",".JPG"],multiple:!0},model:{value:e.detailForm.patrolFileId,callback:function(t){e.$set(e.detailForm,"patrolFileId",t)},expression:"detailForm.patrolFileId"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否发现新病害"}},[a("el-radio-group",{model:{value:e.detailForm.haveNewDisease,callback:function(t){e.$set(e.detailForm,"haveNewDisease",t)},expression:"detailForm.haveNewDisease"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),a("el-radio",{attrs:{label:0}},[e._v("否")])],1),1===e.detailForm.haveNewDisease?a("el-button",{staticClass:"ml20",attrs:{type:"primary"},on:{click:e.addVirus}},[e._v("添加")]):e._e()],1)],1)],1),1===e.detailForm.haveNewDisease?a("div",e._l(e.detailForm.diseaseArray,(function(t,o){return a("div",{key:o,staticClass:"dynamic-warper"},[a("div",{staticClass:"head-tit flex_between mb10"},[a("span",{staticClass:"left"},[e._v("病毒害"+e._s(o+1))]),e._v(" "),e.detailForm.diseaseArray.length>1?a("span",{staticClass:"right del pointer",on:{click:function(a){return e.delVirus(t)}}},[e._v("删除")]):e._e()]),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"病害部位"}},[a("el-input",{staticClass:"inputWith",model:{value:t.diseasePart,callback:function(a){e.$set(t,"diseasePart",a)},expression:"item.diseasePart"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"病害类型"}},[a("el-input",{staticClass:"inputWith",model:{value:t.diseaseType,callback:function(a){e.$set(t,"diseaseType",a)},expression:"item.diseaseType"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"病害表征"}},[a("el-input",{staticClass:"inputWith",model:{value:t.diseaseTrait,callback:function(a){e.$set(t,"diseaseTrait",a)},expression:"item.diseaseTrait"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"成因分析"}},[a("el-input",{staticClass:"inputWith",model:{value:t.diseaseCause,callback:function(a){e.$set(t,"diseaseCause",a)},expression:"item.diseaseCause"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"建议上传多张不同角度的病害照片，并辅以文字注释（描述病害部位、面积、表征、严重程度和成因等）。格式: jpg,png,jpeg"}}),e._v("照片 ")],1),a("upload",{attrs:{limit:5,type:[".png",".jpg",".jpeg",".JPG"],multiple:!0,"is-tips":!1},model:{value:t.diseasePhotos,callback:function(a){e.$set(t,"diseasePhotos",a)},expression:"item.diseasePhotos"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"结构性病害"}},[a("el-select",{staticClass:"inputWith",attrs:{filterable:"",placeholder:"请选择"},model:{value:t.diseaseIsStructure,callback:function(a){e.$set(t,"diseaseIsStructure",a)},expression:"item.diseaseIsStructure"}},[a("el-option",{attrs:{label:"是",value:"1"}}),a("el-option",{attrs:{label:"否",value:"2"}}),a("el-option",{attrs:{label:"有待检测鉴定",value:"3"}})],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"病害严重程度"}},[a("el-select",{staticClass:"inputWith",attrs:{filterable:"",placeholder:"请选择"},model:{value:t.diseaseDegree,callback:function(a){e.$set(t,"diseaseDegree",a)},expression:"item.diseaseDegree"}},[a("el-option",{attrs:{label:"轻微",value:"1"}}),a("el-option",{attrs:{label:"严重",value:"2"}}),a("el-option",{attrs:{label:"有待检测检测",value:"3"}})],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"处理方式"}},[a("el-checkbox-group",{model:{value:t.diseaseSolveWay,callback:function(a){e.$set(t,"diseaseSolveWay",a)},expression:"item.diseaseSolveWay"}},[a("el-checkbox",{attrs:{label:"1",name:"type"}},[e._v("无需任何处理"),a("Tips",{attrs:{content:"一般针对轻微且无发展（稳定）的非结构性病害"}})],1),a("el-checkbox",{attrs:{label:"2",name:"type"}},[e._v("定期巡视观测"),a("Tips",{attrs:{content:"针对轻微，发展缓慢的非结构性病害"}})],1),a("el-checkbox",{attrs:{label:"3",name:"type"}},[e._v("专业检修"),a("Tips",{attrs:{content:"针对非结构性病害，成因明确，且发展迅速，须立即进行检修，以阻止或减缓病害发展"}})],1),a("el-checkbox",{attrs:{label:"4",name:"type"}},[e._v("检测鉴定"),a("Tips",{attrs:{content:"成因或严重程度不清，需要通过专门的仪器设备检测鉴定其成因或严重程度"}})],1),a("el-checkbox",{attrs:{label:"5",name:"type"}},[e._v("专项监测"),a("Tips",{attrs:{content:"针对轻微且发展迅速的结构性病害，应明确 监测内容"}})],1),a("el-checkbox",{attrs:{label:"6",name:"type"}},[e._v("抢险支护"),a("Tips",{attrs:{content:"针对发展迅速的结构性病害，必须立即开展支护等可逆的抢修工程，以防治其破坏"}})],1),a("el-checkbox",{attrs:{label:"7",name:"type"}},[e._v("修缮工程"),a("Tips",{attrs:{content:"针对严重且发展缓慢的结构性病害，或大面积的严重的非结构性病害，必须单独申报修缮工程立项"}})],1)],1)],1)],1)],1)],1)})),0):e._e()],1):e._e(),"2"===e.title[0]?a("div",[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"观测对比"}},[a("el-select",{staticClass:"inputWith",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.detailForm.beforeComparison,callback:function(t){e.$set(e.detailForm,"beforeComparison",t)},expression:"detailForm.beforeComparison"}},[a("el-option",{attrs:{label:"无发展",value:"1"}}),a("el-option",{attrs:{label:"轻微发展",value:"2"}}),a("el-option",{attrs:{label:"迅速发展",value:"3"}})],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"评估结论"}},[a("el-select",{staticClass:"inputWith",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.detailForm.beforeVerdict,callback:function(t){e.$set(e.detailForm,"beforeVerdict",t)},expression:"detailForm.beforeVerdict"}},[a("el-option",{attrs:{label:"继续观测",value:"1"}}),a("el-option",{attrs:{label:"停止观测",value:"2"}}),a("el-option",{attrs:{label:"加密观测",value:"3"}}),a("el-option",{attrs:{label:"专业检修",value:"4"}}),a("el-option",{attrs:{label:"检测鉴定",value:"5"}}),a("el-option",{attrs:{label:"专项监测",value:"6"}}),a("el-option",{attrs:{label:"修缮工程",value:"7"}})],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"建议上传历次观测时同一角度病害照片，有需要时辅以文字注释。格式: jpg,png,jpeg"}}),e._v("照片 ")],1),a("upload",{attrs:{limit:5,type:[".png",".jpg",".jpeg",".JPG"],multiple:!0,"is-tips":!1},model:{value:e.detailForm.observationFileId,callback:function(t){e.$set(e.detailForm,"observationFileId",t)},expression:"detailForm.observationFileId"}})],1)],1)],1)],1):e._e(),"3"===e.title[0]?a("div",[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"简要文字说明，草图，或专门绘制的检修方案图纸"}}),e._v("检修方案说明 ")],1),a("el-input",{staticClass:"inputWith",model:{value:e.detailForm.reconditionScheme,callback:function(t){e.$set(e.detailForm,"reconditionScheme",t)},expression:"detailForm.reconditionScheme"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"开始日期和完成日期"}}),e._v("检修实施时间 ")],1),a("el-input",{staticClass:"inputWith",model:{value:e.detailForm.reconditionTime,callback:function(t){e.$set(e.detailForm,"reconditionTime",t)},expression:"detailForm.reconditionTime"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"简述施工步骤，说明所用原材料、工具、设备等"}}),e._v("检修完成状况 ")],1),a("el-input",{staticClass:"inputWith",model:{value:e.detailForm.reconditionCondition,callback:function(t){e.$set(e.detailForm,"reconditionCondition",t)},expression:"detailForm.reconditionCondition"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"填写姓名、工种和分工情况"}}),e._v("检修实施人员 ")],1),a("el-input",{staticClass:"inputWith",model:{value:e.detailForm.reconditionStaff,callback:function(t){e.$set(e.detailForm,"reconditionStaff",t)},expression:"detailForm.reconditionStaff"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("div",{attrs:{slot:"label"},slot:"label"},[a("Tips",{attrs:{content:"检修全过程的照片。应至少包括检修施工前病害部位情况的照片1张、检修施工关键过程的照片1张，检修完成后与检修前的同角度对比照片1张，并适当配以文字说明。格式：png,jpg,jpeg"}}),e._v("照片 ")],1),a("upload",{attrs:{limit:5,type:[".png",".jpg",".jpeg",".JPG"],multiple:!0,"is-tips":!1},model:{value:e.detailForm.reconditionPhoto,callback:function(t){e.$set(e.detailForm,"reconditionPhoto",t)},expression:"detailForm.reconditionPhoto"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticClass:"inputWith",attrs:{type:"textarea",rows:6},model:{value:e.detailForm.reconditionPhotoRemark,callback:function(t){e.$set(e.detailForm,"reconditionPhotoRemark",t)},expression:"detailForm.reconditionPhotoRemark"}})],1)],1)],1)],1):e._e(),"4"===e.title[0]?a("div",[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"检修后观测对比"}},[a("el-select",{staticClass:"inputWith",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.detailForm.observationComparison,callback:function(t){e.$set(e.detailForm,"observationComparison",t)},expression:"detailForm.observationComparison"}},[a("el-option",{attrs:{label:"效果良好",value:"1"}}),a("el-option",{attrs:{label:"有一定效果",value:"2"}}),a("el-option",{attrs:{label:"无效",value:"3"}})],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"检修后评估结论"}},[a("el-select",{staticClass:"inputWith",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.detailForm.observationVerdict,callback:function(t){e.$set(e.detailForm,"observationVerdict",t)},expression:"detailForm.observationVerdict"}},[a("el-option",{attrs:{label:"持续巡查评估",value:"1"}}),a("el-option",{attrs:{label:"再次检修",value:"2"}}),a("el-option",{attrs:{label:"检测鉴定",value:"3"}})],1)],1)],1)],1)],1):e._e()]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.sureFn}},[e._v("确定")])],1)],1)],1)},i=[],r=a("15f8"),s=a("cd6d"),l=(a("6a61"),a("08ba"),a("e35a"),a("0d7a"),a("9302"),a("2eeb"),a("e18c"),a("053b"),a("4194"),a("ea69"),a("2934")),n=a("9dac"),c=a("6c60"),d={components:{upload:n["a"],Tips:c["a"]},data:function(){return{curPutId:"",optionArr:[],sonProject:[],architectureArr:[],addForm:{reportId:this.$route.query.id||"",projectId:"",projectSonId:"",architectureId:"",reportArray:[]},title:"查看",detailVisible:!1,detailForm:{patrolTool:"",patrolContent:"",patrolFileId:[],haveNewDisease:1,diseaseArray:[{diseasePart:"",diseaseType:"",diseaseTrait:"",diseaseCause:"",diseasePhotos:[],diseaseIsStructure:"",diseaseDegree:"",diseaseSolveWay:["1"]}],beforeComparison:"",beforeVerdict:"",observationFileId:[],reconditionScheme:"",reconditionTime:"",reconditionPhoto:[],reconditionCondition:"",reconditionStaff:"",reconditionPhotoRemark:"",observationComparison:"",observationVerdict:""},curIndex:"",executeList:[]}},watch:{curPutId:function(e){var t=this;e?Object(l["v"])({type:2,comId:this.curPutId}).then((function(e){0===e.code&&(t.executeList=e.data.list)})):this.executeList=[]}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["C"])({pageNum:1,pageSize:9999});case 2:if(a=t.sent,0===a.code&&(e.optionArr=a.data.projectList.rows,e.addForm.projectId=e.optionArr[0].id,e.curPutId=e.optionArr[0].projectExecuteCom,e.getSonProject()),!e.$route.query.id){t.next=10;break}return t.next=7,Object(l["J"])({reportId:e.$route.query.id});case 7:o=t.sent,console.log(o,"详情"),0===o.code&&o.data.list&&o.data.list.length&&(console.log(o.data.projectId,""),e.addForm.projectId=o.data.projectId,e.curPutId=e.addForm.projectId,o.data.list.forEach((function(t){e.addForm.reportArray.push(Object(r["a"])(Object(r["a"])({},t.weekReportRecord),{},{patrol:"".concat(t.weekReportRecord.patrol),diseaseArray:t.diseaseRecordList||[],executeBy:t.weekReportRecord.executeBy.split(",")}))})),e.addForm.reportArray.forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t1=a.observationFileId,!t.t1){t.next=5;break}return t.next=4,e.getFilesFn(a.observationFileId);case 4:t.t1=t.sent;case 5:if(t.t0=t.t1,t.t0){t.next=8;break}t.t0=[];case 8:if(a.observationFileId=t.t0,t.t3=a.patrolFileId,!t.t3){t.next=14;break}return t.next=13,e.getFilesFn(a.patrolFileId);case 13:t.t3=t.sent;case 14:if(t.t2=t.t3,t.t2){t.next=17;break}t.t2=[];case 17:if(a.patrolFileId=t.t2,t.t5=a.reconditionPhoto,!t.t5){t.next=23;break}return t.next=22,e.getFilesFn(a.reconditionPhoto);case 22:t.t5=t.sent;case 23:if(t.t4=t.t5,t.t4){t.next=26;break}t.t4=[];case 26:a.reconditionPhoto=t.t4,a.diseaseArray&&a.diseaseArray.length&&a.diseaseArray.forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t1=a.diseasePhotos,!t.t1){t.next=5;break}return t.next=4,e.getFilesFn(a.diseasePhotos);case 4:t.t1=t.sent;case 5:if(t.t0=t.t1,t.t0){t.next=8;break}t.t0=[];case 8:a.diseasePhotos=t.t0,a.diseaseSolveWay=a.diseaseSolveWay&&a.diseaseSolveWay.split(",")||[];case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 28:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 10:case"end":return t.stop()}}),t)})))()},methods:{getSonProject:function(){var e=this;Object(l["D"])({projectId:this.addForm.projectId}).then((function(t){e.sonProject=t.data.sonIdAndName}))},getArchitecture:function(){var e=this;Object(l["p"])({projectId:this.addForm.projectSonId}).then((function(t){e.architectureArr=t.data.sonIdAndName}))},changeProject:function(e){var t=this;this.getSonProject(),this.addForm.projectSonId="",this.addForm.architectureId="",this.optionArr.forEach((function(a){+a.id===+e&&(t.curPutId=a.projectExecuteCom)})),this.addForm.reportArray=[]},changeProjectSon:function(){this.getArchitecture(),this.addForm.architectureId=""},submitForm:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.addForm.reportArray.length){t.next=3;break}return e.$message.error("请先添加数据!"),t.abrupt("return");case 3:if(console.log(e.addForm,"this.addForm"),a=JSON.parse(JSON.stringify(e.addForm)),a.reportArray.forEach((function(e){e.observationFileId=e.observationFileId.map((function(e){return e.id})).join(","),e.executeBy=e.executeBy.join(","),e.patrolFileId=e.patrolFileId.map((function(e){return e.id})).join(","),e.reconditionPhoto=e.reconditionPhoto.map((function(e){return e.id})).join(","),e.diseaseArray.forEach((function(e){e.diseasePhotos=e.diseasePhotos.map((function(e){return e.id})).join(","),e.diseaseSolveWay=e.diseaseSolveWay.join(",")}))})),e.$route.query.id){t.next=13;break}return t.next=9,Object(l["Y"])(a);case 9:o=t.sent,0===o.code&&(e.$message.success("提交成功"),e.$router.go(-1)),t.next=17;break;case 13:return t.next=15,Object(l["pb"])(a);case 15:i=t.sent,0===i.code&&(e.$message.success("编辑成功"),e.$router.go(-1));case 17:case"end":return t.stop()}}),t)})))()},sureFn:function(){this.$set(this.addForm.reportArray,this.curIndex,Object(r["a"])(Object(r["a"])({},this.addForm.reportArray[this.curIndex]),this.detailForm)),this.detailVisible=!1},getFilesFn:function(e){return new Promise((function(t,a){Object(l["u"])({ids:e}).then((function(e){var a=[];0===e.code&&e.data&&(a=e.data.files.map((function(e){return{name:e.name,id:e.id}}))),t(a)})).catch((function(e){a(e)}))}))},add:function(){var e=this;this.addForm.projectId?this.addForm.projectSonId?this.addForm.architectureId?this.addForm.reportArray.push({projectSonId:this.addForm.projectSonId,projectSonName:this.sonProject.find((function(t){return t.id===e.addForm.projectSonId})).name,architectureId:this.addForm.architectureId,architectureName:this.architectureArr.find((function(t){return t.id===e.addForm.architectureId})).name,executeDate:"",executeBy:"",patrol:"1",other:"",key:Date.now(),patrolTool:"",patrolContent:"",patrolFileId:[],haveNewDisease:1,diseaseArray:[{diseasePart:"",diseaseType:"",diseaseTrait:"",diseaseCause:"",diseasePhotos:[],diseaseIsStructure:"",diseaseDegree:"",diseaseSolveWay:["1"]}],beforeComparison:"",beforeVerdict:"",observationFileId:[],reconditionScheme:"",reconditionTime:"",reconditionPhoto:[],reconditionCondition:"",reconditionStaff:"",reconditionPhotoRemark:"",observationComparison:"",observationVerdict:""}):this.$message.error("请选择单体"):this.$message.error("请选择子项"):this.$message.error("请选择项目")},view:function(e,t){if(this.addForm.reportArray[t].patrol){switch(this.curIndex=t,this.addForm.reportArray[t].patrol){case"1":this.title=["1","常规巡查"];break;case"2":this.title=["2","定期观测"];break;case"3":this.title=["3","专业检修"];break;default:this.title=["4","检修效果评估"];break}this.detailForm=Object(r["a"])(Object(r["a"])({},this.detailForm),{},{patrolTool:e.patrolTool,patrolContent:e.patrolContent,patrolFileId:e.patrolFileId,haveNewDisease:e.haveNewDisease,diseaseArray:e.diseaseArray,beforeComparison:e.beforeComparison,beforeVerdict:e.beforeVerdict,observationFileId:e.observationFileId,reconditionScheme:e.reconditionScheme,reconditionTime:e.reconditionTime,reconditionPhoto:e.reconditionPhoto,reconditionCondition:e.reconditionCondition,reconditionStaff:e.reconditionStaff,reconditionPhotoRemark:e.reconditionPhotoRemark,observationComparison:e.observationComparison,observationVerdict:e.observationVerdict}),this.detailVisible=!0}else this.$message.error("请选择巡查及其延伸工作")},closeFn:function(){this.detailForm={patrolTool:"",patrolContent:"",patrolFileId:[],haveNewDisease:1,diseaseArray:[{diseasePart:"",diseaseType:"",diseaseTrait:"",diseaseCause:"",diseasePhotos:[],diseaseIsStructure:"",diseaseDegree:"",diseaseSolveWay:["1"]}],beforeComparison:"",beforeVerdict:"",observationFileId:[],reconditionScheme:"",reconditionTime:"",reconditionPhoto:[],reconditionCondition:"",reconditionStaff:"",reconditionPhotoRemark:"",observationComparison:"",observationVerdict:""}},del:function(e){var t=this.addForm.reportArray.indexOf(e);-1!==t&&this.addForm.reportArray.splice(t,1)},clear:function(){this.addForm.reportArray=[]},addVirus:function(){this.detailForm.diseaseArray.push({diseasePart:"",diseaseType:"",diseaseTrait:"",diseaseCause:"",diseasePhotos:[],diseaseIsStructure:"",diseaseDegree:"",diseaseSolveWay:["1"]})},delVirus:function(e){var t=this.detailForm.diseaseArray.indexOf(e);-1!==t&&this.detailForm.diseaseArray.splice(t,1)}}},u=d,p=(a("569a"),a("4ac2")),m=Object(p["a"])(u,o,i,!1,null,"e945c6da",null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-334ae323.7ff766e8.js.map