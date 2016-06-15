
/******Create main container ***********************************/
myApp.RegBattery_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegBatteryVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
		//******************Mobile field
		myApp.Mobile=Ti.UI.createTextField(myApp.text_specs);
		myApp.Mobile.hintText="Enter your mobile number";
		myApp.Mobile.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
		myApp.RegBatteryVer_view.add(myApp.Mobile);
		//*****************create button
		myApp.Regbattery_btn.title=Ti.UI.createButton(myApp.button_specs);
		myApp.Regbattery_btn.title="Register Accelerometer";
		myApp.RegBatteryVer_view.add(myApp.Regbattery_btn);
		/*************Add components*******/
		myApp.RegBatteryVer_view.add(myApp.Regbattery_btn);
		myApp.RegBattery_win.add(myApp.RegBatteryVer_view);
/*******Open main window****/
myApp.RegBattery_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.Regbattery_btn.addEventListener('click',function(e){
	if (myApp.Mobile.value=""){
		alert("Please Enter your mobile number");
	}else{
		RegisterBatterySensor(myApp.Mobile.value);
	}
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
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("battery","'+json.SensorId+'")');

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
			"Type": "STRING"
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "accelerometer",
			"SensorReading": "x,y,z",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}
