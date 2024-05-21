//@ui5-bundle app/config/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"app/config/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","app/config/model/models"],function(e,i,t){"use strict";return e.extend("app.config.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"app/config/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History"],function(n,o){"use strict";return n.extend("app.config.controller.App",{onInit:function(){},onPressBack:function(){window.history.back()},onLogoPressed:function(){}})});
},
	"app/config/controller/createField.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/m/MessageBox"],function(e,t,o,i,a,s,l){"use strict";var n;var d;var r;return e.extend("app.config.controller.createField",{onInit:function(){},usedNameAndDesc:function(){var e=this;var t=new Promise(function(t,o){var i=new sap.ui.model.json.JSONModel;e.getView().setModel(i,"usedFieldDataModel");let a=e.getOwnerComponent().getModel();let s=a.bindList("/fieldTable");s.requestContexts(0,Infinity).then(function(o){r=[];o.forEach(function(e){r.push(e.getObject())});i.setData(r);var a=e.getView().getModel("usedFieldDataModel").getData();d=a.map(function(e){return{id:e.id,fieldName:e.fieldName,fieldDesc:e.fieldDesc}});console.log("Validate New Parameter",d);t(r)})})},onCreateField:function(){this.usedNameAndDesc();var e=this.getView();const o={fieldName:"",fieldDesc:""};const i=new t(o);e.setModel(i,"addFieldModel");if(!this._oDialogItem){this._oDialogItem=sap.ui.xmlfragment("app.config.fragments.addField",this);e.addDependent(this._oDialogItem)}this._oDialogItem.open()},oncancelNewField:function(){this._oDialogItem.close()},RefreshData:function(){this.getView().byId("fieldTable").getBinding("items").refresh()},onsaveNewField:async function(){var e=this.getView().getModel("addFieldModel").getData();await this.onLastFieldID();var t={id:parseInt(n,10),fieldName:e.fieldName,fieldDesc:e.fieldDesc};if(t.fieldName===""||t.fieldDesc===""){sap.m.MessageToast.show("Input fields cannot be blank.",{duration:3e3,width:"15em",my:"center top",at:"center top",of:window,offset:"30 30",onClose:function(){console.log("Message toast closed")}});console.log("Field or description cannot be null");return}else{var o=d.some(function(e){return e.fieldName===t.fieldName||e.fieldDesc===t.fieldDesc});if(o){sap.m.MessageToast.show("Field or Description already exists.",{duration:3e3,width:"15em",my:"center top",at:"center top",of:window,offset:"30 30",onClose:function(){console.log("Message toast closed")}});console.log("Duplicate found");return}else{d.push(t);console.log("Entry added successfully")}}console.log(t);let i=this.getView().getModel();let a=i.bindList("/fieldTable");a.create(t);this._oDialogItem.close();this.RefreshData()},onLastFieldID:function(){try{var e=this.getView().byId("fieldTable");var t=e.getItems();var o=new Set;t.forEach(function(e){var t=parseInt(e.getCells()[0].getText(),10);if(!isNaN(t)){o.add(t)}});for(let e=1;e<=t.length+1;e++){if(!o.has(e)){n=e;break}}}catch(e){n="1"}console.log("Next Available ID:",n)}})});
},
	"app/config/controller/formField.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/m/MessageBox","sap/ui/core/ID","sap/ui/core/library"],function(e,t,o,i,a,r,n,l,s){"use strict";var d;var f;let m;let c;return e.extend("app.config.controller.formField",{onInit:function(){this.getOwnerComponent().getRouter().getRoute("RouteformField").attachPatternMatched(this.handleRouteMatched,this)},handleRouteMatched:function(e){const o={id:e.getParameter("arguments").id,formName:e.getParameter("arguments").formName,formDesc:e.getParameter("arguments").formDesc};console.log("form",o);const n=new t(o);this.getView().setModel(n,"formFieldModel");var l=new i("formType",a.EQ,e.getParameter("arguments").formName);this.getView().byId("formFieldTable").getBinding("items").filter(l,r.Application);this.onRefreshFormField()},fieldDataState:function(){var e=this;return new Promise(function(t,o){var i=new sap.ui.model.json.JSONModel;e.getView().setModel(i,"fieldDataModel");let a=e.getOwnerComponent().getModel();let r=a.bindList("/fieldTable");r.requestContexts(0,Infinity).then(function(o){c=[];o.forEach(function(e){c.push(e.getObject())});i.setData(c);e.getView().setModel(i,"fieldDataModel");d=e.getView().getModel("fieldDataModel").getData();console.log("Fields",d);t()})})},onRefreshFormField:function(){var e=this;var t=e.getView().getModel("formFieldModel").getData();console.log("type",t);Promise.all([this.addExtraField(),this.fieldDataState()]).then(function(){var o=d.filter(function(e){return!f.some(function(o){return o.paraName===e.fieldName&&o.formType===t.formName})});console.log("Extra Objects:",o);o.forEach(function(t){console.log("Extra Object:",t);if(t){var o={id:parseInt(t.id),checkedField:false,formType:e.getView().getModel("formFieldModel").getProperty("/formName"),formDesc:e.getView().getModel("formFieldModel").getProperty("/formDesc"),paraName:t.fieldName,paraDesc:t.fieldDesc};console.log("dfs",o);var i=e.getView().getModel();var a=i.bindList("/formFieldTable");a.create(o);i.bindList(`/formFieldTable(${o.id})`,{success:function(){console.log("Entity already exists, skipping creation.")}})}});e.RefreshData()})},addExtraField:function(){var e=this;return new Promise(function(o,i){var a=new t;e.getView().setModel(a,"formFieldDataModel");let r=e.getOwnerComponent().getModel();let n=r.bindList("/formFieldTable");n.requestContexts(0,Infinity).then(function(t){m=[];t.forEach(function(e){m.push(e.getObject())});a.setData(m);e.getView().setModel(a,"formFieldDataModel");f=e.getView().getModel("formFieldDataModel").getData();console.log("Form Fields",f);o()})})},RefreshData:function(){this.getView().byId("formFieldTable").getBinding("items").refresh()}})});
},
	"app/config/controller/formMaster.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/m/MessageBox"],function(e,o,t,r,a,i,n){"use strict";var s;return e.extend("app.config.controller.formMaster",{onInit:function(){},onCreateForm:function(){var e=this.getView();const t={formName:"",formDesc:""};const r=new o(t);e.setModel(r,"addFormModel");if(!this._oDialogForm){this._oDialogForm=sap.ui.xmlfragment("app.config.fragments.addForm",this);e.addDependent(this._oDialogForm)}this._oDialogForm.open()},oncancelNewForm:function(){this._oDialogForm.close()},onsaveNewForm:async function(){var e=this.getView().getModel("addFormModel").getData();await this.onLastFormID();var o={id:parseInt(s,10),formName:e.formName,formDesc:e.formDesc};console.log("data",o);let t=this.getView().getModel();let r=t.bindList("/formMaster");r.create(o);this._oDialogForm.close();this.RefreshData()},RefreshData:function(){this.getView().byId("formTable").getBinding("items").refresh()},onLastFormID:function(){try{var e=this.getView().byId("formTable");var o=e.getItems();var t=new Set;o.forEach(function(e){var o=parseInt(e.getCells()[0].getText(),10);if(!isNaN(o)){t.add(o)}});for(let e=1;e<=o.length+1;e++){if(!t.has(e)){s=e;break}}}catch(e){s="1"}console.log("Next Available ID:",s)},onselectForm:function(e){const o=this.getOwnerComponent().getRouter();var t=e.getSource().getBindingContext().getObject();o.navTo("RouteformField",{id:t.id,formName:t.formName,formDesc:t.formDesc})}})});
},
	"app/config/controller/home.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("app.config.controller.home",{onInit:function(){},onCreateField:function(){const e=this.getOwnerComponent().getRouter();e.navTo("RoutecreateField")},onCreateForm:function(){const e=this.getOwnerComponent().getRouter();e.navTo("RouteformMaster")}})});
},
	"app/config/controller/raisedRequest.controller.js":function(){
},
	"app/config/fragments/addField.fragment.xml":'<core:FragmentDefinition xmlns="sap.m"\n    xmlns:core="sap.ui.core"\n    xmlns:l="sap.ui.layout"><Dialog id="createDialog" title="Create Field" class="sapUiSmallMargin"><VBox id="_IDGenVBox1" class="sapUiContentPadding sapUiSmallMargin"><Label id="_IDGenLabel17" text="Field Name :" /><Input id="newFieldNameInput" value="{addFieldModel>/fieldName}" placeholder="Enter field name" /><Label id="_IDGenLabel182" text="Field Description :" /><Input id="newFieldNameInputdesc" value="{addFieldModel>/fieldDesc}" placeholder="Enter field name description" /></VBox><footer><OverflowToolbar id="otbFooter"><ToolbarSpacer id="_IDGenToolbarSpacer1"/><Button id="_IDGenButton1" type="Accept" width="70px" text="Save" press="onsaveNewField"></Button><Button id="_IDGenButton2" type="Reject" width="70px" text="Cancel" press="oncancelNewField"></Button></OverflowToolbar></footer></Dialog></core:FragmentDefinition>  \n',
	"app/config/fragments/addForm.fragment.xml":'<core:FragmentDefinition xmlns="sap.m"\n    xmlns:core="sap.ui.core"\n    xmlns:l="sap.ui.layout"><Dialog id="createDialogform" title="Create Form" class="sapUiSmallMargin"><VBox class="sapUiContentPadding sapUiSmallMargin"><Label id="_IDGenLabel117" text="Form Type :" /><Input id="newFieldNameInputform" value="{addFormModel>/formName}" placeholder="Enter Form name" /><Label id="_IDGenLabel182form" text="Form Description :" /><Input id="newFieldNameInputdescform" value="{addFormModel>/formDesc}" placeholder="Enter Form name description" /></VBox><footer><OverflowToolbar id="otbFooterr"><ToolbarSpacer/><Button type="Accept" width="70px" text="Save" press="onsaveNewForm"></Button><Button type="Reject" width="70px" text="Cancel" press="oncancelNewForm"></Button></OverflowToolbar></footer></Dialog></core:FragmentDefinition>  ',
	"app/config/i18n/i18n.properties":'# This is the resource bundle for app.config\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Configuration Panel\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Configuration Panel\n\n#XFLD,54\nflpTitle=Request Management\n\n#XFLD,30\nflpSubtitle=admin side\n',
	"app/config/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"app.config","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.13.4","toolsId":"d1390cc7-872a-4de9-9311-c5bd8f062e2c"},"dataSources":{"mainService":{"uri":"odata/v4/hanaservices/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"config-Display":{"semanticObject":"config","action":"Display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.123.2","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"app.config.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"app.config.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"Routehome","pattern":":?query:","target":["Targethome"]},{"name":"RoutecreateField","pattern":"createField","target":["TargetcreateField"]},{"name":"RouteformMaster","pattern":"formMaster","target":["TargetformMaster"]},{"name":"RouteraisedRequest","pattern":"raisedRequest","target":["TargetraisedRequest"]},{"name":"RouteformField","pattern":"formMaster/{id}/{formName}/{formDesc}","target":["TargetformField"]}],"targets":{"Targethome":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"home","viewName":"home"},"TargetcreateField":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"createField","viewName":"createField"},"TargetformMaster":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"formMaster","viewName":"formMaster"},"TargetraisedRequest":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"raisedRequest","viewName":"raisedRequest"},"TargetformField":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"formField","viewName":"formField"}}},"rootView":{"viewName":"app.config.view.App","type":"XML","async":true,"id":"App"}}}',
	"app/config/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"app/config/view/App.view.xml":'<mvc:View controllerName="app.config.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"\n    xmlns:f="sap.f"\n    xmlns:tnt="sap.tnt"><tnt:ToolPage id="toolPage"><tnt:header><tnt:ToolHeader id="_IDGenToolHeader1" ><Button visible="true" icon="sap-icon://nav-back" type="Transparent" id="_IDGenButton2" press="onPressBack" tooltip="Search"/><Image id="_IDGenImage1" src="./images/change-management.png" decorative="false" press="onLogoPressed" tooltip="Request Management" width="60px" height="40px"/><ToolbarSpacer id="_IDGenToolbarSpacer1" width="15px" /><Title text="Request Management System" wrapping="true" id="productName"/><ToolbarSpacer id="_IDGenToolbarSpacer2"/><Avatar id="_IDGenAvatar1" src="" displaySize="XS" press=".onAvatarPressed" tooltip="Profile"/></tnt:ToolHeader></tnt:header><tnt:mainContents><App id="app"></App></tnt:mainContents></tnt:ToolPage></mvc:View>\n\n',
	"app/config/view/createField.view.xml":'<mvc:View\n    controllerName="app.config.controller.createField"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"\n    xmlns:c="sap.ui.core"\n    displayBlock="true"\n    height="100%"\n    busyIndicatorDelay="0"\n><OverflowToolbar id="_IDGenOverflowToolbar9" height="50px"><Title\n            id="pageHeader"\n            text="Form Field Definition"\n            textAlign="Center"></Title><ToolbarSpacer id="_IDGenToolbarSpacer1" /><Button id="createFieldBtn" text="Create" width="100px" press="onCreateField" type="Emphasized" visible="true"/></OverflowToolbar><Page id="page" showHeader="false"><content><Table items="{/fieldTable}" id="fieldTable" selectionChange="onSelect" mode="None"><columns><Column id="_IDGenColu" width="4rem"><header><Label id="_IDGenLl12" wrapping="true" text="ID" /></header></Column><Column id="_colLevel" width="6rem"><header><Label id="_IDLevel" wrapping="true" text="Field Name" /></header></Column><Column id="_IDGenColumn2" width="6rem"><header><Label id="_IDGenLabel7" wrapping="true" text="Field Description" /></header></Column></columns><items><ColumnListItem type="Active" id="item0"><cells><Text id="id1" text="{id}" /><Text id="id2" text="{fieldName}" /><Text id="id3" text="{fieldDesc}" /></cells></ColumnListItem></items></Table></content></Page></mvc:View>',
	"app/config/view/formField.view.xml":'<mvc:View controllerName="app.config.controller.formField"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><OverflowToolbar id="_IDGenOverflowToolbar9" height="50px"><Title\n            id="pageHeader"\n            text="Form Fields"\n            textAlign="Center"></Title></OverflowToolbar><OverflowToolbar><content><Title text="{formFieldModel>/formName} [{formFieldModel>/formDesc}]"/><ToolbarSpacer /></content></OverflowToolbar><Page id="page" showHeader="false"><content><Table items="{/formFieldTable}" id="formFieldTable" selectionChange="onSelect" mode="None"><columns><Column id="selectLabelCol" width="6rem"><header><Label id="selectLabel" text="Select"/></header></Column><Column id="colID" width="7rem"><header><Label id="labelID" wrapping="true" text="ID" /></header></Column><Column id="_IDGenColumn2" width="7rem"><header><Label id="_IDGenLabel7" wrapping="true" text="Form Type" /></header></Column><Column id="_IDGenColumn3" width="7rem"><header><Label id="_IDGenLabel8" wrapping="true" text="Form Description" /></header></Column><Column id="_IDGenColumn4" width="7rem"><header><Label id="_IDGenLabel9" wrapping="true" text="Parameter Name" /></header></Column><Column id="_IDGenColumn5" width="7rem"><header><Label id="_IDGenLabel10" wrapping="true" text="Parameter Description" /></header></Column></columns><items><ColumnListItem type="Active" id="item0"><cells><CheckBox id="checkedField" selected="{checkedField}" /><Text id="id1" text="{id}" /><Text id="id2" text="{formType}" /><Text id="id3" text="{formDesc}" /><Text id="id4" text="{paraName}" /><Text id="id5" text="{paraDesc}" /></cells></ColumnListItem></items></Table></content></Page></mvc:View>\n ',
	"app/config/view/formMaster.view.xml":'<mvc:View\n\tcontrollerName="app.config.controller.formMaster"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"\n\tdisplayBlock="true"\n\theight="100%"\n\tbusyIndicatorDelay="0"\n><OverflowToolbar id="_IDGenOverflowToolbar1" height="50px"><Title \n\t  id="pageHeader"\n\t  text="Form Master Defination"\n\t  textAlign="Center"\n\t></Title><ToolbarSpacer id="_IDGenToolbarSpacer1" /><Button id="_IDGenButton1" text="Create" width="100px" type="Emphasized" press="onCreateForm"></Button></OverflowToolbar><Page id="_IDGenPage1" showHeader="false"><content><Table id="formTable" items="{path: \'/formMaster\',parameters: {$count: true,$$updateGroupId : \'peopleGroup\'}}" selectionChange="onSelect" mode="None" ><columns><Column id="_IDGenColu" width="4rem"><header><Label id="_IDGenLl12" wrapping="true" text="ID" /></header></Column><Column id="_colLevel" width="6rem"><header><Label id="_IDLevel" wrapping="true" text="Form Name" /></header></Column><Column id="_IDGenColumn2" width="6rem"><header><Label id="_IDGenLabel7" wrapping="true" text="Form Description" /></header></Column></columns><items><ColumnListItem id="_IDGenColumnListItem1" type="Navigation" press="onselectForm"><cells><Text id="id1" text="{id}" /><Text id="id2" text="{formName}" /><Text id="id3" text="{formDesc}" /></cells></ColumnListItem></items></Table></content></Page></mvc:View>',
	"app/config/view/home.view.xml":'<mvc:View\n    controllerName="app.config.controller.home"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"\n    xmlns:c="sap.ui.core"\n    displayBlock="true"\n    height="100%"\n    busyIndicatorDelay="0"\n><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" \n        header="Form Field Defination"  \n        press="onCreateField" ><TileContent><ImageContent src="sap-icon://create-form"></ImageContent></TileContent></GenericTile><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" \n        header="Form Profile Defination"\n        press="onCreateForm" ><TileContent><ImageContent src="sap-icon://person-placeholder"></ImageContent></TileContent></GenericTile><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" \n        header="Raised Request"\n\t\tsubheader="Action" press="press"><TileContent id="_IDGenTileContent1" ><ImageContent id="_IDGenImageContent1" src="sap-icon://request" /></TileContent></GenericTile></mvc:View>\n'
}});