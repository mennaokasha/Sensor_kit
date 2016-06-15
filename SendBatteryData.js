
var battery_level;
myApp.PostBattery_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostBatteryver_view = Ti.UI.createView(myApp.verticalViewSpecs);
/*****************Button Battery ****/
myApp.SetOnce_battery_But=Ti.UI.createButton(myApp.button_specs);
myApp.SetOnce_battery_But.top=30;
myApp.SetOnce_battery_But.title="Send sensor only one time";
/***********************Set time interval**************/
myApp.BatteryTimeInterval=Ti.UI.createTextField(myApp.text_specs);
myApp.BatteryTimeInterval.top=30;
myApp.BatteryTimeInterval.hintText="Enter time interval";
myApp.BatteryTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.BatteryTimeInterval.
/*****************Button Battery ****/
myApp.Set_battery_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_battery_But.top=30;
myApp.Set_battery_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_battery_But=Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_battery_But.top=30;
myApp.UnSet_battery_But.title="UnSet time interval";



Titanium.Platform.addEventListener('battery', function(e){
  //alert('The battery state has changed to ' + e.state);
 // alert('The battery level is ' + e.level);
 // alert('The battery event source is ' + e.source);
  //alert('The battery event name ' + e.type);
  //alert(e);
  battery_level=e.level;
  
});
//Send data only one time
////Set time interval
myApp.SetOnce_battery_But.addEventListener('click', function(f){
	Battery_Time=new Date();
	PostBatterySensorData(battery_level,Battery_Time,myApp.CheckBatteryReg.fieldByName('sensor_id'));
	//alert(myApp.CheckBatteryReg.fieldByName('sensor_id'));
	//		alert(myApp.CheckBatteryReg.fieldByName('sensor_name'));
});
////Set time interval
myApp.Set_battery_But.addEventListener('click', function(f){
	if(myApp.BatteryTimeInterval.value=="" || myApp.BatteryTimeInterval.value==null ){
		alert("Please Insert time interval");
		//alert(battery_level);
	}
	else{

		Battery_Time=new Date();
		setBatterytime=setInterval(function(){PostBatterySensorData(battery_level,Battery_Time,myApp.CheckBatteryReg.fieldByName('sensor_id')); },myApp.BatteryTimeInterval.value);
		myApp.PostBatteryver_view.add(myApp.UnSet_battery_But);
		//myApp.BatteryTimeInterval.value=""
		//PostBatterySensorData(battery_level);
	}
	
});
////Set time interval
myApp.UnSet_battery_But.addEventListener('click', function(f){
	clearInterval(setBatterytime);
	alert("Clear inteval");
});

myApp.PostBatteryver_view.add(myApp.SetOnce_battery_But);
myApp.PostBatteryver_view.add(myApp.BatteryTimeInterval);
myApp.PostBatteryver_view.add(myApp.Set_battery_But);
myApp.PostBattery_win.add(myApp.PostBatteryver_view);
myApp.PostBattery_win.open();

function PostBatterySensorData(BatteryLevel,Battery_Time,BatterySensorID){
alert(BatteryLevel);
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
			"sensorId": BatterySensorID},
		"sensorData": {
			// the readings of the sensor
			"BatteryLevel": BatteryLevel,
			"Battery_Time":Battery_Time
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}
