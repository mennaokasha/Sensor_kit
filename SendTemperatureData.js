var celcius;
var fahrenheit;

myApp.PostTemp_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostTempVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*****************Button Battery ****/
myApp.SendOnce_Temp_But=Ti.UI.createButton(myApp.button_specs);
myApp.SendOnce_Temp_But.top=30;
myApp.SendOnce_Temp_But.title="Send sensor only one time";
/***********************Set time interval**************/
myApp.TempTimeInterval =Ti.UI.createTextField(myApp.text_specs);
myApp.TempTimeInterval.top=30;
myApp.TempTimeInterval.hintText="Enter time interval";
myApp.TempTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.TempTimeInterval.
/*****************Button Battery ****/
myApp.Set_Temp_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_Temp_But.top=30;
myApp.Set_Temp_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_Temp_But=Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_Temp_But.top=30;
myApp.UnSet_Temp_But.title="UnSet time interval";


//Send data only one time
////Set time interval
myApp.SendOnce_Temp_But.addEventListener('click', function(f){
	Temperature_Time=new Date();
	PostTemperatureSensorData(celcius,fahrenheit,Temperature_Time,myApp.CheckTemperatureReg.fieldByName('sensor_id'));
	//alert(myApp.CheckBatteyReg.fieldByName('sensor_id'));
	//		alert(myApp.CheckBatteyReg.fieldByName('sensor_name'));
	
});
////Set time interval
myApp.Set_Temp_But.addEventListener('click', function(f){
	if(myApp.TempTimeInterval.value=="" || myApp.TempTimeInterval.value==null ){
		alert("Please Insert time interval");
		//alert(battery_level);
	}
	else{
		Temperature_Time=new Date();
		setTemptime=setInterval(function(){PostTemperatureSensorData(celcius,fahrenheit,Temperature_Time,myApp.CheckTemperatureReg.fieldByName('sensor_id')); },myApp.TempTimeInterval.value);
		
		//myApp.TempTimeInterval.value=""
		//PostGpsSensorData(battery_level);
			}
	
});
////Set time interval
myApp.UnSet_Temp_But.addEventListener('click', function(f){
	clearInterval(setTemptime);
	alert("Clear inteval");
});

	myApp.PostTempVer_view.add(myApp.SendOnce_Temp_But);
	myApp.PostTempVer_view.add(myApp.TempTimeInterval);
	myApp.PostTempVer_view.add(myApp.Set_Temp_But);
	myApp.PostTempVer_view.add(myApp.UnSet_Temp_But);



myApp.PostTemp_win.add(myApp.PostTempVer_view);
myApp.PostTemp_win.open();


function PostTemperatureSensorData(celcius,fahrenheit,Temperature_Time,TempSensorID){

myApp.xhr = Titanium.Network.createHTTPClient(); 
myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/PostSensorData'); 
	myApp.xhr.onload = function() 
	{ 
		alert(this.responseText);
	}; 

	// this method will be called if there is an error 
	myApp.xhr.onerror = function(error)
	{
		alert(error);
	};

var object={"auth": {
		"DriverManagerId": "MotSensorsKit2",
		"DriverManagerPassword": "mot36Kit2"},
	"package": {
		"sensorInfo": {
			"sensorId": TempSensorID},
		"sensorData": {
		// the readings of the sensor
			"celcius": celcius ,
			"fahrenheit": fahrenheit,
			"Temperature_Time":Temperature_Time
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
