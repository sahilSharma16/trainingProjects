sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("app.user.controller.home",{onInit:function(){},oncreateRequest:function(){const e=this.getOwnerComponent().getRouter();e.navTo("RoutecreateRequest")},ondisplayRequest:function(){const e=this.getOwnerComponent().getRouter();e.navTo("RoutedisplayRequest")}})});