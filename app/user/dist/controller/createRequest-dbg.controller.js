sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterType",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/ui/dom/jquery/getSelectedText"
], function (
    Controller,
    JSONModel,
    Filter,
    FilterType,
    FilterOperator,
    MessageBox,
    MessageToast,
    ColumnListItem,
    Input,
    getSelectedText
) {
    "use strict";
    var idArray = [];
    var nextId;

    return Controller.extend("app.user.controller.createRequest", {
        onInit: function () {
            var that = this;

            // Initialize models
            var formTypesModel = new JSONModel({ items: [] });
            this.getView().setModel(formTypesModel, "formTypes");

            var formFieldModel = new JSONModel({ items: [] });
            this.getView().setModel(formFieldModel, "formFields");

            var inputModel = new JSONModel([]);
            this.getView().setModel(inputModel, "inputModel");

            let oModel = this.getOwnerComponent().getModel();

            // Load form types
            let oBindList = oModel.bindList("/formMaster");
            oBindList.requestContexts(0, Infinity).then(function (aContexts) {
                var forms = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
                var formTypes = forms.map(function (obj) {
                    return { key: obj.formName, text: obj.formName };
                });
                formTypesModel.setProperty("/items", formTypes);
            });

            // Load form fields
            let oFFBindList = oModel.bindList("/formFieldTable");
            oFFBindList.requestContexts(0, Infinity).then(function (aContexts) {
                var formFields = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
                formFieldModel.setData({ items: formFields });
            });

            // Load Raised request
            let entryBindList = oModel.bindList("/raisedRequest");
            entryBindList.requestContexts(0, Infinity).then(function (aContexts) {
                // Map the contexts to objects
                var formEntries = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
                idArray = formEntries.map((obj) => obj.id).sort((a, b) => a - b);
                console.log("Sorted Array:", idArray);
            });

        },

        onSelectFormType: function (oEvent) {
            var selectedKey = oEvent.getParameter("selectedItem").getKey();
            this.filterFormFields(selectedKey);
            this.getNextID();
        },

        filterFormFields: function (selectedKey) {
            var formFieldModel = this.getView().getModel("formFields");
            var allFields = formFieldModel.getProperty("/items");
            var filteredFields = allFields.filter(function (field) {
                return field.formType === selectedKey && field.checkedField === true;
            });
            console.log("Filtered Fields:", filteredFields);

            var inputModel = new JSONModel(filteredFields);
            this.getView().setModel(inputModel, "inputModel");
        },

        getNextID: function () {
            for (let i = 1; i <= idArray.length; i++) {
                if (idArray[i - 1] !== i) {
                    nextId = i;
                    break;
                }
            }

            if (nextId === undefined) {
                nextId = idArray.length + 1;
            }

            console.log("Next ID:", nextId);
            return nextId;
        },


        onSubmitForm: async function () {
            await this.getNextID();
            var newEntryData = this.getView().getModel("inputModel").getData();

            var newEntry = {
                id: parseInt(nextId),
                formType: this.getView().byId("selectedFormType").getSelectedKey(),
                action: false,
                status: null
            };

            // Map inputModel 
            newEntryData.forEach(function (field) {
                switch (field.paraName) {
                    case "Name":
                        newEntry.userName = field.value;
                        break;
                    case "Email":
                        newEntry.email = field.value;
                        break;
                    case "Phone":
                        newEntry.phoneNo = field.value;
                        break;
                    case "Department":
                        newEntry.department = field.value;
                        break;
                    case "Reason":
                        newEntry.reason = field.value;
                        break;
                    case "requestedAt":
                        newEntry.requestedAt = field.value;
                        break;
                    case "fromDate":
                        newEntry.fromDate = field.value;
                        break;
                    case "toDate":
                        newEntry.toDate = field.value;
                        break;
                    case "assetType":
                        newEntry.assetType = field.value;
                        break;
                    default:
                        // Handle other paraName cases if necessary
                        break;
                }
            });

            let oModel = this.getView().getModel();
            let oBindListRequest = oModel.bindList("/raisedRequest");
            oBindListRequest.create(newEntry);
            sap.m.MessageBox.success(
                "Raised request successfully.",
                {
                    title: "Success",
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                            location.reload();  // Reload
                        }
                    },
                }
            );

            // Event to be executed after create
            this.clearFields();
        },

        clearFields: function () {
            var oView = this.getView();

            // Clear fields
            var aInputFields = oView.findElements(true);

            aInputFields.forEach(function (oElement) {
                if (oElement.setValue) {
                    oElement.setValue("");
                }
                if (oElement.setSelectedKey) {
                    oElement.setSelectedKey(null);
                }
            });

            // Clear ComboBox
            var servParam = oView.byId("selectedFormType");
            if (servParam) {
                servParam.setSelectedKey(null);
            }

            // Clear model
            var inputModel = oView.getModel("inputModel");
            if (inputModel) {
                inputModel.setData([]);
                inputModel.refresh(true);
            }

            var oTable = oView.byId("formFieldTable");
            if (oTable) {
                oTable.removeAllItems();
            }

            oView.getModel().refresh(true);
        }
    });
});
