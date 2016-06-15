myApp.data = [];
myApp.RegVertical_view = Ti.UI.createView(myApp.verticalViewSpecs);
myApp.Registered_win = Ti.UI.createWindow(myApp.win_specs);
myApp.SensorsTable = Ti.UI.createTableView();
myApp.CheckReg= myApp.db.execute('select * from RegSens');
if(myApp.CheckReg.isValidRow()){
	myApp.Sensor= Ti.UI.createLabel(myApp.label_specs);
	myApp.Sensor.text="Your registered sensors";
	
	while(myApp.CheckReg.isValidRow()){
		/****/
		/*Create row*/
		myApp.row = Ti.UI.createTableViewRow({
		layout:"horizontal",});
		/****Sensor id ***/
		myApp.Sensor_id = Ti.UI.createLabel(myApp.label_specs);
		myApp.Sensor_id.text = myApp.CheckReg.fieldByName('Sensor_id');
		myApp.Sensor_id.left=205;
		/****Sensor name ***/
		myApp.sensor_name = Ti.UI.createLabel(myApp.label_specs);
		myApp.sensor_name.left=25;
		myApp.sensor_name.text = myApp.CheckReg.fieldByName('sensor_name');
		myApp.row.add(myApp.Sensor_id);
		myApp.row.add(myApp.sensor_name);
		myApp.data.push(myApp.row);
		myApp.CheckReg.next();
	}
	myApp.RegVertical_view.add(myApp.Sensor);
	myApp.RegVertical_view.add(myApp.SensorsTable);
}else{
	myApp.SensorsUnavailable= Ti.UI.createLabel(myApp.label_specs);
	myApp.SensorsUnavailable.text="You didn't register any sensors yet";
	myApp.RegVertical_view.add(myApp.SensorsUnavailable);
	

}

	


myApp.SensorsTable.data=myApp.data;

myApp.Registered_win.add(myApp.RegVertical_view);
myApp.Registered_win.open();


