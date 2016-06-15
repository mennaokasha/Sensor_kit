
/******Create main container ***********************************/
myApp.RegAcc_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegAccVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
	
		//*****************create button
		myApp.RegAcc_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegAcc_btn.title="Register Accelerometer";
		myApp.RegAccVer_view.add(myApp.RegAcc_btn);
		/*************Add components*******/
		myApp.RegAccVer_view.add(myApp.RegAcc_btn);
		myApp.RegAcc_win.add(myApp.RegAccVer_view);
/*******Open main window****/
myApp.RegAcc_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.RegAcc_btn.addEventListener('click',function(e){
	RegisterAccSensor(myApp.CheckUser.fieldByName('user_number'));
	
});

/*****************Register Acce Function *****************/
function RegisterAccSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Accelerometer","'+json.SensorId+'")');
		myApp.CheckAccReg= myApp.db.execute('select * from RegSens where sensor_name=?',"Accelerometer");
		Ti.include("SendAccData.js");
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
			"ReadingName": "x",
			"Type": "NUMBER"
			},{
			"Length": "11",
			"ReadingName": "y",
			"Type": "NUMBER"
			} ,{
			"Length": "11",
			"ReadingName": "z",
			"Type": "NUMBER"
			} ,{
			"Length": "45",
			"ReadingName": "Accelerometer_Time",
			"Type": "STRING"
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "Accelerometer_smart",
			"SensorReading": "x,y,z,Accelerometer_Time",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}
