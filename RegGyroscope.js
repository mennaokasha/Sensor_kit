
/******Create main container ***********************************/
myApp.RegGyroscope_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegGyroscopeVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
		//*****************create button
		myApp.RegGyroscope_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegGyroscope_btn.title="Register Temperature Sensor";
		myApp.RegGyroscopeVer_view.add(myApp.RegGyroscope_btn);
		/*************Add components*******/
		myApp.RegGyroscopeVer_view.add(myApp.RegGyroscope_btn);
		myApp.RegGyroscope_win.add(myApp.RegGyroscopeVer_view);
/*******Open main window****/
//if  (typeof celcius === "undefined"){
//	Ti.include("SendGyroscopeData.js");
//}else{
	myApp.RegGyroscope_win.open();	
//}

/*************************Add Event Listener to Reg Sensor*************/
myApp.RegGyroscope_btn.addEventListener('click',function(e){
	
		RegisterGyroscopeSensor(myApp.CheckUser.fieldByName('user_number'));
	
});

/*****************Register Acce Function *****************/
function RegisterGyroscopeSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		//alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		alert("Your sensor have been registered");
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Gyroscope","'+json.SensorId+'")');
		//alert(myApp.db.lastInsertRowId);
		myApp.CheckGyroscopeReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Gyroscope");
		Ti.include("SendGyroscopeData.js");
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
			"ReadingName": "xsin",
			"Type": "STRING"
			},{
			"Length": "11",
			"ReadingName": "ysin",
			"Type": "STRING"
			},{
			"Length": "11",
			"ReadingName": "zsin",
			"Type": "STRING"
			},{
			"Length": "11",
			"ReadingName": "cos",
			"Type": "STRING"
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "Gyroscope_smart",
			"SensorReading": "xsin,ysin,zsin,cos",
			"SensorCode":sensorcode
			}
	}};

	myApp.xhr.send(JSON.stringify(object));
}


