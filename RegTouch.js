
/******Create main container ***********************************/
myApp.RegTouch_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegTouchVer_view = Ti.UI.createView(myApp.verticalViewSpecs);

		//*****************create button
		myApp.RegTouch_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegTouch_btn.title="Register Touch sensor";
		myApp.RegTouchVer_view.add(myApp.RegTouch_btn);
		/*************Add components*******/
		myApp.RegTouchVer_view.add(myApp.RegTouch_btn);
		myApp.RegTouch_win.add(myApp.RegTouchVer_view );
/*******Open main window****/
myApp.RegTouch_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.RegTouch_btn.addEventListener('click',function(e){

		RegisterTouchSensor(myApp.CheckUser.fieldByName('user_number'));
	
});

/*****************Register Acce Function *****************/
function RegisterTouchSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		//alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		//alert("Your sensor have been registered");
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Touch","'+json.SensorId+'")');
		//alert(myApp.db.lastInsertRowId);
		myApp.CheckTouchReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Touch");
		Ti.include("SendTouchData.js");
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
			},,{
			"Length": "30",
			"ReadingName": "Touch_Time",
			"Type": "STRING"
			}],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "Touch_Smart",
			"SensorReading": "x,y,Touch_Time",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}


