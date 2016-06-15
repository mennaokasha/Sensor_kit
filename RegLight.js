
/******Create main container ***********************************/
myApp.RegLight_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegLightVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
		
		//*****************create button
		myApp.RegLight_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegLight_btn.top=30;
		myApp.RegLight_btn.title="Register Light Sensor";
		myApp.RegLightVer_view.add(myApp.RegLight_btn);
		/*************Add components*******/
		myApp.RegLightVer_view.add(myApp.RegLight_btn);
		myApp.RegLight_win.add(myApp.RegLightVer_view);
/*******Open main window****/
/*if  (typeof celcius === "undefined"){
	Ti.include("SendLightData.js");
}else{
	myApp.RegLight_win.open();	
}*/
myApp.RegLight_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.RegLight_btn.addEventListener('click',function(e){

		RegisterLightSensor(myApp.CheckUser.fieldByName('user_number'));
	
});

/*****************Register Acce Function *****************/
function RegisterLightSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Light","'+json.SensorId+'")');
		myApp.CheckLightReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Light");
		//alert(myApp.db.lastInsertRowId);
		Ti.include("SendLightData.js");
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
			"ReadingName": "illumination",
			"Type": "STRING"
			}, {
			"Length": "30",
			"ReadingName": "Light_Time",
			"Type": "STRING"
			} ],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "Light_smart",
			"SensorReading": "illumination,Light_Time",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}


///Temperature function
	var sensor = require('com.geraudbourdin.sensor');
	sensor.setSensor(sensor.TYPE_LIGHT);
	// set the callback function
	myApp.LightSensorsCallback = function(e) {
    if(e.sType == sensor.TYPE_LIGHT){
    	illumination = e.lux;
    	//alert(e.lux);
		}
	};
	myApp.RegLight_win.addEventListener('open', function(e) {
	   sensor.addEventListener('update', myApp.LightSensorsCallback);
		});
	
	myApp.RegLight_win.addEventListener('close', function() {
	    sensor.removeEventListener('update', myApp.LightSensorsCallback);
	    //destroy();
		});
	
	myApp.RegLight_win.addEventListener('pause', function(e) {
	    sensor.removeEventListener('update', myApp.LightSensorsCallback);
		});
	
	myApp.RegLight_win.addEventListener('resume', function(e) {
	    sensor.addEventListener('update', myApp.LightSensorsCallback);
		});
