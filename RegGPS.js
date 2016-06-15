
/******Create main container ***********************************/
myApp.RegGPS_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegGpsVer_view = Ti.UI.createView(myApp.verticalViewSpecs);

		//*****************create button
		myApp.RegGPS_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegGPS_btn.title="Register GPS";
		myApp.RegGpsVer_view.add(myApp.RegGPS_btn);
		/*************Add components*******/
		myApp.RegGpsVer_view.add(myApp.RegGPS_btn);
		myApp.RegGPS_win.add(myApp.RegGpsVer_view );
/*******Open main window****/
myApp.RegGPS_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.RegGPS_btn.addEventListener('click',function(e){
	
		RegisterGpsSensor(myApp.CheckUser.fieldByName('user_number'));
	
});

/*****************Register Acce Function *****************/
function RegisterGpsSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		//alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		alert("Your sensor have been registered");
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("GPS","'+json.SensorId+'")');
		//alert(myApp.db.lastInsertRowId);
		myApp.CheckGpsReg= myApp.db.execute('select * from RegSens where sensor_name=?',"GPS");
		Ti.include("SendGPSData.js");
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
			"ReadingName": "longitude",
			"Type": "NUMBER"
			},{
			"Length": "11",
			"ReadingName": "latitude",
			"Type": "NUMBER"
			},{
			"Length": "45",
			"ReadingName": "GPS_Time",
			"Type": "STRING"
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "GPS_smart",
			"SensorReading": "longitude,latitude,GPS_Time",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}


