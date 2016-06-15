
/******Create main container ***********************************/
myApp.RegBattery_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegBatteryVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
		
		//*****************create button
		myApp.Regbattery_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.Regbattery_btn.title="Register Battery Sensor";
		myApp.RegBatteryVer_view.add(myApp.Regbattery_btn);
		/*************Add components*******/
		myApp.RegBatteryVer_view.add(myApp.Regbattery_btn);
		myApp.RegBattery_win.add(myApp.RegBatteryVer_view);
/*******Open main window****/
myApp.RegBattery_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.Regbattery_btn.addEventListener('click',function(e){

		RegisterBatterySensor(myApp.CheckUser.fieldByName('user_number'));
});

/*****************Register Acce Function *****************/
function RegisterBatterySensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Battery","'+json.SensorId+'")');
		//alert(myApp.db.lastInsertRowId);
		myApp.CheckBatteryReg= myApp.db.execute('select * from RegSens where sensor_name=?',"Battery");
		alert("Your sensor have been registered");
		Ti.include("SendBatteryData.js");
	}; 

	// this method will be called if there is an error 
	myApp.xhr.onerror = function(error)
	{
		alert(error);
	};

	var object={
			"auth":{
			"DriverManagerId":"MotSensorsKit2",
			"DriverManagerPassword":"mot36Kit2"
			},
			"Package":{
			"SensorFields": [ {
			"Length": "11",
			"ReadingName": "batterylevel",
			"Type": "NUMBER" 
			} ,{
			"Length": "45",
			"ReadingName": "Battery_Time",
			"Type": "STRING" 
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "Battery",
			"SensorReading": "batterylevel,Battery_Time",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}


