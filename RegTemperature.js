var celcius;
var fahrenheit;
/******Create main container ***********************************/
myApp.RegTemp_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegTempVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*********************************************************/
/****Not supported label *****/
myApp.Sensor_notSupporetd= Ti.UI.createLabel(myApp.label_specs);
myApp.Sensor_notSupporetd.text="Sensor unavailable";
		//*****************create button
		myApp.RegTemp_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegTemp_btn.title="Register Temperature Sensor";
		//myApp.RegTempVer_view.add(myApp.RegTemp_btn);
		/*************Add components*******/
		
		
		/****/
		if (celcius=="" || celcius==null){
		//alert("Not Supported");
		//alert(celcius);
		myApp.RegTempVer_view.add(myApp.Sensor_notSupporetd);
		}else{
			//alert("Supported");
			//alert(celcius);
			myApp.RegTempVer_view.add(myApp.RegTemp_btn);
			/*************************Add Event Listener to Reg Sensor*************/
			myApp.RegTemp_btn.addEventListener('click',function(e){
			RegisterTempSensor(myApp.CheckUser.fieldByName('user_number'));		
});
		}
/******************************************************************/
myApp.RegTemp_win.add(myApp.RegTempVer_view);
/*******Open main window****/
myApp.RegTemp_win.open();



/*****************Register Acce Function *****************/
function RegisterTempSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		//alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		alert("Your sensor have been registered");
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Temperature","'+json.SensorId+'")');
		//alert(myApp.db.lastInsertRowId);
		myApp.CheckTemperatureReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Temperature");
		Ti.include("SendTemperatureData.js");
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
			"ReadingName": "celcius",
			"Type": "STRING"
			},{
			"Length": "11",
			"ReadingName": "fahrenheit",
			"Type": "STRING"
			},{
			"Length": "45",
			"ReadingName": "Temperature_Time",
			"Type": "STRING"
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "TemperatureSensor",
			"SensorReading": "celcius,fahrenheit,Temperature_Time",
			"SensorCode":sensorcode
			}
	}};

	myApp.xhr.send(JSON.stringify(object));
}

///Temperature function
	var sensor = require('com.geraudbourdin.sensor');
	sensor.setSensor(sensor.TYPE_AMBIENT_TEMPERATURE);
	// set the callback function
	myApp.TemperatureSensorsCallback = function(e) {
    if(e.sType == sensor.TYPE_AMBIENT_TEMPERATURE){
    	celcius = e.celcius;
    	fahrenheit = e.fahrenheit;
		}
	};
	myApp.PostTemp_win.addEventListener('open', function(e) {
	   sensor.addEventListener('update', myApp.TemperatureSensorsCallback);
	 
		});
	
	myApp.PostTemp_win.addEventListener('close', function() {
	    sensor.removeEventListener('update', myApp.TemperatureSensorsCallback);
		});
	
	myApp.PostTemp_win.addEventListener('pause', function(e) {
	    sensor.removeEventListener('update', myApp.TemperatureSensorsCallback);
		});
	
	myApp.PostTemp_win.addEventListener('resume', function(e) {
	    sensor.addEventListener('update', myApp.TemperatureSensorsCallback);
		});
