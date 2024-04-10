/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function () {
    "use strict";
    /*global sap, jQuery */

    /**
     * @fileOverview Application component to display information on entities from the GWSAMPLE_BASIC
     *   OData service.
     * @version @version@
     */
    jQuery.sap.declare("ui.s2p.mm.ovps1.Component");

    jQuery.sap.require("sap.ovp.app.Component");

    sap.ovp.app.Component.extend("ui.s2p.mm.ovps1.Component", {
        metadata: {
            manifest: "json"
        }
    });
}());