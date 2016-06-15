var x;
var y;
var z;
		/******Create main container ***********************************/
		myApp.Acc_win = Ti.UI.createWindow(myApp.win_specs);
		myApp.AccVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
	//******************Set time interval
		myApp.SetAccTimeInterval=Ti.UI.createTextField(myApp.text_specs);
		myApp.SetAccTimeInterval.hintText="Enter The time interval";
		myApp.AccVer_view.add(myApp.SetAccTimeInterval);
		/**********************Add Set button*****/
		myApp.SetAcc_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.SetAcc_btn.title="Set Sensor";
		myApp.AccVer_view.add(myApp.SetAcc_btn);/***************************************/
		/**********************Add Set button*****/
		myApp.UnSetAcc_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.UnSetAcc_btn.title="UnSet Sensor";
		myApp.AccVer_view.add(myApp.UnSetAcc_btn);
		
		/*************Add components*******/
		myApp.Acc_win.add(myApp.AccVer_view);
		myApp.Acc_win.open();
		/*******************************Add Event listener accelerometer **************/
		myApp.SetAcc_btn.addEventListener('click',function(e){
		var AccID=myApp.CheckAccReg.fieldByName('Sensor_id');
		setAcctime=setInterval(function(){PostAccelerometerSensorData(x,y,z,AccID) ; },myApp.SetAccTimeInterval.value);	
		});
		/**********************Unset Clear interval **************/
		myApp.UnSetAcc_btn.addEventListener('click',function(e){
			clearInterval(setAcctime);
		});

	/************accelerometer Call back function***************************/
	var accelerometerCallback = function(e) {
		  x = e.x;
		  y = e.y;
		  z =  e.z;
		};

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
/*************************/
function PostAccelerometerSensorData(Readingvalue1,Readingvalue2,Readingvalue3,AccSensorID){
//alert(Readingvalue1);
//alert(Readingvalue2);
//alert(Readingvalue3);
//alert("sending data");
myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http://dev.masterofthings.com/PostSensorData'); 
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
			"z": Readingvalue2
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}
