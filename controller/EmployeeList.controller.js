sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/wt/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.wt.controller.EmployeeList", {

		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			//Define some sample data
			var aData = [
				{lastName: "Dente", name: "Al", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 4},
				{lastName: "Friese", name: "Andy", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person2.gif", gender: "male", rating: 2},
				{lastName: "Mann", name: "Anita", checked: false, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "female", rating: 3},
				{lastName: "Schutt", name: "Doris", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "female", rating: 4},
				{lastName: "Open", name: "Doris", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "female", rating: 2},
				{lastName: "Dewit", name: "Kenya", checked: false, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "female", rating: 3},
				{lastName: "Zar", name: "Lou", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 1},
				{lastName: "Burr", name: "Tim", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person2.gif", gender: "male", rating: 2},
				{lastName: "Hughes", name: "Tish", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 5},
				{lastName: "Town", name: "Mo", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 3},
				{lastName: "Case", name: "Justin", checked: false, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 3},
				{lastName: "Time", name: "Justin", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 4},
				{lastName: "Barr", name: "Sandy", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 2},
				{lastName: "Poole", name: "Gene", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person2.gif", gender: "male", rating: 1},
				{lastName: "Ander", name: "Corey", checked: false, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 5},
				{lastName: "Early", name: "Brighton", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 3},
				{lastName: "Noring", name: "Constance", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "female", rating: 4},
				{lastName: "O'Lantern", name: "Jack", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "male", rating: 2},
				{lastName: "Tress", name: "Matt", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person2.gif", gender: "male", rating: 4},
				{lastName: "Turner", name: "Paige", checked: true, linkText: "www.sap.com", href: "http://www.sap.com", src: "images/person1.gif", gender: "female", rating: 3}
			];

			//Create an instance of the table control
			var oTable = new sap.ui.table.Table({
				title: "Table Example",
				visibleRowCount: 7,
				firstVisibleRow: 3,
				selectionMode: sap.ui.table.SelectionMode.Single,
				toolbar: new sap.ui.commons.Toolbar({items: [
					new sap.ui.commons.Button({text: "Button in the Toolbar", press: function() { alert("Button pressed!"); }})
				]}),
				extension: [
					new sap.ui.commons.Button({text: "Button in the Extension Area", press: function() { alert("Button pressed!"); }})
				]
			});

			//Define the columns and the control templates to be used
			var oColumn = new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Last Name"}),
				template: new sap.ui.commons.TextView().bindProperty("text", "lastName"),
				sortProperty: "lastName",
				filterProperty: "lastName",
				width: "200px"
			});
			var oCustomMenu = new sap.ui.commons.Menu();
			oCustomMenu.addItem(new sap.ui.commons.MenuItem({
				text:"Custom Menu",
				select:function() {
					alert("Custom Menu");
				}
			}));
			oColumn.setMenu(oCustomMenu);
			oTable.addColumn(oColumn);
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "First Name"}),
				template: new sap.ui.commons.TextField().bindProperty("value", "name"),
				sortProperty: "name",
				filterProperty: "name",
				width: "100px"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Checked"}),
				template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
				sortProperty: "checked",
				filterProperty: "checked",
				width: "75px",
				hAlign: "Center"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Web Site"}),
				template: new sap.ui.commons.Link().bindProperty("text", "linkText").bindProperty("href", "href"),
				sortProperty: "linkText",
				filterProperty: "linkText"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Image"}),
				template: new sap.ui.commons.Image().bindProperty("src", "src"),
				width: "75px",
				hAlign: "Center"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Gender"}),
				template: new sap.ui.commons.ComboBox({items: [
					new sap.ui.core.ListItem({text: "female"}),
					new sap.ui.core.ListItem({text: "male"})
				]}).bindProperty("value","gender"),
				sortProperty: "gender",
				filterProperty: "gender"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Rating"}),
				template: new sap.ui.commons.RatingIndicator().bindProperty("value", "rating"),
				sortProperty: "rating",
				filterProperty: "rating"
			}));

			//Create a model and bind the table rows to this model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: aData});
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");

			//Initially sort the table
			oTable.sort(oTable.getColumns()[0]);

			sap.ui.xmlview("sample1",oTable).placeAt("content");

			//Bring the table onto the UI
		//	oTable.placeAt("sample1");

		},




		onFilterEmployees: function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("employeeList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");
		}
	});

});
