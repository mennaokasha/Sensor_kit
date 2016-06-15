var xsin;
var ysin;
var zsin;
var cos;
myApp.PostGyroscope_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostGyroscopeVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*****************Button Battery ****/
myApp.SendOnce_Gyroscope_But=Ti.UI.createButton(myApp.button_specs);
myApp.SendOnce_Gyroscope_But.top=30;
myApp.SendOnce_Gyroscope_But.title="Send sensor only one time";
/***********************Set time interval**************/
myApp.GyroscopeTimeInterval =Ti.UI.createTextField(myApp.text_specs);
myApp.GyroscopeTimeInterval.top=30;
myApp.GyroscopeTimeInterval.hintText="Enter time interval";
myApp.GyroscopeTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.GyroscopeTimeInterval.
/*****************Button Battery ****/
myApp.Set_Gyroscope_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_Gyroscope_But.top=30;
myApp.Set_Gyroscope_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_Gyroscope_But =Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_Gyroscope_But.top=30;
myApp.UnSet_Gyroscope_But.title="UnSet time interval";


//Send data only one time
////Set time interval
myApp.SendOnce_Gyroscope_But.addEventListener('click', function(f){
	PostGyroscopeSensorData(xsin,ysin,zsin,cos,myApp.CheckGyroscopeReg.fieldByName('sensor_id'));
	//alert(myApp.CheckBatteyReg.fieldByName('sensor_id'));
	//		alert(myApp.CheckBatteyReg.fieldByName('sensor_name'));
});
////Set time interval
myApp.Set_Gyroscope_But.addEventListener('click', function(f){
	if(myApp.GyroscopeTimeInterval.value=="" || myApp.GyroscopeTimeInterval.value==null ){
		alert("Please Insert time interval");
	}
	else{
		setGyroscopetime=setInterval(function(){PostGyroscopeSensorData(xsin,ysin,zsin,cos,myApp.CheckTemperatureReg.fieldByName('sensor_id')); },myApp.GyroscopeTimeInterval.value);
		//myApp.GyroscopeTimeInterval.value=""
	}
	
});
////Set time intervalmyApp.label_specs
myApp.UnSet_Gyroscope_But.addEventListener('click', function(f){
	clearInterval(setGyroscopetime);
	alert("Clear inteval");
});

/*if  (typeof xsin === "undefined" || typeof ysin === "undefined" || typeof zsin === "undefined"){
	myApp.GyroscopeSensor_not_available = Ti.UI.createLabel();
	myApp.GyroscopeSensor_not_available.top=100;
	myApp.GyroscopeSensor_not_available.text ="Gyroscope Unavailable in your device";
	myApp.PostGyroscopeVer_view.add(myApp.GyroscopeSensor_not_available);
}else{*/
	myApp.PostGyroscopeVer_view.add(myApp.SendOnce_Gyroscope_But);
	myApp.PostGyroscopeVer_view.add(myApp.GyroscopeTimeInterval);
	myApp.PostGyroscopeVer_view.add(myApp.Set_Gyroscope_But);
	myApp.PostGyroscopeVer_view.add(myApp.UnSet_Gyroscope_But);
//}


myApp.PostGyroscope_win.add(myApp.PostGyroscopeVer_view);
myApp.PostGyroscope_win.open();

function PostGyroscopeSensorData(xsin,ysin,zsin,cos,GyroscopeSensorID){
	alert(xsin);
	alert(ysin);
	alert(zsin);

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
			"sensorId": GyroscopeSensorID},
		"sensorData": {
		// the readings of the sensor
			"xsin": xsin ,
			"ysin": ysin ,
			"zsin" : zsin ,
			"cos" : cos
			}
	}};
	
	myApp.xhr.send(JSON.stringify({"auth": {
		"DriverManagerId": "MotSensorsKit2",
		"DriverManagerPassword": "mot36Kit2"},
	"package": {
		"sensorInfo": {
			"sensorId": GyroscopeSensorID},
		"sensorData": {
		// the readings of the sensor
			"xsin": xsin ,
			"ysin": ysin ,
			"zsin" : zsin ,
			"cos" : cos
			}
	}}));
}
///Temperature function
	var sensor = require('com.geraudbourdin.sensor');
	sensor.setSensor(sensor.TYPE_GYROSCOPE);
	// set the callback function
	myApp.GYROSCOPESensorsCallback = function(e) {
    if(e.sType == sensor.TYPE_GYROSCOPE){
    		xsin =e.x;// rotation vector component along the x axis. x*sin(θ/2).
			ysin =e.y;//rotation vector component along the y axis. y*sin(θ/2).
			zsin =e.z; //rotation vector component along the z axis. z*sin(θ/2).
			cos =e.cos;// cos(θ/2)
		}
	};
	myApp.PostGyroscope_win.addEventListener('open', function(e) {
	   sensor.addEventListener('update', myApp.GYROSCOPESensorsCallback);
		});
	
	myApp.PostGyroscope_win.addEventListener('close', function() {
	    sensor.removeEventListener('update', myApp.GYROSCOPESensorsCallback);
		});
	
	myApp.PostGyroscope_win.addEventListener('pause', function(e) {
	    sensor.removeEventListener('update', myApp.GYROSCOPESensorsCallback);
		});
	
	myApp.PostGyroscope_win.addEventListener('resume', function(e) {
	    sensor.addEventListener('update', myApp.GYROSCOPESensorsCallback);
		});
