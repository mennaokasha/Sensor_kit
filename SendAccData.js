var x;
var y;
var z;

myApp.PostAccelometer_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostAccelometerVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*****************Button Battery ****/
myApp.SetOnce_Accelometer_But=Ti.UI.createButton(myApp.button_specs);
myApp.SetOnce_Accelometer_But.top=30;
myApp.SetOnce_Accelometer_But.title="Send sensor only one time";
/***********************Set time interval**************/
myApp.AccelometerTimeInterval=Ti.UI.createTextField(myApp.text_specs);
myApp.AccelometerTimeInterval.top=30;
myApp.AccelometerTimeInterval.hintText="Enter time interval";
myApp.AccelometerTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.AccelometerTimeInterval.
/*****************Button Battery ****/
myApp.Set_Accelometer_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_Accelometer_But.top=30;
myApp.Set_Accelometer_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_Accelometer_But=Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_Accelometer_But.top=30;
myApp.UnSet_Accelometer_But.title="UnSet time interval";


//Send data only one time
////Set time interval
myApp.SetOnce_Accelometer_But.addEventListener('click', function(f){
	//alert("saklk");
	Accelerometer_Time=new Date();
	alert(Accelerometer_Time);
	PostAccelerometerSensorData(x,y,z,Accelerometer_Time,myApp.CheckAccReg.fieldByName('sensor_id'));
});
////Set time interval
myApp.Set_Accelometer_But.addEventListener('click', function(f){
	if(myApp.AccelometerTimeInterval.value=="" || myApp.AccelometerTimeInterval.value==null ){
		alert("Please Select time interval");

		//alert(battery_level);
	}
	else{
		Accelerometer_Time=new Date();
		setAccelometertime=setInterval(function(){PostAccelerometerSensorData(x,y,z,Accelerometer_Time,myApp.CheckAccReg.fieldByName('sensor_id')); },myApp.AccelometerTimeInterval.value);
		//PostBatterySensorData(battery_level);
		myApp.PostAccelometerVer_view.add(myApp.UnSet_Accelometer_But);
	}
	
});
////Set time interval
myApp.UnSet_Accelometer_But.addEventListener('click', function(f){
	clearInterval(setAccelometertime);
	alert("Clear inteval");
	myApp.PostAccelometer_win.open();
});

myApp.PostAccelometerVer_view.add(myApp.SetOnce_Accelometer_But);
myApp.PostAccelometerVer_view.add(myApp.AccelometerTimeInterval);
myApp.PostAccelometerVer_view.add(myApp.Set_Accelometer_But);
myApp.PostAccelometer_win.add(myApp.PostAccelometerVer_view);
myApp.PostAccelometer_win.open();

var accelerometerCallback = function(e) {
  x = e.x;
  y = e.y;
  z =  e.z;
};
//POST SENSOR DATA FUNCTION
function PostAccelerometerSensorData(Readingvalue1,Readingvalue2,Readingvalue3,Accelerometer_Time,AccSensorID){
//alert(Readingvalue1);
//alert(Readingvalue2);
//alert(Readingvalue3);
//alert("sending data");
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
			"sensorId": AccSensorID},
		"sensorData": {
			// the readings of the sensor
			"x": Readingvalue1 ,
			"y": Readingvalue2,
			"z": Readingvalue2 ,
			"Accelerometer_Time":Accelerometer_Time
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}
////Accelometer
if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1 ){
  alert('Accelerometer does not work on a virtual device');
} else {
  Ti.Accelerometer.addEventListener('update', accelerometerCallback);
  if (Ti.Platform.name === 'android'){
    Ti.Android.currentActivity.addEventListener('pause', function(e) {
      Ti.API.info("removing accelerometer callback on pause");
      Ti.Accelerometer.removeEventListener('update', accelerometerCallback);
    });
    Ti.Android.currentActivity.addEventListener('resume', function(e) {
     
    });
  }
}


