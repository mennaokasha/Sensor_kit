var illumination;
myApp.PostLight_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostLigthVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*****************Button Battery ****/
myApp.SendOnce_Light_But=Ti.UI.createButton(myApp.button_specs);
myApp.SendOnce_Light_But.top=30;
myApp.SendOnce_Light_But.title="Send Light only one time";
/***********************Set time interval**************/
myApp.LightTimeInterval =Ti.UI.createTextField(myApp.text_specs);
myApp.LightTimeInterval.top=30;
myApp.LightTimeInterval.hintText="Enter time interval";
myApp.LightTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.LightTimeInterval.
/*****************Button Battery ****/
myApp.Set_Light_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_Light_But.top=30;
myApp.Set_Light_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_Light_But=Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_Light_But.top=30;
myApp.UnSet_Light_But.title="UnSet time interval";


//Send data only one time
////Set time interval
myApp.SendOnce_Light_But.addEventListener('click', function(f){
	//var sensorList = sensor.getSensorList(sensor.TYPE_ALL);
	//alert("cs;lk");
	//alert(sensorList);
	Light_Time=new Date();
	PostLightSensorData(illumination,Light_Time,myApp.CheckLightReg.fieldByName('sensor_id'));
	
	//alert(myApp.CheckBatteyReg.fieldByName('sensor_id'));
	//		alert(myApp.CheckBatteyReg.fieldByName('sensor_name'));
});
////Set time interval
myApp.Set_Light_But.addEventListener('click', function(f){
	if(myApp.LightTimeInterval.value=="" || myApp.LightTimeInterval.value==null ){
		alert("Please Insert time interval");
		//alert(battery_level);
	}
	else{
		Light_Time=new Date();
		setTemptime=setInterval(function(){PostLightSensorData(illumination,Light_Time,myApp.CheckLightReg.fieldByName('sensor_id')); },myApp.LightTimeInterval.value);
		
		//myApp.LightTimeInterval.value=""
		//PostGpsSensorData(battery_level);
			}
	
});
////Set time interval
myApp.UnSet_Light_But.addEventListener('click', function(f){
	clearInterval(setTemptime);
	alert("Clear inteval");
});

/*if  (typeof illumination === "undefined"){
	myApp.LightSensorisnt_not_available = Ti.UI.createLabel(myApp.label_specs);
	myApp.LightSensorisnt_not_available.top=100;
	myApp.LightSensorisnt_not_available.text ="The sensr isn't available";
	myApp.PostLigthVer_view.add(myApp.LightSensorisnt_not_available);
}else{*/
	myApp.PostLigthVer_view.add(myApp.SendOnce_Light_But);
	myApp.PostLigthVer_view.add(myApp.LightTimeInterval);
	myApp.PostLigthVer_view.add(myApp.Set_Light_But);
	myApp.PostLigthVer_view.add(myApp.UnSet_Light_But);
//}


myApp.PostLight_win.add(myApp.PostLigthVer_view);
myApp.PostLight_win.open();

function PostLightSensorData(illumination,LightSensorID){
alert(illumination);
alert(LightSensorID);
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
			"sensorId": LightSensorID},
		"sensorData": {
		// the readings of the sensor
			"illumination": illumination,
			"Light_Time"  : Light_Time 
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}


///Light function
	var sensor = require('com.geraudbourdin.sensor');
	sensor.setSensor(sensor.TYPE_LIGHT);
	// set the callback function
	myApp.LightSensorsCallback = function(e) {
    if(e.sType == sensor.TYPE_LIGHT){
    	illumination = e.lux;
    	//alert(e.lux);
		}
	};
	myApp.PostLight_win.addEventListener('open', function(e) {
	   sensor.addEventListener('update', myApp.LightSensorsCallback);
		});
	
	myApp.PostLight_win.addEventListener('close', function() {
	    sensor.removeEventListener('update', myApp.LightSensorsCallback);
		});
	
	myApp.PostLight_win.addEventListener('pause', function(e) {
	    sensor.removeEventListener('update', myApp.LightSensorsCallback);
		});
	
	myApp.PostLight_win.addEventListener('resume', function(e) {
	    sensor.addEventListener('update', myApp.LightSensorsCallback);
		});
