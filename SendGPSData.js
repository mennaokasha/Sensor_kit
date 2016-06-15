var longitude;
var latitude;

myApp.PostGPS_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostGPSVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*****************Button Battery ****/
myApp.SetOnce_GPS_But=Ti.UI.createButton(myApp.button_specs);
myApp.SetOnce_GPS_But.top=30;
myApp.SetOnce_GPS_But.title="Send sensor only one time";
/***********************Set time interval**************/
myApp.GPSTimeInterval =Ti.UI.createTextField(myApp.text_specs);
myApp.GPSTimeInterval.top=30;
myApp.GPSTimeInterval.hintText="Enter time interval";
myApp.GPSTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.GPSTimeInterval.
/*****************Button Battery ****/
myApp.Set_GPS_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_GPS_But.top=30;
myApp.Set_GPS_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_GPS_But=Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_GPS_But.top=30;
myApp.UnSet_GPS_But.title="UnSet time interval";

myApp.CheckGpsReg= myApp.db.execute('select * from RegSens where sensor_name=?',"GPS");
//Send data only one time
////Set time interval
myApp.SetOnce_GPS_But.addEventListener('click', function(f){
	GPS_Time=new Date();
	PostGpsSensorData(longitude,latitude,GPS_Time,myApp.CheckGpsReg.fieldByName('sensor_id'));
	//alert(myApp.CheckBatteyReg.fieldByName('sensor_id'));
	//		alert(myApp.CheckBatteyReg.fieldByName('sensor_name'));
});
////Set time interval
myApp.Set_GPS_But.addEventListener('click', function(f){
	if(myApp.GPSTimeInterval.value=="" || myApp.GPSTimeInterval.value==null ){
		alert("Please Insert time interval");
		//alert(battery_level);
	}
	else{
		GPS_Time=new Date();
		setGPStime=setInterval(function(){PostGpsSensorData(longitude,latitude,GPS_Time,myApp.CheckGpsReg.fieldByName('sensor_id')); },myApp.GPSTimeInterval.value);
		//myApp.GPSTimeInterval.value=""
		}
	
});
////Set time interval
myApp.UnSet_GPS_But.addEventListener('click', function(f){
	clearInterval(setGPStime);
	alert("Clear inteval");
});

myApp.PostGPSVer_view.add(myApp.SetOnce_GPS_But);
myApp.PostGPSVer_view.add(myApp.GPSTimeInterval);
myApp.PostGPSVer_view.add(myApp.Set_GPS_But);
myApp.PostGPSVer_view.add(myApp.UnSet_GPS_But);
myApp.PostGPS_win.add(myApp.PostGPSVer_view);
myApp.PostGPS_win.open();

function PostGpsSensorData(longitude,latitude,GPS_Time,GPSSensorID){

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
			"sensorId": GPSSensorID},
		"sensorData": {
			// the readings of the sensor
			"longitude": longitude ,
			"latitude" : latitude ,
			"GPS_Time" :GPS_Time
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}
///GPS function
if (Ti.Geolocation.locationServicesEnabled) {
	    
    Titanium.Geolocation.purpose = 'Get Current Location';
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
            alert("error");
        } else {
            Ti.API.info(e.coords);
            //alert(e.coords);
            //alert(e.coords.longitude);
           longitude=e.coords.longitude;
           latitude=e.coords.latitude;
            //alert(longt);
            //alert(latit);
        }
    });
  }else{
  	alert('Please enable location services');
  }