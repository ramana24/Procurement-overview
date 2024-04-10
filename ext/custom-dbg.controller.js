/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Filter, MessageToast) {
	"use strict";

	// controller for custom filter, navigation param, action(quick view and global filter), navigation target 
	return sap.ui.controller("ui.s2p.mm.ovps1.ext.custom", {

		//Handler for custom navigation parameter 
		onCustomParams: function (sCustomParams) {
			//maintained the function name in the manifest file
			var customFunctionName;
			if (sCustomParams === "navigateFromPOItemsCard") {
				customFunctionName = this.navigateFromPOItemsCard;
			}
			return customFunctionName;
		},

		//This method gets called when user navigates from Purchase Order Items card
		navigateFromPOItemsCard: function (oNavigateParams) {
			var aCustomSelectionVariant = [];
			var sStartDate, sEndDate;
			var oEndDate, oStartDate;
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "YYYY-MM-dd"
			});

			//This method returns the date of the Current Week's start day (Monday)
			function _getStartDate() {
				var oTodayDate = new Date();
				var oStartDate;
				var dayOfTheWeek = oTodayDate.getDay(); //0-6 format starting from Sunday
				var difference;

				if (dayOfTheWeek === 0) { //Adjustment for Sunday
					difference = oTodayDate.getDate() - 6;
				} else {
					difference = oTodayDate.getDate() - dayOfTheWeek + 1;
				}

				oStartDate = new Date(oTodayDate.setDate(difference));

				return oStartDate;
			}

			//During datapoint navigation, the oNavigateParams will be filled with the diemensions and measures.
			//If condition here checks for datapoint navigation
			if (oNavigateParams && oNavigateParams.SchedDelivDteNextStsInDays) {
				//Datapoint Navigation
				var oStartDateThisWeek = _getStartDate();

				//1. Calculate Start of the Week date (Monday)
				oStartDate = new Date();

				//if...else block for setting the Start Date for different weeks
				if (oNavigateParams.SchedDelivDteNextStsInDays === "1") {
					//This Week
					oStartDate = oStartDateThisWeek;

				} else if (oNavigateParams.SchedDelivDteNextStsInDays === "2") {
					//Next Week
					oStartDate.setDate(oStartDateThisWeek.getDate() + 7);

				} else if (oNavigateParams.SchedDelivDteNextStsInDays === "3") {
					//Next 2 Weeks
					oStartDate.setDate(oStartDateThisWeek.getDate() + 14);

				} else if (oNavigateParams.SchedDelivDteNextStsInDays === "4") {
					//Next 3 Weeks
					oStartDate.setDate(oStartDateThisWeek.getDate() + 21);

				} else if (oNavigateParams.SchedDelivDteNextStsInDays === "5") {
					//Next 4 Weeks
					oStartDate.setDate(oStartDateThisWeek.getDate() + 28);
				}

				sStartDate = oDateFormat.format(oStartDate); //This date will be passed in the filter oScheduleLineDeliveryDateRange

				//2. Calculate End of the Week date (Sunday)
				oEndDate = oStartDate;
				oEndDate.setDate(oStartDate.getDate() + 6);
				sEndDate = oDateFormat.format(oEndDate); //This date will be passed in the filter oScheduleLineDeliveryDateRange

			}
			//during header navigation the oNavigateParams is empty and hence the below date filter logic will be executed for header navigation
			else {
				//Header Level navigation

				//1. Calculate Start Date - Monday of the current week
				oStartDate = _getStartDate();
				sStartDate = oDateFormat.format(oStartDate);

				//2. Calculate End Date - (Start Date + 34 days) 5th Sunday from current week 
				oEndDate = new Date();
				oEndDate.setDate(oStartDate.getDate() + 34);
				sEndDate = oDateFormat.format(oEndDate);
			}
			//3. Set Start Date and End Date to filter
			var oScheduleLineDeliveryDateRange = {
				path: "ScheduleLineDeliveryDate",
				operator: "BT",
				value1: sStartDate,
				value2: sEndDate,
				sign: "I"
			};
			aCustomSelectionVariant.push(oScheduleLineDeliveryDateRange);
			return aCustomSelectionVariant;
		}
	});
});