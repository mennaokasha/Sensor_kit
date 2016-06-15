var x;
var y;
var z;
var e;
var setAcctime;
myApp.db=Ti.Database.open('Sensor_kit');
//myApp.db.execute('drop table Sensor_kit');
myApp.db.execute('create table IF NOT EXISTS Sensor_kit(sensor_name varchar(255),time_interval varchar(255),sensor_id varchar(255))');
myApp.check_Accelerometer= myApp.db.execute('select * from Sensor_kit where sensor_name=?',"Accelerometer");	
//Main continer 
myApp.home_win = Ti.UI.createWindow({
	backgroundColor:"#635270",
	title:"Home",
	exitOnClose:true,
	layout:"vertical"
});

myApp.vertical_view = Ti.UI.createView({
	top:25,
	bottom:25,
	right:25,
	left:25,
	borderRadius:10,
	backgroundColor:"#c98b70"
});

myApp.text_specs={
	backgroundColor:"#FFF",
	top:30,
	left:30,
	right:30,
	borderWidth:1,
	borderColor:"#635270",
	borderRadius:5,
	hintTextColor:"#CCC",
	color:"#000",
	//passwordMask:true,
	borderRadius:10,
};
myApp.button_specs= {
  	color:"white",
	width:Ti.UI.FILL,
	backgroundColor:"black",
	borderColor:"Gray",
	borderWidth:1,
	top:100,
	left:30,
	right:30,
	borderRadius:10,
};


myApp.Set_Accelemoter_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_Accelemoter_But.title="Set Acce";

myApp.Set_Accelemoter_But.addEventListener('click',function(e){
		//Ti.include('app2.js');
		OpenAccelmeter();		
});
myApp.vertical_view.add(myApp.Set_Accelemoter_But);
myApp.home_win.add(myApp.vertical_view);
myApp.home_win.open();

/***************************Accelemeter window setting ************************/


function OpenAccelmeter(){
	myApp.Accelemeter_win = Ti.UI.createWindow({
	backgroundColor:"#635270",
	title:"Appcelerator",
	exitOnClose:true,
	layout:"vertical"
});

myApp.vertical_view = Ti.UI.createView({
	top:25,
	bottom:25,
	right:25,
	left:25,
	borderRadius:10,
	backgroundColor:"#c98b70"
});
//Set sensor ID
myApp.SetSensorID=Ti.UI.createTextField(myApp.text_specs);
if(myApp.check_Accelerometer.isValidRow()){
		myApp.SetSensorID.value=myApp.check_Accelerometer.fieldByName('sensor_id');
	}
	else{
		myApp.SetSensorID.hintText="Enter your Sensor ID";	
	}

//Time interval field
myApp.SetTimeInterval=Ti.UI.createTextField(myApp.text_specs);
myApp.SetTimeInterval.top=100;
if(myApp.check_Accelerometer.isValidRow()){
		myApp.SetTimeInterval.value=myApp.check_Accelerometer.fieldByName('time_interval');
	}
	else{
		myApp.SetTimeInterval.hintText="Enter your time interval";
	}

//

//Add to main window
myApp.vertical_view.add(myApp.SetSensorID);
myApp.vertical_view.add(myApp.SetTimeInterval);
//buton to set pAccelemeter
myApp.Acc_btn=Ti.UI.createButton(myApp.button_specs);
myApp.Acc_btn.title="Set Sensor";
myApp.Acc_btn.top=170;
myApp.unset_Acc_btn=Ti.UI.createButton(myApp.button_specs);
myApp.unset_Acc_btn.title="Unset Sensor";
myApp.unset_Acc_btn.top=220;
myApp.vertical_view.add(myApp.Acc_btn);
myApp.vertical_view.add(myApp.unset_Acc_btn);
myApp.Accelemeter_win.add(myApp.vertical_view);
myApp.Accelemeter_win.open();

myApp.Acc_btn.addEventListener('click',function(e){
		
		if(myApp.check_Accelerometer.isValidRow()){
			alert("Accelerometer sensor is already set you can update it");
			//update the values 
			alert(myApp.check_Accelerometer.fieldByName('sensor_id'));
			//myApp.db.execute('update Sensor_kit SET time_interval = '+myApp.SetTimeInterval.value+' where sensor_name="Accelerometer"' );
			//myApp.db.execute('update Sensor_kit SET sensor_id = '+myApp.SetSensorID.value+' where sensor_name="Accelerometer"' );
			alert(myApp.db.lastInsertRowId);
			//Firing update Accelerometer
			//Ti.Accelerometer.fireEvent('update');
			alert(x);
		}
		else{
			myApp.db.execute('insert into Sensor_kit(sensor_name, time_interval, sensor_id) values("Accelerometer","'+myApp.SetTimeInterval.value+'","'+myApp.SetSensorID.value+'")');
			alert("Accelerometer is not set");
			alert(myApp.db.lastInsertRowId);
		}

//PostAccelerometerSensorData(x,y,z,myApp.SetSensorID.value)
setAcctime=setInterval(function(){PostAccelerometerSensorData(x,y,z,myApp.SetSensorID.value) ; },myApp.SetTimeInterval.value);
	alert(x);
});
//Add event listener when updating Accelerometer

	myApp.unset_Acc_btn.addEventListener('click',function(e){
	//Ti.Accelerometer.removeEventListener('update');
		alert("Remove event listener");
		myApp.db.execute('delete from Sensor_kit WHERE sensor_name="Accelerometer"');
		myApp.SetSensorID.value="";	
		myApp.SetTimeInterval.value="";
		clearInterval(setAcctime);
		 Ti.API.info("adding accelerometer callback on resume");
      Ti.Accelerometer.addEventListener('update', accelerometerCallback);
	});
	
}

var accelerometerCallback = function(e) {
  x = e.x;
  y = e.y;
  z =  e.z;
};
//POST SENSOR DATA FUNCTION
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

