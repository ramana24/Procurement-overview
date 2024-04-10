/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/core/util/MockServer"],function(M){"use strict";var m,_="ui.s2p.mm.ovps1/";return{init:function(){var s=jQuery.sap.getModulePath(_+"manifest",".json"),o=jQuery.sap.syncGetJSON(s).data,d=o["sap.app"].dataSources;for(var D in d){if(d[D].type==="OData"){this.createMockServer(d,D);}}},createMockServer:function(d,D){var u=jQuery.sap.getUriParameters(),s=jQuery.sap.getModulePath(_+"manifest",".json"),e=u.get("errorEntitySet"),E=u.get("errorType"),i=E==="badRequest"?400:500,o=jQuery.sap.syncGetJSON(s).data,a=d[D],b=jQuery.sap.getModulePath(_+a.settings.localUri.replace(".xml",""),".xml"),c=b.slice(0,b.lastIndexOf("/")+1),f=/.*\/$/.test(a.uri)?a.uri:a.uri+"/",A=a.settings.annotations||[];m=new M({rootUri:f});M.config({autoRespond:true,autoRespondAfter:(u.get("serverDelay")||1000)});m.simulate(b,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var r=m.getRequests(),R=function(g,h,j){j.response=function(x){x.respond(g,{"Content-Type":"text/plain;charset=utf-8"},h);};};if(u.get("metadataError")){r.forEach(function(g){if(g.path.toString().indexOf("$metadata")>-1){R(500,"metadata Error",g);}});}if(E){r.forEach(function(g){if(g.path.toString().indexOf(e)>-1){R(i,E,g);}});}m.start();jQuery.sap.log.info("Running the app with mock data");A.forEach(function(g){var h=d[g],U=h.uri,l=jQuery.sap.getModulePath(_+h.settings.localUri.replace(".xml",""),".xml");new M({rootUri:U,requests:[{method:"GET",path:new RegExp(""),response:function(x){jQuery.sap.require("jquery.sap.xml");var j=jQuery.sap.sjax({url:l,dataType:"xml"}).data;x.respondXML(200,{},jQuery.sap.serializeXML(j));return true;}}]}).start();});}};});
