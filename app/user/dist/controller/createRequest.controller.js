sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterType","sap/ui/model/FilterOperator","sap/m/MessageBox","sap/m/MessageToast","sap/m/ColumnListItem","sap/m/Input","sap/ui/dom/jquery/getSelectedText"],function(e,t,s,a,r,i,o,n,l,u){"use strict";var c=[];var d;return e.extend("app.user.controller.createRequest",{onInit:function(){var e=this;var s=new t({items:[]});this.getView().setModel(s,"formTypes");var a=new t({items:[]});this.getView().setModel(a,"formFields");var r=new t([]);this.getView().setModel(r,"inputModel");let i=this.getOwnerComponent().getModel();let o=i.bindList("/formMaster");o.requestContexts(0,Infinity).then(function(e){var t=e.map(function(e){return e.getObject()});var a=t.map(function(e){return{key:e.formName,text:e.formName}});s.setProperty("/items",a)});let n=i.bindList("/formFieldTable");n.requestContexts(0,Infinity).then(function(e){var t=e.map(function(e){return e.getObject()});a.setData({items:t})});let l=i.bindList("/raisedRequest");l.requestContexts(0,Infinity).then(function(e){var t=e.map(function(e){return e.getObject()});c=t.map(e=>e.id).sort((e,t)=>e-t);console.log("Sorted Array:",c)})},onSelectFormType:function(e){var t=e.getParameter("selectedItem").getKey();this.filterFormFields(t);this.getNextID()},filterFormFields:function(e){var s=this.getView().getModel("formFields");var a=s.getProperty("/items");var r=a.filter(function(t){return t.formType===e&&t.checkedField===true});console.log("Filtered Fields:",r);var i=new t(r);this.getView().setModel(i,"inputModel")},getNextID:function(){for(let e=1;e<=c.length;e++){if(c[e-1]!==e){d=e;break}}if(d===undefined){d=c.length+1}console.log("Next ID:",d);return d},onSubmitForm:async function(){await this.getNextID();var e=this.getView().getModel("inputModel").getData();var t={id:parseInt(d),formType:this.getView().byId("selectedFormType").getSelectedKey(),action:false,status:null};e.forEach(function(e){switch(e.paraName){case"Name":t.userName=e.value;break;case"Email":t.email=e.value;break;case"Phone":t.phoneNo=e.value;break;case"Department":t.department=e.value;break;case"Reason":t.reason=e.value;break;case"requestedAt":t.requestedAt=e.value;break;case"fromDate":t.fromDate=e.value;break;case"toDate":t.toDate=e.value;break;case"assetType":t.assetType=e.value;break;default:break}});let s=this.getView().getModel();let a=s.bindList("/raisedRequest");a.create(t);sap.m.MessageBox.success("Raised request successfully.",{title:"Success",onClose:function(e){if(e===sap.m.MessageBox.Action.OK){location.reload()}}});this.clearFields()},clearFields:function(){var e=this.getView();var t=e.findElements(true);t.forEach(function(e){if(e.setValue){e.setValue("")}if(e.setSelectedKey){e.setSelectedKey(null)}});var s=e.byId("selectedFormType");if(s){s.setSelectedKey(null)}var a=e.getModel("inputModel");if(a){a.setData([]);a.refresh(true)}var r=e.byId("formFieldTable");if(r){r.removeAllItems()}e.getModel().refresh(true)}})});