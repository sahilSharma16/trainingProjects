sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";

    return Controller.extend("app.user.controller.displayRequest", {

        // FORMATTER
        formatter: {
            actionText: function(action) {
                return action === 'no' ? 'Taken' : 'Pending';
            },

            statusText: function(status) {
                if (status === null) {
                    return 'Action Required';
                } else if (status === 'yes') {
                    return 'Approved';
                } else if (status === 'no') {
                    return 'Rejected';
                } else {
                    return '';
                }
            }
        },
        onInit: function () {
            
        },

        onDelete: function(oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent();
            var oContext = oItem.getBindingContext();
            var sPath = oContext.getPath();
            var oModel = this.getView().getModel();

            MessageBox.confirm("Are you sure you want to delete this entry?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: function(oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oModel.delete(sPath)
                            .then(function() {
                                sap.m.MessageBox.success("Entry deleted successfully.");
                            })
                            .catch(function() {
                                sap.m.MessageBox.error("Error deleting entry.");
                            });
                    }
                }
            });
        }
    });
});
