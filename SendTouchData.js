myApp.PostTouch_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostTouch_win.open();


//POST SENSOR DATA FUNCTION
function PostTouchData(Readingvalue1,Readingvalue2,TouchSensorID){
//alert(Readingvalue1);
//alert(Readingvalue2);
//alert(Readingvalue3);
//alert("sending data");
myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/PostSensorData'); 
	myApp.xhr.onload = function() 
	{ 	//alert(myApp.CheckTouchReg.fieldByName('sensor_id'));
		alert(this.responseText);
		//alert("The sensor data have sent");
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
			"sensorId": TouchSensorID},
		"sensorData": {
			// the readings of the sensor
			"x": Readingvalue1 ,
			"y": Readingvalue2,
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}
////Touch

myApp.PostTouch_win.addEventListener('click', function(e){
	 XIndex = e.x;
	 YIndex = e.y;
	 Touch_Time=new Date();
	 //alert(XIndex);
	  PostTouchData(XIndex,YIndex,Touch_Time,myApp.CheckTouchReg.fieldByName('sensor_id')); 
	  });

